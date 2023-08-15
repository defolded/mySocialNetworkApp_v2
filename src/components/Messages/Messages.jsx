import React from "react";
import styles from "./Messages.module.css";
import MyMessage from "./MyMessage/MyMessage";
import Person from "./Person/Person";
import b from "../.././Button.module.css";
import { Field, reduxForm } from "redux-form";

const Messages = (props) => {
  const addMessage = (values) => props.addMessage(values.newMessageBody);

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.dialogs}>
          {props.state.dialogs.map((p) => (
            <Person id={p.id} name={p.name} key={p.id} />
          ))}
        </div>
        <div className={styles.messages}>
          {props.state.messages.map((m) => (
            <MyMessage text={m.message} key={m.id} />
          ))}
        </div>
      </div>
      {props.isAuth ? <AddMessageFormRedux onSubmit={addMessage} /> : ""}
    </div>
  );
};

const AddMessageForm = (props) => {
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

const AddMessageFormRedux = reduxForm({ form: "messagesAddMessageForm" })(
  AddMessageForm
);

export default Messages;
