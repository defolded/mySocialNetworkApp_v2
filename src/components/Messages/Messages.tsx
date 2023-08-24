import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import b from "../.././Button.module.css";
import { DialogType, MessageType } from "../../redux/messagesReducer";
import styles from "./Messages.module.css";
import MyMessage from "./MyMessage/MyMessage";
import Person from "./Person/Person";

interface PropsType {
  isAuth: boolean;
  dialogs: DialogType[];
  messages: MessageType[];

  addMessage: (newMessageBody: string) => void;
}

const Messages: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.dialogs}>
          {props.dialogs.map((p) => (
            <Person id={p.id} name={p.name} key={crypto.randomUUID()} />
          ))}
        </div>
        <div className={styles.messages}>
          {props.messages.map((m) => (
            <MyMessage text={m.message} key={crypto.randomUUID()} />
          ))}
        </div>
      </div>
      {props.isAuth ? <AddMessageForm addMessage={props.addMessage} /> : ""}
    </div>
  );
};

type FormInputs = {
  messageText: string;
};

interface AddMessageFormOwnPropsType {
  addMessage: (newMessageBody: string) => void;
}

const AddMessageForm: React.FC<AddMessageFormOwnPropsType> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: any) => props.addMessage(data.messageText);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <div className={b.userInput}>
        <input
          placeholder="Start typing your message"
          {...register("messageText", { pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_!'.,-\\?]+)*$/i })}
          className={b.text}
        />
        <input type="submit" value="Submit" className={b.btn} />
      </div>
      {errors.messageText && (
        <span
          style={{
            color: "#D10000",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Incorrect symbols.
        </span>
      )}
    </form>
  );
};

export default Messages;
