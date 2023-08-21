import React from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { AppStateType } from "../../redux/redux-store";
import { compose } from "redux";

class LoginContainer extends React.Component {
  render() {
    return <Login {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    state: state.auth,
  };
};

export default compose<any>(
  connect(mapStateToProps, {
    login,
  })
)(LoginContainer);
