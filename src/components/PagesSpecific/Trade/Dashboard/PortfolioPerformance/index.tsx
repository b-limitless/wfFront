import React, { useCallback, useState } from "react";
import { Box, Skeleton, Tabs } from "trolly/common";
import DashboardSection from "../DashboardSection";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TPeriod } from "store/actions/trade.actions";
import { useApiInfo } from "trolly/hooks";
import { TRADE_GET_ACCOUNT_PERFORMANCE } from "store/store.types";
import Chart from "./Chart";

const options = [
  { label: "5D", value: "5d" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];

const useSkeletonStyle = makeStyles((theme: Theme) => ({
  root: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Loader: React.FC = () => {
  const { root } = useSkeletonStyle();
  return (
    <Box
      padding={["22px", "22px", "30px", "30px"]}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      height={["218px", "218px", "318px", "318px"]}
    >
      <Skeleton height="100%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="80%" width="25px" />
      <Skeleton height="70%" width="25px" className={root} />
      <Skeleton height="60%" width="25px" />
      <Skeleton height="70%" width="25px" className={root} />
      <Skeleton height="55%" width="25px" />
      <Skeleton height="70%" width="25px" className={root} />
      <Skeleton height="80%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="70%" width="25px" />
      <Skeleton height="65%" width="25px" className={root} />
      <Skeleton height="55%" width="25px" />
      <Skeleton height="70%" width="25px" className={root} />
      <Skeleton height="80%" width="25px" className={root} />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="50%" width="25px" className={root} />
    </Box>
  );
};

const PortfolioPerformance: React.FC = () => {
  const [period, setPeriod] = useState<TPeriod>(options[0].value as TPeriod);
  const { isLoading, error } = useApiInfo(TRADE_GET_ACCOUNT_PERFORMANCE);

  const onTabChange = useCallback((value: string) => {
    setPeriod(value as TPeriod);
  }, []);

  return (
    <DashboardSection
      header="Portfolio Performance"
      withCard={true}
      marginRight="40px"
      padding={["15px 10px", "25px"]}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Tabs
            options={options}
            handleTabClick={onTabChange}
            tabsVariant="filled"
            value={period}
            repeat={6}
            padding="0px 10px"
            style={{ marginBottom: "20px" }}
          />
          <Chart period={period} error={error} />
        </>
      )}
    </DashboardSection>
  );
};

export default PortfolioPerformance;
