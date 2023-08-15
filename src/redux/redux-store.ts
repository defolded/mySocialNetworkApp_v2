import { applyMiddleware, combineReducers, createStore } from "redux";
import postsReducer from "./postsReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
import newsReducer from "./newsReducer";

let reducers = combineReducers({
  posts: postsReducer,
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  news: newsReducer,
  form: formReducer,
});

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.state = store;

export default store;
