import { makeStyles, Theme } from "@material-ui/core/styles";
import { IProps } from "./Input.interface";
import { EInputVariant } from "../common.interface";

interface IInputAdornmentStyle {
  fontSize?: string;
  fontWeight?: number;
  fontColor?: string;
  adornmentMargin?: string;
  variant?: EInputVariant;
}
export const useFormControlStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    margin: ({ formControlMargin = "0px" }: IProps) => formControlMargin,
  },
  inputStyle: {
    backgroundColor: palette.background.default,
    "&:focus": {
      backgroundColor: palette.background.default,
    },
  },
}));

export const useStyledInputAdorment = makeStyles(({ palette }: Theme) => ({
  root: {
    fontSize: ({ fontSize = "12px" }: IInputAdornmentStyle) => fontSize,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    color: ({ fontColor = palette.text.primary }) => fontColor,
    backgroundColor: "inherit",
    "&:focus": {
      backgroundColor: "inherit",
    },
    "& p": {
      marginBottom: "0px",
    },
  },
  positionStart: {
    margin: ({ adornmentMargin, variant }) => {
      if (adornmentMargin) {
        return adornmentMargin;
      } else {
        return "1px 0 0 0 !important";
      }
    },
  },
}));

export const useFormHelperTextStyles = makeStyles({
  root: {
    maxWidth: ({
      maxWidth = "100%",
    }: {
      maxWidth?: string;
      minWidth?: string;
      fontSize?: string | number;
    }) => maxWidth,
    minWidth: ({ minWidth = "100%" }) => minWidth,
    fontSize: ({ fontSize = "13px" }) => fontSize,
  },
  error: {
    fontWeight: 500,
  },
});
