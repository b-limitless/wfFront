import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

export interface IFooterStyles {
  containerPadding?: number | string;
}
export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: "22px",
    height: "22px",
    [theme.breakpoints.down("sm")]: {
      width: "18px",
      height: "18px",
    },
  },
  container: {
    padding: ({ containerPadding = theme.spacing(2) }: IFooterStyles) =>
      containerPadding,
    backgroundColor: "#0D1C55",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export const IconsWrapper = withStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    color: "#A7BBD2",
  },
}))(Box);

export const Wrapper = withStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
  },
}))(Box);

export const CustomLink = withStyles((theme) => ({
  root: {
    color: "#A7BBD2",
    margin: "0px 5px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 2px",
    },
  },
}))(Link);
