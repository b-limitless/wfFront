import React, { useMemo } from "react";
import Charts, { IChartMultiData } from "trolly/charts";
import { appUtils } from "trolly/utils";
import ChartCard from "../ChartCard";

const DrawdownChart: React.FC<{ drawdown?: IChartMultiData }> = ({
  drawdown,
}) => {
  const { data, categories } = useMemo(() => {
    if (drawdown) {
      const { data, categories } = drawdown;
      return { data, categories };
    }
    return {} as IChartMultiData;
  }, [drawdown]);

  return (
    <ChartCard title="Historical drawdown">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="areaspline"
        areasplineData={data}
        tooltip={{
          formatter: function () {
            return `<b>${this.key}</b><br><p>${
              this.series.name
            } ${appUtils.formatDecimal(this.y, 0)}%</p>`;
          },
        }}
        YAxisOptions={{
          min: -100,
          max: 0,
          labels: {
            formatter: function () {
              return `${this.value}%`;
            },
          },
        }}
        XAxisOptions={{
          categories: categories,
          title: {
            text: "",
          },
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

export default DrawdownChart;
