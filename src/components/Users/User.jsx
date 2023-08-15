import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./User.module.css";
import Preloader from "../common/Preloader/Preloader";

const User = (props) => {
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
