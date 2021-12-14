import React, { useContext, useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { __RouterContext } from "react-router";
import { Main } from "components/common";
import { Header, Footer } from "trolly/custom";
import { ProtectedRoute } from "components/common";
import { history, disableProductSwitchRoutes, routes } from "config";
import Logout from "pages/Logout";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import HeaderTrade from "components/PagesSpecific/Trade/Header";
import { useOnboardingAvailability } from "hooks/useOnboardingChecklist";
import useUserInfo from "hooks/useUserIInfo";
import useFundingApproval from "hooks/useAccountApproval";
import HeaderInvest from "components/PagesSpecific/Invest/Header";

/**
 * Pages was removed
 * pages/transactions
 * pages/disclosure
 */

/**
 * Pages Lazy Loaded
 */
const KYC = React.lazy(() => import("pages/KYC"));
const ErrorPage = React.lazy(() => import("pages/ErrorPage"));
const GetStarted = React.lazy(() => import("pages/GetStarted"));
const AccountOpening = React.lazy(() => import("pages/AccountOpening"));
const AccountOpeningRetry = React.lazy(
  () => import("pages/AccountOpeningRetry")
);
const DocumentsStarter = React.lazy(() => import("pages/DocumentsStarter"));
const DocumentsSubmit = React.lazy(() => import("pages/DocumentsSubmit"));

/**
 * General Pages
 */
const Dashboard = React.lazy(() => import("pages/General/Accounts"));
const Activities = React.lazy(() => import("pages/General/Activities"));
const Statements = React.lazy(() => import("pages/General/Statements"));
const Withdrawal = React.lazy(() => import("pages/General/Withdrawal"));
const Agreements = React.lazy(() => import("pages/General/Agreements"));
const Funding = React.lazy(() => import("pages/General/Funding"));
const Identity = React.lazy(() => import("pages/General/Identity"));

/**
 * Trade Pages
 */
const TradePortfolio = React.lazy(() => import("pages/Trade/Dashboard"));
const TradeTicker = React.lazy(() => import("pages/Trade/Ticker"));
const TradeOrdersStatus = React.lazy(() => import("pages/Trade/OrdersStatus"));
const TradeWatchlists = React.lazy(() => import("pages/Trade/Watchlists"));
const TradeBaskets = React.lazy(() => import("pages/Trade/Baskets"));
// TODO ENABLE_FOR_NEW_FEATURE
// const Strategies = React.lazy(() => import("pages/Trade/Strategies"));
////////////////////////////////////////
// const TradeRewards = React.lazy(() => import("pages/Trade/Rewards"));

/**
 * Invest Pages
 */
const InvestPortfolio = React.lazy(() => import("pages/Invest/Dashboard"));
// const InvestRewards = React.lazy(() => import("pages/Invest/Rewards"));
/**
 * Rest
 */
const RetakeKYC = React.lazy(() => import("pages/RetakeKYC"));
const Testing = React.lazy(() => import("pages/TestComponents"));
const KYCDashboard = React.lazy(() => import("pages/KYCDashboard"));
const Support = React.lazy(() => import("pages/Support"));
const Activate = React.lazy(() => import("pages/Activate"));
const AccountSettings = React.lazy(() => import("pages/AccountSettings"));

const App = () => {
  const { pathname } = history.location;
  const { location } = useContext(__RouterContext);
  const { isTradeCreated, isInvestCreated } = useOnboardingAvailability();
  const { isAuthenticated, appId, platform, accountOpening, isVerified } =
    useSelector((state: IAppState) => ({
      ...state.auth,
      ...state.trade,
      ...state.general,
    }));

  const { regulation, email } = useUserInfo();

  // launch intercom when the user is authenticated
  useEffect(() => {
    if (window && isAuthenticated && platform !== "mobile") {
      const { Intercom } = window as any;
      Intercom("boot", {
        app_id: "znilbwlr",
        alignment: "right",
        horizontal_padding: 20,
        vertical_padding: 60,
      }) as any;
    }
  }, [isAuthenticated, email, platform]);

  const shouldShowHeader = useMemo(() => {
    const withoutHeaderRoutes = ["/logout"];
    return (
      withoutHeaderRoutes.indexOf(history.location.pathname) < 0 &&
      isAuthenticated &&
      (isVerified || process.env.NODE_ENV === "development") &&
      platform !== "mobile"
    );
  }, [isAuthenticated, isVerified, platform]);

  const [isFundingAllowed] = useFundingApproval();

  //Header Requirement
  const [routesOptions, routesDropDown] = useMemo(() => {
    const { other } = accountOpening || {};
    let hideIdentity = false;
    if (other) {
      const { IDENTIFICATION_INFO } = other;
      const { resident } = IDENTIFICATION_INFO || {};
      if (resident === "USA") {
        hideIdentity = true;
      }
    }
    switch (appId) {
      case "C":
        if (isTradeCreated) {
          return [
            routes.trade.map((route) => {
              if (!isFundingAllowed && route.label === "Funding") {
                return {
                  ...route,
                  disabled: true,
                };
              }
              return route;
            }),
            routes.tradeDropDown.filter((route) =>
              hideIdentity ? route.label !== "Documents" : route.label
            ),
          ];
        }
        return [];
      case "A":
        if (isInvestCreated) {
          return [
            routes.invest.map((route) => {
              if (!isFundingAllowed && route.label === "Funding") {
                return {
                  ...route,
                  disabled: true,
                };
              }
              return route;
            }),
            routes.investDropDown.filter((route) =>
              hideIdentity ? route.label !== "Documents" : route.label
            ),
          ];
        }
        return [];
      default:
        return [];
    }
  }, [
    appId,
    isTradeCreated,
    isInvestCreated,
    accountOpening,
    isFundingAllowed,
  ]);

  const onLogoClick = () => {
    if (platform !== "mobile") {
      if (appId === "A") {
        if (isInvestCreated) {
          history.push("/invest/dashboard");
        } else {
          history.push("/activation");
        }
      } else if (appId === "C") {
        if (isTradeCreated) {
          history.push("/trade/dashboard");
        } else {
          history.push("/activation");
        }
      }
    }
  };

  const renderHeaderChildren = useMemo(() => {
    if (appId === "C" && isTradeCreated) {
      return <HeaderTrade />;
    } else if (appId === "A" && isInvestCreated) {
      return <HeaderInvest />;
      // return null;
    }
  }, [appId, isInvestCreated, isTradeCreated]);

  // used for the onboarding process to disable switch products and also for the mobile webview
  // as the mobile app will be for trade only
  const disableSwitchProduct = useMemo(() => {
    return (
      platform === "mobile" ||
      !!disableProductSwitchRoutes.find((route) => route === pathname) ||
      // TODO remove USA condition when we open trade on usa environment
      regulation === "USA"
    );
  }, [platform, pathname, regulation]);

  ///////////////////////////////

  return (
    <>
      {shouldShowHeader && (
        <Header
          menuLabel="Account"
          history={history}
          withAppTitle={true}
          routes={routesOptions}
          dropMenuRoutes={routesDropDown}
          isInvestCreated={isInvestCreated}
          isTradeCreated={isTradeCreated}
          onLogoClick={onLogoClick}
          disableSwitchProduct={disableSwitchProduct}
          disableMenu={platform === "mobile"}
          productSwitchAnimation="fade"
          menuAnimation="fade"
        >
          {renderHeaderChildren}
        </Header>
      )}
      <Main>
        <Switch location={location}>
          <ProtectedRoute component={Dashboard} exact path="/trade/dashboard" />
          <ProtectedRoute
            component={Dashboard}
            exact
            path="/invest/dashboard"
          />
          <ProtectedRoute
            component={TradePortfolio}
            exact
            path="/trade/portfolio"
          />
          <ProtectedRoute
            component={TradeTicker}
            exact
            path="/trade/ticker/:id"
          />
          <ProtectedRoute
            component={TradeOrdersStatus}
            exact
            path="/trade/orders"
          />
          <ProtectedRoute
            component={Activities}
            exact
            path="/trade/activities"
          />
          <ProtectedRoute
            component={Activities}
            exact
            path="/invest/activities"
          />
          <ProtectedRoute component={Funding} exact path="/trade/funding" />
          <ProtectedRoute component={Funding} exact path="/invest/funding" />
          <ProtectedRoute
            component={Statements}
            exact
            path="/trade/statements"
          />
          {/* // TODO ENABLE_FOR_NEW_FEATURE */}
          {/* <ProtectedRoute
            component={Strategies}
            exact
            path="/trade/strategies"
          /> */}
          <ProtectedRoute
            component={Statements}
            exact
            path="/invest/statements"
          />
          <ProtectedRoute
            component={Withdrawal}
            exact
            path="/trade/withdrawal"
          />
          <ProtectedRoute
            component={Withdrawal}
            exact
            path="/invest/withdrawal"
          />
          <ProtectedRoute component={Agreements} exact path="/agreements" />
          <ProtectedRoute
            component={InvestPortfolio}
            exact
            path="/invest/portfolio"
          />

          {/* <ProtectedRoute
            component={TradeRewards}
            exact
            path="/trade/rewards"
          />
          <ProtectedRoute
            component={InvestRewards}
            exact
            path="/invest/rewards"
          /> */}

          <ProtectedRoute exact path="/activation" component={Activate} />
          <ProtectedRoute exact path="/identity" component={Identity} />
          <ProtectedRoute
            exact
            path="/account/settings"
            component={AccountSettings}
          />
          <ProtectedRoute exact path="/kyc" component={KYC} />
          <ProtectedRoute exact path="/kyc/retake" component={RetakeKYC} />
          <ProtectedRoute exact path="/" component={GetStarted} />
          <ProtectedRoute
            exact
            path="/account/opening"
            component={AccountOpening}
          />
          <ProtectedRoute
            exact
            path="/account/opening/retry"
            component={AccountOpeningRetry}
          />
          <ProtectedRoute
            exact
            path="/account/starter/documents"
            component={DocumentsStarter}
          />
          <ProtectedRoute
            exact
            path="/account/submit/documents"
            component={DocumentsSubmit}
          />
          <ProtectedRoute
            exact
            path="/kyc/dashboard"
            component={KYCDashboard}
          />
          <ProtectedRoute
            component={TradeWatchlists}
            exact
            path="/trade/watchlists"
          />
          <ProtectedRoute
            component={TradeBaskets}
            exact
            path="/trade/baskets"
          />
          <ProtectedRoute exact path="/support" component={Support} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/test/components" component={Testing} />
          <Route component={ErrorPage} />
        </Switch>
      </Main>
      {shouldShowHeader && platform !== "mobile" && <Footer />}
    </>
  );
};

export default App;
