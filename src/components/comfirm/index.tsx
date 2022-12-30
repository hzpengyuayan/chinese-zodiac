import React, { MouseEventHandler } from "react";
import styles from "./index.less";

type Props = {
  onOk?: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
  okText: string;
  title: string;
};

export default function index(props: Props) {
  const { visible, okText, title } = props;
  return (
    <>
      {visible && (
        <div className={styles.mask}>
          <div className={styles.comfirm}>
            <div className={styles["comfirm-body"]}>{title}</div>
            <div className={styles["comfirm-btns"]}>
              <button
                className={styles["comfirm-btns-reset"]}
                onClick={props.onOk}
              >
                {okText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
