import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../redux/authReducer";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

interface PropsType {
  userId: number;
  login: string;
  isAuth: boolean;

  logout: () => void;
}

class NavbarContainer extends React.Component<PropsType> {
  render() {
    return (
      <Navbar
        isAuth={this.props.isAuth}
        login={this.props.login}
        logout={this.props.logout}
        userId={this.props.userId}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default compose<any>(connect(mapStateToProps, { getAuthUserData, logout }))(NavbarContainer);
