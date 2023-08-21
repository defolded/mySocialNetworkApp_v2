import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import MyPosts from "./MyPosts";
import { actions } from "../../redux/postsReducer";

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.posts.posts,
    isAuth: state.auth.isAuth,
  };
};

export default compose<any>(connect(mapStateToProps, { addPost: actions.addPost }))(MyPosts);
