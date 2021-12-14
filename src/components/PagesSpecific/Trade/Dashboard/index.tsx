import React from "react";
import { useDispatch } from "react-redux";
import { Box } from "trolly/common";
import AccountSummary from "./AccountSummary";
import PortfolioPerformance from "./PortfolioPerformance";
import OpenPositions from "./OpenPositions";
import { apiActions } from "trolly/store";
import {
  TRADE_GET_ACCOUNT_PERFORMANCE,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { useApiInfo } from "trolly/hooks";
import Watchlist from "./Watchlist";
import Grid from "@material-ui/core/Grid";
import ErrorComponent from "./ErrorComponent";

const TradeDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { error: performanceError } = useApiInfo(TRADE_GET_ACCOUNT_PERFORMANCE);
  const { error: summaryError } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);

  const onRetry = () => {
    // This will clear the error and the children will try to load the data
    dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_PERFORMANCE));
    dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
  };

  if (summaryError || performanceError) {
    return (
      <ErrorComponent
        error={summaryError || performanceError}
        onRetry={onRetry}
      />
    );
  } else {
    return (
      <Box display="flex" flexDirection="column">
        <AccountSummary />
        <Grid container spacing={3}>
          <Grid item lg={9} md={8} xs={12}>
            <PortfolioPerformance />
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <Watchlist />
          </Grid>
        </Grid>
        <OpenPositions />
      </Box>
    );
  }
};

export default TradeDashboard;
