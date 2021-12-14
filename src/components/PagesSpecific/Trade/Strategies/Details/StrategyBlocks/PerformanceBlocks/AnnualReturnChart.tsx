import React, { useMemo } from "react";
import Charts, { IChartMultiData } from "trolly/charts";
import { appUtils } from "trolly/utils";
import ChartCard from "../ChartCard";

const AnnualReturnChart: React.FC<{ annualReturn?: IChartMultiData }> = ({
  annualReturn,
}) => {
  const { data, categories } = useMemo(() => {
    if (annualReturn) {
      const { data, categories } = annualReturn;
      return { data, categories };
    }
    return {} as IChartMultiData;
  }, [annualReturn]);

  return (
    <ChartCard title="Historical annual return">
      <Charts
        theme="secondary"
        ChartOptions={{
          zoomBySingleTouch: true,
          zoomType: "xy",
          panKey: "ctrl",
        }}
        height={320}
        type="column"
        columnData={data}
        tooltip={{
          formatter: function () {
            return `<b>${this.series.name}</b><br/> ${
              this.key
            } <b>${appUtils.formatDecimal(this.y, 2)}%</br>`;
          },
        }}
        YAxisOptions={{
          title: {
            text: "",
          },
          labels: {
            formatter: function () {
              return `${appUtils.formatNumberWithUnit(+this.value)}%`;
            },
          },
        }}
        XAxisOptions={{
          categories: categories,
          labels: {
            style: {
              color: "black",
              fontSize: "13px",
              fontFamily: "Poppins-Medium, Roboto,  Helvetica Neue, Arial",
            },
          },
        }}
        plotColumnOptions={{
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `<br>${appUtils.formatDecimal(this.y, 2)}`;
            },
          },
        }}
      />
    </ChartCard>
  );
};

export default AnnualReturnChart;
