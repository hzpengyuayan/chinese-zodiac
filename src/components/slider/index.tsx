import React, { useState } from "react";
import styles from "./index.less";
interface Props {
  min: number;
  max: number;
  value: number;
  step?: number; //默认为1
  onChange?: Function;
}

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
        onInput={(e) => {
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
