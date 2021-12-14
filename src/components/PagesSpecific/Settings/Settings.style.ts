import { withStyles, Box, SvgIconProps } from "@material-ui/core";
import { Done as Correct, Clear as Incorrect } from "@material-ui/icons";

export const CorrectIcon = withStyles((theme) => ({
  root: {
    color: ({ color }: SvgIconProps) =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}))(Correct);

export const InCorrectIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}))(Incorrect);

export const CheckListWrapper = withStyles({
  root: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    margin: "20px 0px",
  },
})(Box);
