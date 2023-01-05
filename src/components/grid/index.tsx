import React from "react";
import { Props } from "./interface";
import styles from "./index.less";
import bg0 from "@/assets/imgs/0.png";

//格子固定大小
const GridSize = 20;

export function Grid(props: Props) {
  const { gridInfo, removeGird, onClick } = props;

  //点击事件
  const handleClick = () => {
    onClick && onClick();
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
            backgroundImage: `url(${require(`@/assets/imgs/${gridInfo.type}.png`)})`,
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
            backgroundImage: `url(${require(`@/assets/imgs/${gridInfo.type}.png`)})`,
            backgroundColor: "#fff",
          }}
          onClick={handleClick}
        ></div>
      )}
    </>
  );
}
