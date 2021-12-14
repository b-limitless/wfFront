import {
  withStyles,
  makeStyles,
  Box,
  Typography,
  Theme,
} from "@material-ui/core";

export const useLinearProgressStyles = makeStyles(({ palette }: Theme) => ({
  barColorPrimary: {
    backgroundColor: palette.primary.main,
  },
  barColorSecondary: {
    backgroundColor: palette.secondary.main,
  },
  root: {
    backgroundColor: "transparent",
  },
}));

export const Wrapper = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
})(Box);

export const TextIdentifierWrapper = withStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    margin: "20px 30px 5px 5px",
  },
})(Box);

export const TextIdentifier = withStyles((theme) => ({
  root: {
    color: theme.palette.grey[300],
    fontSize: "13px",
    fontWeight: 500,
  },
}))(Typography);
