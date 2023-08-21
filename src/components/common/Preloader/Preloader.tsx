import React from "react";
import styles from "./Preloader.module.css";

interface PropsType {}

const Preloader: React.FC<PropsType> = () => {
  return (
    <div className={styles.wrapper}>
      <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24">
        <circle cx="12" cy="2" r="0" fill="currentColor">
          <animate
            attributeName="r"
            begin="0"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
          <animate
            attributeName="r"
            begin="0.125s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
          <animate
            attributeName="r"
            begin="0.25s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
          <animate
            attributeName="r"
            begin="0.375s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
          <animate
            attributeName="r"
            begin="0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
          <animate
            attributeName="r"
            begin="0.625s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
          <animate
            attributeName="r"
            begin="0.75s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
          <animate
            attributeName="r"
            begin="0.875s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Preloader;
