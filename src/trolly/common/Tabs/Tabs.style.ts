import { makeStyles, Theme } from "@material-ui/core";
import { ETheme, TAligments } from "..";

export interface ITabsStyle {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  height?: string;
  repeat?: number;
  theme?: ETheme;
  fontSize?: string;
  fontWeight?: number;
  fontColor?: string;
  padding?: string;
  tabMarginRight?: string;
  numOfTabs?: number;
  tabWidth?: any;
  wrapperAlignment?: TAligments;
  wrapperDisplay?: "flex" | "grid";
  wrapperPadding?: string;
}
export const useStyledOutlinedTabs = makeStyles((theme) => ({
  flexContainer: {
    boxShadow: "none",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: ({ theme: color }: ITabsStyle) =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    width: "fit-content",
    justifyContent: ({ wrapperAlignment = "flex-start" }: ITabsStyle) =>
      wrapperAlignment,
    display: ({ wrapperDisplay = "flex" }: ITabsStyle) => wrapperDisplay,
    borderRadius: theme.shape.borderRadius,
  },
  indicator: {
    width: "100%",
    display: "none",
  },
}));

export const useStyledOutlinedTab = makeStyles((theme: Theme) => ({
  root: {
    minWidth: ({ minWidth = "auto" }: ITabsStyle) => `${minWidth} !important`,
    maxWidth: ({ maxWidth = "auto" }) => `${maxWidth} !important`,
    minHeight: ({ minHeight = "auto" }) => `${minHeight} !important`,
    maxHeight: ({ maxHeight = "auto" }) => `${maxHeight} !important`,
    height: ({ height = "auto" }) => `${height} !important`,
    width: ({ width = "auto" }) => `${width} !important`,
    fontSize: ({ fontSize = "13px" }) => fontSize,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    padding: ({ padding = "8px" }) => `${padding} !important`,
    color: ({ fontColor = theme.palette.text.secondary }) => fontColor,
    borderRightWidth: "2px",
    borderRightColor: ({ theme: color }: ITabsStyle) =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    borderRightStyle: "solid",
    "&:last-child": {
      border: "none",
    },
    "&:focus": {
      outline: "none",
    },
    outline: "none",
  },
  selected: {
    backgroundColor: ({ theme: color }: ITabsStyle) =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    color: `${theme.palette.common.white} !important`,
    transition: "all 300ms cubic-bezier(0.41, 0.5, 0.2, 1)",
  },
}));

export const useStyledFilledTabs = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  flexContainer: {
    width: ({ width = "fit-content" }) => width,
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    padding: ({ wrapperPadding = "7px 4px" }) => wrapperPadding,
    borderRadius: theme.shape.borderRadius,
    gridTemplateColumns: ({ repeat }: ITabsStyle) =>
      repeat ? `repeat(${repeat}, 1fr)` : "repeat(3, 1fr)",
    display: "grid",
  },
  fixed: {
    display: ({ wrapperDisplay = "grid" }) => wrapperDisplay,
    justifyContent: ({ wrapperAlignment = "flex-start" }) => wrapperAlignment,
  },
  indicator: {
    width: "100%",
    display: "none",
  },
}));

export const useStyledFilledTab = makeStyles((theme: Theme) => ({
  root: {
    minWidth: ({ minWidth = "auto" }: ITabsStyle) => `${minWidth} !important`,
    maxWidth: ({ maxWidth = "auto" }) => `${maxWidth} !important`,
    minHeight: ({ minHeight = "auto" }) => `${minHeight} !important`,
    maxHeight: ({ maxHeight = "auto" }) => `${maxHeight} !important`,
    height: ({ height = "auto" }) => `${height} !important`,
    width: ({ width = "auto" }) => `${width} !important`,
    fontSize: ({ fontSize = "13px" }) => fontSize,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    padding: ({ padding = "8px" }) => `${padding} !important`,
    color: ({ fontColor = theme.palette.text.secondary }) => fontColor,
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  selected: {
    backgroundColor: ({ theme: color }: ITabsStyle) =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    color: `${theme.palette.common.white} !important`,
    transition: "all 300ms cubic-bezier(0.41, 0.5, 0.2, 1)",
    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.04)",
    borderRadius: theme.shape.borderRadius,
    outline: "none",
  },
}));

export const useStyledDefaultTabs = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    boxShadow: "none",
    "& .MuiTabs-scroller": {
      overflow: "scroll !important",
    },
  },
  flexContainer: {
    width: ({ width = "fit-content" }) => width,
    justifyContent: ({ wrapperAlignment = "flex-start" }: ITabsStyle) =>
      wrapperAlignment,
  },
  fixed: {
    display: "flex",
    justifyContent: ({ wrapperAlignment = "flex-start" }: ITabsStyle) =>
      wrapperAlignment,
  },
  indicator: {
    color: theme.palette.primary.light,
  },
}));

export const useStyledDefaultTab = makeStyles((theme: Theme) => ({
  root: {
    minWidth: ({ minWidth = "auto" }: ITabsStyle) => `${minWidth} !important`,
    maxWidth: ({ maxWidth = "auto" }) => `${maxWidth} !important`,
    minHeight: ({ minHeight = "auto" }) => `${minHeight} !important`,
    maxHeight: ({ maxHeight = "auto" }) => `${maxHeight} !important`,
    height: ({ height = "auto" }) => `${height} !important`,
    width: ({ numOfTabs = 1, tabWidth }) =>
      tabWidth ? tabWidth : `calc(100%/${numOfTabs}.6) !important`,
    fontSize: ({ fontSize = "13px" }) => fontSize,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    padding: ({ padding = "8px" }) => `${padding} !important`,
    color: ({ fontColor = theme.palette.text.secondary }) => fontColor,
    textTransform: "none",
    marginRight: ({ tabMarginRight = "30px" }) => tabMarginRight,
    letterSpacing: "0.8px",
    "&:last-child": {
      marginRight: "0px",
    },
    "&:focus": {
      outline: "none",
    },
  },
  textColorSecondary: {
    color: theme.palette.common.black,
  },
  selected: {
    color: `${theme.palette.common.black} !important`,
    outline: "none",
  },
}));
