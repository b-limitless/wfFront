import Box from "@material-ui/core/Box";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { IProps } from "./Menu.interface";

export const Wrapper = withStyles({
  root: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
})(Box);

export const StyledMenu = withStyles(({ shadows }: Theme) => ({
  root: {
    boxShadow: shadows[0],
    padding: "5px",
  },
}))(MenuList);

export const useStyles = makeStyles(({ palette, shadows }: Theme) => ({
  menuPaper: {
    transform: ({ listTransform }) =>
      !!listTransform ? `${listTransform} !important` : "unset",
    padding: "0px",
    margin: ({ listMargin = "0px" }) => listMargin,
  },
  listWrapperClass: {
    borderTopRightRadius: ({ isTopRounded }) => (isTopRounded ? "5px" : "0px"),
    borderTopLeftRadius: ({ isTopRounded }) => (isTopRounded ? "5px" : "0px"),
    borderBottomRightRadius: ({ isBottomRounded }) =>
      isBottomRounded ? "5px" : "0px",
    borderBottomLeftRadius: ({ isBottomRounded }) =>
      isBottomRounded ? "5px" : "0px",
    border: ({ listBorderRadius = "unset" }) => listBorderRadius,
    boxShadow: "rgb(0 0 0 / 15%) 0px 5px 15px 0px",
  },
  styledMenuClass: {
    padding: ({ listPadding = "5px" }) => listPadding,
  },
  root: {
    color: ({ active, theme, isThemed }: IProps) => {
      if (active || isThemed) {
        switch (theme) {
          case "secondary":
            return palette.secondary.main;
          default:
            return palette.primary.main;
        }
      }
      return "#898989";
    },
    margin: "0px",
    alignSelf: "center",
    "&:hover": {
      backgroundColor: "transparent",
      color: ({ theme, isThemed, active }) => {
        switch (theme) {
          case "secondary":
            return isThemed || active
              ? palette.secondary.dark
              : palette.secondary.main;
          default:
            return isThemed || active
              ? palette.primary.dark
              : palette.primary.main;
        }
      },
      "& svg": {
        color: ({ isThemed, active, theme }) => {
          switch (theme) {
            case "secondary":
              return isThemed || active
                ? palette.secondary.dark
                : palette.secondary.main;
            default:
              return isThemed || active
                ? palette.primary.dark
                : palette.primary.main;
          }
        },
      },
    },
    "& span": {
      textTransform: "capitalize",
      fontSize: ({ fontSize = "14px" }: IProps) => fontSize,
      fontWeight: ({ fontWeight = 600 }: IProps) => fontWeight,
    },
  },
  text: {
    padding: "6px 16px",
  },
}));

export const useMenuItemStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    padding: "10px",
    fontSize: ({ fontSize = "14px" }: IProps) => fontSize,
    color: "#898989",
    fontWeight: ({ fontWeight = 600 }) => fontWeight,
    textTransform: "capitalize",
  },
  selected: {
    color: ({ theme }: IProps) => {
      switch (theme) {
        case "secondary":
          return palette.secondary.main;
        default:
          return palette.primary.main;
      }
    },
  },
}));
