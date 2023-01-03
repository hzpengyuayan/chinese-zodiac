import React from "react";
import { Props } from "./interface";
import styles from "./index.less";

export function Button(props: Props) {
  const { children, onClick } = props;
  return (
    <button className={styles["my-button"]} onClick={onClick}>
      {children && children}
    </button>
  );
}
