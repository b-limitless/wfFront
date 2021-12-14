import React from "react";
import {
  compose,
  sizing,
  grid,
  flexbox,
  display,
  palette,
  spacing,
  borders,
  positions,
  shadows,
  typography,
  SizingProps,
  GridProps,
  ShadowsProps,
  FlexboxProps,
  DisplayProps,
  PaletteProps,
  SpacingProps,
  TypographyProps,
  PositionsProps,
  breakpoints,
  BordersProps,
} from "@material-ui/system";
import { styled } from "@material-ui/core/styles";

const StyledBox = styled("div")(
  breakpoints(
    compose(
      sizing,
      grid,
      flexbox,
      display,
      palette,
      spacing,
      typography,
      borders,
      positions,
      shadows
    )
  )
);

export interface IProps
  extends SizingProps,
    GridProps,
    FlexboxProps,
    DisplayProps,
    PaletteProps,
    SpacingProps,
    BordersProps,
    TypographyProps,
    ShadowsProps,
    PositionsProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Box: React.FC<IProps> = React.forwardRef(
  ({ children, display = "grid", id, ...rest }, ref) => {
    // TODO see why some props not being applied
    return (
      <StyledBox display={display} {...rest} ref={ref as any} id={id}>
        {children}
      </StyledBox>
    );
  }
);

export default Box;