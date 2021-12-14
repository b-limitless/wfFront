import { ETheme, TSelectOption } from "@wf-org/trolly.common";

export type TFieldConditions = {
  min?: number;
  max?: number;
  isPercentage?: boolean;
};

export type TResult = {
  [key: string]: string;
};

export interface IFieldGroupProps {
  options?: TSelectOption[];
  optionsLabel?: string;
  optionsTitle?: string;
  optionsPlaceholder?: string;
  inputPlaceholder?: string;
  inputLabel?: string;
  inputTitle?: string;
  spacing?: string;
  fontSize?: string;
  titleColor?: string;
  fontWeight?: number;
  conditions?: TFieldConditions;
  addButtonLabel?: string;
  removeButtonLabel?: string;
  color?: ETheme;
  values?: TResult[];
  error?: boolean;
  errorMessage?: string;
  onChange?: (values: any[] | null) => void;
  optionKey?: string;
  valueKey?: string;
}
