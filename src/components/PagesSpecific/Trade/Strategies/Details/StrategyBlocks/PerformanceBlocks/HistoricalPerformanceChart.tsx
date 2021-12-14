import React, { useMemo } from "react";
import Charts, { IChartMultiData } from "trolly/charts";
import { appUtils } from "trolly/utils";
import ChartCard from "../ChartCard";

const HistoricalPerformanceChart: React.FC<{
  historicalData?: IChartMultiData;
}> = ({ historicalData }) => {
  const { data, categories } = useMemo(() => {
    if (historicalData) {
      const { data, categories } = historicalData;
      return { data, categories };
    }
    return {} as IChartMultiData;
  }, [historicalData]);
  return (
    <ChartCard title="Historical performance">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="line"
        lineData={data}
        tooltip={{
          formatter: function () {
            return `<b>${this.key}</b><br><p>${
              this.series.name
            } $${appUtils.formatNumberWithUnit(this.y, 2)}</p>`;
          },
        }}
        YAxisOptions={{
          title: {
            text: "",
          },
          labels: {
            formatter: function () {
              return `$${appUtils.formatNumberWithUnit(+this.value)}`;
            },
          },
        }}
        XAxisOptions={{
          categories: categories,
          labels: {
            formatter: function () {
              const value = this.value.toString() as string;
              const date = value.split("-");
              return date[1] || this.value.toString();
            },
            style: {
              color: "black",
              fontSize: "13px",
              fontFamily: "Poppins-Medium, Roboto,  Helvetica Neue, Arial",
            },
          },
        }}
      />
    </ChartCard>
  );
};

export default HistoricalPerformanceChart;
