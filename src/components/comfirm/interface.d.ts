import { MouseEventHandler } from "react";

export interface Props {
  onOk: MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
  okText: string;
  title: string;
}
