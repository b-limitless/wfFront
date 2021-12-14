import Dialog from "@material-ui/core/Dialog";
import {
  spacing,
  palette,
  sizing,
  display,
  borders,
  flexbox,
  grid,
  positions,
  shadows,
  compose,
} from "@material-ui/system";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { styled, makeStyles, Theme } from "@material-ui/core/styles";
import { IDialogProps } from "..";

export const useDialogStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    boxShadow: ({ boxShadow }: IDialogProps & { isMobile?: boolean }) =>
      boxShadow,
    borderRadius: ({ borderRadius, isMobile }) =>
      isMobile ? "0px" : borderRadius,
    padding: ({ padding, withColoredHeader }) =>
      withColoredHeader ? "0px" : padding,
    maxWidth: ({ isMobile, screenMaxWidth = "auto" }) =>
      isMobile ? "100%" : screenMaxWidth,
    minWidth: ({ screenMinWidth = "auto", isMobile }) =>
      isMobile ? "100%" : screenMinWidth,
    minHeight: ({ screenMinHeight = "auto", isMobile }) =>
      isMobile ? "100%" : screenMinHeight,
    maxHeight: ({ screenMaxHeight = "auto", isMobile }) =>
      isMobile ? "100%" : screenMaxHeight,
    width: ({ isMobile, screenWidth = "auto" }) =>
      isMobile ? "100%" : screenWidth,
    height: ({ isMobile, screenHeight = "auto" }) =>
      isMobile ? "100%" : screenHeight,
  },
  closeIcon: {
    color: ({ withColoredHeader }) =>
      withColoredHeader ? palette.common.white : "inherit",
  },
  closeIconButtonBase: {
    marginLeft: ({ closeIconPosition }) =>
      closeIconPosition === "start" ? "0px" : "8px",
    marginRight: ({ closeIconPosition }) =>
      closeIconPosition === "start" ? "8px" : "0px",
  },
}));

export const useDialogTitleStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    color: theme.palette.common.white,
    backgroundColor: ({ withColoredHeader, color }: IDialogProps) => {
      if (withColoredHeader) {
        switch (color) {
          case "primary":
            return theme.palette.primary.main;
          case "secondary":
            return theme.palette.secondary.main;
          case "danger":
            return theme.palette.error.main;
          default:
            return "inherit";
        }
      }
      return "inherit";
    },
    padding: ({ titlePadding = "0px" }) => `${titlePadding} !important`,
    "& h2": {
      width: "100%",
      alignItems: "center",
      display: "flex",
      justifyContent: ({ closeIconPosition, dialogTitle }: IDialogProps) =>
        dialogTitle
          ? "space-between"
          : closeIconPosition === "start"
          ? "flex-start"
          : "flex-end",
    },
  },
}));
export const StyledDialog = styled(Dialog)(
  compose(
    palette,
    spacing,
    borders,
    display,
    sizing,
    grid,
    flexbox,
    positions,
    shadows
  )
);
export const StyledDialogActions = styled(DialogActions)(
  compose(palette, spacing, borders, display, sizing, grid, flexbox, positions)
);

export const StyleDialogContent = styled(DialogContent)(
  compose(
    palette,
    spacing,
    borders,
    display,
    sizing,
    grid,
    flexbox,
    positions,
    shadows
  )
);
