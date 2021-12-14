import { makeStyles, Theme } from "@material-ui/core/styles";
import { IFileUploadProps } from "./FileUpload.interface";

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    borderBottomWidth: ({ error }: IFileUploadProps) => (error ? "2px" : "0px"),
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.error.main,
    paddingBottom: ({ error }) => (error ? "10px" : "0px"),
    margin: ({ margin = "0px" }) => margin,
    padding: ({ padding = "0px" }) => padding,
  },
  input: {
    display: "none",
  },
}));
