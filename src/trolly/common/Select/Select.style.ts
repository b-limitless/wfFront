import { Theme, makeStyles } from "@material-ui/core/styles";
import { EPositions, ETheme } from "..";
import { EInputVariant } from "../common.interface";
import { variant } from "./Select.interface";
import { lighten } from "@material-ui/core/styles/colorManipulator";

interface IStyle {
  width?: string;
  height?: string;
  inputVariant?: EInputVariant;
  color?: ETheme;
  variant?: variant;
  listWidth?: string;
  searchIconSpacing?: string;
  withCountryFlagList?: boolean;
  inputStartPadding?: string;
  searchIconPosition?: EPositions;
}

export const useListStyles = makeStyles((theme: Theme) => ({
  popper: {
    width: ({ listWidth }: IStyle) => `${listWidth} !important`,
  },
  wrapper: {
    width: ({ width = "auto" }) => width,
  },
  paper: {
    padding: "0px",
    borderRadius: "0px !important",
    boxShadow: "0px 0px 16px 0px rgb(0 0 0 / 14%)",
    "& .MuiListItem-root.Mui-selected": {
      color: ({ color = "primary" }) => theme.palette[color].main,
      backgroundColor: ({ color = "primary" }: IStyle) =>
        lighten(theme.palette[color].main, 0.96),
    },
    "& ul": {
      "& li": {
        "&:focus": {
          color: ({ color = "primary" }) => theme.palette[color].main,
          backgroundColor: ({ color = "primary" }: IStyle) =>
            lighten(theme.palette[color].main, 0.96),
          "&:hover": {
            color: ({ color = "primary" }) => theme.palette[color].main,
            backgroundColor: ({ color = "primary" }: IStyle) =>
              lighten(theme.palette[color].main, 0.9),
          },
        },
        "&:hover": {
          backgroundColor: ({ color = "primary" }: IStyle) =>
            lighten(theme.palette[color].main, 0.9),
        },
      },
    },
  },
}));
export const useVirtualizedStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-root": {
      padding: "0px !important",
    },
    width: ({ width = "auto" }: IStyle) => width,
    height: ({ height = "auto" }: IStyle) => height,
  },
  paper: {
    boxShadow: "0px 0px 16px 0px rgb(0 0 0 / 14%)",
  },
  input: {
    height: "100%",
    paddingLeft: ({ inputStartPadding = "19px" }) =>
      `${inputStartPadding} !important`,
    paddingRight: ({ searchIconPosition }) =>
      searchIconPosition === "end" ? "35px !important" : "unset",
    boxSizing: "border-box",
  },
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
  popupIndicatorOpen: {
    transform: ({ variant }: IStyle) =>
      variant === "default" ? "rotate(180deg)" : "none",
  },
  option: {
    '&[data-focus="true"]': {
      backgroundColor: ({ color = "primary" }: IStyle) =>
        lighten(theme.palette[color].main, 0.93),
    },
    '&[aria-selected="true"]': {
      backgroundColor: ({ color = "primary" }: IStyle) =>
        lighten(theme.palette[color].main, 0.89),
      "& p": {
        color: ({ color = "primary", withCountryFlagList }) =>
          withCountryFlagList ? "inherit" : theme.palette[color].main,
      },
    },
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginLeft: ({ searchIconSpacing = "15px" }) => searchIconSpacing,
  },
  inputAdornment: {
    padding: "0px",
    marginTop: "0px !important",
  },
}));

export const useNativeSelectStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    backgroundColor: "inherit",
    "&:focus": {
      backgroundColor: "inherit",
    },
  },
}));
