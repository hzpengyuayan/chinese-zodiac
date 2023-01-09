import { useEffect, useState } from "react";
import { Slider, Button } from "@/components";
import { GameMode } from "@/utils";
import { connect } from "dva";
import { GameSetting } from "@/typings";
import styles from "./index.less";

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
                max={300 / setting.GridSize}
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
                max={300 / setting.GridSize}
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
