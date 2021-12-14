import { TooltipProps } from "@material-ui/core/Tooltip";
import React from "react";
import { EPositions, ESize, ETheme } from "../common.interface";

export type TAligments = "flex-start" | "center" | "flex-end";
export interface IProps extends TooltipProps {
  iconPlacement?: EPositions;
  withHelpIcon?: boolean;
  wrapperAlignment?: TAligments;
  wrapperMargin?: string;
  wrapperWidth?: string;
  isIconOnly?: boolean;
  color?: ETheme | string;
  iconSize?: ESize;
  width?: string;
  height?: string;
  icon?: React.ReactElement;
}
