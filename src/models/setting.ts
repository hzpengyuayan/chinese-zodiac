import { DefaultGameMode, GridSize } from "@/utils";
export default {
  namespace: "setting",
  state: {
    GridSize: GridSize, //固定格子大小为30(若改变，需要去src/global.less同步设定gridSize大小)
    ...DefaultGameMode,
  },
  reducers: {
    update(state: any, { payload: updatedSetting }: any) {
      return { ...state, ...updatedSetting };
    },
  },
};
