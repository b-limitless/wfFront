import React from "react";
import HighCharts from "highcharts/highcharts";
import HighChartsReact from "highcharts-react-official";
import useChartOptions from "./hooks/useChartOptions";
import {
  EChartType,
  IAreasplineChartProps,
  IBarChartProps,
  IChartMultiData,
  IChartsProps,
  IPieChartProps,
} from "./charts.interface";
import { Card } from "@wf-org/trolly.common";
import {
  chartColors,
  getColorByIndex,
  getStartGradientColorByIndex,
  getEndGradientColorByIndex,
} from "./charts.contants";

export {
  getColorByIndex,
  chartColors,
  getStartGradientColorByIndex,
  getEndGradientColorByIndex,
};

export type {
  EChartType,
  IAreasplineChartProps,
  IBarChartProps,
  IChartMultiData,
  IPieChartProps,
};

const Charts: React.FC<IChartsProps> = (props) => {
  const { withCard, cardProps, id } = props;
  const options = useChartOptions(props);
  if (withCard) {
    <Card {...cardProps} id={id}>
      <HighChartsReact highcharts={HighCharts} options={options} />;
    </Card>;
  }
  return <HighChartsReact highcharts={HighCharts} options={options} />;
};

export default Charts;
