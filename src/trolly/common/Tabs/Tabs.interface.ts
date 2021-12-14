import { TabsProps } from "@material-ui/core/Tabs";
import { TabProps } from "@material-ui/core/Tab";
import { TAligments, TSelectOption } from "..";
import { ITabsStyle } from "./Tabs.style";

export type TTabsVariants = "filled" | "outlined" | "plain" | "default";
export interface ITabsProps extends TabsProps, ITabsStyle {
  tabsVariant?: TTabsVariants;
  options: TSelectOption[];
  handleTabClick: (value: string) => void;
  value: string;
  tabProps?: TabProps;
  tabWidth?: any;
  wrapperAlignment?: TAligments;
  wrapperDisplay?: "flex" | "grid";
  wrapperPadding?: string;
}
