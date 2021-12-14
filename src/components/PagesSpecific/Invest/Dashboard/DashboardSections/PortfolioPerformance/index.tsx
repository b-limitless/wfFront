import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInvestPortfolioPerformance } from "store/actions/invest.actions";
import { INVEST_GET_PORTFOLIO_PERFORMANCE } from "store/store.types";
import { Box, Tabs } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { PortfolioPerformanceLoader } from "../Loaders";
import Chart from "./Chart";

const periodOptions = [
  { label: "1W", value: "7" },
  { label: "1M", value: "30" },
  { label: "3M", value: "90" },
  { label: "1Y", value: "365" },
  { label: "5Y", value: `${365 * 5}` },
  { label: "MAX", value: `max` },
];
const PortfolioPerformance: React.FC = () => {
  const [period, setPeriod] = useState<string>("7");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestPortfolioPerformance());
  }, [dispatch]);

  const onChangeTab = (value: string) => {
    setPeriod(value);
  };

  const { isLoading, error } = useApiInfo(INVEST_GET_PORTFOLIO_PERFORMANCE);

  if (isLoading) {
    return <PortfolioPerformanceLoader />;
  }
  return (
    <Grid container>
      <Box mb="20px" display="flex">
        <Tabs
          options={periodOptions}
          tabsVariant="filled"
          handleTabClick={onChangeTab}
          value={period}
          theme="primary"
          repeat={6}
        />
      </Box>
      <Grid item xs={12}>
        <Chart period={period} error={error} />
      </Grid>
    </Grid>
  );
};

export default PortfolioPerformance;
