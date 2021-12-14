import { withStyles, Box, makeStyles, Theme } from "@material-ui/core";
import { ESize } from "@wf-org/trolly.common";
import { ELayouts } from "../custom.interface";

interface ILabelProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  labelColor?: string;
  spacing?: string;
}

interface IRadioProps {
  borderColor?: string;
  width?: string;
  height?: string;
  radioSize?: ESize;
}

export const useRadioGroup = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: ({ layout }) => (layout === "layout_2" ? "row" : "column"),
    flexWrap: ({ layout }) => (layout === "layout_2" ? "nowrap" : "wrap"),
    "& .MuiFormControlLabel-root": {
      borderBottomWidth: ({ layout }: { layout?: ELayouts }) => {
        switch (layout) {
          case "layout_1":
            return "1px";
          default:
            return "0px";
        }
      },
      borderBottomColor: ({ layout }: { layout?: ELayouts }) => {
        switch (layout) {
          case "layout_1":
            return "#E0E0E0";
          default:
            return "inherit";
        }
      },
      borderBottomStyle: "solid",
      "&:last-child": {
        borderBottomWidth: ({ layout }: { layout?: ELayouts }) => {
          switch (layout) {
            case "layout_1":
              return "0px";
            default:
              return "0px";
          }
        },
      },
    },
  },
});

export const useRadioStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    padding: "5px",
    color: ({ borderColor = palette.grey[200] }: IRadioProps) => borderColor,
    "& svg": {
      width: ({ radioSize, width = "30px" }: IRadioProps) => {
        switch (radioSize) {
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
      height: ({ radioSize, height = "30px" }: IRadioProps) => {
        switch (radioSize) {
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

export const AlertWrapper = withStyles({
  root: {
    padding: "10px",
  },
})(Box);

export const useLabelStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    width: "100%",
    padding: ({ padding = "0px" }: ILabelProps) => padding,
    margin: ({ margin = "0px" }: ILabelProps) => margin,
  },
  label: {
    fontSize: ({ fontSize = "20px" }: ILabelProps) => fontSize,
    color: ({ labelColor = palette.text.primary }: ILabelProps) => labelColor,
    marginLeft: ({ spacing = "0px" }: ILabelProps) => spacing,
    fontWeight: ({ fontWeight = 500 }: ILabelProps) => fontWeight,
    whiteSpace: "normal",
    marginBottom: "0px",
  },
}));
