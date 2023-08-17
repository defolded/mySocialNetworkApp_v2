import { InferActionsTypes } from "./redux-store";

export interface DialogType {
  id: number
  name: string
}

export interface MessageType {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Davos" },
    { id: 2, name: "Tommen" },
    { id: 3, name: "Doran" },
    { id: 4, name: "TestTestTest" },
  ] as DialogType[],

  messages: [
    { id: 1, message: "Otdai kingdom" },
    { id: 2, message: "Ne dam" },
    { id: 3, message: "Dai" },
    { id: 4, message: "Ne" },
  ] as MessageType[],
};

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>

const messagesReducer = (state = initialState, action: ActionTypes):InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/ADD-MESSAGE": {
      let newMessage = {
        id: state.messages[state.messages.length - 1].id + 1,
        message: action.text,
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addMessage: (text: string) => ({ type: 'SN/MESSAGES/ADD-MESSAGE', text } as const),
}

export default messagesReducer;
