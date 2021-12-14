import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  deleteTextFocus: {
    color: theme.palette.error.main,
    fontWeight: 600,
  },
}));
