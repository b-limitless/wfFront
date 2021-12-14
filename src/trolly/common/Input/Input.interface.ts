import { FilledInputProps } from "@material-ui/core/FilledInput";
import { ReactNode } from "react";
import { EInputVariant, EPositions } from "../common.interface";
import { IInputStyle } from "../common.style";

export interface IProps extends FilledInputProps, IInputStyle {
  label?: string;
  errorMessage?: string;
  errorId?: string;
  unit?: string | ReactNode;
  formControlMargin?: string;
  unitPosition?: EPositions;
  variant?: EInputVariant;
  errorMaxWidth?: string;
  errorMinWidth?: string;
  errorFontSize?: string | number;
  round?: boolean;
}
