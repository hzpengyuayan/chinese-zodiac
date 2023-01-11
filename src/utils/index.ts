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

//存入本地localStorage的key
function set(key: string, value: any) {
  let curtime = new Date().getTime(); //获取当前时间
  localStorage.setItem(key, JSON.stringify({ val: value, time: curtime })); //转换成json字符串序列
}

//取出本地localStorage的key
function get(key: string, exp: number) {
  //exp是设置的过期时间
  let val = localStorage.getItem(key);
  let dataobj = JSON.parse(val) || {};
  if (dataobj.hasOwnProperty("time")) {
    return new Date().getTime() - dataobj?.time > exp
      ? alert("图片已过有效期限，重新使用默认图片")
      : dataobj.val;
  }
}

function clear(key: string) {
  localStorage.removeItem(key);
}

export { debounce, DefaultGameMode, GameMode, GridSize, set, get,clear};
