import React, { useMemo } from "react";
import Charts from "trolly/charts";
import { appUtils } from "trolly/utils";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import usePortfolioEvolutionTrasnformer from "./usePortfolioEvolution.hooks";

const PortfolioEvolutionChart: React.FC<{
  portfolioValue: number;
  monthlyDeposit: number;
  rateOfReturn: number;
}> = ({ portfolioValue, monthlyDeposit, rateOfReturn }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { chartsData, chartsCategories } = usePortfolioEvolutionTrasnformer(
    portfolioValue,
    monthlyDeposit,
    rateOfReturn
  );

  const areasplineData = useMemo(() => {
    if (chartsData && chartsData.length > 0) {
      return [
        {
          name: "portfolio",
          data: chartsData,
          isGradient: true,
        },
      ];
    }
  }, [chartsData]);
  return (
    <Charts
      height={300}
      type="areaspline"
      areasplineData={areasplineData}
      theme="primary"
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
            return `$ ${appUtils.formatNumberWithUnit(+this.value, 2)}`;
          },
        },
        startOnTick: true,
      }}
      plotOptions={{
        series: {
          pointPlacement: "on",
        },
      }}
      XAxisOptions={{
        categories: chartsCategories,
        lineColor: "#ffffff00",
        tickmarkPlacement: "on",
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
          step:
            chartsCategories.length > 15
              ? Math.ceil(chartsCategories.length / 8)
              : 1,
          rotation: chartsCategories.length > 15 ? -20 : 0,
        },
      }}
      tooltip={{
        valueSuffix: "",
        formatter: function () {
          let dateToShow = "" as any;
          dateToShow = `${this.x}`;
          return `<span>Portfolio at ${dateToShow} </br>$${appUtils.formatNumberWithUnit(
            this.y,
            0
          )}</span>`;
        },
      }}
      legend={{
        enabled: false,
      }}
    />
  );
};

export default PortfolioEvolutionChart;
