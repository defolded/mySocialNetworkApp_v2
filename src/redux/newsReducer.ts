import { newsApi } from "../api/newsApi";
import { InferActionsTypes, ThunkTypeProto } from "./redux-store";

export interface ArticlesResponseType {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

let initialState = {
  articles: [] as ArticlesResponseType[],
  isFetching: false,
};

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>

const newsReducer = (state = initialState, action: ActionTypes):InitialStateType => {
  switch (action.type) {
    case "SN/NEWS/GET-ARTICLES":
      return {
        ...state,
        articles: action.articles,
      };
    case "TOGGLE-ISFETCHING":
      return {
        ...state,
        isFetching: action.state,
      };
    default:
      return state;
  }
};

export const actions = {
  getArticlesSuccess: (articles: ArticlesResponseType[]) => ({ type: 'SN/NEWS/GET-ARTICLES', articles } as const),
  toggleIsFetching: (state: boolean) => ({ type: 'TOGGLE-ISFETCHING', state } as const),
}

export const getArticles = ():ThunkTypeProto<ActionTypes> => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  let res = await newsApi.getTopHeadlinesForUS();
  if (res.status === 200) {
    dispatch(actions.getArticlesSuccess(res.data.articles));
    dispatch(actions.toggleIsFetching(false));
  }
};

export default newsReducer;
