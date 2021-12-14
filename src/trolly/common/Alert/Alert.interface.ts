import { AlertProps } from "@material-ui/lab/Alert";

export type TAlertType = "standard" | "text";
export interface IProps extends AlertProps {
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  title?: string;
  width?: string;
  type?: TAlertType;
}
