import React from "react";
import styles from "./FormControls.module.css";

const Textarea = ({ input, meta, ...props }) => {
  return (
    <div className={styles.userInput}>
      <textarea
        {...input}
        {...props}
        className={meta.touched && meta.error ? styles.errorText : styles.text}
      />
    </div>
  );
};

export default Textarea;
