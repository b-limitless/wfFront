import { makeStyles } from "@material-ui/core";
import { IButtonCreate } from "./index";

export default makeStyles({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: (props: IButtonCreate) => props.width || "100%",
    height: (props: IButtonCreate) => props.height || "auto",
    borderRadius: 12,
    border: "2px dashed #BDBDBD",
    "&:hover svg": {
      color: "#656565",
    },
    "& svg": {
      color: "#BDBDBD",
      transition: "all 0.2s ease",
    },
  },
});
