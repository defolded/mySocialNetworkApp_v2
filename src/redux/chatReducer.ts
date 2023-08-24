import { Dispatch } from "redux";
import { ChatMessageType, StatusType, chatApi } from "../api/chatApi";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES-RECIEVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload].filter((m, index, array) => index >= array.length - 100),
            };
        case "SN/CHAT/STATUS-CHANGED":
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
};

const actions = {
    messagesRecived: (messages: ChatMessageType[]) => ({ type: "SN/CHAT/MESSAGES-RECIEVED", payload: messages } as const),
    statusChanged: (status: StatusType) => ({ type: "SN/CHAT/STATUS-CHANGED", payload: status } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesRecived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkTypeProto<ActionTypes> => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('message-recieved', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkTypeProto<ActionTypes> => async (dispatch) => {
    chatApi.unsubscribe('status-changed', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('message-recieved', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
};

export const sendMessage = (message: string): ThunkTypeProto<ActionTypes> => async (dispatch) => {
    chatApi.sendMessage(message)
};

export default chatReducer;
