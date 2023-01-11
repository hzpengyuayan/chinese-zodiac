import { useEffect, useState } from "react";
import { Slider, Button } from "@/components";
import { GameMode, set, clear } from "@/utils";
import { connect } from "dva";
import { GameSetting } from "@/typings";
import styles from "./index.less";

//计算最大格子数量
function calcMaxNum(row: number, col: number, layers: number) {
  let maxNum = 0;
  for (let i = 0; i < layers; i++) {
    if (row === 1) {
      maxNum += col--;
    } else if (col === 1) {
      maxNum += row--;
    } else if (row === 1 && col === 1) {
      maxNum ++;
      break;
    } else {
      maxNum += row-- * col--;
    }
  }
  maxNum = Math.floor(maxNum / 3) * 3;
  return maxNum;
}

const icons = [
  "icon-xiaolian1-xianxing",
  "icon-xiaolian3-xianxing",
  "icon-xiaolian2-xianxing",
  "icon-kuqi",
];

function index({
  dispatch,
  setting,
}: {
  dispatch: Function;
  setting: GameSetting;
}) {
  const [values, setvalues] = useState(setting);
  const [imgFiles, setImgFiles] = useState([]);
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

  //上传图片文件
  const handleUpLoadImg = async (e) => {
    if (e.target.files.length !== 12) {
      return alert("必须一次性传入12张图片");
    }
    const uploadFileAsync = (file: any) => {
      if (window.FileReader) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = (e) => {
            resolve(e.target?.result ? e.target.result : "");
          };
          fileReader.onerror = (e) => {
            reject(e);
          };
        });
      } else {
        return alert("当前浏览器不支持此功能，请切换浏览器进行操作。");
      }
    };
    let files = e.target.files;

    let newImgFiles: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const res = await uploadFileAsync(files[i]);
      newImgFiles.push(res);
    }
    setImgFiles(newImgFiles);
    set("ImgFiles", newImgFiles); //存入浏览器本地
  };

  //清除所有图片
  const handleClearImg = () => {
    clear("ImgFiles");
    alert("清除成功");
  };

  return (
    <div className={styles["setting"]}>
      <div className={styles["setting-mode"]}>
        <div className={styles["setting-label"]}>
          <i className={`iconfont icon-zidingyi`} />
          模式选择
        </div>
        <div className={styles["setting-mode-context"]}>
          {GameMode.map((item, index) => (
            <span
              className={styles["setting-mode-sort"]}
              key={item.type}
              onClick={() => handleSelectMode(index)}
            >
              <i className={`iconfont ${icons[index]}`} />
              {item.type}
            </span>
          ))}
        </div>
      </div>
      <div className={styles["setting-defined"]}>
        <div className={styles["setting-label"]}>
          <i className={`iconfont icon-tiaojiemoshi`} />
          难度设置
        </div>
        <ul className={styles["setting-defined-list"]}>
          <li>
            <span className={styles["setting-label"]}>
              当前个数: <i>{values.Sort * 3}</i>
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
              当前层数: <i>{values.Layers}</i>
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={1}
                max={20}
                value={values.Layers}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Sort:
                      calcMaxNum(values.Row, values.Col, values.Layers) / 3 <
                      values.Sort
                        ? calcMaxNum(values.Row, values.Col, values.Layers) / 3
                        : values.Sort,
                    Layers: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
          <li>
            <span className={styles["setting-label"]}>
              当前行数: <i>{values.Row}</i>
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={2}
                max={300 / setting.GridSize}
                value={values.Row}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Sort:
                      calcMaxNum(value, values.Col, values.Layers) / 3 <
                      values.Sort
                        ? calcMaxNum(value, values.Col, values.Layers) / 3
                        : values.Sort,
                    Row: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
          <li>
            <span className={styles["setting-label"]}>
              当前列数: <i>{values.Col}</i>
            </span>
            <div className={styles["setting-slider"]}>
              <Slider
                min={2}
                max={300 / setting.GridSize}
                value={values.Col}
                onChange={(value: number) =>
                  setvalues({
                    ...values,
                    Sort:
                      calcMaxNum(values.Row, value, values.Layers) / 3 <
                      values.Sort
                        ? calcMaxNum(values.Row, value, values.Layers) / 3
                        : values.Sort,
                    Col: value,
                  })
                }
                step={1}
              />
            </div>
          </li>
        </ul>
        <div className={styles["setting-defined-btn"]}>
          <Button onClick={handleSaveDefinedSetting}>保存难度设置</Button>
        </div>
      </div>
      <div className={styles["setting-imgs"]}>
        <div className={styles["setting-label"]}>
          <i className={`iconfont icon-tupiantianjia`} />
          图片设置
        </div>
        <div className={styles["setting-imgs-context"]}>
          <div className={styles["setting-imgs-notice"]}>
            注意:必须一次性上传十二张图片,只支持jpg、jpeg、png格式,页面刷新后生效
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleUpLoadImg}
          ></input>
          <div>
            {imgFiles.map((item) => (
              <img src={item} alt="" width={30} height={30} key={item} />
            ))}
          </div>
        </div>

        <div className={styles["setting-imgs-clear"]}>
          <Button onClick={handleClearImg}>清除图片设置</Button>
        </div>
      </div>
    </div>
  );
}

export default connect(({ setting }: { setting: GameSetting }) => ({
  setting,
}))(index);
