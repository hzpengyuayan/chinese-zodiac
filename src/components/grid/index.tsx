import React from "react";
import { get } from "@/utils";
import { Props } from "./interface";
import styles from "./index.less";

let imgFiles: string[] = [];

//初始化判断本地是否存有图片
function initImgFiles() {
  imgFiles = get("ImgFiles", 1000 * 60 * 60 * 24 * 7) || [];
}
initImgFiles();

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
          backgroundImage: `url(${
            imgFiles.length > 0
              ? imgFiles[gridInfo.type]
              : require(`@/assets/imgs/${gridInfo.type}.png`)
          })`,
          backgroundColor: gridInfo.state === 0 ? "#888" : "#fff",
        }}
        onClick={handleClick}
      ></div>
    </>
  );
}
