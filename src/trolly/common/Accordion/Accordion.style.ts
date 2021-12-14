import { makeStyles, Theme } from "@material-ui/core/styles";
import { IAccordionStyles } from "./Accordion.interface";

export const useSummaryStyles = makeStyles(
  ({ palette: { primary, secondary, common } }: Theme) => ({
    root: {
      backgroundColor: ({ color = common.white }: IAccordionStyles) => {
        switch (color) {
          case "primary.main":
            return primary.main;
          case "primary.dark":
            return primary.dark;
          case "primary.light":
            return primary.light;
          case "secondary.main":
            return secondary.main;
          case "secondary.dark":
            return secondary.dark;
          case "secondary.light":
            return secondary.light;
          default:
            return color;
        }
      },
      borderRadius: ({ borderRadius = "0px" }) => borderRadius,
      fontSize: ({ fontSize = "13px" }) => fontSize,
      fontWeight: ({ fontWeight = 500 }) => fontWeight,
      color: ({ fontColor = "#000" }) => fontColor,
    },
  })
);

export const useAccordionStyles = makeStyles({
  root: {
    "& svg": {
      color: "#fff",
    },
  },
  expanded: {
    margin: ({ marginOnExpand = "0" }: IAccordionStyles) =>
      `${marginOnExpand} !important`,
  },
});