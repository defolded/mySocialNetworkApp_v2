import React from "react";
import userPhoto from "../../assets/profile-picture.jpg";
import { UserType } from "../../types/types";
import Paginator from "./Paginator";
import User from "./User";
import styles from "./Users.module.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface PropsType {
  page: number;
  totalUsersCount: number;
  pageSize: number;
  users: UserType[];
  isFetching: number[];
  isFetchingUsersPage: boolean;
  term: string;
  friend: boolean | null;

  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setCurrentPage: (page: number, term: string, friend: boolean | null) => void;
}

const Users: React.FC<PropsType> = (props) => {
  const followUser = (userId: number) => {
    props.follow(userId);
  };

  const unfollowUser = (userId: number) => {
    props.unfollow(userId);
  };

  return (
    <div>
      <div className={styles.search}>
        <SearchForm page={props.page} setCurrentPage={props.setCurrentPage} />
      </div>

      <Paginator
        page={props.page}
        setCurrentPage={props.setCurrentPage}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        term={props.term}
        friend={props.friend}
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

type FormInputs = {
  term: string;
  friend: boolean;
};

interface SearchFormOwnPropsType {
  page: number;
  setCurrentPage: (page: number, term: string, friend: boolean | null) => void;
}

const SearchForm: React.FC<SearchFormOwnPropsType> = (props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: any) =>
    props.setCurrentPage(1, data.term, data.friend);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <input placeholder="Type name" {...register("term")} />
      <input type="checkbox" {...register("friend")} /> Following
      <input type="submit" />
      <input
        type="submit"
        value="reset"
        onClick={() => {
          reset();
        }}
      />
    </form>
  );
};

export default Users;
