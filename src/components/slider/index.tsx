import React from "react";
import styles from "./index.less";

export default function index() {
  return (
    <div className={styles.slider}>
      <div className={styles["slider-step"]}></div>
      {/* <div className={styles["slider-handle"]}></div> */}
    </div>
  );
}
