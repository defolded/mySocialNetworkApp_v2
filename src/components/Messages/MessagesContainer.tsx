import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from "../../redux/messagesReducer";
import { AppStateType } from "../../redux/redux-store";
import Messages from "./Messages";

let mapStateToProps = (state: AppStateType) => {
  return {
    messages: state.messages.messages,
    dialogs: state.messages.dialogs,
    isAuth: state.auth.isAuth,
  };
};

export default compose<any>(
  connect(mapStateToProps, { addMessage: actions.addMessage })
)(Messages);
