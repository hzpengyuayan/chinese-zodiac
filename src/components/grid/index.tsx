import React from "react";
import { Props } from "./interface";
import styles from "./index.less";

//格子固定大小
const GridSize = 20;

export function Grid(props: Props) {
  const { gridInfo } = props;

  //点击事件
  const handleClick = () => {
    if (gridInfo.state === 1) {
      props.removeGird && props.removeGird(); //删除此格子
    }
  };

  //雪碧图偏移量
  const getPosition = () => {
    const { type } = gridInfo;
    return ` ${((type - 1) % 4) * -18}px ${Math.floor((type - 1) / 4) * -25}px`;
  };

  return (
    <>
      {gridInfo.state !== 2 && (
        <div
          className={styles.grid}
          style={{
            top: gridInfo.top,
            left: gridInfo.left,
            cursor: `${gridInfo.state === 1 && "pointer"}`,
            backgroundPosition: getPosition(),
            backgroundColor: `${gridInfo.state === 1 ? "#fff" : "gray"}`,
            zIndex: gridInfo.zIndex,
          }}
          onClick={handleClick}
        ></div>
      )}

      {gridInfo.state === 2 && (
        <div
          className={styles.grid}
          style={{
            position: "static",
            backgroundPosition: getPosition(),
          }}
        ></div>
      )}
    </>
  );
}
