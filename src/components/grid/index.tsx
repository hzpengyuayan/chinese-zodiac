import React from "react";
import { Props } from "./interface";
import styles from "./index.less";

//格子固定大小
const GridSize = 20;

export function Grid(props: Props) {
  const { gridInfo, onClick } = props;

  //点击事件
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <>
      <div
        className={styles.grid}
        style={{
          position: gridInfo.state === 2 ? "static" : "absolute",
          top: gridInfo.state === 2 ? undefined : gridInfo.top,
          left: gridInfo.state === 2 ? undefined : gridInfo.left,
          zIndex: gridInfo.zIndex,
          cursor: gridInfo.state === 0 ? "default" : "pointer",
          backgroundImage: `url(${require(`@/assets/imgs/${gridInfo.type}.png`)})`,
          backgroundColor: gridInfo.state === 0 ? "#888" : "#fff",
        }}
        onClick={handleClick}
      ></div>
    </>
  );
}
