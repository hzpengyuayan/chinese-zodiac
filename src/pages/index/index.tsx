import { useEffect, useState } from "react";
import { Comfirm, Grid, Tool } from "@/components";
import { GridNode, GameSetting } from "@/typings";
import back from "@/assets//icons/back.png";
import relayout from "@/assets//icons/relayout.png";
import shift_out from "@/assets//icons/shift_out.png";
import styles from "./index.less";
import { connect } from "dva";

interface flagListProps {
  [key: number]: {
    [key: string]: number;
  };
}

//随机生成格子列表
function initGridList(GameSetting: GameSetting) {
  const { Sort, Layers, Row, Col } = GameSetting;
  let GridList: GridNode[] = []; //总渲染格子列表
  let flagList: flagListProps = {}; //总渲染格子标签列表-判断是否重复

  //初始化格子样式
  const initGirdStyle = () => {
    let zIndex = Math.floor(Math.random() * Layers); //随机生成层数
    return {
      zIndex,
      row: Math.ceil(Math.random() * (Row - zIndex)), //根据层数，随机生成行
      col: Math.ceil(Math.random() * (Col - zIndex)), //根据层数，随机生成列
    };
  };

  //生成3*sort个格子
  for (let i = 0; i < Sort; i++) {
    let type = Math.floor(Math.random() * 12); //获取当前渲染图片值 1-12
    let newGirds: GridNode[] = [];
    //根据type初始化生成三个格子
    for (let j = 0; j < 3; j++) {
      let newGird = {
        id: "",
        state: 0,
        left: 0,
        top: 0,
        type,
        ...initGirdStyle(),
      };
      //判断三个格子是否有重复位置的
      createUniqueGrid(flagList, newGird, GameSetting);
      newGirds.push(newGird);
    }
    //推送新数组到GridList
    GridList.push(...newGirds);
  }

  //初始化所有格子状态
  initGirdState(GridList, GameSetting);

  return GridList;
}

//生成唯一格子
function createUniqueGrid(
  flagList: flagListProps,
  element: GridNode,
  GameSetting: GameSetting
) {
  const { GridSize, Layers, Row, Col } = GameSetting;
  let { zIndex, row, col } = element;
  if (
    flagList[zIndex] &&
    flagList[zIndex].hasOwnProperty(`${row}-${col}`) &&
    flagList[zIndex][`${row}-${col}`] === 1
  ) {
    element.zIndex = Math.floor(Math.random() * Layers);
    element.row = Math.ceil(Math.random() * (Row - element.zIndex));
    element.col = Math.ceil(Math.random() * (Col - element.zIndex));
    createUniqueGrid(flagList, element, GameSetting);
  } else {
    if (!flagList[zIndex]) {
      flagList[zIndex] = {};
    }
    flagList[zIndex][`${row}-${col}`] = 1;
    element.id = `${zIndex}-${row}-${col}`;
    element.left = zIndex * 0.5 * GridSize + (col - 1) * GridSize;
    element.top = zIndex * 0.5 * GridSize + (row - 1) * GridSize;
  }
}

//初始化格子状态
function initGirdState(GridList: GridNode[], GameSetting: GameSetting) {
  for (let i = 0; i < GridList.length; i++) {
    let {
      left: targetLeft,
      top: targetTop,
      zIndex: targetZIndex,
      state: targetState,
    } = GridList[i];
    if (targetState !== 2) {
      let isClick = true;
      //TODO
      for (let j = 0; j < GridList.length; j++) {
        let {
          left: OtherLeft,
          top: OtherTop,
          zIndex: OtherZIndex,
          state: OtherState,
        } = GridList[j];
        if (
          targetZIndex < OtherZIndex &&
          Math.abs(OtherLeft - targetLeft) <= GameSetting.GridSize * 0.5 &&
          Math.abs(OtherTop - targetTop) <= GameSetting.GridSize * 0.5 &&
          OtherState !== 2
        ) {
          isClick = false;
          continue;
        }
      }
      GridList[i].state = isClick ? 1 : 0;
    }
  }
}

let typeList = new Array(12).fill(0); //记录每个生肖的个数

function index({ setting }: { setting: GameSetting }) {
  const [gridList, setGridList] = useState<GridNode[]>(() =>
    initGridList(setting)
  );
  const [selectedGridList, setSelectedGridList] = useState<GridNode[]>([]); //选中的格子
  const [storageGridList, setStorageGridList] = useState<GridNode[]>([]);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isRotate, setIsRotate] = useState<boolean>(false);

  //点击删除格子
  const removeGird = (index: number) => {
    let newGridlist = gridList.slice();
    newGridlist[index].state = 2;
    addToFooter(newGridlist[index]);
    //判断格子是否可点击
    initGirdState(newGridlist, setting);
    setGridList(newGridlist);
  };

  //增加至底部格子列
  const addToFooter = (grid: GridNode) => {
    let newSelectedGridList = selectedGridList.slice();
    let { type } = grid;

    //找到最后一个符合条件的元素下标
    let index = -1;
    for (let i = newSelectedGridList.length - 1; i >= 0; i--) {
      if (newSelectedGridList[i].type === type) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      newSelectedGridList.push(grid);
    } else {
      newSelectedGridList.splice(index, 0, grid); //重复元素放在一起
    }

    typeList[type]++;

    if (typeList[type] === 3) {
      for (let i = newSelectedGridList.length - 1; i >= 0; i--) {
        if (newSelectedGridList[i].type === type) {
          newSelectedGridList.splice(i, 1);
        }
      }
      typeList[type] = 0;
    }

    if (newSelectedGridList.length === 10) {
      setIsFailed(true);
      return;
    }

    setSelectedGridList(newSelectedGridList);
  };

  //重新开始
  const handleReset = () => {
    setTimeout(() => {
      setIsFailed(false);
      window.location.reload();
    }, 1000);
  };

  //点击上移
  const handleShiftOut = () => {
    let newSelectedGridList = selectedGridList.slice();
    let storageGridList = newSelectedGridList.splice(0, 3);
    storageGridList.forEach((item: GridNode) => {
      typeList[item.type]--;
    });
    setSelectedGridList(newSelectedGridList);
    setStorageGridList(storageGridList);
  };

  //点击撤销
  const handleBack = () => {
    let newSelectedGridList = selectedGridList.slice();
    let newGridlist = gridList.slice();
    const lastGrid = selectedGridList[selectedGridList.length - 1];
    newSelectedGridList.pop(); //选中列表去掉最后一个
    for (let i = 0; i < newGridlist.length; i++) {
      if (newGridlist[i].id === lastGrid.id) {
        newGridlist[i].state = 1;
        break;
      }
    }
    initGirdState(newGridlist, setting);
    setSelectedGridList(newSelectedGridList);
    setGridList(newGridlist);
  };

  //点击重新布局
  const handleRelayout = () => {
    setIsRotate(true);
    const { Layers, Row, Col } = setting;
    let newGridList = gridList.slice();
    let flagList: any = {};
    newGridList.forEach((item: GridNode) => {
      if (item.state !== 2) {
        item.zIndex = Math.floor(Math.random() * Layers);
        item.row = Math.ceil(Math.random() * (Row - item.zIndex));
        item.col = Math.ceil(Math.random() * (Col - item.zIndex));
        createUniqueGrid(flagList, item, setting);
        item.id = `${item.zIndex}-${item.row}-${item.col}-hasRotate`;
      }
    });
    initGirdState(newGridList, setting);
    setGridList(newGridList);
  };

  //点击暂存区格子加入到底部区域
  const reAddToFooter = (grid: GridNode, i: number) => {
    let newStorageGridList = storageGridList.slice();
    newStorageGridList.splice(i, 1);
    addToFooter(grid);
    setStorageGridList(newStorageGridList);
  };

  useEffect(() => {
    if (selectedGridList.length === 0) {
      let isSuccess = false;
      for (let i = 0; i < gridList.length; i++) {
        if (gridList[i].state !== 2) return;
        if (i === gridList.length - 1) isSuccess = true;
      }
      setIsSuccess(isSuccess);
    }
  }, [selectedGridList]);

  return (
    <div className={styles.box}>
      <h2>Chinese Zodiac</h2>
      <div className={styles.container}>
        <div
          className={[
            styles["rotate-box"],
            isRotate && styles["is-rotate"],
          ].join(" ")}
          style={{
            width: `${setting.Col * setting.GridSize}px`,
            height: `${setting.Row * setting.GridSize}px`,
            top: `${
              (300 / setting.GridSize - setting.Row) * 0.5 * setting.GridSize
            }px`,
            left: `${
              (300 / setting.GridSize - setting.Col) * 0.5 * setting.GridSize
            }px`,
          }}
        >
          {gridList.map((item: GridNode, index: number) => {
            if (item.state !== 2) {
              return (
                <Grid
                  gridInfo={item}
                  key={item.id}
                  onClick={() => removeGird(index)}
                ></Grid>
              );
            }
          })}
        </div>
      </div>

      <div className={styles["storage-grids"]}>
        {storageGridList.map((item: GridNode, index: number) => {
          return (
            <Grid
              gridInfo={item}
              key={item.id}
              onClick={() => reAddToFooter(item, index)}
            ></Grid>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles["footer-body"]}>
          {selectedGridList.map((item: GridNode) => {
            return <Grid gridInfo={item} key={item.id}></Grid>;
          })}
        </div>
      </div>

      <div className={styles.tools}>
        <Tool imgSrc={shift_out} onClick={handleShiftOut}></Tool>
        <Tool imgSrc={back} onClick={handleBack}></Tool>
        <Tool imgSrc={relayout} onClick={handleRelayout}></Tool>
      </div>

      <Comfirm
        visible={isFailed}
        title={"你失败了，需要重新开始一局吗？"}
        onOk={handleReset}
        okText={"重新开始"}
      ></Comfirm>

      <Comfirm
        visible={isSuccess}
        title={"恭喜你，顺利通关，需要再来一把吗？"}
        onOk={handleReset}
        okText={"再来一把"}
      ></Comfirm>
    </div>
  );
}

export default connect(({ setting }: { setting: GameSetting }) => ({
  setting,
}))(index);
