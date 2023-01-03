import { MouseEventHandler, ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
