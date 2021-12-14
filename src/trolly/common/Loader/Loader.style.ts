import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useLoaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
      position: "absolute",
    },
    top: {
      animationDuration: "550ms",
      position: "relative",
      left: 0,
    },
    icon: {
      position: "absolute",
      transform: "translate(9px, 9px)",
    },
    circle: {
      strokeLinecap: "round",
    },
    iconWrapper: {
      position: "relative",
    },
    middleWrapper: {
      position: "absolute",
    },
  })
);
