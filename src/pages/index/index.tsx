import styles from "./index.less";
import Grid from "@/components/grid";
import Comfirm from "@/components/comfirm";
import { useEffect, useState } from "react";

//固定格子大小为20
const GridSize = 20;

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
  for (let i = 0; i < 100; i++) {
    let newGrid = {
      id: "",
      zIndex: Math.floor(Math.random() * 5), //0-
      row: Math.ceil(Math.random() * 10), //1-
      col: Math.ceil(Math.random() * 10), //1-
      state: 0,
      left: 0,
      top: 0,
      type: Math.ceil(Math.random() * 12),
    };
    const { zIndex, row, col } = newGrid;
    if (
      flagList[zIndex] &&
      flagList[zIndex].hasOwnProperty(`${row}-${col}`) &&
      flagList[zIndex][`${row}-${col}`] === 1
    ) {
      continue;
    } else {
      if (!flagList[zIndex]) {
        flagList[zIndex] = {};
      }
      flagList[zIndex][`${row}-${col}`] = 1;
      newGrid.id = `${zIndex}-${row}-${col}`;
      newGrid.left = zIndex * 0.5 * GridSize + (col - 1) * GridSize;
      newGrid.top = zIndex * 0.5 * GridSize + (row - 1) * GridSize;
      GridList.push(newGrid);
    }
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
  const [isComfirm, setIsComfirm] = useState<boolean>(false);

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

    console.log(typeList, newSelectedGridList);

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
      setIsComfirm(true);
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
      setIsComfirm(false);
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    let newGridlist = gridList.slice();
    initGirdState(newGridlist);
    setGridList(newGridlist);
  }, []);

  return (
    <div>
      <h2>Chinese Zodiac</h2>
      <div className={styles.container}>
        {gridList.map((item, index) => {
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
        {selectedGridList.map((item: any) => {
          return (
            <Grid gridInfo={item} key={item.id} removeGird={() => {}}>
              {item.id}
            </Grid>
          );
        })}
      </div>

      <Comfirm visible={isComfirm} onOk={hanldeReset} okText={"重新开始"}></Comfirm>
    </div>
  );
}
