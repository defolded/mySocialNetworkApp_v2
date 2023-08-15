import React from "react";
import { Link } from "react-router-dom";
import styles from "./NewsEntry.module.css";

const NewsEntry = (props) => {
  return (
    <div className={styles.container}>
      <Link to={props.url}>
        <div className={styles.topWrapper}>
          <img
            src={
              props.urlToImage
                ? props.urlToImage
                : "https://www.citypng.com/public/uploads/preview/free-newspaper-news-icon-png-11639741012iwvboqumq5.png"
            }
            width="180px"
            height="130px"
            alt="news"
          />
          <div className={styles.newsTextWrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            <p className={styles.text}>{props.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsEntry;
