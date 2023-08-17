import React from "react";
import NewsEntry from "./NewsEntry";
import Preloader from "../common/Preloader/Preloader";
import { ArticlesResponseType } from "../../redux/newsReducer";

interface PropsType {
  isFetching: boolean
  articles: ArticlesResponseType[]
}

const News:React.FC<PropsType> = (props) => {
  if (props.isFetching) {
    return <Preloader />;
  }

  return (
    <div>
      {props.articles.map((newEntry) => {
        return (
          <NewsEntry
            urlToImage={newEntry.urlToImage}
            title={newEntry.title}
            description={newEntry.description}
            url={newEntry.url}
          />
        );
      })}
    </div>
  );
};

export default News;
