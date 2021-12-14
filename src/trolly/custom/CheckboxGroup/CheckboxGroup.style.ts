import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ELayouts } from "../custom.interface";

export const useGroupWrapper = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: ({ layout }) => (layout === "layout_2" ? "row" : "column"),
    flexWrap: ({ layout }) => (layout === "layout_2" ? "nowrap" : "wrap"),
    "& .MuiFormControlLabel-root": {
      width: "100%",
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

export const AlertWrapper = withStyles({
  root: {
    padding: "10px",
  },
})(Box);
