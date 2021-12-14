import { makeStyles, Theme } from "@material-ui/core/styles";
import { ICameraProps } from "./Camera.interface";

export const useBoxStyles = makeStyles((theme: Theme) => ({
  box: {
    borderBottomWidth: ({ error }: ICameraProps) => (error ? "2px" : "0px"),
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.error.main,
    paddingBottom: ({ error }) => (error ? "10px" : "0px"),
    margin: ({ margin = "0px" }) => margin,
    padding: ({ padding = "0px" }) => padding,
  },
}));
