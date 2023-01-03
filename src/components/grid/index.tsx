import React, { ReactNode } from "react";
import styles from "./index.less";

//格子固定大小
const GridSize = 20;

export function Grid(props: {
  children?: ReactNode;
  gridInfo?: any;
  removeGird: Function;
  isLayer?: boolean;
  zIndex?: Number;
}) {
  const { gridInfo } = props;

  // //获取向上偏移量
  // const getTop = () => {
  //   const { row, zIndex } = gridInfo;
  //   return (zIndex - 1) * 0.5 * GridSize + (row - 1) * GridSize;
  // };

  // //获取向左偏移量
  // const getLeft = () => {
  //   const { col, zIndex } = gridInfo;
  //   return (zIndex - 1) * 0.5 * GridSize + (col - 1) * GridSize;
  // };

  //点击事件
  const handleClick = () => {
    if (gridInfo.state === 1) {
      //   console.log(gridInfo);
      props.removeGird(); //删除此格子
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
            // top: getTop(),
            // left: getLeft(),
            cursor: `${gridInfo.state === 1 && "pointer"}`,
            backgroundPosition: getPosition(),
            backgroundColor: `${gridInfo.state === 1 ? "#fff" : "gray"}`,
            zIndex: gridInfo.zIndex,
          }}
          onClick={handleClick}
        >
          {/* {props?.children} */}
        </div>
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
