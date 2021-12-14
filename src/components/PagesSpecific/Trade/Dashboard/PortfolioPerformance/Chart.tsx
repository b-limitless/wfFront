import React, { useMemo } from "react";
import ChartComp from "trolly/charts";
import { Box, Text } from "trolly/common";
import useChartData from "./useChartData.hooks";
import ChartIcon from "@material-ui/icons/BubbleChart";
import { TPeriod } from "store/actions/trade.actions";
import { appUtils } from "trolly/utils";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Chart: React.FC<{
  period: TPeriod;
  error?: string | string[];
}> = ({ period, error }) => {
  const [data, categories] = useChartData(period);
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
      min = minValue * 0.99999;
      max = maxValue * 1.00001;
    }
    return [min, max];
  }, [data]);

  const areasplineData = useMemo(() => {
    if (data && data.length > 0) {
      return [
        {
          name: "portfolio",
          data,
          isGradient: true,
        },
      ];
    }
  }, [data]);

  if (!areasplineData || !appUtils.isEmpty(error)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
        minHeight={["auto", "250px"]}
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
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        gridLineColor: "#EBEBEB",
        visible: !isMobile,
        labels: {
          formatter: function () {
            return `$ ${appUtils.formatNumberWithUnit(+this.value, 4)}`;
          },
        },
        min,
        max,
        startOnTick: true,
      }}
      plotOptions={{
        series: {
          pointPlacement: "on",
        },
      }}
      XAxisOptions={{
        categories: categories,
        lineColor: "#ffffff00",
        tickmarkPlacement: "on",
        tickInterval: tickInterval,
        tickPositions: appUtils.getIntervalPositions(categories, 5, 15),
        // showEmpty: true,
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
          rotation: isMobile ? -30 : 0,
        },
      }}
      tooltip={{
        valueSuffix: "",
        formatter: function () {
          let dateToShow = "" as any;
          dateToShow = `${this.x}`;
          return `<span>Portfolio at ${dateToShow} </br>$${appUtils.formatNumberWithUnit(
            this.y,
            4
          )}</span>`;
        },
      }}
      legend={{
        enabled: false,
      }}
    />
  );
};

export default Chart;
