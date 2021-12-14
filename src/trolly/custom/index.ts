import { IProps as ICheckboxGroupProps } from "./CheckboxGroup/CheckboxGroup.interface";
import { TRoute, IProps as IHeaderProps } from "./Header/Header.interface";
import { TGroupOption, ELayouts } from "./custom.interface";
import { IProps as IRadioGroupProps } from "./RadioGroup/RadioGroup.interface";
import {
  TPhoneOption,
  IPhoneInputProps,
} from "./PhoneInput/PhoneInput.interface";
import {
  IFieldGroupProps,
  TFieldConditions,
  TResult,
} from "./FieldGroup/FieldGroup.interface";
import { IIndicatorProps } from "./Indicator";
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as PageLoader } from "./PageLoader";
export { default as CheckboxGroup } from "./CheckboxGroup";
export { default as RadioGroup } from "./RadioGroup";
export { default as ErrorPageComponent } from "./ErrorPageComponent";
export { default as PhoneInput } from "./PhoneInput";
export { default as FieldGroup } from "./FieldGroup";
export { default as Indicator } from "./Indicator";
export { default as PasswordInput } from "./PasswordInput";
export type {
  ELayouts,
  ICheckboxGroupProps,
  IHeaderProps,
  TGroupOption,
  TRoute,
  IRadioGroupProps,
  IPhoneInputProps,
  TPhoneOption,
  IFieldGroupProps,
  TFieldConditions,
  TResult,
  IIndicatorProps,
};
