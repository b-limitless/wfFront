import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  infoList: {
    margin: 0,
  },
  infoListItem: {
    padding: "6px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    color: "#6C6C6C",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "40px",
    "&:nth-of-type(odd)": {
      background: "#F6F6F6",
    },
    "& span": {
      whiteSpace: "nowrap",
      alignSelf: "baseline",
      "& + span": {
        color: "#000",
        marginLeft: 16,
        textAlign: "right",
        whiteSpace: "break-spaces",
        [theme.breakpoints.down("sm")]: {
          marginLeft: 0,
          textAlign: "left",
        },
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      fontSize: "14px",
      lineHeight: "25px",
    },
  },
}));
