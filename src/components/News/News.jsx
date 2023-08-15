import React from "react";
import NewsEntry from "./NewsEntry";
import Preloader from "../common/Preloader/Preloader";

const News = (props) => {
  if (props.state.isFetching) {
    return <Preloader />;
  }

  return (
    <div>
      {props.state.articles.map((newEntry) => {
        return (
          <NewsEntry
            urlToImage={newEntry.urlToImage}
            title={newEntry.title}
            author={newEntry.author}
            description={newEntry.description}
            url={newEntry.url}
          />
        );
      })}
    </div>
  );
};

export default News;
