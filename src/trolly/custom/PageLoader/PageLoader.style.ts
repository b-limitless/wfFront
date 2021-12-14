import { makeStyles, Theme } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: `${theme.palette.background.default} !important`,
  },
}));
