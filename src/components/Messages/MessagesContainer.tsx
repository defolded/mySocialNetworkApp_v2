import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from "../../redux/messagesReducer";
import Messages from "./Messages";

export default compose<any>(connect(null, { addMessage: actions.addMessage }))(Messages);
