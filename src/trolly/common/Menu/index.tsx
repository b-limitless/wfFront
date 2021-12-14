import React, { FC, useMemo } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { useStyles, useMenuItemStyles, StyledMenu } from "./Menu.style";
import { IProps } from "./Menu.interface";

const Menu: FC<IProps> = ({
  options,
  theme,
  menuLabel,
  fontSize,
  fontWeight,
  history,
  children,
  iconPlacement,
  listTransform,
  isBottomRounded,
  listBorderRadius,
  listPadding,
  isTopRounded,
  animation,
  isThemed,
  listMargin,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // get list of paths from options to check the active links
  const paths = useMemo(() => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map((option) => option.to);
  }, [options]);

  const { root, text, menuPaper, styledMenuClass, listWrapperClass } =
    useStyles({
      theme,
      fontSize,
      fontWeight,
      listTransform,
      listBorderRadius,
      listPadding,
      isTopRounded,
      isBottomRounded,
      active: paths.indexOf(history.location.pathname) > -1,
      isThemed,
      listMargin,
    } as IProps);
  const classes = useMenuItemStyles({ theme } as IProps);

  const Animation = useMemo(() => {
    switch (animation) {
      case "fade":
        return Fade;
      case "slide":
        return Slide;
      default:
        return Grow;
    }
  }, [animation]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick =
    (to: any, onClick?: () => void) =>
    (event: React.MouseEvent<EventTarget>) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      setOpen(false);
      if (onClick) {
        onClick();
      } else if (to) {
        history.push(to);
      }
    };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        classes={{ root, text }}
      >
        {iconPlacement === "start" ? (
          <>
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
            {menuLabel}
          </>
        ) : (
          <>
            {menuLabel}
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
          </>
        )}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={menuPaper}
      >
        {({ TransitionProps, placement }) => (
          <Animation
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper elevation={1} className={listWrapperClass}>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledMenu
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  className={styledMenuClass}
                >
                  {options &&
                    options.length > 0 &&
                    options.map(({ label, to, onClick }, index) => (
                      <MenuItem
                        selected={history.location.pathname === to}
                        key={`${label}-${index}`}
                        classes={classes}
                        onClick={handleMenuItemClick(to, onClick)}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  {children}
                </StyledMenu>
              </ClickAwayListener>
            </Paper>
          </Animation>
        )}
      </Popper>
    </>
  );
};

Menu.defaultProps = {
  iconPlacement: "start",
};

export default Menu;
