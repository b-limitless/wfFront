import { AccordionActionsProps } from "@material-ui/core/AccordionActions";
import { AccordionDetailsProps } from "@material-ui/core/AccordionDetails";
import { AccordionProps } from "@material-ui/core/Accordion";
import { AccordionSummaryProps } from "@material-ui/core/AccordionSummary";
import { ReactElement } from "react";

export interface IAccordionStyles {
  color?:
    | "primary.main"
    | "primary.light"
    | "primary.dark"
    | "secondary.main"
    | "secondary.dark"
    | "secondary.light"
    | string;
  borderRadius?: string | number;
  marginOnExpand?: string;
  fontSize?: string | number;
  fontWeight?: number;
  fontColor?: string;
}
export interface IAccordionProps extends AccordionProps, IAccordionStyles {
  accordionSummaryProps?: AccordionSummaryProps;
  accordionActionProps?: AccordionActionsProps;
  accordionDetailsProps?: AccordionDetailsProps;
  summary?: string | ReactElement;
  actions?: ReactElement;
  details?: ReactElement | string;
  panelId?: string;
}
