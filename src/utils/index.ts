//默认游戏难度
const DefaultGameMode = {
  Sort: 40,
  Layers: 5,
  Row: 8,
  Col: 8,
};
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
    setting: DefaultGameMode,
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
      Sort: 223,
      Layers: 20,
      Row: 10,
      Col: 10,
    },
  },
];
//默认格子大小设置(同时去@/global修改GridSize)
const GridSize = 30;

//防抖函数
function debounce(fn: Function, delay = 500) {
  // timer 是在闭包中的
  let timer: string | number | NodeJS.Timeout | null | undefined = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

export { debounce, DefaultGameMode, GameMode, GridSize };
