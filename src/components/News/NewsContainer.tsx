import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ArticlesResponseType, getArticles } from "../../redux/newsReducer";
import { AppStateType } from "../../redux/redux-store";
import News from "./News";

interface PropsType {
  isFetching: boolean
  articles: ArticlesResponseType[]

  getArticles: () => {}
}

const NewsContainer:React.FC<PropsType> = (props) => {
  useEffect(() => {
    props.getArticles();
  }, []);

  return (
    <div>
      <News isFetching={props.isFetching} articles={props.articles} />
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    isFetching: state.news.isFetching,
    articles: state.news.articles,
  };
};

export default compose<any>(connect(mapStateToProps, { getArticles }))(
  NewsContainer
);
