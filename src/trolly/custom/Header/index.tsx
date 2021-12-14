import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Icon } from "@wf-org/trolly.icons";
import {
  StyledAppBar,
  StyledToolBar,
  DesktopNavigationContainer,
  MobileNavigationContainer,
} from "./Header.style";
import { Menu, Drawer, Link, Box, Text } from "@wf-org/trolly.common";
import Navigations from "./Navigations";
import DrawerList from "./DrawerList";
import { useAppInfo } from "@wf-org/trolly.hooks";
import { IProps } from "./Header.interface";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import { setToLocalStorage } from "@wf-org/trolly.store";

const Header: React.FC<IProps> = ({
  routes,
  dropMenuRoutes = [],
  menuLabel = "Account Details",
  mobileMenuAnchor,
  withAppTitle,
  history,
  onLogoClick,
  children,
  isInvestCreated,
  isTradeCreated,
  disableSwitchProduct,
  // used for the mobile team and the general variant on auth app
  // to disable the menu while doing the onboarding process
  disableMenu,
  productSwitchAnimation,
  menuAnimation,
  logoVariant,
}) => {
  const defaultTheme = useTheme();
  const isDesktop = useMediaQuery(defaultTheme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  const { title, theme = "primary" } = useAppInfo();

  const accountMenuOptions = useMemo(
    () => [...dropMenuRoutes, { to: "/logout", label: "Logout" }],
    [dropMenuRoutes]
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const onInvestClick = useCallback(() => {
    setToLocalStorage("wf_appId", "A");
    // TODO: we replace this part with full reload , as hotjar will only be able to
    // fetch it's properties at the app load , same for TradeClick , keep the commented block
    // for a while

    // dispatch(authActions.setAppId("A"));
    // if (isInvestCreated) {
    //   performNavigation("/app/#/invest/dashboard");
    // } else {
    //   performNavigation("/app/#/activation");
    // }
    window.top?.location.reload();
  }, []);

  const onTradeClick = useCallback(() => {
    setToLocalStorage("wf_appId", "C");
    window.top?.location.reload();
  }, []);

  const renderProductMenuItem = useCallback(() => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={["5px 5px 5px 13px", "5px 1px 5px 13px"]}
      >
        <Box display="flex" alignContent="center" alignItems="center" mr="50px">
          <Icon
            iconName="LogoCircle"
            iconSize="XL"
            customColor={theme === "primary" ? "secondary" : "primary"}
          />

          <Box display="flex" flexDirection="column" ml="15px">
            <Text
              fontSize={["13px", "15px"]}
              fontWeight={600}
              color={theme === "secondary" ? "primary.main" : "secondary.main"}
            >
              {title === "Trade" ? "Invest" : "Trade"}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }, [title, theme]);

  const productMenuOptions = useMemo(() => {
    if (title === "Invest") {
      return [
        {
          label: renderProductMenuItem(),
          onClick: onTradeClick,
          to: "",
        },
      ];
    } else if (title === "Trade") {
      return [
        {
          label: renderProductMenuItem(),
          onClick: onInvestClick,
          to: "",
        },
      ];
    }
    return [];
  }, [onInvestClick, onTradeClick, title, renderProductMenuItem]);

  useEffect(() => {
    if (isDesktop && open) {
      setOpen(false);
    }
  }, [isDesktop, open]);

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
            iconSize="XL"
            customColor={theme}
            onClick={onLogoClick}
          />
        );
    }
  }, [logoVariant, onLogoClick, theme]);

  const titleSection = useMemo(() => {
    if (withAppTitle) {
      if (disableSwitchProduct) {
        return (
          <Text
            marginLeft="10px"
            color={`${theme}.main`}
            fontSize="14px"
            fontWeight={600}
          >
            {title}
          </Text>
        );
      }
      return (
        <Menu
          menuLabel={title}
          options={productMenuOptions}
          history={history}
          theme={theme}
          iconPlacement="end"
          listTransform="translate3d(-21px, 68px, 0px)"
          listPadding="0px"
          isBottomRounded
          animation={productSwitchAnimation}
          isThemed
        />
      );
    }
  }, [
    withAppTitle,
    disableSwitchProduct,
    history,
    productMenuOptions,
    theme,
    title,
    productSwitchAnimation,
  ]);

  const desktopMenuComponent = useMemo(() => {
    if (!disableMenu) {
      if (!!dropMenuRoutes.length) {
        return (
          <Menu
            menuLabel={menuLabel}
            options={accountMenuOptions}
            history={history}
            theme={theme}
            animation={menuAnimation}
            listMargin="18px -5px 0 0px"
          />
        );
      }
      return (
        <Link color={theme} to="/logout">
          Logout
        </Link>
      );
    }
  }, [
    accountMenuOptions,
    disableMenu,
    dropMenuRoutes,
    theme,
    menuLabel,
    history,
    menuAnimation,
  ]);

  return (
    <StyledAppBar position="static" color="primary">
      <StyledToolBar style={{ padding: "0px" }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          padding="0 25px 0 0"
          borderRight={
            routes && routes.length > 0 ? "1px solid #DBDBDB" : "none"
          }
        >
          {logoSection}
          {titleSection}
        </Box>
        <DesktopNavigationContainer>
          <Navigations routes={routes} color={theme} />
          {children}
          {desktopMenuComponent}
        </DesktopNavigationContainer>
        {!disableMenu && (
          <MobileNavigationContainer>
            <Drawer
              anchor={mobileMenuAnchor}
              open={open}
              theme={theme}
              toggleDrawer={toggleDrawer}
            >
              <DrawerList
                routes={routes}
                anchor="left"
                toggleDrawer={toggleDrawer}
                color={theme}
                dropMenuOptions={accountMenuOptions}
                onLogoClick={onLogoClick}
                menuLabel={menuLabel}
                history={history}
                logoVariant={logoVariant}
              >
                {children}
              </DrawerList>
            </Drawer>
          </MobileNavigationContainer>
        )}
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default Header;
