import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import b from "../.././Button.module.css";
import { sendMessage, setDialogUsers } from "../../redux/messagesReducer";
import { AppStateType } from "../../redux/redux-store";
import styles from "./Messages.module.css";
import MyMessage from "./MyMessage/MyMessage";
import Person from "./Person/Person";

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.messages.messages);
  const dialogs = useSelector((state: AppStateType) => state.messages.dialogs);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(setDialogUsers());
  }, []);

  if (dialogs.length < 0 || !isAuth) return <div>No followed users to chat with.</div>;

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.dialogs}>
          {dialogs.map((p) => (
            <Person id={p.id} name={p.name} key={crypto.randomUUID()} />
          ))}
        </div>
        <div className={styles.messages}>
          <div className={styles.texts}>
            {messages.map((m) => (
              <MyMessage text={m.body} key={crypto.randomUUID()} />
            ))}
          </div>
          {dialogs.length > 0 && <AddMessageForm />}
        </div>
      </div>
    </div>
  );
};

type FormInputs = {
  messageText: string;
};

const AddMessageForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInputs> = (data: any) =>
    // @ts-ignore
    dispatch<any>(sendMessage(params, data.messageText));

  let { userId } = useParams();
  let params = Number(userId);

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
