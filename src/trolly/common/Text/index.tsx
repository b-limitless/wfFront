import React from "react";
import {
  compose,
  spacing,
  typography,
  sizing,
  display,
  flexbox,
  grid,
  GridProps,
  FlexboxProps,
  SpacingProps,
  DisplayProps,
  palette,
  PaletteProps,
  TypographyProps,
  SizingProps,
} from "@material-ui/system";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export type TVariantTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "inherit"
  | "overline";

const DumpText = styled(Typography)(
  compose(spacing, typography, sizing, palette, display, flexbox, grid)
);

export interface ITextProps
  extends SpacingProps,
    TypographyProps,
    SizingProps,
    DisplayProps,
    FlexboxProps,
    GridProps,
    PaletteProps {
  noWrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: TVariantTypes;
}
export const Text: React.FC<ITextProps> = ({ children, noWrap, ...rest }) => {
  return (
    <DumpText gutterBottom={false} noWrap={noWrap} {...rest}>
      {children}
    </DumpText>
  );
};

Text.defaultProps = {
  color: "text.primary",
  noWrap: false,
};

export default Text;