import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import styles from "./User.module.css";
import React from "react";

interface PropsType {
  isFetchingUsersPage: boolean
  userId: number
  profilePicture: string
  username: string
  isFollowed: any
  isFetching: number[]
  message: string

  unfollowUser: (u: number) => void
  followUser: (u: number) => void
}

const User:React.FC<PropsType> = (props) => {
  if (props.isFetchingUsersPage) {
    return <Preloader />;
  }

  return (
    <div className={styles.container} key={props.userId}>
      <NavLink to={`/users/${props.userId}`}>
        <img src={props.profilePicture} height="80" width="80" alt="profile" />
      </NavLink>
      <h3>{props.username}</h3>
      {props.isFollowed ? (
        <button
          disabled={props.isFetching.some((id) => id === props.userId)}
          onClick={() => {
            props.unfollowUser(props.userId);
          }}
          className={styles.followButton}
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={props.isFetching.some((id) => id === props.userId)}
          onClick={() => {
            props.followUser(props.userId);
          }}
          className={styles.followButton}
        >
          Follow
        </button>
      )}
      <p>{props.message}</p>
    </div>
  );
};

export default User;
