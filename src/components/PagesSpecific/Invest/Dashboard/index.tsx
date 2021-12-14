import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getKycAlgoComb,
  getInvestUserAllocation,
} from "store/actions/invest.actions";
import { IAppState } from "store/store.interface";
import {
  INVEST_GET_ACCOUNT_INFO,
  INVEST_GET_ALGO_COMB,
  INVEST_GET_PERFORMANCE_INFO,
} from "store/store.types";
import { Snackbar } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";
import AccountSummary from "./AccountSummary";
import MoneySummary from "./MoneySummary";
import PortfolioSummary from "./PortfolioSummary";
import DashboardSections from "./DashboardSections";
import TargetAllocationChart from "./TargetAllocationChart";
import Grid from "@material-ui/core/Grid";
import { useInvestAccountInfo } from "hooks/useAccountInfo";

const tabsOptions = [
  { label: "Portfolio holdings", value: "portfolioHoldings" },
  { label: "Performance", value: "performance" },
  { label: "Target allocation", value: "targetAllocation" },
  { label: "Portfolio evolution", value: "portfolioEvolution" },
];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: IAppState) => state.auth);

  /**
   * dashboard sections tabs requirement
   */
  const [selectedTab, setSelectedTab] = useState("portfolioHoldings");

  const onChangeTabHandler = (value: any) => () => {
    setSelectedTab(value);
  };

  //////////////////////////////////////////////////

  const { id: portfolioId, name: portfolioName } = useMemo(() => {
    if (data) {
      const { kycObj } = data;
      if (kycObj) {
        const {
          KYCPortfolio: { id, name },
        } = kycObj;
        return { id, name };
      }
    }
    return {};
  }, [data]);

  useEffect(() => {
    dispatch(getInvestUserAllocation());
  }, [dispatch]);

  useEffect(() => {
    if (portfolioId) {
      dispatch(getKycAlgoComb(portfolioId));
    }
  }, [portfolioId, dispatch]);

  const { isLoading: isPerformanceLoading, error: performanceError } =
    useApiInfo(INVEST_GET_PERFORMANCE_INFO);

  const { isLoading: isAccountLoading, error: accountError } = useApiInfo(
    INVEST_GET_ACCOUNT_INFO
  );

  const { error: algoError } = useApiInfo(INVEST_GET_ALGO_COMB);

  const { isLoading, error } = useMemo(() => {
    return {
      isLoading: isPerformanceLoading || isAccountLoading,
      error: performanceError || accountError || algoError,
    };
  }, [
    isPerformanceLoading,
    isAccountLoading,
    performanceError,
    accountError,
    algoError,
  ]);

  const onCloseError = () => {
    dispatch(apiActions.clearApi(INVEST_GET_ACCOUNT_INFO));
    dispatch(apiActions.clearApi(INVEST_GET_PERFORMANCE_INFO));
    dispatch(apiActions.clearApi(INVEST_GET_ALGO_COMB));
  };

  const spacing = 6;

  const { deposits, withdrawals, investmentAmount } = useInvestAccountInfo();

  return (
    <>
      {error && (
        <Snackbar
          horizontal="center"
          vertical="top"
          severity="error"
          open={!!error}
          handleClose={onCloseError}
        ></Snackbar>
      )}
      <Grid container spacing={spacing}>
        <Grid item xs={12}>
          <AccountSummary isLoading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={spacing}>
            <Grid item lg={4} xs={12} component="div" spacing={6}>
              <Grid container spacing={spacing}>
                <Grid item xs={12}>
                  <PortfolioSummary
                    portfolioId={portfolioId}
                    portfolioName={portfolioName}
                  />
                </Grid>
                <Grid item xs={12}>
                  {selectedTab === "targetAllocation" && (
                    <TargetAllocationChart />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} xs={12} spacing={spacing}>
              <Grid container spacing={spacing}>
                <Grid item xs={12}>
                  <MoneySummary
                    withdrawals={withdrawals}
                    deposits={deposits}
                    investmentAmount={investmentAmount}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DashboardSections
                    tabsOptions={tabsOptions}
                    onChangeTabHandler={onChangeTabHandler}
                    selectedTab={selectedTab}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
