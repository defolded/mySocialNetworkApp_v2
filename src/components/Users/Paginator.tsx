import React, { useEffect, useState } from "react";
import styles from "./Paginator.module.css";

interface Props {
  totalUsersCount: number
  pageSize: number
  page: number
  setCurrentPage: (arg0: number) => void
}

const Paginator = (props: Props) => {
  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages:number[] = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const portionSize = 10;

  let portionCount = Math.ceil(pageCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  useEffect(
    () => setPortionNumber(Math.ceil(props.page / portionSize)),
    [props.page]
  );

  return (
    <div className={styles.container}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV
        </button>
      )}

      <div className={styles.pagination}>
        {pages
          .filter(
            (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map((p) => {
            return (
              <span
                className={props.page === p ? styles.active : ""}
                onClick={() => {
                  props.setCurrentPage(p);
                }}
                key={p}
              >
                {p}
              </span>
            );
          })}
      </div>

      {portionCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
