import { CheckboxProps } from "@material-ui/core/Checkbox";
import { FormControlProps } from "@material-ui/core/FormControl";
import { ILabelProps } from "./Checkbox.style";
import { ESize } from "../common.interface";

export interface IProps extends CheckboxProps, ILabelProps {
  withTooltip?: boolean;
  tooltipTitle?: any;
  withArrow?: boolean;
  wrapperStyle?: any;
  formControlProps?: FormControlProps;
  label?: string;
  checkboxSize?: ESize;
  borderColor?: string;
  inputRef?: React.Ref<any>;
  customColor?: "danger";
}
