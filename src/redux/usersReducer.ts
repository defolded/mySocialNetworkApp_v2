import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const FOLLOW_USER = "FOLLOW-USER";
const UNFOLLOW_USER = "UNFOLLOW-USER";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_ISFETCHING = "TOGGLE-ISFETCHING";
const TOGGLE_ISFETCHING_USERS_PAGE = "TOGGLE-ISFETCHING-USERS-PAGE";

let initialState = {
  users: [] as UserType[],
  pageSize: 32 as number,
  totalUsersCount: 0 as number,
  page: 1 as number,
  isFetching: [] as number[],
  isFetchingUsersPage: false as boolean,
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        users: state.users.map((m) => {
          if (m.id === action.userId) {
            return { ...m, isFollowed: true };
          }
          return m;
        }),
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        users: state.users.map((m) => {
          if (m.id === action.userId) {
            return { ...m, isFollowed: false };
          }
          return m;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.usersCount,
      };
    case TOGGLE_ISFETCHING:
      return {
        ...state,
        isFetching: action.status
          ? [...state.isFetching, action.userId]
          : state.isFetching.filter((id) => id !== action.userId),
      };
    case TOGGLE_ISFETCHING_USERS_PAGE:
      return {
        ...state,
        isFetchingUsersPage: action.state,
      };
    default:
      return state;
  }
};

type ActionsTypes = FollowUserActionType | UnfollowUserActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleIsFetchingUsersPageActionType

interface FollowUserActionType {
  type: typeof FOLLOW_USER
  userId: number
}

export const followUser = (userId: number):FollowUserActionType => ({
  type: FOLLOW_USER,
  userId,
});

interface UnfollowUserActionType {
  type: typeof UNFOLLOW_USER
  userId: number
}

export const unfollowUser = (userId: number):UnfollowUserActionType => ({
  type: UNFOLLOW_USER,
  userId,
});

interface SetUsersActionType {
  type: typeof SET_USERS
  users: UserType[]
}

export const setUsers = (users: UserType[]):SetUsersActionType => ({
  type: SET_USERS,
  users,
});

interface SetCurrentPageActionType {
  type: typeof SET_CURRENT_PAGE
  page: number  
}

export const setCurrentPage = (page: number):SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  page,
});

interface SetTotalUsersCountActionType {
  type: typeof SET_TOTAL_USERS_COUNT
  usersCount: number
}

export const setTotalUsersCount = (usersCount: number):SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  usersCount,
});

interface ToggleIsFetchingActionType {
  type: typeof TOGGLE_ISFETCHING
  userId: number
  status: boolean
}

export const toggleIsFetching = (userId: number, status: boolean):ToggleIsFetchingActionType => ({
  type: TOGGLE_ISFETCHING,
  userId,
  status,
});

interface ToggleIsFetchingUsersPageActionType {
  type: typeof TOGGLE_ISFETCHING_USERS_PAGE
  state: boolean
}

export const toggleIsFetchingUsersPage = (state: boolean):ToggleIsFetchingUsersPageActionType => ({
  type: TOGGLE_ISFETCHING_USERS_PAGE,
  state,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (page: number, pageSize: number):ThunkType => 
  async (dispatch) => {
    dispatch(toggleIsFetchingUsersPage(true));
    dispatch(setCurrentPage(page));
    let res = await usersAPI.getUsers(page, pageSize);
    dispatch(setUsers(res.items));
    dispatch(setTotalUsersCount(res.totalCount));
    dispatch(toggleIsFetchingUsersPage(false));
};

export const follow = (userId: number):ThunkType => async (dispatch) => {
  dispatch(toggleIsFetching(userId, true));
  let res = await usersAPI.follow(userId);
  if (res.data.resultCode === 0) {
    dispatch(followUser(userId));
  }
  dispatch(toggleIsFetching(userId, false));
};

export const unfollow = (userId: number):ThunkType => async (dispatch) => {
  dispatch(toggleIsFetching(userId, true));
  let res = await usersAPI.unfollow(userId);
  if (res.data.resultCode === 0) {
    dispatch(unfollowUser(userId));
  }
  dispatch(toggleIsFetching(userId, false));
};

export default usersReducer;
