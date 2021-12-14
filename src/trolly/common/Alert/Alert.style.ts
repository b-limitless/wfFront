import AlertTitle from "@material-ui/lab/AlertTitle";
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IProps } from "./Alert.interface";

export const StyledTitle = withStyles({
  root: {
    fontSize: "14px",
    fontWeight: 600,
  },
})(AlertTitle);

export const useAlertStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    margin: ({ margin }: IProps) => margin,
    padding: ({ padding }) => padding,
  },
  message: {
    fontSize: ({ fontSize }: IProps) => fontSize,
    fontWeight: ({ fontWeight }: IProps) => fontWeight,
    padding: "0px",
  },
  icon: {
    padding: "0px",
    fontSize: "20px",
  },
});

export const useTextAlertStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    margin: ({ margin }: IProps) => margin,
    padding: ({ padding = "6px 0px" }) => `${padding} !important`,
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: ({ severity }) => {
      switch (severity) {
        case "error":
          return `${palette.error.main} !important`;
        case "info":
          return `${palette.info.main} !important`;
        case "warning":
          return `${palette.warning.main} !important`;
        case "success":
          return `${palette.success.main} !important`;
      }
    },
  },
  message: {
    fontSize: ({ fontSize }: IProps) => fontSize,
    fontWeight: ({ fontWeight }: IProps) => fontWeight,
    padding: "0px",
  },
  icon: {
    padding: "0px",
    fontSize: ({ fontSize = "20px" }) => fontSize,
  },
}));
