import {
  makeStyles,
  withStyles,
  Box,
  ListItem,
  Theme,
} from "@material-ui/core";

export const useCustomStyles = makeStyles((theme: Theme) => ({
  list: {
    minWidth: 250,
    width: "100%",
  },
  fullList: {
    width: "auto",
  },
  listItem: {
    marginBottom: "10px",
  },
}));

export const IconWrapper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))(Box);

export const ControlWrapper = withStyles((theme) => ({
  root: {
    display: "flex",
    margin: "32px 16px",
    justifyContent: "center",
  },
}))(Box);

export const StyledListItem = withStyles({
  root: {
    justifyContent: "flex-start",
  },
})(ListItem);
