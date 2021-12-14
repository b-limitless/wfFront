import { makeStyles, Theme } from "@material-ui/core";
import { IProps } from "./Link.interface";

export const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    cursor: ({ disabled }) => (disabled ? "unset" : "pointer"),
    textAlign: "center",
  },
  navigationLinkPrimary: {
    whiteSpace: ({ noWrap }) => (noWrap ? "nowrap" : "normal"),
    textDecoration: "none",
    textAlign: "center",
    color: ({ variant, fontColor, disabled }) =>
      disabled
        ? palette.text.disabled
        : variant === "default"
        ? palette.primary.main
        : fontColor || palette.text.secondary,
    "&:hover": {
      color: palette.primary.dark,
    },
  },
  navigationLinkSecondary: {
    whiteSpace: ({ noWrap }) => (noWrap ? "nowrap" : "normal"),
    textDecoration: "none",
    textAlign: "center",
    color: ({ variant, fontColor, disabled }) =>
      disabled
        ? palette.text.disabled
        : variant === "default"
        ? palette.secondary.main
        : fontColor || palette.text.secondary,
    "&:hover": {
      color: palette.secondary.dark,
    },
  },
  navigationLinkDanger: {
    whiteSpace: ({ noWrap }) => (noWrap ? "nowrap" : "normal"),
    textDecoration: "none",
    textAlign: "center",
    color: ({ disabled }) =>
      disabled ? palette.text.disabled : palette.error.main,
    "&:hover": {
      color: palette.error.dark,
    },
  },
  navigationLink: {
    textAlign: "center",
    textDecoration: "none",
    whiteSpace: ({ noWrap }) => (noWrap ? "nowrap" : "normal"),
    color: ({ color, fontColor, disabled }: IProps) =>
      disabled
        ? palette.text.disabled
        : color === "footer"
        ? "#A7BBD2"
        : fontColor
        ? fontColor
        : "#323C47",
    "&:hover": {
      color: ({ color }: IProps) =>
        color === "footer" ? palette.common.white : palette.primary.light,
    },
  },
  activeNavigationLink: {
    color: ({ color }) => {
      switch (color) {
        case "footer":
          return palette.common.white;
        case "secondary":
          return palette.secondary.main;
        default:
          return palette.primary.main;
      }
    },
    "&:hover": {
      color: ({ color }) => {
        switch (color) {
          case "footer":
            return palette.common.white;
          case "secondary":
            return palette.secondary.main;
          default:
            return palette.primary.main;
        }
      },
    },
  },
}));
