import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, ProfileType } from "../types/types";

const SET_PROFILE = "SET-PROFILE";
const SET_STATUS = "SET-STATUS";
const UPLOAD_PHOTO = "UPLOAD-PHOTO";
const SEND_PROFILE = "SEND-PROFILE";
const TOGGLE_FETCHING = "TOGGLE-FETCHING";

let initialState = {
  profile: null as ProfileType | null,
  status: null as string | null,
  isFetching: false as boolean,
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case UPLOAD_PHOTO:
      return {
        ...state,
        // @ts-ignore
        profile: { ...state.profile, photos: action.photo},
      };
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.state,
      };
    default:
      return state;
  }
};

interface SetProfileType {
  type: typeof SET_PROFILE
  profile: ProfileType
}

export const setProfile = (profile: ProfileType):SetProfileType => ({
  type: SET_PROFILE,
  profile,
});

interface SetStatusType {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status: string):SetStatusType => ({
  type: SET_STATUS,
  status,
});

interface UploadPhotoSuccessType {
  type: typeof UPLOAD_PHOTO
  photo: PhotosType
}

export const uploadPhotoSuccess = (photo: PhotosType):UploadPhotoSuccessType => ({
  type: UPLOAD_PHOTO,
  photo,
});

interface SendProfileSuccessType {
  type: typeof SEND_PROFILE
}

export const sendProfileSuccess = ():SendProfileSuccessType => ({ type: SEND_PROFILE });

interface ToggleIsFetchingSuccessType {
  type: typeof TOGGLE_FETCHING
  state: boolean
}

export const toggleIsFetchingSuccess = (state: boolean):ToggleIsFetchingSuccessType => ({
  type: TOGGLE_FETCHING,
  state,
});

export const getProfile = (profileId: number) => async (dispatch: any) => {
  dispatch(toggleIsFetchingSuccess(true));
  let res = await profileAPI.getProfile(profileId);
  dispatch(setProfile(res));
  dispatch(toggleIsFetchingSuccess(false));
};

export const getUserStatus = (profileId: number) => async (dispatch: any) => {
  let res = await profileAPI.getStatus(profileId);
  dispatch(setStatus(res.data));
};

export const setUserStatus = (status: string) => async (dispatch: any) => {
  let res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const uploadPhoto = (photo: PhotosType) => async (dispatch: any) => {
  let res = await profileAPI.uploadPhoto(photo);
  if (res.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(res.data.data.photos));
  }
};

export const sendProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;

  let res = await profileAPI.sendProfile(profile);
  if (res.data.resultCode === 0) {
    dispatch(getProfile(userId));
  } 
  else {
    dispatch(
      stopSubmit("edit-profile", {
        _error:
          res.data.messages.length > 0
            ? res.data.messages[0]
            : "Something went wrong. Try again",
      })
    );
    return Promise.reject(res.data.messages[0]);
  }
};

export default usersReducer;
