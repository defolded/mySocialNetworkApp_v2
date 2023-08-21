import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
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

interface NewMessageFormValuesType {
  newMessageBody: string;
}

const Messages: React.FC<PropsType> = (props) => {
  const addMessage = (values: { newMessageBody: string }) =>
    props.addMessage(values.newMessageBody);

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.dialogs}>
          {props.dialogs.map((p) => (
            <Person id={p.id} name={p.name} key={p.id} />
          ))}
        </div>
        <div className={styles.messages}>
          {props.messages.map((m) => (
            <MyMessage text={m.message} key={m.id} />
          ))}
        </div>
      </div>
      {props.isAuth ? <AddMessageFormRedux onSubmit={addMessage} {...props} /> : ""}
    </div>
  );
};

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={b.userInput}>
        <Field
          component="textarea"
          name="newMessageBody"
          placeholder="Enter your message"
          className={b.text}
        />
        <button className={b.btn}>Submit</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
  form: "messagesAddMessageForm",
})(AddMessageForm);

export default Messages;
