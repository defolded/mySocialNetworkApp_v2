const ADD_MESSAGE = "ADD-MESSAGE";

interface DialogType {
  id: number
  name: string
}

interface MessageType {
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

const messagesReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE: {
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

interface AddMessageActionType {
  type: typeof ADD_MESSAGE
  text: string
}

export const addMessage = (text: string):AddMessageActionType => ({ type: ADD_MESSAGE, text });

export default messagesReducer;
