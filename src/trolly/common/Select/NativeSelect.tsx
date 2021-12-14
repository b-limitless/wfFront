import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useNativeSelectStyles, useListStyles } from "./Select.style";
import MenuItem from "@material-ui/core/MenuItem";
import { ISelectProps } from "..";
import {
  useStyleFilledInput,
  useStyleOutlinedInput,
  useStyleLabelInput,
} from "../common.style";
import Fade from "@material-ui/core/Fade";
import { SelectProps } from "@material-ui/core/Select";

const NativeSelect: React.FC<ISelectProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (Boolean(anchorEl)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    error,
    errorMessage,
    disableUnderline,
    color,
    label,
    options,
    onNativeChange,
    nativeValue,
    placeholder,
    inputVariant,
    id,
    disabled,
  } = props;

  // filled input styles
  const filledClasses = useStyleFilledInput({
    ...props,
    isLabeled: props.label ? true : false,
  });

  // outlined input styles
  const outlinedClasses = useStyleOutlinedInput({
    ...props,
    isLabeled: props.label ? true : false,
  });

  // native select wrapper styles
  const selectClasses = useNativeSelectStyles(props);

  // list styles
  const { paper, wrapper } = useListStyles(props);

  // common label styles
  const labelFilledClasses = useStyleLabelInput({
    ...props,
    inputVariant: "filled",
  });
  const labelOutlinedClasses = useStyleLabelInput({
    ...props,

    inputVariant: "outlined",
  });

  const commonSelectProps = {
    id,
    helperText: error ? errorMessage : "",
    error,
    inputProps: {
      autoComplete: "new-password",
    },
    InputLabelProps: {
      classes:
        inputVariant === "filled" ? labelFilledClasses : labelOutlinedClasses,
    },
    SelectProps: {
      classes: selectClasses,
      displayEmpty: true,
      MenuProps: {
        open: Boolean(anchorEl),
        id: "customized-menu",
        getContentAnchorEl: null,
        keepMounted: true,
        handleClose,
        anchorEl,
        autoFocus: false,
        transitionDuration: 200,
        TransitionComponent: Fade,
        MenuListProps: {
          disableListWrap: true,
          disabledItemsFocusable: true,
        },
        PaperProps: {
          className: paper,
        },
        anchorOrigin: {
          vertical: "bottom" as any,
          horizontal: "center" as any,
        },
        transformOrigin: {
          vertical: "top" as any,
          horizontal: "center" as any,
        },
      },
    } as SelectProps,
    label,
    placeholder,
    color: error && inputVariant === "filled" ? "primary" : color,
    onChange: onNativeChange,
    value: nativeValue,
    name: props.name,
  };

  if (inputVariant === "filled") {
    return (
      <TextField
        {...commonSelectProps}
        area-controls="customized-menu"
        className={wrapper}
        select
        InputProps={{
          disableUnderline: error ? false : disableUnderline,
          error: error,
          classes: filledClasses,
          disabled,
          onClick: handleClick,
        }}
        variant="filled"
      >
        {options.map(({ label, value }) => (
          <MenuItem disableTouchRipple disableRipple key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  return (
    <TextField
      {...commonSelectProps}
      area-controls="customized-menu"
      className={wrapper}
      InputProps={{
        error: error,
        classes: outlinedClasses,
        disabled,
        onClick: handleClick,
      }}
      variant="outlined"
      select
    >
      {options.map(({ label, value }) => (
        <MenuItem disableTouchRipple key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default NativeSelect;
