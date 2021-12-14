import { Dispatch, SetStateAction } from "react";
import { ETheme } from "@wf-org/trolly.common";
import { TField, TOtherValue } from "../OnboardingProcess.interface";

export interface IFieldRendererProps {
  field: TField;
  value?: any;
  phoneValue?: any;
  codeValue?: any;
  animationIndex?: number;
  options?: any;
  theme?: ETheme;
  onChange?: (option: any, keys?: string[]) => void;
  errors: { [key: string]: boolean };
  setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setOtherValues: (otherValues: TOtherValue, changedValue?: any) => void;
}
