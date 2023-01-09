import { useEffect, useState } from "react";
import { connect } from "dva";
import { Slider, Button } from "@/components";
import { GameSetting } from "@/typings";
import styles from "./index.less";

const SettingsInfo = [
  {
    min: 3,
    max: 999,
    step: 3,
  },
  {
    min: 1,
    max: 10,
    step: 1,
  },
  {
    min: 1,
    max: 10,
    step: 1,
  },
  {
    min: 1,
    max: 10,
    step: 1,
  },
];

//游戏模式难度定义
const GameMode = [
  {
    type: "简单",
    setting: {
      Sort: 3,
      Layers: 3,
      Row: 3,
      Col: 3,
    },
  },
  {
    type: "中等",
    setting: {
      Sort: 40,
      Layers: 5,
      Row: 8,
      Col: 8,
    },
  },
  {
    type: "困难",
    setting: {
      Sort: 100,
      Layers: 8,
      Row: 10,
      Col: 10,
    },
  },
  {
    type: "地狱",
    setting: {
      Sort: 423,
      Layers: 20,
      Row: 15,
      Col: 15,
    },
  },
];

//计算最大格子数量
function calcMaxNum(row: number, col: number, layers: number) {
  let maxNum = 0;
  for (let i = 0; i < layers; i++) {
    maxNum += (row - i) * (col - i);
  }
  return maxNum;
}

function index({
  dispatch,
  setting,
}: {
  dispatch: Function;
  setting: GameSetting;
}) {
  console.log(setting);

  const [mode, setMode] = useState(0); //选择游戏模式
  const [values, setvalues] = useState(setting);
  useEffect(() => {
    setvalues(setting);
  }, [setting]);

  //选择游戏难度
  const handleSelectMode = (mode: number) => {
    dispatch({
      type: "setting/update",
      payload: GameMode[mode].setting,
    });
  };

  //保存自定义设置
  const handleSaveDefinedSetting = () => {
    dispatch({
      type: "setting/update",
      payload: values,
    });
  };

  return (
    <div className={styles["setting"]}>
      <div className={styles["setting-mode"]}>
        <div className={styles["setting-mode-title"]}>模式选择</div>
        <div className={styles["setting-mode-context"]}>
          {GameMode.map((item, index) => (
            <span
              className={styles["setting-mode-sort"]}
              key={item.type}
              onClick={() => handleSelectMode(index)}
            >
              {item.type}
            </span>
          ))}
        </div>
      </div>
      <div className={styles["setting-defined"]}>
        <div className={styles["setting-defined-title"]}>自定义设置</div>
        <ul className={styles["setting-defined-list"]}>
          <li>
            <span className={styles["setting-label"]}>
              当前个数: <i>{values.Sort * 3}</i> (个)
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={3}
                max={calcMaxNum(values.Row, values.Col, values.Layers)}
                value={values.Sort * 3}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Sort: value / 3,
                  })
                }
                step={3}
              />
            </div>
          </li>
          <li>
            <span className={styles["setting-label"]}>
              当前层数: <i>{values.Layers}</i> (层)
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={1}
                max={20}
                value={values.Layers}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Layers: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
          <li>
            <span className={styles["setting-label"]}>
              当前行数: <i>{values.Row}</i> (行)
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={1}
                max={15}
                value={values.Row}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Row: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
          <li>
            <span className={styles["setting-label"]}>
              当前列数: <i>{values.Col}</i> (列)
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={1}
                max={15}
                value={values.Col}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Col: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
        </ul>
        <div className={styles["setting-defined-btn"]}>
          <Button onClick={handleSaveDefinedSetting}>保存自定义设置</Button>
        </div>
      </div>
    </div>
  );
}

export default connect(({ setting }: { setting: GameSetting }) => ({
  setting,
}))(index);
