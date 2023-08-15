import React from "react";
import styles from "./MyMessage.module.css";

const SingleMessage = (props) => {
  return <div>{props.text}</div>;
};

export default SingleMessage;
