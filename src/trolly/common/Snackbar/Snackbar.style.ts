import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    zIndex: 1000000,
    "& > * + *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}));
