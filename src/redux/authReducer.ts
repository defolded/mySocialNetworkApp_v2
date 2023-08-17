import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { authAPI } from "../api/authApi";
import { securityAPI } from "../api/securityApi";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionTypes):InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET-USER-DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "SN/AUTH/GET-CAPTCHA-URL":
      return {
        ...state,
        captchaUrl: action.url,
      };
    default:
      return state;
  }
};


const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: "SN/AUTH/SET-USER-DATA",
    payload: { userId, email, login, isAuth }} as const),
  getCaptchaUrlSuccess: (url: string | null) => ({ type: "SN/AUTH/GET-CAPTCHA-URL", url } as const),
}

export const getAuthUserData = ():ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let res = await authAPI.getAuthUserData();
  if (res.resultCode === ResultCodeEnum.SuccesResultCode) {
    let { id, login, email } = res.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | null):ThunkTypeProto<ActionTypes> => async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.data.resultCode === ResultCodeEnum.SuccesResultCode) {
      dispatch(getAuthUserData());
      dispatch(actions.getCaptchaUrlSuccess(null));
    } else {
      if (res.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
    }
  };

export const getCaptchaUrl = ():ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let res = await securityAPI.getCaptcha();
  dispatch(actions.getCaptchaUrlSuccess(res.data.url));
};

export const logout = ():ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
