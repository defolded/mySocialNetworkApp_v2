import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import News from "./News";
import { getArticles } from "../../redux/newsReducer";

const NewsContainer = (props) => {
  useEffect(() => {
    props.getArticles();
  }, []);

  return (
    <div>
      <News state={props.state} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    state: state.news,
  };
};

export default compose(connect(mapStateToProps, { getArticles }))(
  NewsContainer
);
