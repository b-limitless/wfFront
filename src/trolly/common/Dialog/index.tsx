import React, { FC, useMemo } from "react";
import {
  StyledDialog,
  StyledDialogActions,
  useDialogStyles,
  useDialogTitleStyles,
  StyleDialogContent,
} from "./Dialog.style";
import {
  IDialogProps,
  ITransitionCompProps,
  TAnimationVariant,
} from "./Dialog.interface";
import { DialogProps } from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";

interface ITransitionProps extends TransitionProps {
  children?: React.ReactElement<any, any>;
  animationVariant?: TAnimationVariant;
  transitionProps?: ITransitionCompProps;
}
const Transition = React.forwardRef(function Transition(
  props: ITransitionProps,
  ref: React.Ref<unknown>
) {
  const { transitionProps = {}, animationVariant } = props;
  if (animationVariant === "fade") {
    return <Fade ref={ref} {...props} {...transitionProps} />;
  } else if (animationVariant === "zoom") {
    return <Zoom ref={ref} {...props} {...transitionProps} />;
  }
  return <Slide direction="up" ref={ref} {...props} {...transitionProps} />;
});

const Dialog: FC<IDialogProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    children,
    actions,
    actionsWrapperStyles,
    contentWrapperStyles,
    padding,
    fullScreen,
    borderRadius,
    withCloseIcon,
    animationVariant,
    withAnimation,
    transitionProps,
    closeIconPosition,
    dialogTitle,
    screenWidth,
    screenHeight,
    onClose,
    ...rest
  } = props;
  const titleClasses = useDialogTitleStyles(props);

  const spacingProps = useMemo(() => {
    if (isMobile) {
      return {
        fullScreen: true,
        padding: "0px",
      };
    }
    return {
      fullScreen,
      padding,
    };
  }, [isMobile, fullScreen, padding]);

  const classes = useDialogStyles({ ...props, isMobile });

  const titleComponent = useMemo(() => {
    if (withCloseIcon && onClose) {
      if (closeIconPosition === "start") {
        return (
          <>
            <IconButton
              onClick={onClose as () => void}
              className={classes.closeIconButtonBase}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
            {dialogTitle}
          </>
        );
      }
      return (
        <>
          {dialogTitle}
          <IconButton
            onClick={onClose as () => void}
            className={classes.closeIconButtonBase}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </>
      );
    } else if (dialogTitle) {
      return dialogTitle;
    }
  }, [closeIconPosition, dialogTitle, onClose, withCloseIcon, classes]);

  return (
    <StyledDialog
      TransitionProps={
        { animationVariant, transitionProps } as ITransitionProps
      }
      TransitionComponent={withAnimation ? Transition : undefined}
      {...rest}
      {...spacingProps}
      fullWidth
      PaperProps={{ classes }}
      maxWidth={"sm" as DialogProps["maxWidth"]}
    >
      {titleComponent && (
        <DialogTitle classes={titleClasses}>{titleComponent}</DialogTitle>
      )}
      <StyleDialogContent {...contentWrapperStyles}>
        {children}
      </StyleDialogContent>
      {actions && (
        <StyledDialogActions {...actionsWrapperStyles}>
          {actions}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};

Dialog.defaultProps = {
  boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.04)",
  borderRadius: "12px",
  padding: "15px",
  withCloseIcon: true,
  contentWrapperStyles: {
    padding: "0px",
    minWidth: "100%",
    maxWidth: "100%",
  },
  closeIconPosition: "end",
};

export default Dialog;
