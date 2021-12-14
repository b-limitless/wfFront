import {
  Theme,
  makeStyles,
  withStyles,
  lighten,
} from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { IProps } from "./Button.interface";

export const useButtonStyles = makeStyles(({ shape }: Theme) => ({
  root: {
    boxShadow: "0px",
    textTransform: "none",
    borderRadius: ({ round, borderRadius = 0 }: IProps) =>
      round ? shape.borderRadius : borderRadius,
    fontSize: ({ fontSize = "16px" }) => fontSize,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    width: ({ width = "auto", fullWidth }: IProps) =>
      fullWidth ? "100%" : width,
    height: ({ height = "auto" }) => height,
    maxWidth: ({ maxWidth = "auto" }) => maxWidth,
    minWidth: ({ minWidth = "auto" }) => minWidth,
    padding: ({ padding = "8px 25px" }) => padding,
  },
  loading: {
    borderTopRightRadius: "0px !important",
    borderTopLeftRadius: "0px !important",
  },
}));

export const CustomMuiDangerButton = withStyles(({ palette }: Theme) => ({
  root: {
    backgroundColor: ({ variant }: ButtonProps) =>
      variant === "contained" ? palette.error.main : "transparent",
    border: ({ variant }) =>
      variant === "outlined" ? `1px solid ${palette.error.main}` : "none",
    color: ({ variant }) =>
      variant === "contained" ? palette.common.white : palette.error.main,
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: ({ variant }) => {
        if (variant === "contained") {
          return palette.error.dark;
        }
        return lighten(palette.error.main, 0.96);
      },
      border: ({ variant }) =>
        variant === "outlined" ? `1px solid ${palette.error.dark}` : "none",
      color: ({ variant }) => {
        if (variant === "contained") {
          return palette.common.white;
        }
        return palette.error.main;
      },
    },
  },
}))(Button);

export const CustomMuiWhiteButton = withStyles(({ palette }: Theme) => ({
  root: {
    backgroundColor: palette.common.white,
    border: "none",
    color: ({ color }: ButtonProps) => {
      if (color === "primary") {
        return palette.primary.main;
      }
      return `${palette.secondary.main} !important`;
    },
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: palette.common.white,
      border: "none",
      color: ({ color }) => {
        if (color === "primary") {
          return palette.primary.dark;
        }
        return `${palette.secondary.dark} !important`;
      },
    },
  },
}))(Button);

export const useWrapperStyle = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    width: ({ fullWidth, width = "auto", isLoading }) =>
      fullWidth
        ? "100%"
        : isLoading && width !== "100%"
        ? "fit-content"
        : width,
    margin: ({ margin }: IProps) => margin,
    padding: ({ wrapperPadding }) => wrapperPadding,
  },
  loader: {
    backgroundColor: `${lighten(theme.palette.error.main, 0.6)} !important`,
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));
