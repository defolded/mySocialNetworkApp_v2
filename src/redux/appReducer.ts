import { getAuthUserData } from "./authReducer";

const SET_INIT = "SET-INIT";

interface InitialStateType {
  init: boolean
}

let initialState:InitialStateType = {
  init: false,
};

const appReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        init: true,
      };
    default:
      return state;
  }
};

interface InitSuccessActionType {
  type: typeof SET_INIT
}

export const initSuccess = ():InitSuccessActionType => ({ type: SET_INIT });

export const initializeApp = () => async (dispatch: any) => {
  await dispatch(getAuthUserData());
  dispatch(initSuccess());
};

export default appReducer;
