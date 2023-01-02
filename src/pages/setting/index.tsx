import styles from './index.less'
import Slider from '@/components/slider'
import { useState } from 'react'

const GameSetting = {
  Sort: 40, //生成多少种生肖（重复也算），生成3*sort个格子
  Layers: 5, //生成几层
  Row: 10, //多少行
  Col: 10, //多少列
}

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
]

const GameMode = [
  {
    type: '简单',
    setting: {},
  },
  {
    type: '中等',
    setting: {},
  },
  {
    type: '困难',
    setting: {},
  },
  {
    type: '地狱',
    setting: {},
  },
]

export default function index() {
  const [mode, setMode] = useState(0) //选择游戏模式
  const [values, setvalues] = useState({
    Sort: 33,
    Layers: 5, //生成几层
    Row: 10, //多少行
    Col: 10, //多少列
  })
  const handleSelectMode = (mode: number) => {
    console.log(mode);
  }

  return (
    <div className={styles['setting']}>
      <div className={styles['setting-mode']}>
        <div className={styles['setting-mode-title']}>模式选择</div>
        <div className={styles['setting-mode-context']}>
          {GameMode.map((item,index) => (
            <span className={styles['setting-mode-sort']} key={item.type} onClick={() => handleSelectMode(index)}>{item.type}</span>
          ))}
        </div>
      </div>
      <div className={styles['setting-defined']}>
        <div className={styles['setting-defined-title']}>自定义设置</div>
        <ul className={styles['setting-defined-list']}>
          <li>
            <span>最大个数:{values.Sort * 3}(个)</span>
            <Slider
              min={3}
              max={999}
              value={values.Sort * 3}
              onChange={(value: number) =>
                setvalues({
                  ...values,
                  Sort: value / 3,
                })
              }
              step={3}
            />
          </li>
          <li>
            <span>最大层数:{values.Layers}(层)</span>
            <Slider
              min={1}
              max={10}
              value={values.Layers}
              onChange={(value: number) =>
                setvalues({
                  ...values,
                  Layers: value,
                })
              }
              step={1}
            />
          </li>
          <li>
            最大行数:{values.Row}(行)
            <Slider
              min={1}
              max={10}
              value={values.Row}
              onChange={(value: number) =>
                setvalues({
                  ...values,
                  Row: value,
                })
              }
              step={1}
            />
          </li>
          <li>
            最大列数:{values.Col}(列)
            <Slider
              min={1}
              max={10}
              value={values.Col}
              onChange={(value: number) =>
                setvalues({
                  ...values,
                  Col: value,
                })
              }
              step={1}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
