import React from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { IAccordionProps } from "./Accordion.interface";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useAccordionStyles, useSummaryStyles } from "./Accordion.style";

const Accordion: React.FC<IAccordionProps> = ({
  accordionActionProps,
  accordionDetailsProps,
  accordionSummaryProps,
  actions,
  color,
  fontSize,
  fontWeight,
  marginOnExpand,
  borderRadius,
  details,
  summary,
  children,
  panelId,
  fontColor,
  classes,
  ...rest
}) => {
  const summaryClasses = useSummaryStyles({
    color,
    fontWeight,
    fontSize,
    borderRadius,
    fontColor,
  });

  const { expanded } = useAccordionStyles({ marginOnExpand });
  return (
    <MuiAccordion classes={{ expanded: expanded, ...classes }} {...rest}>
      {summary && (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${panelId}-control`}
          id={`${panelId}-header`}
          classes={summaryClasses}
          {...accordionSummaryProps}
        >
          {summary}
        </AccordionSummary>
      )}
      <AccordionDetails {...accordionDetailsProps}>{children}</AccordionDetails>
      {actions && (
        <AccordionActions {...accordionActionProps}>{actions}</AccordionActions>
      )}
    </MuiAccordion>
  );
};

Accordion.defaultProps = {
  panelId: "panel",
};

export default Accordion;
