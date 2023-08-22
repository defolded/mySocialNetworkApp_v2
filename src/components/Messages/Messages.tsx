import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageApiType } from "../../api/messagesApi";
import { sendMessage, subscribeMessages, unsubscribeMessages } from "../../redux/messagesReducer";
import { AppStateType } from "../../redux/redux-store";

const MessagesPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.messages.status);

  useEffect(() => {
    dispatch<any>(subscribeMessages());
    return () => {
      dispatch<any>(unsubscribeMessages());
    };
  }, []);

  return (
    <div>
      {status === "error" && <div>Some error occured. Please refresh your page.</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.messages.messages);
  const messagesAchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setAutoScroll] = useState(false);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget;
    Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300
      ? !isAutoScroll && setAutoScroll(true)
      : isAutoScroll && setAutoScroll(false);
  };

  useEffect(() => {
    if (isAutoScroll)
      messagesAchorRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messagesAchorRef]);

  return (
    <div style={{ height: "400px", overflowY: "auto" }} onScroll={scrollHandler}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo(({ message }) => {
  return (
    <div>
      <img src={message.photo} style={{ width: "30px" }} alt="profile" />
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

  const status = useSelector((state: AppStateType) => state.messages.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch<any>(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
