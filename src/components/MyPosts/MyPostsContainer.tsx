import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from "../../redux/postsReducer";
import MyPosts from "./MyPosts";

export default compose<any>(connect(null, { addPost: actions.addPost }))(MyPosts);
