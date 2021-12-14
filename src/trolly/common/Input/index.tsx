import React, { useMemo } from "react";
import FormControl from "@material-ui/core/FormControl";
import {
  useFormHelperTextStyles,
  useFormControlStyles,
  useStyledInputAdorment,
} from "./Input.style";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { IProps } from "./Input.interface";
import {
  useStyleFilledInput,
  useStyleOutlinedInput,
  useStyleLabelInput,
} from "../common.style";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const Input: React.FC<IProps> = (props) => {
  const {
    error,
    fullWidth,
    id,
    label,
    errorMessage,
    errorId,
    unit,
    formControlMargin,
    unitPosition,
    color,
    disableUnderline,
    fontSize,
    fontWeight,
    fontColor,
    variant,
    errorMaxWidth,
    errorMinWidth,
    errorFontSize,
    round,
    ...rest
  } = props;
  const { root, inputStyle } = useFormControlStyles({ formControlMargin });

  // error text styles
  const helperTextClasses = useFormHelperTextStyles({
    maxWidth: errorMaxWidth,
    minWidth: errorMinWidth,
    fontSize: errorFontSize,
  });

  // filled input styles
  const fileldInputClasses = useStyleFilledInput({
    ...props,
    isLabeled: label ? true : false,
    round,
  });

  // outlined input style
  const outlinedInputClasses = useStyleOutlinedInput({
    ...props,
    isLabeled: label ? true : false,
    round,
  });

  //label input style
  const labelInputFilledClasses = useStyleLabelInput({
    ...props,
    inputVariant: "filled",
    round,
  });

  //label input style outlined
  const labelInputOutlinedClasses = useStyleLabelInput({
    ...props,
    inputVariant: "outlined",
    round,
  });

  //input adornment styles
  const inputAdornmentClasses = useStyledInputAdorment({
    ...props,
  });

  const unitProps = useMemo(() => {
    let props = {
      disableUnderline: error ? false : disableUnderline,
    } as any;
    if (unit) {
      if (unitPosition === "end") {
        props = {
          ...props,
          endAdornment: (
            <InputAdornment position="start" classes={inputAdornmentClasses}>
              {unit}
            </InputAdornment>
          ),
        };
      } else {
        props = {
          ...props,
          startAdornment: (
            <InputAdornment position="start" classes={inputAdornmentClasses}>
              {unit}
            </InputAdornment>
          ),
        };
      }
    }
    return props;
  }, [unit, unitPosition, error, disableUnderline, inputAdornmentClasses]);

  // memoize the input component
  const inputComponent = useMemo(() => {
    if (variant === "filled") {
      return (
        <FilledInput
          id={id}
          color={color}
          classes={fileldInputClasses}
          inputProps={{
            className: inputStyle,
          }}
          {...rest}
          {...unitProps}
        />
      );
    }
    return (
      <OutlinedInput
        id={id}
        color={error ? "primary" : color}
        classes={outlinedInputClasses}
        label={label}
        inputProps={{
          className: inputStyle,
        }}
        {...rest}
        {...unitProps}
      />
    );
  }, [
    color,
    id,
    fileldInputClasses,
    outlinedInputClasses,
    rest,
    inputStyle,
    unitProps,
    variant,
    label,
    error,
  ]);

  return (
    <FormControl
      variant="filled"
      error={error}
      fullWidth={fullWidth}
      classes={{ root }}
    >
      {label && (
        <InputLabel
          variant={variant}
          error={error}
          color={color}
          htmlFor={id}
          classes={
            variant === "filled"
              ? labelInputFilledClasses
              : labelInputOutlinedClasses
          }
        >
          {label}
        </InputLabel>
      )}
      {inputComponent}
      {error && (
        <FormHelperText
          classes={helperTextClasses}
          variant="filled"
          id={errorId}
          error={true}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

Input.defaultProps = {
  fullWidth: true,
  id: "input-initial-component",
  error: false,
  errorId: "component-error-text",
  errorMessage: "error",
  type: "text",
  disabled: false,
  disableUnderline: true,
  variant: "filled",
};

export default Input;
