import { messagesAPI } from "../api/messagesApi";
import { GetUsersDataType } from "../types/types";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

export interface MessageType {
  addedAt: string
  body: string
  id: string
  recipientId: number
  senderId: number
  senderName: string
  translatedBody: any
  viewed: boolean
}

let initialState = {
  dialogs: [] as GetUsersDataType[],
  messages: [] as MessageType[],
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;

const messagesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/SET-DIALOGS-SUCCESS":
      return {
        ...state,
        dialogs: action.users
      };
    case "SN/MESSAGES/SET-MESSAGES-SUCCESS":
      return {
        ...state,
        messages: action.messages
      };
    default:
      return state;
  }
};

export const actions = {
  setDialogUsersSuccess: (users: GetUsersDataType[]) => ({ type: "SN/MESSAGES/SET-DIALOGS-SUCCESS", users } as const),
  setMessagesSuccess: (messages: any[]) => ({ type: "SN/MESSAGES/SET-MESSAGES-SUCCESS", messages } as const),
};

export const setDialogUsers = (): ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let users = await messagesAPI.getUsers();
  dispatch(actions.setDialogUsersSuccess(users));
}

export const setUserMessages = (userId: number): ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let messages = await messagesAPI.getMessages(userId);
  dispatch(actions.setMessagesSuccess(messages));
}

export const sendMessage = (userId: number, message: string): ThunkTypeProto<ActionTypes> => async (dispatch) => {
  let res = await messagesAPI.sendMessage(userId, message);
  dispatch(setUserMessages(userId));
}

export default messagesReducer;
