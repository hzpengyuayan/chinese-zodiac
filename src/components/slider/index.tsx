import React from "react";
import styles from "./index.less";
import { Props } from "./interface";

export function Slider(props: Props) {
  let { min, max, step = 1, value, onChange } = props;
  return (
    <div>
      <span>{min}</span>
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(e.target.value);
        }}
        style={{
          backgroundSize: `${(value / max) * 100}%`,
        }}
      />
      <span>{max}</span>
    </div>
  );
}
