import styles from "./index.less";
import Grid from "@/components/grid";
import Comfirm from "@/components/comfirm";
import { useEffect, useState } from "react";
import { GameSetting } from "@/utils";

const GridList: any = [
  // { id: "1-1", zIndex: 1, row: 1, col: 1, state: 0, left: 0, top: 0, type: 1 },
  // { id: "1-2", zIndex: 1, row: 1, col: 2, state: 0, left: 0, top: 0, type: 2 },
  // { id: "1-3", zIndex: 1, row: 1, col: 3, state: 0, left: 0, top: 0, type: 3 },
  // { id: "1-4", zIndex: 1, row: 1, col: 4, state: 0, left: 0, top: 0, type: 4 },
  // { id: "1-5", zIndex: 1, row: 2, col: 1, state: 0, left: 0, top: 0, type: 5 },
  // { id: "1-6", zIndex: 1, row: 2, col: 2, state: 0, left: 0, top: 0, type: 6 },
  // { id: "1-7", zIndex: 1, row: 2, col: 3, state: 0, left: 0, top: 0, type: 7 },
  // { id: "1-8", zIndex: 1, row: 2, col: 4, state: 0, left: 0, top: 0, type: 8 },
  // { id: "1-9", zIndex: 1, row: 3, col: 1, state: 0, left: 0, top: 0, type: 9 },
  // { id: "1-10", zIndex: 1, row: 3, col: 2, state: 0, left: 0, top: 0, type: 10 },
  // { id: "1-11", zIndex: 1, row: 3, col: 3, state: 0, left: 0, top: 0, type: 11 },
  // { id: "1-12", zIndex: 1, row: 3, col: 4, state: 0, left: 0, top: 0, type: 12 },
  // { id: "1-13", zIndex: 1, row: 4, col: 1, state: 0, left: 0, top: 0, type: 1 },
  // { id: "1-14", zIndex: 1, row: 4, col: 2, state: 0, left: 0, top: 0, type: 2 },
  // { id: "1-15", zIndex: 1, row: 4, col: 3, state: 0, left: 0, top: 0, type: 3 },
  // { id: "1-16", zIndex: 1, row: 4, col: 4, state: 0, left: 0, top: 0, type: 4 },
  // { id: "2-1", zIndex: 2, row: 1, col: 1, state: 0, left: 0, top: 0, type: 1},
  // { id: "2-2", zIndex: 2, row: 1, col: 2, state: 0, left: 0, top: 0, type: 2},
  // { id: "2-3", zIndex: 2, row: 1, col: 3, state: 0, left: 0, top: 0, type: 3},
  // { id: "2-4", zIndex: 2, row: 2, col: 1, state: 0, left: 0, top: 0, type: 4},
  // { id: "2-5", zIndex: 2, row: 2, col: 2, state: 0, left: 0, top: 0, type: 5},
  // { id: "2-6", zIndex: 2, row: 2, col: 3, state: 0, left: 0, top: 0, type: 6},
  // { id: "2-7", zIndex: 2, row: 3, col: 1, state: 0, left: 0, top: 0, type: 7},
  // { id: "2-8", zIndex: 2, row: 3, col: 2, state: 0, left: 0, top: 0, type: 8},
  // { id: "2-9", zIndex: 2, row: 3, col: 3, state: 0, left: 0, top: 0, type: 9},
  // { id: "3-1", zIndex: 3, row: 1, col: 1, state: 0, left: 0, top: 0, type: 1},
  // { id: "3-2", zIndex: 3, row: 1, col: 2, state: 0, left: 0, top: 0, type: 2},
  // { id: "3-3", zIndex: 3, row: 2, col: 1, state: 0, left: 0, top: 0, type: 3},
  // { id: "3-4", zIndex: 3, row: 2, col: 2, state: 0, left: 0, top: 0, type: 4},
  // { id: "4-1", zIndex: 4, row: 1, col: 1, state: 0, left: 0, top: 0, type: 1},
];
function initGridList(GridList: any) {
  let flagList: any = {};
  //判断是否有重复的
  const handleIsRepeat = (element: any) => {
    const { zIndex, row, col } = element;
    const { GridSize, Layers, Row, Col } = GameSetting;
    if (
      flagList[zIndex] &&
      flagList[zIndex].hasOwnProperty(`${row}-${col}`) &&
      flagList[zIndex][`${row}-${col}`] === 1
    ) {
      element.zIndex = Math.floor(Math.random() * Layers);
      element.row = Math.ceil(Math.random() * Row);
      element.col = Math.ceil(Math.random() * Col);
      handleIsRepeat(element);
    } else {
      if (!flagList[zIndex]) {
        flagList[zIndex] = {};
      }
      flagList[zIndex][`${row}-${col}`] = 1;
      element.id = `${zIndex}-${row}-${col}`;
      element.left = zIndex * 0.5 * GridSize + (col - 1) * GridSize;
      element.top = zIndex * 0.5 * GridSize + (row - 1) * GridSize;
    }
  };
  for (let i = 0; i < GameSetting.Sort; i++) {
    let type = Math.ceil(Math.random() * 12); //获取当前渲染图片值 1-12
    let newGirds = [
      {
        id: "",
        zIndex: Math.floor(Math.random() * 5),
        row: Math.ceil(Math.random() * 10),
        col: Math.ceil(Math.random() * 10),
        state: 0,
        left: 0,
        top: 0,
        type,
      },
      {
        id: "",
        zIndex: Math.floor(Math.random() * 5),
        row: Math.ceil(Math.random() * 10),
        col: Math.ceil(Math.random() * 10),
        state: 0,
        left: 0,
        top: 0,
        type,
      },
      {
        id: "",
        zIndex: Math.floor(Math.random() * 5),
        row: Math.ceil(Math.random() * 10),
        col: Math.ceil(Math.random() * 10),
        state: 0,
        left: 0,
        top: 0,
        type,
      },
    ]; //根据type初始化生成三个格子
    //循环
    for (let j = 0; j < newGirds.length; j++) {
      let element = newGirds[j];
      handleIsRepeat(element);
    }
    //推送新数组到GridList
    GridList.push(...newGirds);
  }
}
initGridList(GridList);

let typeList: any = [];
function initTypeList(typeList: any) {
  for (let i = 0; i < 13; i++) {
    typeList.push({
      num: 0,
      indexs: [],
    });
  }
}
initTypeList(typeList);

export default function HomePage() {
  const [gridList, setGridList] = useState(GridList);
  const [selectedGridList, setSelectedGridList] = useState<any>([]); //选中的格子
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  //点击删除格子
  const removeGird = (index: number) => {
    let newGridlist = gridList.slice();
    newGridlist[index].state = 2;
    addToFooter(newGridlist[index]);
    //判断格子是否可点击
    initGirdState(newGridlist);
    setGridList(newGridlist);
  };

  //增加至底部格子列
  const addToFooter = (grid: any) => {
    // console.log(gridList[index]);
    let newSelectedGridList = selectedGridList.slice();
    newSelectedGridList.push(grid);

    let { type } = grid;

    typeList[type].num++;
    typeList[type].indexs.push(newSelectedGridList.length - 1);

    if (typeList[type].num === 3) {
      for (let i = newSelectedGridList.length - 1; i >= 0; i--) {
        if (newSelectedGridList[i].type === type) {
          newSelectedGridList.splice(i, 1);
        }
      }
      typeList[type].num = 0;
      typeList[type].indexs = [];
    }

    if (newSelectedGridList.length === 10) {
      setIsFailed(true);
      return;
    }

    setSelectedGridList(newSelectedGridList);
  };

  //重新判断格子是否可点击
  const initGirdState = (newGridlist: any) => {
    for (let i = 0; i < newGridlist.length; i++) {
      let {
        left: targetLeft,
        top: targetTop,
        zIndex: targetZIndex,
        state: targetState,
      } = newGridlist[i];
      if (targetState !== 2) {
        let isClick = true;
        //TODO
        for (let j = 0; j < newGridlist.length; j++) {
          let {
            left: OtherLeft,
            top: OtherTop,
            zIndex: OtherZIndex,
            state: OtherState,
          } = newGridlist[j];
          if (
            targetZIndex < OtherZIndex &&
            Math.abs(OtherLeft - targetLeft) <= 10 &&
            Math.abs(OtherTop - targetTop) <= 10 &&
            OtherState !== 2
          ) {
            isClick = false;
            continue;
          }
        }
        if (isClick) newGridlist[i].state = 1;
      }
    }
  };

  //重新开始
  const hanldeReset = () => {
    setTimeout(() => {
      setIsFailed(false);
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    let newGridlist = gridList.slice();
    initGirdState(newGridlist);
    setGridList(newGridlist);
  }, []);

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
        {gridList.map((item: any, index: number) => {
          if (item.state !== 2) {
            return (
              <Grid
                gridInfo={item}
                key={item.id}
                removeGird={() => removeGird(index)}
              >
                {item.id}
              </Grid>
            );
          }
        })}
      </div>

      <div className={styles.footer}>
        <div className={styles["footer-body"]}>
          {selectedGridList.map((item: any) => {
            return (
              <Grid gridInfo={item} key={item.id} removeGird={() => {}}>
                {item.id}
              </Grid>
            );
          })}
        </div>
      </div>

      <Comfirm
        visible={isFailed}
        title={"你失败了，需要重新开始一局吗？"}
        onOk={hanldeReset}
        okText={"重新开始"}
      ></Comfirm>

      <Comfirm
        visible={isSuccess}
        title={"恭喜你，顺利通关，需要再来一把吗？"}
        onOk={hanldeReset}
        okText={"再来一把"}
      ></Comfirm>
    </div>
  );
}
