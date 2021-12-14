import { ETheme } from "..";
import { KeyboardDatePickerProps } from "@material-ui/pickers";
import { EInputVariant } from "../common.interface";

export interface IDatePickerProps extends KeyboardDatePickerProps {
  disableUnderLine?: boolean;
  fontSize?: string;
  fontWeight?: number;
  color?: ETheme;
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  minAge?: number;
  inputVariant?: EInputVariant;
  round?: boolean;
}
