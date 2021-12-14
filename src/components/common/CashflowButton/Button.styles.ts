import { makeStyles, Theme } from "@material-ui/core/styles";

export const useButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#fff",
    borderRadius: 12,
    padding: "25px 25px 25px 35px",
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.04)",
    textTransform: "none",
    // minHeight: 125,
    marginBottom: 25,
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      padding: 16,
      marginBottom: 16,
    },
    "&:hover": {
      background: "#fff",
      boxShadow: "0 0 15px rgba(0,0,0,0.15)",
    },
    "& span": {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
    },
  },
  disabled: {
    backgroundColor: '#efefef'
  }
}))
export default makeStyles((theme: Theme) => ({
  content: {},
  icon: {
    width: 105,
    display: "flex",
    justifyContent: "center",
    marginRight: "20px",
    [theme.breakpoints.down("xs")]: {
      width: 70,
      marginRight: 16,
    },
    "& svg": {
      display: "block",
      maxWidth: "100%",
      margin: "0 auto",
    },
    "& img": {
      display: "block",
      maxWidth: "100%",
      margin: "0 auto",
    },
  },
  arrow: {
    marginLeft: "auto",
    color: "#707070",
    fontSize: 30,
  },
}));
