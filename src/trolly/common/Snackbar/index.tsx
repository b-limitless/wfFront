import React from "react";
import Alert from "../Alert";
import { IProps } from "./Snackbar.interface";
import Snackbar from "@material-ui/core/Snackbar";
import { useStyles } from "./Snackbar.style";

const CustomizedSnackbar: React.FC<IProps> = ({
  open,
  handleClose,
  severity,
  variant,
  action,
  autoHideDuration,
  vertical = "top",
  horizontal = "center",
  title,
  children,
  ...rest
}) => {
  const { root } = useStyles();
  return (
    <div className={root}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        {...rest}
      >
        <Alert
          severity={severity}
          variant={variant}
          action={action}
          title={title}
          onClose={handleClose}
        >
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
};

CustomizedSnackbar.defaultProps = {
  variant: "standard",
};

export default CustomizedSnackbar;
