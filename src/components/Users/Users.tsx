import React from "react";
import userPhoto from "../../assets/profile-picture.jpg";
import { UserType } from "../../types/types";
import Paginator from "./Paginator";
import User from "./User";
import styles from "./Users.module.css";

interface PropsType {
  page: number
  totalUsersCount: number
  pageSize: number
  users: UserType[]
  isFetching: number[]
  isFetchingUsersPage: boolean
  
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (arg0: number) => void
}

const Users:React.FC<PropsType> = (props) => {
  const followUser = (userId: number) => {
    props.follow(userId);
  };

  const unfollowUser = (userId: number) => {
    props.unfollow(userId);
  };

  return (
    <div>
      <Paginator
        page={props.page}
        setCurrentPage={props.setCurrentPage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />

      <div className={styles.container}>
        {props.users.map((user) => (
          <User
            profilePicture={
              user.profilePicture
                ? user.profilePicture
                : user.photos.small === null
                ? userPhoto
                : user.photos.small
            }
            username={user.username ? user.username : user.name}
            isFollowed={user.isFollowed ? user.isFollowed : user.followed}
            message={user.message ? user.message : user.status}
            followUser={followUser}
            unfollowUser={unfollowUser}
            userId={user.id}
            isFetching={props.isFetching}
            key={user.id}
            isFetchingUsersPage={props.isFetchingUsersPage}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
