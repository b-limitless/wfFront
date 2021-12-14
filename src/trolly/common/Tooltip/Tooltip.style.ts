import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { EPositions, ESize, ETheme } from "../common.interface";

interface IconProps {
  color?: ETheme | string;
  iconPlacement?: EPositions;
  iconSize?: ESize;
  width?: string;
  height?: string;
}
export const StyledToolTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
    fontSize: "12px",
    maxWidth: "220px",
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);

export const useHelpIconStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    color: ({ color }: IconProps) =>
      color === "secondary"
        ? palette.secondary.main
        : color === "primary"
        ? palette.primary.main
        : color,
    marginLeft: ({ iconPlacement }: IconProps) =>
      iconPlacement === "end" ? "4px" : "0px",
    marginRight: ({ iconPlacement }: IconProps) =>
      iconPlacement === "start" ? "4px" : "0px",
    width: ({ iconSize, width = "18px" }: IconProps) => {
      switch (iconSize) {
        case "medium":
          return "20px";
        case "large":
          return "24px";
        case "custom":
          return width;
        default:
          return "18px";
      }
    },
    height: ({ iconSize, height = "18px" }: IconProps) => {
      switch (iconSize) {
        case "medium":
          return "20px";
        case "large":
          return "24px";
        case "custom":
          return height;
        default:
          return "18px";
      }
    },
  },
}));

export const Wrapper = withStyles({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
  },
})(Box);
