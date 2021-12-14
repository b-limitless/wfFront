import React, { useCallback, FC, useState, useMemo } from "react";
import { List } from "@material-ui/core";
import { EAnchors, ETheme, Link, Box, Text, Button } from "trolly/common";
import {
  useCustomStyles,
  IconWrapper,
  StyledListItem,
} from "./DrawerList.style";
import { Icon } from "@wf-org/trolly.icons";
import { TRoute } from "../Header.interface";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { History } from "history";

export interface IProps {
  routes?: TRoute[];
  toggleDrawer: any;
  dropMenuOptions?: TRoute[];
  onLogoClick?: () => void;
  anchor?: EAnchors;
  color?: ETheme;
  menuLabel?: string;
  history: History;
  logoVariant?: "app" | "general";
}
const DrawerList: FC<IProps> = ({
  routes = [],
  anchor = "left",
  toggleDrawer,
  dropMenuOptions = [],
  color = "primary",
  onLogoClick,
  menuLabel,
  history,
  children,
  logoVariant,
}) => {
  const classes = useCustomStyles({ color });

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const handleCollapseClick = () => {
    setIsCollapseOpen((oldValue) => !oldValue);
  };

  const onListItemClick = useCallback(
    (to: string, disabled?: boolean) => () => {
      if (!disabled) {
        history.push(to);
        toggleDrawer(false)();
      }
    },
    [toggleDrawer, history]
  );

  const getNavigationLinkComp = useCallback(
    (route: TRoute, isNested?: boolean) => {
      const { label, to, disabled } = route;
      return (
        <StyledListItem
          button
          key={route.label}
          disableTouchRipple={true}
          onClick={onListItemClick(to, disabled)}
          className={classes.listItem}
        >
          <Link
            variant="header"
            fontColor="#2e324e"
            fontWeight={500}
            to={to}
            color={color}
            paddingLeft={isNested ? "15px" : "0px"}
            disabled={disabled}
          >
            {label}
          </Link>
        </StyledListItem>
      );
    },
    [color, onListItemClick, classes]
  );

  const onLogoutClick = useCallback(() => {
    history.push("/logout");
  }, [history]);

  const getListItems = useCallback(() => {
    const { list, fullList } = classes;
    return (
      <div
        className={["top", "bottom"].includes(anchor || "") ? fullList : list}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <>
            {routes &&
              !!routes.length &&
              routes.map((route) => getNavigationLinkComp(route))}
            <Divider />
            {dropMenuOptions && dropMenuOptions.length > 1 ? (
              <>
                <StyledListItem
                  button
                  disableTouchRipple={true}
                  onClick={handleCollapseClick}
                >
                  <Text
                    color="#2e324e"
                    fontSize="14px"
                    fontWeight={500}
                    width="100%"
                  >
                    {menuLabel}
                  </Text>
                  {isCollapseOpen ? <ExpandLess /> : <ExpandMore />}
                </StyledListItem>
                <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
                  {dropMenuOptions.map((route) =>
                    getNavigationLinkComp(route, true)
                  )}
                </Collapse>
              </>
            ) : (
              <Box px="5px">
                <Button
                  color={color}
                  round
                  margin="10px 0px"
                  onClick={onLogoutClick}
                  variant="contained"
                  width="100%"
                >
                  Logout
                </Button>
              </Box>
            )}
          </>
        </List>
      </div>
    );
  }, [
    getNavigationLinkComp,
    anchor,
    classes,
    routes,
    toggleDrawer,
    dropMenuOptions,
    isCollapseOpen,
    menuLabel,
    color,
    onLogoutClick,
  ]);

  const logoSection = useMemo(() => {
    switch (logoVariant) {
      case "general":
        return (
          <Icon
            iconName="BigLogo"
            withPointer={true}
            iconSize="CUSTOM"
            width="190px"
            height="34px"
            color="primary"
            onClick={onLogoClick}
          />
        );
      default:
        return (
          <Icon
            iconName="LogoCircle"
            withPointer={true}
            onClick={onLogoClick}
            iconSize="XL"
            customColor={color}
          />
        );
    }
  }, [color, logoVariant, onLogoClick]);

  return (
    <Box height="100%">
      <div>
        <IconWrapper>{logoSection}</IconWrapper>
        {children}
        <Box mt="10px">{getListItems()}</Box>
      </div>
    </Box>
  );
};

export default DrawerList;
