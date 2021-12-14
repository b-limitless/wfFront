import { History } from "history";
import { ReactElement } from "react";
import { ETheme, EPositions } from "../common.interface";
export type TMenuOptions = {
  label: string | ReactElement;
  to?: any;
  onClick?: () => void;
};
export interface IProps {
  options?: TMenuOptions[];
  theme?: ETheme;
  active?: boolean;
  menuLabel: string;
  fontSize?: string;
  fontWeight?: number;
  history: History;
  id?: string;
  withSpacing?: boolean;
  listClasses?: any;
  iconPlacement?: EPositions;
  listTransform?: string;
  listMargin?: string;
  isBottomRounded?: boolean;
  isTopRounded?: boolean;
  listBorderRadius?: string;
  listPadding?: string;
  animation?: "grow" | "fade" | "slide";
  isThemed?: boolean;
}
