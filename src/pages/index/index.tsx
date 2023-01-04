import styles from "./index.less";
import { Comfirm, Grid } from "@/components";
import { GridNode, GameSetting } from "@/typings";
import { useEffect, useState } from "react";
import { connect } from "dva";

//随机生成格子列表
function initGridList(GameSetting: GameSetting) {
  const { GridSize, Sort, Layers, Row, Col } = GameSetting;
  let GridList: GridNode[] = []; //总渲染格子列表
  let flagList: any = {}; //总渲染格子标签列表-判断是否重复

  //初始化格子样式
  const initGirdStyle = () => {
    let zIndex = Math.floor(Math.random() * Layers); //随机生成层数
    return {
      zIndex,
      row: Math.ceil(Math.random() * (Row - zIndex)), //根据层数，随机生成行
      col: Math.ceil(Math.random() * (Col - zIndex)), //根据层数，随机生成列
    };
  };

  //判断是否有重复的
  const handleIsRepeat = (element: GridNode) => {
    let { zIndex, row, col } = element;
    if (
      flagList[zIndex] &&
      flagList[zIndex].hasOwnProperty(`${row}-${col}`) &&
      flagList[zIndex][`${row}-${col}`] === 1
    ) {
      element.zIndex = Math.floor(Math.random() * Layers);
      element.row = Math.ceil(Math.random() * (Row - element.zIndex));
      element.col = Math.ceil(Math.random() * (Col - element.zIndex));
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

  //生成3*sort个格子
  for (let i = 0; i < Sort; i++) {
    let type = Math.ceil(Math.random() * 12); //获取当前渲染图片值 1-12
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
      handleIsRepeat(newGird);
      newGirds.push(newGird);
    }
    //推送新数组到GridList
    GridList.push(...newGirds);
  }

  //初始化所有格子状态
  initGirdState(GridList);

  return GridList;
}

//初始化格子状态
function initGirdState(GridList: GridNode[]) {
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
          Math.abs(OtherLeft - targetLeft) <= 10 &&
          Math.abs(OtherTop - targetTop) <= 10 &&
          OtherState !== 2
        ) {
          isClick = false;
          continue;
        }
      }
      if (isClick) GridList[i].state = 1;
    }
  }
}

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

function index({ dispatch, setting }) {
  // console.log(setting);
  const [gridList, setGridList] = useState(() => initGridList(setting));
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
    let newSelectedGridList = selectedGridList.slice();
    let { type } = grid;
    let index = newSelectedGridList.findLastIndex(
      (item: { type: any }) => item.type === type
    );
    if (index === -1) {
      newSelectedGridList.push(grid);
    } else {
      newSelectedGridList.splice(index, 0, grid); //重复元素放在一起
    }

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
  // const initGirdState = (newGridlist: any) => {
  //   for (let i = 0; i < newGridlist.length; i++) {
  //     let {
  //       left: targetLeft,
  //       top: targetTop,
  //       zIndex: targetZIndex,
  //       state: targetState,
  //     } = newGridlist[i];
  //     if (targetState !== 2) {
  //       let isClick = true;
  //       //TODO
  //       for (let j = 0; j < newGridlist.length; j++) {
  //         let {
  //           left: OtherLeft,
  //           top: OtherTop,
  //           zIndex: OtherZIndex,
  //           state: OtherState,
  //         } = newGridlist[j];
  //         if (
  //           targetZIndex < OtherZIndex &&
  //           Math.abs(OtherLeft - targetLeft) <= 10 &&
  //           Math.abs(OtherTop - targetTop) <= 10 &&
  //           OtherState !== 2
  //         ) {
  //           isClick = false;
  //           continue;
  //         }
  //       }
  //       if (isClick) newGridlist[i].state = 1;
  //     }
  //   }
  // };

  //重新开始
  const hanldeReset = () => {
    setTimeout(() => {
      setIsFailed(false);
      window.location.reload();
    }, 1000);
  };

  // useEffect(() => {
  //   // GridList = [];
  //   // initGridList(GridList, setting);
  //   // console.log(GridList, setting);
  //   // let newGridlist = gridList.slice();
  //   // initGirdState(newGridlist);
  //   // setGridList(newGridlist);
  // }, []);

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
          style={{
            position: "absolute",
            top: `${(15 - setting.Row) * 0.5 * 20}px`,
            left: `${(15 - setting.Col) * 0.5 * 20}px`,
          }}
        >
          {gridList.map((item: any, index: number) => {
            if (item.state !== 2) {
              return (
                <Grid
                  gridInfo={item}
                  key={item.id}
                  removeGird={() => removeGird(index)}
                ></Grid>
              );
            }
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles["footer-body"]}>
          {selectedGridList.map((item: any) => {
            return <Grid gridInfo={item} key={item.id}></Grid>;
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

export default connect(({ setting }) => ({
  setting,
}))(index);
