import "date-fns";
import React, { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  useStyleFilledInput,
  useStyleOutlinedInput,
  useStyleLabelInput,
} from "../common.style";
import { IDatePickerProps } from "./DatePicker.interface";
import { ThemeProvider } from "..";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& button": {
      padding: "0px",
    },
  },
});
const DatePicker: FC<IDatePickerProps> = (props) => {
  const {
    disableUnderLine,
    fullWidth,
    color,
    error,
    errorMessage,
    inputVariant,
    ...rest
  } = props;
  const filledInputClasses = useStyleFilledInput({
    ...props,
    isLabeled: props.label ? true : false,
  });

  const outlinedInputClasses = useStyleOutlinedInput({
    ...props,
    isLabeled: props.label ? true : false,
  });

  const extraTheme = {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            "& .MuiFilledInput-root": {
              backgroundColor: "#F5F6F8 !important",
            },
          },
        },
      },
      MuiPaper: {
        elevation0: {
          borderRadius: 12,
          boxShadow: "0 0 10px rgba(0,0,0, 0.04)",
          overflow: "hidden",
        },
      },
    },
    palette: {
      contrastThreshold: 3,
      primary: {
        light: "#4FA4FD",
        main: color === "primary" ? "#017DFF" : "#60DFC8",
        dark: "#0161C7",
      },
      grey: {
        200: "#C3C3C3",
        100: "#DFDFDF",
        300: "#7F7F7F",
        400: "#808080",
      },
      secondary: {
        light: "#89F4E0",
        main: "#60DFC8",
        dark: "#1BB296",
      },
      warning: {
        main: "#F2C05E",
      },
      text: {
        primary: "#000000",
        secondary: "#898989",
        hint: "#7F7F7F",
        disabled: "#B8B8B8",
      },
      error: {
        light: "#FC6E6E",
        main: "#FF0000",
      },
      success: {
        light: "#2fc716",
        main: "#25AD0E",
        dark: "#228f10",
      },
      background: {
        default: "#F5F6F8",
      },
    },
  };

  const labelClasses = useStyleLabelInput(props);

  const adornmentClasses = useStyles();
  return (
    <ThemeProvider extraTheme={extraTheme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          color={error ? "primary" : color}
          inputVariant={inputVariant}
          fullWidth={fullWidth}
          InputLabelProps={{
            classes: labelClasses,
          }}
          InputProps={{
            autoComplete: "off",
            disableUnderline: error ? false : disableUnderLine,
            fullWidth,
            classes:
              inputVariant === "filled"
                ? filledInputClasses
                : outlinedInputClasses,
          }}
          margin="none"
          id="date-picker-inline"
          error={error}
          helperText={error ? errorMessage : ""}
          InputAdornmentProps={{
            classes: adornmentClasses,
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

DatePicker.defaultProps = {
  disableUnderLine: true,
  fullWidth: true,
  variant: "inline",
  format: "MM/dd/yyyy",
  inputVariant: "filled",
};

export default DatePicker;
