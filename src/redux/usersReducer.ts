import { usersAPI } from "../api/usersApi";
import { UserType } from "../types/types";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

let initialState = {
  users: [] as UserType[],
  pageSize: 32 as number,
  totalUsersCount: 0 as number,
  page: 1 as number,
  isFetching: [] as number[],
  isFetchingUsersPage: false as boolean,
  term: "" as string,
  friend: null as boolean | null,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW-USER":
      return {
        ...state,
        users: state.users.map((m) => {
          if (m.id === action.userId) {
            return { ...m, isFollowed: true };
          }
          return m;
        }),
      };
    case "SN/USERS/UNFOLLOW-USER":
      return {
        ...state,
        users: state.users.map((m) => {
          if (m.id === action.userId) {
            return { ...m, isFollowed: false };
          }
          return m;
        }),
      };
    case "SN/USERS/SET-USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SN/USERS/SET-CURRENT-PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SN/USERS/SET-TOTAL-USERS-COUNT":
      return {
        ...state,
        totalUsersCount: action.usersCount,
      };
    case "SN/USERS/TOGGLE-ISFETCHING":
      return {
        ...state,
        isFetching: action.status
          ? [...state.isFetching, action.userId]
          : state.isFetching.filter((id) => id !== action.userId),
      };
    case "SN/USERS/TOGGLE-ISFETCHING-USERS-PAGE":
      return {
        ...state,
        isFetchingUsersPage: action.state,
      };
    case "SN/USERS/SET-USER-SEARCH":
      return {
        ...state,
        term: action.term,
        friend: action.friend,
      };
    default:
      return state;
  }
};

export const actions = {
  followUser: (userId: number) =>
    ({
      type: "SN/USERS/FOLLOW-USER",
      userId,
    } as const),

  unfollowUser: (userId: number) =>
    ({
      type: "SN/USERS/UNFOLLOW-USER",
      userId,
    } as const),

  setUsers: (users: UserType[]) =>
    ({
      type: "SN/USERS/SET-USERS",
      users,
    } as const),

  setCurrentPage: (page: number) =>
    ({
      type: "SN/USERS/SET-CURRENT-PAGE",
      page,
    } as const),

  setTotalUsersCount: (usersCount: number) =>
    ({
      type: "SN/USERS/SET-TOTAL-USERS-COUNT",
      usersCount,
    } as const),

  toggleIsFetching: (userId: number, status: boolean) =>
    ({
      type: "SN/USERS/TOGGLE-ISFETCHING",
      userId,
      status,
    } as const),

  toggleIsFetchingUsersPage: (state: boolean) =>
    ({
      type: "SN/USERS/TOGGLE-ISFETCHING-USERS-PAGE",
      state,
    } as const),

  setUserSearch: (term: string, friend: boolean | null) =>
    ({
      type: "SN/USERS/SET-USER-SEARCH",
      term,
      friend,
    } as const),
};

export const getUsers =
  (
    page: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ): ThunkTypeProto<ActionsTypes> =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetchingUsersPage(true));
    dispatch(actions.setCurrentPage(page));
    let res = await usersAPI.getUsers(page, pageSize, term, friend);
    dispatch(actions.setUserSearch(term, friend));
    dispatch(actions.setUsers(res.items));
    dispatch(actions.setTotalUsersCount(res.totalCount));
    dispatch(actions.toggleIsFetchingUsersPage(false));
  };

export const follow =
  (userId: number): ThunkTypeProto<ActionsTypes> =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(userId, true));
    let res = await usersAPI.follow(userId);
    if (res.data.resultCode === 0) {
      dispatch(actions.followUser(userId));
    }
    dispatch(actions.toggleIsFetching(userId, false));
  };

export const unfollow =
  (userId: number): ThunkTypeProto<ActionsTypes> =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(userId, true));
    let res = await usersAPI.unfollow(userId);
    if (res.data.resultCode === 0) {
      dispatch(actions.unfollowUser(userId));
    }
    dispatch(actions.toggleIsFetching(userId, false));
  };

export default usersReducer;
