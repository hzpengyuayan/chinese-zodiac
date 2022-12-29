// 卡片节点类型
type CardNode = {
  id: string; // 节点id zIndex-index
  type: number; // 类型
  zIndex: number; // 图层
  index: number; // 所在图层中的索引
  parents: CardNode[]; // 父节点
  row: number; // 行
  column: number; // 列
  top: number;
  left: number;
  state: number; // 0：可点击 1：不可点击 2：已选 3：已消除
};
