import React, { ReactNode } from "react";
import {
  EPositions,
  ETheme,
  EInputSize,
  EInputVariant,
} from "../common.interface";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab/useAutocomplete";
import { IInputStyle } from "../common.style";
import { AutocompleteRenderOptionState } from "@material-ui/lab";

export type variant = "search" | "default" | "native";

export type TSelectOption = {
  label: string;
  value: any;
  iso2?: string;
};
export interface ISelectProps extends IInputStyle {
  label?: string;
  errorMessage?: string;
  errorId?: string;
  error?: boolean;
  color?: ETheme;
  unit?: string | ReactNode;
  formControlMargin?: string;
  unitPosition?: EPositions;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: TSelectOption | TSelectOption[] | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TSelectOption> | undefined
  ) => void;
  onNativeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nativeValue?: string;
  value?: TSelectOption[] | TSelectOption | null;
  inputValue?: string | undefined;
  multiple?: boolean;
  limitTags?: number;
  variant?: variant;
  includeInputInList?: boolean;
  loading?: boolean;
  loadingText?: ReactNode;
  options: TSelectOption[];
  withCountryFlagLabel?: boolean;
  withCountryFlagList?: boolean;
  groupBy?: (option: TSelectOption) => string;
  defaultValue?: TSelectOption[] | TSelectOption | null;
  noCloseIcon?: boolean;
  listItemFontSize?: string;
  listItemFontWeight?: number;
  virtualizedListItemStyles?: React.CSSProperties;
  id?: string;
  name?: string;
  withSpacing?: boolean;
  inputVariant?: EInputVariant;
  inputSize?: EInputSize;
  listWidth?: string;
  customRenderOption?: (
    option: TSelectOption,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  searchIconPosition?: EPositions;
  searchIconSpacing?: string;
  disabled?: boolean;
  round?: boolean;
}