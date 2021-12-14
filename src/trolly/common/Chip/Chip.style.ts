import { makeStyles, Theme } from "@material-ui/core/styles";
import { IChipProps } from "./Chip.interface";

export const useChipStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: ({ round, borderRadius = "0px" }: IChipProps) =>
      round ? "16px" : borderRadius,
    color: ({ customColor }) =>
      customColor ? customColor : theme.palette.common.white,
    padding: ({ padding = "0 8px" }) => `${padding} !important`,
    margin: ({ margin = "0" }) => margin,
    fontSize: ({ fontSize }) => (fontSize ? fontSize : "inherit"),
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    width: ({ width = "auto" }) => width,
    minWidth: ({ minWidth = "auto" }) => minWidth,
    maxWidth: ({ maxWidth = "auto" }) => maxWidth,
    height: ({ height = "auto" }) => height,
    backgroundColor: ({ backgroundColor, color }) => {
      if (backgroundColor) {
        return backgroundColor;
      } else {
        if (color === "primary") {
          return theme.palette.primary.main;
        } else if (color === "secondary") {
          return theme.palette.secondary.main;
        }
        return "#7F7F7F";
      }
    },
  },
  label: {
    padding: "0px",
  },
}));
