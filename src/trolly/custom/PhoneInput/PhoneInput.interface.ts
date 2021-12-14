import { EInputSize, EInputVariant, ETheme } from "@wf-org/trolly.common";

export type TPhoneOption = {
  label: string;
  value: string;
  iso2: string;
  codeNumber: string;
};

export interface IPhoneInputProps {
  options: TPhoneOption[];
  codeLabel?: string;
  phoneLabel?: string;
  withCountryFlagList?: boolean;
  withCountryFlagLabel?: boolean;
  gridTemplateColumns?: string | string[];
  gridColumnGap?: string;
  gridGap?: string;
  gridRowGap?: string;
  onChange?: (
    phone?: string,
    code?: string,
    codeOption?: TPhoneOption,
    fullPhone?: string
  ) => void;
  phone?: string;
  code?: string;
  error?: boolean;
  errorMessage?: string;
  fontSize?: string;
  fontWeight?: number;
  color?: ETheme;
  variant?: EInputVariant;
  phoneName?: string;
  codeName?: string;
  size?: EInputSize;
  disableCode?: boolean;
  disablePhone?: boolean;
}
