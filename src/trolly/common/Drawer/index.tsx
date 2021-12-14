import React, { FC } from "react";
import { StyledIconButton, StyledSwipeableDrawer } from "./Drawer.style";
import MenuIcon from "@material-ui/icons/Menu";
import { IProps } from "./Drawer.interface";

const StyledDrawer: FC<IProps> = ({
  anchor = "left",
  children,
  theme = "primary",
  open = false,
  toggleDrawer,
}) => {
  return (
    <>
      <StyledIconButton
        color={theme}
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="end"
        size="medium"
      >
        <MenuIcon fontSize="large" color={theme} />
      </StyledIconButton>
      <StyledSwipeableDrawer
        anchor={anchor}
        onOpen={toggleDrawer(true)}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {children}
      </StyledSwipeableDrawer>
    </>
  );
};

export default StyledDrawer;
