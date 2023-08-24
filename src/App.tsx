import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import LoginContainer from "./components/Login/LoginContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import MyPostsContainer from "./components/MyPosts/MyPostsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import NewsContainer from "./components/News/NewsContainer";
import ProfileContainer from "./components/Users/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/appReducer";
import { AppStateType } from "./redux/redux-store";
import ChatPage from "./pages/Chat/ChatPage";

type MapPropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.init) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <NavbarContainer state={this.props.state} />
          <div className="Content">
            <div className="Wrapper">
              <Routes>
                <Route path="/posts" element={<MyPostsContainer state={this.props.state} />} />
                <Route
                  path="/messages/*"
                  element={<MessagesContainer state={this.props.state} />}
                />
                <Route path="/news" element={<NewsContainer state={this.props.state} />} />
                <Route path="/users" element={<UsersContainer state={this.props.state} />} />
                <Route
                  path="/users/:userId"
                  element={<ProfileContainer state={this.props.state} />}
                />
                <Route path="/login" element={<LoginContainer state={this.props.state} />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  init: state.app.init,
  state,
});

export default compose(connect(mapStateToProps, { initializeApp })(App));
