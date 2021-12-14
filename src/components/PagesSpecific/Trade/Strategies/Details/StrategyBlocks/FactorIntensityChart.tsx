import React, { useMemo } from "react";
import Charts, { getColorByIndex, IChartMultiData } from "trolly/charts";
import ChartCard from "./ChartCard";

const FactorIntensityChart: React.FC<{
  factorIntensityData?: IChartMultiData;
}> = ({ factorIntensityData }) => {
  const transformedData = useMemo(() => {
    if (
      factorIntensityData &&
      factorIntensityData.data &&
      [].constructor === factorIntensityData.data.constructor
    ) {
      return factorIntensityData.data.map((obj, index) => ({
        ...obj,
        color: getColorByIndex(index),
      }));
    }
  }, [factorIntensityData]);
  return (
    <ChartCard title="Factor intensity">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="bar"
        barData={transformedData}
        XAxisOptions={{
          categories: factorIntensityData?.categories,
          visible: false,
          title: {
            text: " ",
          },
        }}
        plotBarOptions={{
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `<br>${this.y}`;
            },
          },
        }}
        tooltip={{
          formatter: function () {
            return `<b>${this.key} <br/>${this.y} </b>`;
          },
        }}
        YAxisOptions={{
          labels: {
            overflow: "justify",
          },
          visible: true,
        }}
        legend={{
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          maxHeight: 100,
          symbolPadding: 5,
          symbolRadius: 10,
          itemMarginBottom: 2,
          itemStyle: {
            fontSize: "12px",
          },
          enabled: true,
        }}
      />
    </ChartCard>
  );
};

export default FactorIntensityChart;
