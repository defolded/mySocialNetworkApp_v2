import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import newsReducer from "./newsReducer";
import postsReducer from "./postsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

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

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type ThunkTypeProto<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.state = store;

export default store;
