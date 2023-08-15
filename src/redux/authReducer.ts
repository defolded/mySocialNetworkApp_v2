import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptchaEnum, authAPI, profileAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA_URL = "GET-CAPTCHA-URL";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case GET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.url,
      };
    default:
      return state;
  }
};

interface SetAuthUserDataPayloadType {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

interface SetAuthUserDataType {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

interface GetCaptchaUrlSuccessType {
  type: typeof GET_CAPTCHA_URL
  url: string | null
}

export const getCaptchaUrlSuccess = (url: string | null):GetCaptchaUrlSuccessType => ({ type: GET_CAPTCHA_URL, url });

export const getAuthUserData = () => async (dispatch: any) => {
  let res = await authAPI.getAuthUserData();
  if (res.resultCode === ResultCodeEnum.SuccesResultCode) {
    let { id, login, email } = res.data;
    res = await profileAPI.getProfile(id);
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.data.resultCode === ResultCodeEnum.SuccesResultCode) {
      dispatch(getAuthUserData());
      dispatch(getCaptchaUrlSuccess(null));
    } else {
      if (res.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      dispatch(
        stopSubmit("login", {
          _error:
            res.data.messages.length > 0
              ? res.data.messages[0]
              : "Something went wrong. Try again",
        })
      );
    }
  };

export const getCaptchaUrl = () => async (dispatch: any) => {
  let res = await securityAPI.getCaptcha();
  dispatch(getCaptchaUrlSuccess(res.data.url));
};

export const logout = () => async (dispatch: any) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
