import { makeStyles, Theme } from "@material-ui/core/styles";
import { ETheme } from "trolly/common";

interface IStylesProps {
  color: ETheme;
  imageWidth?: string;
  product?: "invest" | "trade";
}
export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "36px 16px",
    borderRadius: "5px",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: ({ color }: IStylesProps) => {
      switch (color) {
        case "secondary":
          return theme.palette.secondary.main;
        default:
          return theme.palette.primary.main;
      }
    },
    "&:hover": {
      "& img": {
        transform: "scale(1.08)",
      },
    },
  },
  productCardImage: {
    width: "auto",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      width: ({ imageWidth = "100%" }) => imageWidth,
    },
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    "& img": {
      transition: "all 300ms ease-in-out !important",
      width: ({ product }: IStylesProps) =>
        product === "invest" ? "185px" : "350px",
      height: ({ product }: IStylesProps) =>
        product === "invest" ? "200px" : "200px",
    },
  },
}));
