import React, { useState } from "react";
import { Props } from "./interface";
import styles from "./index.less";

export function Tool(props: Props) {
  const { onClick, imgSrc } = props;
  const [isClick, setIsClick] = useState<boolean>(true);

  const handleClick = () => {
    if (isClick === true && onClick) {
      onClick();
      setIsClick(false);
    }
  };

  return (
    <div
      className={[styles.tool, !isClick && styles.isActive].join(" ")}
      onClick={handleClick}
    >
      <img src={imgSrc} alt="" width="20" height="20" />
    </div>
  );
}
