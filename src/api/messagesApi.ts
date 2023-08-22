export type StatusType = "pending" | "ready" | "error";

type MessageRecievedSubscriberType = (messages: ChatMessageApiType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

let subscribers = {
  "messages-received": [] as MessageRecievedSubscriberType[],
  "status-received": [] as StatusChangedSubscriberType[],
};

export interface ChatMessageApiType {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

let ws: WebSocket | null = null;

type EventNamesType = "messages-received" | "status-received";

const handleCloseChannel = () => {
  statusNotify("pending");
  setTimeout(handleCreateChannel, 3000);
};

const handleMessageSubmit = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessages));
  statusNotify("ready");
};

const handleConnectionOpen = () => {
  statusNotify("ready");
};

const handleConnectionError = () => {
  statusNotify("error");
  console.log("PLEASE REFRESH YOUR PAGE");
};

const statusNotify = (status: StatusType) => {
  subscribers["status-received"].forEach((s) => s(status));
};

function handleCreateChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  statusNotify("pending");
  ws.addEventListener("close", handleCloseChannel);
  ws.addEventListener("message", handleMessageSubmit);
  ws.addEventListener("open", handleConnectionOpen);
  ws.addEventListener("error", handleConnectionError);
}

const cleanUp = () => {
  ws?.removeEventListener("close", handleCloseChannel);
  ws?.removeEventListener("message", handleMessageSubmit);
  ws?.removeEventListener("open", handleConnectionOpen);
  ws?.removeEventListener("error", handleConnectionError);
};

export const messagesApi = {
  start() {
    handleCreateChannel();
  },
  stop() {
    subscribers["messages-received"] = [];
    subscribers["status-received"] = [];
    cleanUp();
    ws?.close();
  },
  subscribeOnNewMessages(
    eventName: EventNamesType,
    callback: MessageRecievedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventNamesType,
    callback: MessageRecievedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
