export type GridNode = {
  id: string; // 编号 zIndex-row-col
  type: number; // 类型
  zIndex: number; // 图层
  row: number; // 行
  column: number; // 列
  top: number; // 上方偏移量
  left: number; // 左侧偏移量
  state: number; // 0：可点击 1：不可点击 2：已选 3：已消除
}
