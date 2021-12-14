import { makeStyles, Theme } from "@material-ui/core/styles";
import { IStyleProps } from "./Table.interface";

export const useStyles = makeStyles((theme: Theme) => ({
  // to make the first column sticky , applied on tableCell component
  tableCell: {
    position: "unset",
    "&:first-child": {
      [theme.breakpoints.up("sm")]: {
        zIndex: 1000,
        backgroundColor: ({ stickyFirstColumn }) =>
          stickyFirstColumn ? "#fff" : "inherit",
        position: ({ stickyFirstColumn }) =>
          stickyFirstColumn ? "sticky" : "unset",
        left: 0,
      },
    },
  },
  container: {
    maxWidth: ({ maxWidth = "auto" }: IStyleProps) => maxWidth,
    maxHeight: ({ maxHeight = "auto" }) => maxHeight,
    borderRadius: ({ borderRadius }) => (borderRadius ? borderRadius : "0px"),
    boxShadow: ({ boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.04)" }) =>
      boxShadow,
    backgroundColor: ({ bgColor = theme.palette.common.white }) => bgColor,
    width: ({ containerWidth = "auto" }) => containerWidth,
    height: ({ containerHeight = "auto" }) => containerHeight,
    margin: ({ margin = "0px" }) => margin,
  },
  headerCell: {
    // to make the first column sticky , applied on tableCell component
    "&:first-child": {
      [theme.breakpoints.up("sm")]: {
        zIndex: ({ stickyFirstColumn }) => (stickyFirstColumn ? 10000 : 1),
        position: ({ stickyFirstColumn, stickyHeader }) =>
          stickyFirstColumn || stickyHeader ? "sticky" : "unset",
        left: 0,
      },
    },
    backgroundColor: ({ headerBgColor = "transparent" }: IStyleProps) =>
      headerBgColor,
    color: ({ headerColor = theme.palette.text.primary }) => headerColor,
  },
  header: {
    "& tr": {
      "& th": {
        borderBottomWidth: ({ withBorder, borderLayout }) =>
          withBorder && (borderLayout === "horizontal" || !borderLayout)
            ? "1px"
            : "0px",
        borderBottomColor: ({
          borderColor = theme.palette.background.default,
        }) => borderColor,
        borderRightWidth: ({ withBorder, borderLayout }) =>
          withBorder && (borderLayout === "vertical" || !borderLayout)
            ? "1px"
            : "0px",
        borderRightColor: ({
          borderColor = theme.palette.background.default,
        }) => borderColor,
        borderRightStyle: "solid",
        "&:last-child": {
          borderRightWidth: "0px",
        },
      },
    },
  },
  body: {
    // to make the row hover by color
    "& :hover": {
      "&.MuiTableRow-root > .MuiTableCell-root": {
        backgroundColor: ({ hoverColor }) =>
          hoverColor === "primary"
            ? `rgba(242, 250, 255, 1) !important`
            : hoverColor === "secondary"
            ? "rgba(242, 255, 253, 1) !important"
            : "inherit",
      },
    },
    "& tr": {
      "& td": {
        borderBottomWidth: ({ withBorder, borderLayout }) =>
          withBorder && (borderLayout === "horizontal" || !borderLayout)
            ? "1px"
            : "0px",
        borderBottomColor: ({
          borderColor = theme.palette.background.default,
        }) => borderColor,
        borderRightWidth: ({ withBorder, borderLayout }) =>
          withBorder && (borderLayout === "vertical" || !borderLayout)
            ? "1px"
            : "0px",
        borderRightColor: ({
          borderColor = theme.palette.background.default,
        }) => borderColor,
        borderRightStyle: "solid",
        "&:last-child": {
          borderRightWidth: "0px",
        },
      },
      "&:last-child": {
        "& td": {
          borderBottomWidth: "0px",
        },
      },
    },
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export const useHeadStyles = makeStyles({
  icon: {
    color: "inherit !important",
  },
  root: {
    color: "inherit !important",
  },
  active: {
    color: "inherit !important",
  },
});
