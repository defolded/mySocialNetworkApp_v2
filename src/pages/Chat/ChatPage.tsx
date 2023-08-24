import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chatApi";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chatReducer";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(startMessagesListening());
    return () => {
      dispatch<any>(stopMessagesListening());
    };
  }, []);

  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const status = useSelector((state: AppStateType) => state.chat.status);

  return (
    <div>
      {messages.length > 0 || (status !== "error" && <>Please wait...</>)}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC = () => {
  const messagesAnchorRef = useRef<HTMLDivElement | null>(null);
  const [isAutoScroll, setAutoScroll] = useState(true);

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setAutoScroll(true);
    } else {
      isAutoScroll && setAutoScroll(false);
    }
  };

  const messages = useSelector((state: AppStateType) => state.chat.messages);

  useEffect(() => {
    if (isAutoScroll)
      messagesAnchorRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ height: "450px", overflowY: "auto" }} onScroll={onScrollHandler}>
      {messages.map((m, index) => (
        <Message message={m} key={crypto.randomUUID()} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  return (
    <div>
      <img
        src={message.photo ? message.photo : "https://i.stack.imgur.com/Bzcs0.png"}
        width="36px"
        height="36px"
        alt="talker"
      />{" "}
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
});

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) return;

    dispatch<any>(sendMessage(message));
    setMessage("");
  };

  return (
    <div style={{ marginTop: "0.4em" }}>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          send
        </button>
      </div>
      <br />
      <br />
      <div style={{ fontSize: "14px" }}>
        *Sent messages may not be displayed without refreshing the page due to server issues.
        <br />
        To address the issue you must establish a websocket connection in more than one browser
        window.
      </div>
    </div>
  );
};

export default ChatPage;
