//游戏设置
// let GameSetting = {
//   GridSize: 20, //固定格子大小为20(若改变，需要去grid组件同步设定gridSize大小)
//   Sort: 40, //生成多少种生肖（重复也算），生成3*sort个格子
//   Layers: 5, //生成几层
//   Row: 10, //多少行
//   Col: 10, //多少列
// };

function debounce(fn:Function, delay = 500) {
  // timer 是在闭包中的
  let timer: string | number | NodeJS.Timeout | null | undefined = null;
  return function() {
      if (timer) {
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
          fn.apply(this, arguments)
          timer = null
      }, delay)
  }
}

export { debounce };
