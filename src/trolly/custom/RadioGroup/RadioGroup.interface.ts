import { RadioProps } from "@material-ui/core/Radio";
import { ESize } from "@wf-org/trolly.common";
import { TGroupOption, ELayouts } from "../custom.interface";

export interface IProps extends RadioProps {
  animationTimeOut?: number;
  withAnimation?: boolean;
  index?: number;
  error?: boolean;
  errorMessage?: string;
  onChangeValue: (value: string | TGroupOption) => void;
  options?: TGroupOption[];
  value?: string;
  layout?: ELayouts;
  radioSize?: ESize;
  width?: string;
  height?: string;
  borderColor?: string;
  labelColor?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
  spacing?: string;
  fontWeight?: number;
  shouldPassOption?: boolean;
}
