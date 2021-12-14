import { SlideProps } from "@material-ui/core/Slide";
import { ZoomProps } from "@material-ui/core/Zoom";
import { FadeProps } from "@material-ui/core/Fade";
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
import { EPositions, ETheme } from "..";

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
    ShadowsProps {}

export type TAnimationVariant = "slide" | "fade" | "zoom";

export interface ITransitionCompProps
  extends SlideProps,
    ZoomProps,
    FadeProps {}
export interface IDialogProps extends IStyle {
  actions?: ReactElement;
  dialogTitle?: ReactElement;
  actionsWrapperStyles?: IStyle;
  contentWrapperStyles?: IStyle;
  open: boolean;
  fullScreen?: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  onBackdropClick?: React.ReactEventHandler<{}>;
  withCloseIcon?: boolean;
  withAnimation?: boolean;
  animationVariant?: TAnimationVariant;
  transitionProps?: ITransitionCompProps;
  closeIconPosition?: EPositions;
  withColoredHeader?: boolean;
  color?: ETheme | "danger";
  titlePadding?: string;
  fullWidth?: boolean;
  screenMinWidth?: string;
  screenMaxWidth?: string;
  screenMinHeight?: string;
  screenMaxHeight?: string;
  screenWidth?: string;
  screenHeight?: string;
}
