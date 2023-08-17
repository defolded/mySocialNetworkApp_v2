import React from "react";

interface PropsType {
  text: string
}

const SingleMessage:React.FC<PropsType> = (props) => {
  return <div>{props.text}</div>;
};

export default SingleMessage;
