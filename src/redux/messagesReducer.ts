import { Dispatch } from "redux";
import { ChatMessageApiType, StatusType, messagesApi } from "../api/messagesApi";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";
import { v1 } from "uuid";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export type ChatMessageType = ChatMessageApiType & { id: string };

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;

const messagesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/SET-MESSAGES": {
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    }
    case "SN/MESSAGES/STATUS-CHANGED": {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addMessages: (messages: ChatMessageApiType[]) =>
    ({ type: "SN/MESSAGES/SET-MESSAGES", payload: { messages } } as const),
  statusChanged: (status: StatusType) => ({ type: "SN/MESSAGES/STATUS-CHANGED", status } as const),
};

let _newStatusHandler: ((status: StatusType) => void) | null = null;

const newStatusHandler = (dispatch: Dispatch) => {
  if (_newStatusHandler === null) {
    _newStatusHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _newMessageHandler;
};

let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null;

const newMessageHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.addMessages(messages));
    };
  }

  return _newMessageHandler;
};

export const subscribeMessages = (): ThunkTypeProto<ActionTypes> => async (dispatch) => {
  messagesApi.start();
  messagesApi.subscribeOnNewMessages("messages-received", newMessageHandler(dispatch));
  messagesApi.subscribeOnNewMessages("status-received", newMessageHandler(dispatch));
};

export const unsubscribeMessages = (): ThunkTypeProto<ActionTypes> => async (dispatch) => {
  messagesApi.unsubscribe("messages-received", newMessageHandler(dispatch));
  messagesApi.unsubscribe("status-received", newMessageHandler(dispatch));
  messagesApi.stop();
};

export const sendMessage =
  (message: string): ThunkTypeProto<ActionTypes> =>
  async (dispatch) => {
    messagesApi.sendMessage(message);
  };

export default messagesReducer;
