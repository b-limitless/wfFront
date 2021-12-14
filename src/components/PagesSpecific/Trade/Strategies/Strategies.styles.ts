import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Box } from "trolly/common";

export const useStrategiesStyles = makeStyles((theme: Theme) => ({
  back: {
    width: 150,
    height: 50,
    "& svg": {
      width: 14,
      height: 14,
      marginRight: 3,
    },
  },
  accordionDetails: {
    padding: "0px",
    height: "fit-content",
  },
  accordion: {
    height: "fit-content",
  },
  divider: {
    margin: "14px 0px",
  },
  tooltipClass: {
    "& svg": {
      transform: "translateY(4px)",
    },
  },
}));

export const useCustomizedTabsClasses = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.common.black,
    fontWeight: 600,
    opacity: 1,
    textTransform: "none",
    fontSize: "16px",
  },
  textColorSecondary: {
    color: theme.palette.common.black,
    fontWeight: 500,
    textTransform: "none",
  },
  selected: {
    color: theme.palette.secondary.main,
  },
}));

export const TabsBorderBottom = withStyles({
  root: {
    borderTop: "0.2px solid #BDBDBD",
    width: "100%",
    opacity: "0.5",
  },
})(Box);
