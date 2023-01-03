import React from "react";
import ReactDOM from "react-dom";
import { Props } from "./interface";
import { Button } from "@/components";
import styles from "./index.less";

const root = document.getElementById("root") as Element; //插入位置

export function Comfirm(props: Props) {
  const { visible, okText, title, onOk } = props;
  return (
    <>
      {visible &&
        ReactDOM.createPortal(
          <div className={styles.mask}>
            <div className={styles.comfirm}>
              <div className={styles["comfirm-body"]}>{title}</div>
              <div className={styles["comfirm-btns"]}>
                <Button onClick={onOk}>{okText}</Button>
              </div>
            </div>
          </div>,
          root
        )}
    </>
  );
}
