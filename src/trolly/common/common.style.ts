import { makeStyles, Theme } from "@material-ui/core/styles";
import { EInputSize, EInputVariant } from "./common.interface";
export interface IInputStyle {
  fontColor?: string;
  fontSize?: string;
  fontWeight?: number;
  width?: string;
  height?: string;
  disableUnderline?: boolean;
  isSelect?: boolean;
  isLabeled?: boolean;
  inputStartPadding?: string;
  size?: EInputSize;
  inputVariant?: EInputVariant;
  round?: boolean;
  unit?: any;
}

export const useStyleLabelInput = makeStyles(
  ({ palette, breakpoints }: Theme) => ({
    root: {
      fontWeight: 400,
      whiteSpace: "nowrap",
      minHeight: "17px",
      transform: ({ size }: IInputStyle) => {
        switch (size) {
          case "small":
            return "translate(19px, 12px) scale(1) !important";
          case "medium":
            return "translate(19px, 15px) scale(1) !important";
          default:
            return "translate(19px, 19px) scale(1) !important";
        }
      },
      [breakpoints.down("sm")]: {
        maxWidth: "210px",
        overflowX: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    shrink: {
      transform: ({ size, inputVariant, round }) => {
        if (inputVariant === "outlined") {
          if (round) {
            return "translate(28px, -6px) scale(0.75) !important";
          }
          return "translate(14px, -6px) scale(0.75) !important";
        } else {
          switch (size) {
            case "small":
              return "translate(19px, 0px) scale(0.75) !important";
            case "medium":
              return "translate(19px, 2px) scale(0.75) !important";
            default:
              return "translate(19px, 5px) scale(0.75) !important";
          }
        }
      },
      [breakpoints.down("sm")]: {
        maxWidth: "100%",
        overflowX: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    error: {
      color: `${palette.error.main} !important`,
    },
  })
);

export const useStyleFilledInput = makeStyles(({ palette }: Theme) => ({
  root: {
    color: ({ fontColor = palette.common.black }: IInputStyle) => fontColor,
    height: ({ size }) => {
      switch (size) {
        case "small":
          return "40px";
        case "medium":
          return "48px";
        default:
          return "60px";
      }
    },
    backgroundColor: `${palette.background.default} !important`,
    borderBottomRightRadius: ({ disableUnderline }) =>
      disableUnderline ? "4px" : "0px",
    borderBottomLeftRadius: ({ disableUnderline }) =>
      disableUnderline ? "4px" : "0px",
    borderTopRightRadius: "4px",
    borderTopLeftRadius: "4px",
    "&:hover": {
      backgroundColor: `${palette.background.default} !important`,
    },
  },
  input: {
    width: "100%",
    paddingTop: ({ size }) => {
      switch (size) {
        case "small":
          return "14px";
        case "medium":
          return "19px";
        default:
          return "23px";
      }
    },
    paddingBottom: ({ size }) => {
      switch (size) {
        case "small":
          return "10px";
        case "medium":
          return "13px";
        default:
          return "20px";
      }
    },
    paddingLeft: ({ inputStartPadding, unit }) =>
      !!inputStartPadding ? inputStartPadding : !!unit ? "5px" : "19px",
    backgroundColor: `${palette.background.default} !important`,
    fontWeight: ({ fontWeight = 400 }) => fontWeight,
    fontSize: ({ fontSize = "14px" }) => fontSize,
    "&:hover": {
      backgroundColor: `${palette.background.default} !important`,
    },
  },
  focused: {
    backgroundColor: `${palette.background.default} !important`,
  },
}));

export const useStyleOutlinedInput = makeStyles(({ palette }: Theme) => ({
  root: {
    color: ({ fontColor = palette.common.black }: IInputStyle) => fontColor,
    height: ({ size }) => {
      switch (size) {
        case "small":
          return "40px";
        case "medium":
          return "46px";
        default:
          return "54px";
      }
    },
    backgroundColor: "transparent !important",
    borderRadius: ({ round }) => (round ? "50px" : "4px"),
  },
  notchedOutline: {
    padding: ({ round }) => (round ? "0 22px" : "0 8px"),
  },
  input: {
    width: "100%",
    paddingTop: ({ size }) => {
      switch (size) {
        case "small":
          return "11px";
        case "medium":
          return "14px";
        default:
          return "18px";
      }
    },
    paddingBottom: ({ size }) => {
      switch (size) {
        case "small":
          return "11px";
        case "medium":
          return "14px";
        default:
          return "18px";
      }
    },
    paddingLeft: ({ inputStartPadding, unit }) =>
      !!inputStartPadding ? inputStartPadding : !!unit ? "5px" : "19px",
    backgroundColor: "transparent !important",
    fontWeight: ({ fontWeight = 400 }) => fontWeight,
    fontSize: ({ fontSize = "14px" }) => fontSize,
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  focused: {
    backgroundColor: "transparent !important",
  },
}));
