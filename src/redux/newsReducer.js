import { newsApi } from "../api/newsApi";

const GET_ARTICLES = "GET-ARTICLES";
const TOGGLE_ISFETCHING = "TOGGLE-ISFETCHING";

let initialState = {
  articles: [],
  isFetching: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case TOGGLE_ISFETCHING:
      return {
        ...state,
        isFetching: action.state,
      };
    default:
      return state;
  }
};

export const getArticlesSuccess = (articles) => ({
  type: GET_ARTICLES,
  articles,
});

export const toggleIsFetching = (state) => ({
  type: TOGGLE_ISFETCHING,
  state,
});

export const getArticles = () => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let res = await newsApi.getTopHeadlinesForUS();
  if (res.status === 200) {
    dispatch(getArticlesSuccess(res.data.articles));
    dispatch(toggleIsFetching(false));
  }
};

export default newsReducer;
