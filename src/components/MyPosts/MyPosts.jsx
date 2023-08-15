import React from "react";
import styles from "./MyPosts.module.css";
import MyPost from "./SinglePost/SinglePost";
import b from "../.././Button.module.css";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators";

const MyPosts = (props) => {
  const addPost = (values) => props.addPost(values.newPostBody);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postsList}>
        {props.state.posts.map((p) => (
          <MyPost
            profilePicture={p.profilePicture}
            username={p.username}
            text={p.message}
            key={p.id}
          />
        ))}
      </div>
      {props.isAuth ? <AddPostReduxForm onSubmit={addPost} /> : ""}
    </div>
  );
};

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={b.userInput}>
        <Field
          component="textarea"
          name="newPostBody"
          placeholder="Enter your post"
          validate={required}
          className={b.text}
        />
        <button className={b.btn}>Submit</button>
      </div>
    </form>
  );
};

const AddPostReduxForm = reduxForm({ form: "postAddPostForm" })(AddPostForm);

export default MyPosts;
