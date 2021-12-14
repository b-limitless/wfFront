import { ButtonProps } from "@material-ui/core/Button";

type ELoaderVariant = "linear" | "circular" | "default";
export interface IProps extends ButtonProps {
  isLoading?: boolean;
  disableShrink?: boolean;
  round?: boolean;
  fontSize?: string;
  fontWeight?: number;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  loaderVariant?: ELoaderVariant;
  loaderWithLogo?: boolean;
  component?: string;
  padding?: string;
  margin?: string;
  customVariant?: "white" | "danger";
  borderRadius?: string | number;
  wrapperPadding?: string | number;
  wrapperClassName?: string;
}
