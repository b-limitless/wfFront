import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  deleteTextFocus: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  paper: {
    padding: 10,
    "& .MuiTableContainer-root": {
      boxShadow: "none",
    },
    "& table": {
      boxShadow: "none",
    },
  },
  symbol: {
    fontSize: "13px",
    fontWeight: 600,
  },
  name: {
    fontSize: "13px",
    fontWeight: 500,
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  nameContainer: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    alignSelf: "flex-start",
    width: "100%",
  },
  back: {
    "& svg": {
      width: 14,
      height: 14,
      marginRight: 3,
    },
  },
  search: {
    display: "flex",
    marginBottom: "20px",
    "& .MuiAutocomplete-root": {
      flex: 1,
    },
  },
  addButton: {
    height: 46,
    width: 85,
    marginLeft: "10px !important",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  iconDefault: {
    width: "100%",
    height: "100%",
    color: theme.palette.secondary.main,
  },
  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
}));
