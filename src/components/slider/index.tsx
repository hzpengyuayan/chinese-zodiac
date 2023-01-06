import React from "react";
import styles from "./index.less";
import { Props } from "./interface";

export function Slider(props: Props) {
  let { min, max, step = 1, value, onChange } = props;
  return (
    <div className={styles.slider}>
      <span className={styles["left-label"]}>{min}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(e.target.value);
        }}
      />
      <span className={styles["right-label"]}>{max}</span>
    </div>
  );
}
