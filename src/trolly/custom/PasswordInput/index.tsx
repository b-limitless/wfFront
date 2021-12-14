import { Input, IInputProps } from "@wf-org/trolly.common";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";

const PasswordField: React.FC<IInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordField;
