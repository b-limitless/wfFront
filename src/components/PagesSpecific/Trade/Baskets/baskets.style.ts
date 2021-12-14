import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  deleteTextFocus: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  progress: {
    "& .MuiLinearProgress-bar2Buffer": {
      backgroundColor: "#EEEEEE",
    },
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
  btnText: {
    padding: "8px 10px",
    marginRight: 8,
  },
  cancelBtn: {
    width: 160,
    height: 50,
    color: "rgb(255,0,0)",
    "&:hover": {
      backgroundColor: "rgba(211, 47, 47, 0.04)",
    },
  },
  navigate: {
    "& svg": {
      width: 14,
      height: 14,
      marginRight: 3,
    },
  },
  input: {
    color: "black",
    "& + .Mui-error": {
      margin: "0 !important",
    },
  },
  createLink: {
    "&:hover": {
      "& svg": {
        color: theme.palette.secondary.dark,
      },
    },
  },
}));

export const useCarouselStyles = makeStyles((theme: Theme) => ({
  dotsWtapper: {
    "& .BrainhubCarousel__dots .BrainhubCarousel__dot:before": {
      backgroundColor: theme.palette.text.secondary,
      width: "10px",
      height: "10px",
      padding: "5px",
    },
    "& .BrainhubCarousel__dots .BrainhubCarousel__dot.BrainhubCarousel__dot--selected:before":
      {
        backgroundColor: `${theme.palette.secondary.main} !important`,
      },
  },
  carouselWrapper: {
    "&:hover": {
      "& $backButton": { opacity: 1 },
      "& $forwardButton": { opacity: 1 },
    },
  },
  backButton: {
    opacity: 0,
    position: "absolute",
    top: "25%",
    left: -12,
    zIndex: 5,
    transition: "opacity 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      opacity: 1,
    },
  },
  forwardButton: {
    opacity: 0,
    position: "absolute",
    top: "25%",
    right: -12,
    zIndex: 5,
    transition: "opacity 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      opacity: 1,
    },
  },
}));
