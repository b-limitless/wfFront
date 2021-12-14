import React from "react";
import Charts from "trolly/charts";
import { appUtils } from "trolly/utils";
import ChartCard from "./ChartCard";

const FirmSizeChart: React.FC<{ firmSizeChartData?: any[] }> = ({
  firmSizeChartData,
}) => {
  return (
    <ChartCard title="Firm size">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="pie"
        pieData={firmSizeChartData}
        legend={{
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          maxHeight: 60,
          itemWidth: undefined,
          symbolPadding: 5,
          symbolRadius: 10,
          itemMarginBottom: 2,
          width: undefined,
          itemStyle: {
            fontSize: "12px",
            fontWeight: "700",
          },
        }}
        plotPieOptions={{
          innerSize: "30%",
        }}
        seriesPieDataLabels={{
          style: {
            fontSize: "12px",
            textOutline: "none",
          },
          formatter: function () {
            return `<br>${appUtils.formatDecimal(this.y, 0)} %`;
          },
        }}
      />
    </ChartCard>
  );
};

export default FirmSizeChart;
