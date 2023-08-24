
export type MessagesRecievedSubscriberType = (messages: ChatMessageType[]) => void
export type StatusChangedSubscriberType = (messages: StatusType) => void

export type ChatMessageType = {
    userId: number;
    userName: string;
    message: string;
    photo: string;
};

let subscribers = {
    'message-recieved': [] as MessagesRecievedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let wsChannel: WebSocket | null;

export type StatusType = 'pending' | 'ready' | 'error'

type EventNames = "message-recieved" | 'status-changed'

const closeHandler = () => {
    notifySubscribers('pending')
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['message-recieved'].forEach(s => s(newMessages))
};

const openHandler = () => {
    notifySubscribers('ready')
};

const errorHandler = () => {
    notifySubscribers('error')
    console.log('SOMETHING WENT WRONG')
};

const cleanUp = () => {
    wsChannel?.removeEventListener("close", closeHandler);
    wsChannel?.removeEventListener("message", messageHandler);
    wsChannel?.removeEventListener('open', openHandler)
    wsChannel?.removeEventListener('error', errorHandler)
}

const notifySubscribers = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp();

    wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribers('pending')
    wsChannel?.addEventListener("close", closeHandler);
    wsChannel?.addEventListener('message', messageHandler)
    wsChannel?.addEventListener('open', openHandler)
    wsChannel?.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-recieved'] = []
        subscribers['status-changed'] = []
        cleanUp()
    },
    subscribe(eventName: EventNames, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNames, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        wsChannel?.send(message)
    }
}