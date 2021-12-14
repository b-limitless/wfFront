import {
  LinearProgress,
  withStyles,
  Box,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

export const useElementsStyle = makeStyles((theme: Theme) => ({
  container: {
    gridTemplateColumns: ({
      withHint,
      totalQuestions,
    }: {
      withHint: boolean;
      totalQuestions: number;
    }) => {
      if (withHint && totalQuestions > 1) {
        return "1fr 6fr 3fr";
      } else if (!withHint && totalQuestions > 1) {
        return "1fr 7fr";
      } else if (withHint && totalQuestions <= 1) {
        return "7fr 3fr";
      } else {
        return "1fr";
      }
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: ({
        withHint,
        totalQuestions,
      }: {
        withHint: boolean;
        totalQuestions: number;
      }) => {
        if (withHint && totalQuestions > 1) {
          return "1fr 9fr";
        } else if (!withHint && totalQuestions > 1) {
          return "1fr 9fr";
        } else {
          return "1fr";
        }
      },
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr !important",
    },
  },
  formCentered: {
    margin: "auto",
  },
  formRightAligned: {
    marginRight: "auto",
  },
}));
export const ButtonContentWrapper = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      marginRight: "15px",
    },
  },
})(Box);

export const CardWrapper = withStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "15px",
    width: "60%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      margin: "0px",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "80%",
    },
  },
}))(Box);

export const StyledLinearProgress = withStyles((theme) => ({
  barColorPrimary: {
    backgroundColor: theme.palette.primary.light,
  },
  root: {
    backgroundColor: theme.palette.text.secondary,
  },
}))(LinearProgress);

export const NextButtonWrapper = withStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    margin: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}))(Box);

export const StyledIconButton = withStyles((theme) => ({
  root: {
    padding: "0px",
    marginRight: "60px",
    transform: "translateY(-6px)",
    [theme.breakpoints.down("sm")]: {
      margin: "0px",
    },
  },
}))(IconButton);

export const BackIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    fontSize: "50px",
  },
}))(ArrowBack);

export const BackButtonWrapper = withStyles({
  root: {},
})(Box);
