import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import userPhoto from "../../assets/profile-picture.jpg";
import { AppStateType } from "../../redux/redux-store";
import { GetUsersDataType } from "../../types/types";
import Paginator from "./Paginator";
import User from "./User";
import styles from "./Users.module.css";
import b from "../.././Button.module.css";

interface PropsType {
  page: number;
  totalUsersCount: number;
  pageSize: number;
  users: GetUsersDataType[];
  isFetching: number[];
  isFetchingUsersPage: boolean;
  term: string;
  friend: boolean | null;

  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setCurrentPage: (
    page: number,
    term: string,
    friend: boolean | null,
    statusCheck: boolean,
    avatarCheck: boolean
  ) => void;
}

const Users: React.FC<PropsType> = (props) => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);

  let statusCheck = useSelector((state: AppStateType) => state.users.statusCheck);
  let avatarCheck = useSelector((state: AppStateType) => state.users.avatarCheck);

  useEffect(() => {
    let actualPage = props.page;
    let actualTerm = props.term;
    let actualFriend = props.friend;
    let parsed = Object.fromEntries([...searchParams]);

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) {
      if (/^[a-zA-Z0-9\s]*$/.test(parsed.term)) actualTerm = parsed.term;
    }
    if (!!parsed.friend) {
      switch (parsed.friend) {
        case "null":
          actualFriend = null;
          break;
        case "true":
          actualFriend = true;
          break;
        case "false":
          actualFriend = false;
          break;
        default:
          actualFriend = null;
          break;
      }
    }

    props.setCurrentPage(actualPage, actualTerm, actualFriend, statusCheck, avatarCheck);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?term=${props.term}&friend=${props.friend}&page=${props.page}`, { relative: "path" });
  }, [props.term, props.friend, props.page]);

  const followUser = (userId: number) => {
    props.follow(userId);
  };

  const unfollowUser = (userId: number) => {
    props.unfollow(userId);
  };

  return (
    <div>
      <div className={styles.search}>
        <SearchForm
          term={props.term}
          friend={props.friend}
          page={props.page}
          setCurrentPage={props.setCurrentPage}
          statusCheck={statusCheck}
          avatarCheck={avatarCheck}
        />
      </div>

      <Paginator
        page={props.page}
        setCurrentPage={props.setCurrentPage}
        statusCheck={statusCheck}
        avatarCheck={avatarCheck}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        term={props.term}
        friend={props.friend}
      />

      <div className={styles.container}>
        {props.users.map((user) => (
          <User
            profilePicture={user.photos.small === null ? userPhoto : user.photos.small}
            username={user.name}
            isFollowed={user.followed}
            message={user.status}
            followUser={followUser}
            unfollowUser={unfollowUser}
            userId={user.id}
            isFetching={props.isFetching}
            key={crypto.randomUUID()}
            isFetchingUsersPage={props.isFetchingUsersPage}
          />
        ))}
      </div>
    </div>
  );
};

type FormInputs = {
  term: string;
  friend: boolean | null;
  statusCheck: boolean;
  avatarCheck: boolean;
};

interface SearchFormOwnPropsType {
  term: string;
  friend: boolean | null;

  page: number;
  statusCheck: boolean;
  avatarCheck: boolean;
  setCurrentPage: (
    page: number,
    term: string,
    friend: boolean | null,
    statusCheck: boolean,
    avatarCheck: boolean
  ) => void;
}

interface DataType {
  term: string;
  friend: boolean | null;

  statusCheck: boolean;
  avatarCheck: boolean;
}

const SearchForm: React.FC<SearchFormOwnPropsType> = (props) => {
  let values = {
    term: props.term,
    friend: props.friend,
    statusCheck: props.statusCheck,
    avatarCheck: props.avatarCheck,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    values,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data: DataType) => {
    props.setCurrentPage(1, data.term, data.friend, data.statusCheck, data.avatarCheck);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <input placeholder="Type name" {...register("term", { pattern: /^[A-Za-z0-9]+$/i })} />
      {errors.term && (
        <span style={{ color: "#D10000", fontWeight: "bold" }}>Incorrect symbols.</span>
      )}
      <input type="checkbox" {...register("friend")} /> Following
      <input type="checkbox" {...register("statusCheck")} /> Status
      <input type="checkbox" {...register("avatarCheck")} /> Avatar
      <input type="submit" value="search" />
      <input
        type="submit"
        value="reset"
        onClick={() => {
          reset({
            term: "",
            friend: null,
            statusCheck: false,
            avatarCheck: false,
          });
        }}
      />
    </form>
  );
};

export default Users;
