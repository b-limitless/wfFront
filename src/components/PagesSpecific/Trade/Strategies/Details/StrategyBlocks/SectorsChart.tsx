import React from "react";
import Charts from "trolly/charts";
import { appUtils } from "trolly/utils";
import ChartCard from "./ChartCard";

const SectorsChart: React.FC<{ sectorsChartData?: any[] }> = ({
  sectorsChartData,
}) => {
  return (
    <ChartCard title="Sectors">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="pie"
        pieData={sectorsChartData}
        legend={{
          align: "center",
          verticalAlign: "bottom",
          maxHeight: 60,
          itemWidth: undefined,
          symbolPadding: 5,
          symbolRadius: 10,
          itemMarginBottom: 0,
          width: undefined,
          layout: "horizontal",
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
            textOutline: "none",
            fontSize: "12px",
          },
          distance: -30,
          formatter: function () {
            return `<br>${appUtils.formatDecimal(this.y, 0)} %`;
          },
        }}
      />
    </ChartCard>
  );
};

export default SectorsChart;
