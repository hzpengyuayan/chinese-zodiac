export type GridNode = {
  id: string; // 编号 zIndex-row-col
  type: number; // 类型
  zIndex: number; // 图层
  row: number; // 行
  col: number; // 列
  top: number; // 上方偏移量
  left: number; // 左侧偏移量
  state: number; // 0：可点击 1：不可点击 2：已选 3：已消除
};

export type GameSetting = {
  GridSize: number; //固定格子大小为20(若改变，需要去grid组件同步设定gridSize大小)
  Sort: number; //生成多少种生肖（重复也算），生成3*sort个格子
  Layers: number; //层
  Row: number; //行
  Col: number; //列
};
