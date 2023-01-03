export interface Props {
  min: number;
  max: number;
  value: number;
  step?: number; //默认为1
  onChange?: Function;
}
