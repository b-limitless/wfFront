import { IconButton, Theme, withStyles } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export const StyledIconButton = withStyles(({ breakpoints }: Theme) => ({
  root: {
    display: "block",
    "&:focus": {
      outline: "none",
    },
  },
}))(IconButton);

export const StyledSwipeableDrawer = withStyles({
  root: {
    zIndex: 1000000,
  },
})(SwipeableDrawer);
