import React, { useMemo } from "react";
import ChartComp from "trolly/charts";
import { Box, Text } from "trolly/common";
import useHistoricalData from "./useHistoricalChart.hooks";
import ChartIcon from "@material-ui/icons/BubbleChart";
import { TPeriod } from "store/actions/trade.actions";
import { appUtils } from "trolly/utils";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Chart: React.FC<{
  period: TPeriod;
  symbol: string | null;
  error?: string | string[];
}> = ({ period, symbol, error }) => {
  const [data, categories] = useHistoricalData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tickInterval = useMemo(() => {
    if (period === "1d") {
      return 10;
    } else if (period === "5d") {
      return 20;
    }
    return 40;
  }, [period]);

  const [min, max] = useMemo(() => {
    let min = 0;
    let max = 0;
    if (data && data.length) {
      const maxValue = Math.max.apply(null, data);
      const minValue = Math.min.apply(null, data);
      min = minValue * 0.999;
      max = maxValue * 1.01;
    }
    return [min, max];
  }, [data]);

  const areasplineData = useMemo(() => {
    if (data && data.length > 0) {
      return [
        {
          name: symbol as string,
          data,
          isGradient: true,
        },
      ];
    }
  }, [data, symbol]);

  if (!areasplineData || !appUtils.isEmpty(error)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <ChartIcon color="secondary" style={{ fontSize: "150px" }} />
        <Text
          fontSize="16px"
          textAlign="center"
          fontWeight={600}
          color="text.secondary"
          maxWidth="400px"
        >
          No enough data to build the chart
        </Text>
      </Box>
    );
  }
  return (
    <ChartComp
      theme="secondary"
      height={250}
      type="areaspline"
      areasplineData={areasplineData}
      ChartOptions={{
        zoomBySingleTouch: true,
        zoomType: "xy",
        panKey: "ctrl",
      }}
      YAxisOptions={{
        gridLineWidth: 1,
        minorGridLineWidth: 1,
        gridLineColor: "#EBEBEB",
        visible: !isMobile,
        labels: {
          formatter: function () {
            return `$ ${this.value}`;
          },
        },
        min,
        max,
      }}
      XAxisOptions={{
        categories: categories,
        tickmarkPlacement: "on",
        lineColor: "#ffffff00",
        tickInterval: tickInterval,
        tickPositions: appUtils.getIntervalPositions(categories, 5, 15),
        labels: {
          rotation: isMobile ? -30 : 0,
          formatter: function () {
            const YDate = new Date(this.value);
            return appUtils.formatChartsDate(YDate, { period });
          },
        },
      }}
      tooltip={{
        valueSuffix: "",
        formatter: function () {
          let dateToShow = "" as any;
          const YDate = new Date(this.x);
          dateToShow = appUtils.formatChartsDate(YDate, { period });
          return `<span>${symbol} at ${dateToShow} </br>$${this.y}</span>`;
        },
      }}
      legend={{
        enabled: false,
      }}
    />
  );
};

export default Chart;
