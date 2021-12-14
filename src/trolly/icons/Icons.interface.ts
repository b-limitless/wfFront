import { SvgIconProps } from "@material-ui/core/SvgIcon";

export type IconSize = "XS" | "S" | "M" | "L" | "XL" | "CUSTOM";
export type ETheme = "primary" | "secondary";

export type TIconTypes = "Basket" | "BasketOff" | "BigLogo" | "CheckboxChecked" | "CheckboxUnchecked" | "Factor3dLogo" | "HalalLogo" | "IconCards" | "IconDirectDeposit" | "IconLocalTransfer" | "IconOtherOptions" | "IconWireTransfer" | "Invest3dLogo" | "logo" | "LogoCircle" | "MasterCard" | "Question" | "RadioChecked" | "RadioUnchecked" | "RiskLevelLow" | "RiskLevelMedium" | "RiskLevelHigh" | "Strategy" | "StrategyOff" | "Trade3dLogo" | "VisaCard" | "Watchlist" | "WealthfaceCoin" | "WealthfaceProducts";

export interface IProps extends SvgIconProps {
  customColor?: ETheme | string;
  iconSize?: IconSize;
  withPointer?: boolean;
  onClick?: () => void;
  viewBox?: string;
}
