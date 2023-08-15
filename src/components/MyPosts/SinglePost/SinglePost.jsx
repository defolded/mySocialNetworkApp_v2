import React from "react";
import styles from "./SinglePost.module.css";

const MyPost = (props) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.user}>
          <img
            src={props.profilePicture}
            alt="profile"
            height="40"
            width="40"
          />
          <h3>{props.username}</h3>
        </div>
        <br />
        <p>{props.text}</p>
        <br />
      </div>
    </div>
  );
};

export default MyPost;
