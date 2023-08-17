import { getAuthUserData } from "./authReducer";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

let initialState = {
  init: false,
};

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionTypes):InitialStateType => {
  switch (action.type) {
    case "SN/APP/SET-INIT":
      return {
        ...state,
        init: true,
      };
    default:
      return state;
  }
};

export const actions = {
  initSuccess: () => ({ type: "SN/APP/SET-INIT" } as const),
}

export const initializeApp = ():ThunkTypeProto<ActionTypes> => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(actions.initSuccess());
};

export default appReducer;
