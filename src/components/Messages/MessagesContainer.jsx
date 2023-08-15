import Messages from "./Messages";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { addMessage } from "../../redux/messagesReducer";

let mapStateToProps = (state) => {
  return {
    state: state.messages,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, { addMessage }),
  withAuthRedirect
)(Messages);
