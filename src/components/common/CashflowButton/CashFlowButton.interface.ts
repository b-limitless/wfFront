import { ReactElement } from "react";

type IOptionsConfigClick = {
  type?: string;
  dispatchType?: string;
  url?: string;
  clickAction?: () => void;
};
export type IOptionsConfigObj = {
  icon: ReactElement | string;
  title: string;
  subtitle: string[];
  onClick: IOptionsConfigClick;
};
