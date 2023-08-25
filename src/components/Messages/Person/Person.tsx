import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setUserMessages } from "../../../redux/messagesReducer";

interface PropsType {
  id: number;
  name: string;
}

const Person: React.FC<PropsType> = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <NavLink
        to={`/messages/${props.id}`}
        onClick={() => dispatch<any>(setUserMessages(props.id))}
      >
        {props.name}
      </NavLink>
    </div>
  );
});

export default Person;
