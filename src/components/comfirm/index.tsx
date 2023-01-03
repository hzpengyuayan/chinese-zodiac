import React, { MouseEventHandler } from "react";
import { Props } from "./interface";
import { Button } from "@/components";
import styles from "./index.less";

export function Comfirm(props: Props) {
  const { visible, okText, title, onOk } = props;
  return (
    <>
      {visible && (
        <div className={styles.mask}>
          <div className={styles.comfirm}>
            <div className={styles["comfirm-body"]}>{title}</div>
            <div className={styles["comfirm-btns"]}>
              <Button onClick={onOk}>{okText}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
