import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { follow, getUsers, unfollow } from "../../redux/usersReducer";
import { UserType } from "../../types/types";
import Users from "./Users";

interface MapStateToPropsType {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  page: number;
  isFetching: number[];
  isFetchingUsersPage: boolean;
  term: string;
  friend: boolean | null;
}

interface MapDispatchToPropsType {
  getUsers: (page: number, pageSize: number, term: string, friend: null | boolean) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
}

interface OwnPropsType {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersAPIComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.page, this.props.pageSize, "", null);
  }

  setCurrentPage = (page: number = 1, term: string = "", friend: boolean | null = null) => {
    this.props.getUsers(page, this.props.pageSize, term, friend);
  };

  render() {
    return (
      <Users
        users={this.props.users}
        setCurrentPage={this.setCurrentPage}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        page={this.props.page}
        isFetching={this.props.isFetching}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        isFetchingUsersPage={this.props.isFetchingUsersPage}
        term={this.props.term}
        friend={this.props.friend}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: state.users.users,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    page: state.users.page,
    isFetching: state.users.isFetching,
    isFetchingUsersPage: state.users.isFetchingUsersPage,
    term: state.users.term,
    friend: state.users.friend,
  };
};

export default compose<any>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      getUsers,
      follow,
      unfollow,
    }
  )
)(UsersAPIComponent);
