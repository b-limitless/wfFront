import {
  PaletteProps,
  SpacingProps,
  DisplayProps,
  GridProps,
  PositionsProps,
  ShadowsProps,
  BordersProps,
  SizingProps,
  FlexboxProps,
} from "@material-ui/system";
import { ReactElement } from "react";

interface IStyle
  extends PaletteProps,
    SpacingProps,
    DisplayProps,
    GridProps,
    PositionsProps,
    ShadowsProps,
    BordersProps,
    SizingProps,
    FlexboxProps,
    ShadowsProps {
  id?: string;
  ref?: any;
  className?: any;
}

export interface ICardProps extends IStyle {
  actions?: ReactElement;
  actionsWrapperStyles?: IStyle;
}
