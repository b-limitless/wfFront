import {
  withStyles,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Theme,
} from "@material-ui/core";

export const StyledAppBar = withStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(9),
    // boxShadow: "0 1px 2px rgb(0 0 0 / 5%)",
    boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.04)",
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.contrastText,
  },
}))(AppBar);

export const AppTitle = withStyles({
  root: {
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "8px",
    marginBottom: "0px",
  },
})(Typography);

export const StyledToolBar = withStyles((theme: Theme) => ({
  root: {
    margin: "4px auto",
    width: "97%",
  },
}))(Toolbar);

export const NavigationsWrapper = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0px 30px",
  },
}))(Box);

export const DesktopNavigationContainer = withStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}))(Box);

export const MobileNavigationContainer = withStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
}))(Box);
