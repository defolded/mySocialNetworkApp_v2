import React from "react";
import "./App.css";
import MessagesContainer from "./components/Messages/MessagesContainer";
import MyPostsContainer from "./components/MyPosts/MyPostsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import LoginContainer from "./components/Login/LoginContainer";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import ProfileContainer from "./components/Users/Profile/ProfileContainer";
import NewsContainer from "./components/News/NewsContainer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
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
          <NavbarContainer store={this.props.store} />
          <div className="Content">
            <div className="Wrapper">
              <Routes>
                <Route
                  path="/posts"
                  element={<MyPostsContainer store={this.props.store} />}
                />
                <Route
                  path="/messages/*"
                  element={<MessagesContainer store={this.props.store} />}
                />
                <Route
                  path="/news"
                  element={<NewsContainer store={this.props.store} />}
                />
                <Route
                  path="/users"
                  element={<UsersContainer store={this.props.store} />}
                />
                <Route
                  path="/users/:userId"
                  element={<ProfileContainer store={this.props.store} />}
                />
                <Route
                  path="/login"
                  element={<LoginContainer store={this.props.store} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  init: state.app.init,
});

export default compose(connect(mapStateToProps, { initializeApp })(App));
