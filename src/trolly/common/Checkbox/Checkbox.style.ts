import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { IProps } from "./Checkbox.interface";

export interface ILabelProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  labelColor?: string;
  spacing?: string;
  alignItems?: string;
}
export const useCheckBoxStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    padding: "0px",
    color: ({ borderColor = palette.grey[200] }: IProps) => borderColor,
    "& svg": {
      width: ({ checkboxSize, width = "30px" }: IProps) => {
        switch (checkboxSize) {
          case "large":
            return "40px";
          case "medium":
            return "30px";
          case "custom":
            return width;
          default:
            return "25px";
        }
      },
      height: ({ checkboxSize, height = "30px" }) => {
        switch (checkboxSize) {
          case "large":
            return "40px";
          case "medium":
            return "30px";
          case "custom":
            return height;
          default:
            return "25px";
        }
      },
    },
  },
}));

export const CheckboxWrapper = withStyles({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    alignContent: "center",
  },
})(Box);

export const useFormControlLabelStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: ({ alignItems = "center" }) => alignItems,
    margin: ({ margin = "0px" }: ILabelProps) => margin,
    padding: ({ padding = "0px" }) => padding,
  },
  label: {
    fontSize: ({ fontSize = "16px" }) => fontSize,
    color: ({ labelColor = palette.text.primary }) => labelColor,
    marginLeft: ({ spacing = "15px" }) => spacing,
    fontWeight: ({ fontWeight = 500 }) => fontWeight,
    marginBottom: "0px",
    whiteSpace: "normal",
  },
}));
