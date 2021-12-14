import { GrowProps } from "@material-ui/core/Grow";
import { ReactElement } from "react";
import {
  ELayouts,
  TFieldConditions,
  TPhoneOption,
} from "@wf-org/trolly.custom";
import {
  ELinkTheme,
  EPositions,
  ESize,
  ETextAlign,
  ETheme,
  EMaxFileSizeUnit,
  ESeverity,
  TAlertType,
  TSelectOption,
  IButtonProps,
} from "@wf-org/trolly.common";
import {
  DisplayProps,
  GridProps,
  SpacingProps,
  TypographyProps,
  PaletteProps,
  FlexboxProps,
  SizingProps,
  BordersProps,
} from "@material-ui/system";

export type Efields =
  | "text"
  | "radioGroup"
  | "checkbox"
  | "checkboxGroup"
  | "title"
  | "select"
  | "searchableList"
  | "phone"
  | "checkbox"
  | "link"
  | "date"
  | "file"
  | "camera"
  | "fieldGroup"
  | "alert";

export type TOperator = "equal" | "notEqual";

export interface IAnimation extends GrowProps {
  animationTimeOutFixed?: number;
  withAnimation?: boolean;
  index?: number;
}

export interface TStyle
  extends SpacingProps,
    TypographyProps,
    DisplayProps,
    GridProps,
    PaletteProps,
    SizingProps,
    BordersProps,
    FlexboxProps {}
export type TTextType = {
  style?: TStyle;
  text: string;
};

export type THint = {
  header?: TTextType;
  title?: TTextType;
  withAnimation?: boolean;
};

export type TAnswerOption = {
  label: string;
  value: any;
  rank?: number | string;
  amount?: number | string;
};

export type TCondition = {
  keys: string[];
  values: any[];
  operator: TOperator;
  isRoot?: boolean;
};

export type TValidatorByCondition = {
  keys: string[];
  as: { [key: string]: string };
  isRoot?: boolean;
};

export type TValidation = {
  isRequired?: boolean;
  validator?: TValidatorByCondition | string;
  min?: number;
  max?: number;
  minDate?: number;
  maxDate?: number;
  minChars?: number;
  maxChars?: number;
};

export type TInputProps = {
  withAnimation?: boolean;
  animationTimeOut?: number;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  unit?: string;
  size?: ESize;
  fontSize?: string;
  fontWeight?: number;
  spacing?: string;
  fontColor?: string;
  unitPisition?: EPositions;
  variant?: string;
  dateFormat?: string;
  padding?: string;
  margin?: string;
  linkColor?: ELinkTheme;
  linkAlign?: ETextAlign;
  phoneLabel?: string;
  codeLabel?: string;
  withCountryFlagLabel?: boolean;
  withCountryFlagList?: boolean;
  maxFileSize?: number;
  maxFileSizeUnit?: EMaxFileSizeUnit;
  extensions?: string[];
  fileDownloadName?: string;
  fieldGroupInputLabel?: string;
  fieldGroupSelectLabel?: string;
  fieldGroupSelectTitle?: string;
  fieldGroupInputTitle?: string;
  fieldGroupConditions?: TFieldConditions;
  fieldGroupAddButtonLabel?: string;
  fieldGroupRemoveButtonLabel?: string;
  fieldGroupOptionKey?: string;
  fieldGroupValueKey?: string;
  alertSeverity?: ESeverity;
  alertType?: TAlertType;
  disabled?: boolean;
  disableCode?: boolean;
  disablePhone?: boolean;
  groupLayout?: ELayouts;
  listItemFontSize?: string;
  listItemFontWeight?: number;
  html?: any;
  // supported only on checkbox , TODO need to support other fields
  alignItems?: string;
};

export type TDefaultValue = {
  keys?: string[];
  phoneNumberKeys?: string[];
  phoneCodeKeys?: string[];
  value?: string | number | boolean | Date;
  phoneValue?: string;
  codeValue?: string;
  isRoot?: boolean;
  conditions?: TCondition[];
};

export type TTitle = {
  text: string;
  props?: any;
};

export type TFilterOut = {
  conditions?: TCondition[];
  values: string[];
};

export type TOnFailure = {
  clearOnChange?: boolean;
  clearOnRender?: boolean;
};

export type TOtherValue = {
  conditions: TCondition[];
  values: { value: any; keys: string[] }[];
  onFailure?: TOnFailure;
};

export type TField = {
  id: string;
  type: Efields;
  keys?: string[];
  phoneNumberKeys?: string[];
  phoneCodeKeys?: string[];
  changeHandlerType?: "custom";
  validation?: TValidation;
  inputProps: TInputProps;
  optionsKey?: string;
  optionsFilterOut?: TFilterOut;
  defaultValue?: TDefaultValue;
  conditions?: TCondition[];
  title?: TTitle;
  withAnimation?: boolean;
  animationTimeOut?: number;
  linkValue?: string | number | boolean;
  checkedValue?: any;
  unCheckedValue?: any;
  shouldNotClearOnConditions?: boolean;
  style?: TStyle;
  otherValues?: TOtherValue;
};

export type TQuestionBoxContent = {
  style?: TStyle;
  fields: TField[];
};

export type TQuestionData = {
  style?: TStyle;
  conditions?: TCondition[];
  content: TQuestionBoxContent[];
  isBlock?: boolean;
};

export type TLinkStyle = {
  fontSize?: string;
  fontWeight?: number;
  color?: ELinkTheme;
  margin?: string;
};

export type TSkip = {
  couldSkip?: boolean;
  text?: string;
  shouldNotClearData?: boolean;
  style?: TLinkStyle;
};

export type TQuestion = {
  index?: number;
  id?: string;
  header?: TTextType;
  title?: TTextType;
  hint?: THint;
  conditions?: TCondition[];
  skip?: TSkip;
  data?: TQuestionData[];
};

export type TConfig = {
  options: {
    [key: string]: TAnswerOption[];
  };
  [key: string]: any;
};

export interface IOnboarding {
  answers: any;
  questions?: TQuestion[];
  questionIndex: number;
  config?: TConfig;
}

export interface IOnboardingState {
  onBoardingAnswers: IOnboarding;
}

export interface IOnboardingProps {
  questions?: TQuestion[];
  options: {
    [key: string]: TAnswerOption[] | TPhoneOption[] | TSelectOption[];
  };
  theme: ETheme;
  onNext?: (answers: any) => void;
  onBack?: () => void;
  onChange?: (option: any, keys?: string[]) => void;
  onSubmit?: (answers: any) => void;
  onSkip?: (answers: any) => void;
  isProcessing?: boolean;
  processingError?: string;
  onClearProcessingError?: () => void;
  loaderComponent?: ReactElement | null;
  submitButtonProps?: IButtonProps;
  isSkipLoading?: boolean;
}
