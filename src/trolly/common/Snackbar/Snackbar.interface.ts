import { SnackbarProps, SnackbarOrigin } from "@material-ui/core/Snackbar";
export type ESeverity = "success" | "info" | "warning" | "error";
export type EVariant = "standard" | "filled" | "outlined";
export interface IProps extends SnackbarProps, SnackbarOrigin {
  severity: ESeverity;
  variant?: EVariant;
  children?: any;
  handleClose?: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;
}
