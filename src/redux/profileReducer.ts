import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileApi";
import { PhotosType, ProfileType } from "../types/types";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

let initialState = {
  profile: null as ProfileType | null,
  status: null as string | null,
  isFetching: false as boolean,
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/SET-PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SN/PROFILE/SET-STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SN/PROFILE/UPLOAD-PHOTO":
      return {
        ...state,
        // @ts-ignore
        profile: { ...state.profile, photos: action.photo },
      };
    case "SN/PROFILE/TOGGLE-FETCHING":
      return {
        ...state,
        isFetching: action.state,
      };
    default:
      return state;
  }
};

const actions = {
  setProfile: (profile: ProfileType) => ({ type: "SN/PROFILE/SET-PROFILE", profile } as const),
  setStatus: (status: string) => ({ type: "SN/PROFILE/SET-STATUS", status } as const),
  uploadPhotoSuccess: (photo: PhotosType) => ({ type: "SN/PROFILE/UPLOAD-PHOTO", photo } as const),
  sendProfileSuccess: () => ({ type: "SN/PROFILE/SEND-PROFILE" } as const),
  toggleIsFetchingSuccess: (state: boolean) =>
    ({ type: "SN/PROFILE/TOGGLE-FETCHING", state } as const),
};

export const getProfile =
  (profileId: number): ThunkTypeProto<ActionTypes> =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetchingSuccess(true));
    let res = await profileAPI.getProfile(profileId);
    dispatch(actions.setProfile(res));
    dispatch(actions.toggleIsFetchingSuccess(false));
  };

export const getUserStatus =
  (profileId: number): ThunkTypeProto<ActionTypes> =>
  async (dispatch) => {
    let res = await profileAPI.getStatus(profileId);
    dispatch(actions.setStatus(res.data));
  };

export const setUserStatus =
  (status: string): ThunkTypeProto<ActionTypes> =>
  async (dispatch) => {
    let res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };

export const uploadPhoto =
  (photo: PhotosType): ThunkTypeProto<ActionTypes> =>
  async (dispatch) => {
    let res = await profileAPI.uploadPhoto(photo);
    if (res.data.resultCode === 0) {
      dispatch(actions.uploadPhotoSuccess(res.data.data.photos));
    }
  };

export const sendProfile =
  (profile: ProfileType): ThunkTypeProto<ActionTypes> =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;

    let res = await profileAPI.sendProfile(profile);
    if (res.data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(
        stopSubmit("edit-profile", {
          _error:
            res.data.messages.length > 0 ? res.data.messages[0] : "Something went wrong. Try again",
        })
      );
      return Promise.reject(res.data.messages[0]);
    }
  };

export default usersReducer;
