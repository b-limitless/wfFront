import {
  DisplayProps,
  SizingProps,
  SpacingProps,
  TypographyProps,
} from "@material-ui/system";
import { HTMLProps } from "react";

export type ELinkTheme = "primary" | "secondary" | "danger" | "footer";
export type ETextAlign = "center" | "left" | "right";
export type ELinkVariant = "default" | "header";
export interface IProps
  extends SpacingProps,
    TypographyProps,
    SizingProps,
    DisplayProps {
  color?: ELinkTheme;
  styles?: any;
  to?: any;
  href?: string;
  onClick?: () => void;
  variant?: ELinkVariant;
  anchorProps?: HTMLProps<HTMLAnchorElement>;
  noWrap?: boolean;
  className?: string;
  fontColor?: string;
  ref?: any;
  active?: boolean;
  disabled?: boolean;
}
