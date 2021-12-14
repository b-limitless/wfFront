import { makeStyles } from "@material-ui/core";
import { IButtonCreate } from "../ButtonCreate";

interface IStylesProps extends IButtonCreate {
  type?: "strategy" | "default";
  isHoverable?: boolean;
  hide?: boolean;
}
export default makeStyles((theme) => ({
  deleteButton: {
    opacity: 1,
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 5,
    color: theme.palette.text.disabled,
    transition: "opacity 0.3s ease",
    "& svg": {
      fontSize: "20px",
    },
  },
  editButton: {
    opacity: 1,
    position: "absolute",
    top: 5,
    right: 35,
    zIndex: 5,
    color: theme.palette.text.disabled,
    transition: "opacity 0.3s ease",
    "& svg": {
      fontSize: "20px",
    },
  },
  button: {
    boxShadow: "none",
    position: "relative",
    width: ({ width = "auto" }: IStylesProps) => width,
    height: ({ height = "auto" }: IStylesProps) => height,
    padding: ({ padding = "0px" }: IStylesProps) => padding,
    background: "#e5e5e580",
    display: ({ hide }: IStylesProps) => (hide ? "none" : "flex"),
    flexDirection: "column",
    "&:hover": {
      boxShadow: ({ isHoverable }: IStylesProps) =>
        isHoverable ? "0 0 15px rgba(0,0,0,0.15)" : "0px",
      cursor: ({ isHoverable }: IStylesProps) =>
        isHoverable ? "pointer" : "unset",
    },
    "&:hover $delete": {
      opacity: 1,
    },
  },
  wrap: {
    overflow: "hidden",
    "& img": {
      maxWidth: "100%",
      height: "auto",
      display: "block",
    },
  },
  iconClass: {
    height: 50,
    width: 50,
  },
  wrapText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "320px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "250px",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "200px",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  titleClass: {
    fontWeight: 600,
    fontSize: "18px",
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  subTitleClass: {
    fontSize: "13px",
    color: "#5D5D5D",
    marginTop: "2px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },
}));
