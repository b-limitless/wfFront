import { EAnchors } from "@wf-org/trolly.common";
import { History } from "history";
import { EAnimation } from "../custom.interface";

export type TRoute = {
  to: string;
  label: string;
  disabled?: boolean;
};

export interface IProps {
  routes?: TRoute[];
  dropMenuRoutes?: TRoute[];
  menuLabel?: string;
  mobileMenuAnchor?: EAnchors;
  withAppTitle?: boolean;
  disableSwitchProduct?: boolean;
  onLogoClick?: () => void;
  history: History;
  isInvestCreated?: boolean;
  isTradeCreated?: boolean;
  disableMenu?: boolean;
  productSwitchAnimation?: EAnimation;
  menuAnimation?: EAnimation;
  logoVariant?: "app" | "general";
}
