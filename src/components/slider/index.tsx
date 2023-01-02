import React, { useState } from 'react'
import styles from './index.less'
interface Props {
  min?: number
  max?: number
  value?: number
  step?: number
  onChange?:Function
}

export default function index(props: Props) {

  let { min, max, step, value, onChange} = props
  // const [value, setValue] = useState(props.value)
  // console.log(props);

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
          console.log(e.target.value)
          onChange(e.target.value)
          // setValue(e.target.value)
        }}
        style={{
          backgroundSize: `${(value / max) * 100}%`,
        }}
      />
      <span>{max}</span>
    </div>
  )
}
