import { ICheckboxProps } from "@wf-org/trolly.common";
import { TGroupOption, ELayouts } from "../custom.interface";

export interface IProps extends ICheckboxProps {
  animationTimeOut?: number;
  withAnimation?: boolean;
  index?: number;
  error?: boolean;
  errorMessage?: string;
  onChangeValues: (values: string[]) => void;
  options?: TGroupOption[];
  values?: string[];
  layout?: ELayouts;
}
