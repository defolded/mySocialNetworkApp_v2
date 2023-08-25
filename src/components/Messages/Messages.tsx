import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import b from "../.././Button.module.css";
import { AppStateType } from "../../redux/redux-store";
import styles from "./Messages.module.css";
import MyMessage from "./MyMessage/MyMessage";
import Person from "./Person/Person";

const Messages: React.FC<{ addMessage: (newMessageBody: string) => void }> = ({ addMessage }) => {
  const messages = useSelector((state: AppStateType) => state.messages.messages);
  const dialogs = useSelector((state: AppStateType) => state.messages.dialogs);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.dialogs}>
          {dialogs.map((p) => (
            <Person id={p.id} name={p.name} key={crypto.randomUUID()} />
          ))}
        </div>
        <div className={styles.messages}>
          {messages.map((m) => (
            <MyMessage text={m.message} key={crypto.randomUUID()} />
          ))}
        </div>
      </div>
      {isAuth ? <AddMessageForm addMessage={addMessage} /> : ""}
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
          placeholder="Start typing..."
          {...register("messageText", { pattern: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_!'.,-\\?]+)*$/i })}
          className={b.text}
          style={{ padding: "10px" }}
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
