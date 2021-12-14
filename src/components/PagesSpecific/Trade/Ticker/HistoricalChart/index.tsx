import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getInstrumentChartDetails,
  TPeriod,
} from "store/actions/trade.actions";
import { TRADE_GET_INSTRUMENT_CHART_DATA } from "store/store.types";
import Chart from "./Chart";
import { Box, Card, Skeleton, Tabs } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface IHistoricalChartProps {
  instrumentId: string;
  symbol: string | null;
}

const options = [
  { label: "1D", value: "1d" },
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
    <Card
      padding={["22px", "22px", "30px", "30px"]}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      height="300px"
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
      <Skeleton height="80%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="50%" width="25px" />
    </Card>
  );
};
const HistoricalChart: React.FC<IHistoricalChartProps> = ({
  instrumentId,
  symbol,
}) => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState<TPeriod>(options[0].value as TPeriod);

  const { isLoading, error } = useApiInfo(TRADE_GET_INSTRUMENT_CHART_DATA);

  useEffect(() => {
    dispatch(getInstrumentChartDetails(instrumentId, period as TPeriod));
  }, [dispatch, instrumentId, period]);

  const onTabChange = useCallback((value: string) => {
    setPeriod(value as TPeriod);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Card
      padding={["22px", "22px", "30px", "30px"]}
      height="fit-content"
      id="historical-chart"
      minHeight="370px"
    >
      <Box marginBottom="15px">
        <Tabs
          options={options}
          handleTabClick={onTabChange}
          tabsVariant="filled"
          value={period}
          repeat={6}
          padding="0px 12px"
        />
      </Box>
      <Chart period={period} symbol={symbol} error={error} />
    </Card>
  );
};

export default HistoricalChart;
