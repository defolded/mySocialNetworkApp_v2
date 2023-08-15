import React from "react";
import styles from "./Person.module.css";
import { NavLink } from "react-router-dom";

const Person = (props) => {
  return (
    <div>
      <NavLink to={`/messages/${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default Person;
