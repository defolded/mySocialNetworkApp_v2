import React from "react";
import { NavLink } from "react-router-dom";

interface PropsType {
  id: number
  name: string
}

const Person:React.FC<PropsType> = (props) => {
  return (
    <div>
      <NavLink to={`/messages/${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default Person;
