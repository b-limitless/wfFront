import {
  LegendOptions,
  PlotPieOptions,
  PlotLineOptions,
  PlotAreasplineOptions,
  TitleOptions,
  XAxisOptions,
  YAxisOptions,
  TooltipOptions,
  Options,
  SeriesPieOptions,
  SeriesColumnOptions,
  SeriesAreasplineOptions,
  SeriesLineOptions,
  SeriesBarOptions,
  PointOptionsObject,
  ChartOptions,
  SeriesPieDataLabelsOptionsObject,
  GradientColorObject,
  PatternObject,
  PlotOptions,
  PlotBarOptions,
  PlotColumnOptions,
} from "highcharts/highcharts";
import { ETheme, ICardProps } from "@wf-org/trolly.common";
export type EChartType = "pie" | "column" | "areaspline" | "bar" | "line";

type TChartData = {
  data?: (
    | number
    | PointOptionsObject
    | [string | number, number | null]
    | null
  )[];
  color?: string | GradientColorObject | PatternObject;
  fillColor?: string | GradientColorObject | PatternObject;
  showInLegend?: boolean;
  name?: string;
  fillOpacity?: number;
  isGradient?: boolean;
  lineWidth?: number;
};

export interface IAreasplineChartProps {
  plotAreasplineOptions?: PlotAreasplineOptions;
  areasplineData?: TChartData[];
}

export interface IPieChartProps {
  plotPieOptions?: PlotPieOptions;
  seriesPieDataLabels?: SeriesPieDataLabelsOptionsObject;
  pieData?: TChartData[];
}

export interface IBarChartProps {
  plotBarOptions?: PlotBarOptions;
  barData?: TChartData[];
}

export interface ILineChartProps {
  plotLineOptions?: PlotLineOptions;
  lineData?: TChartData[];
}

export interface IColumnChartProps {
  plotColumnOptions?: PlotColumnOptions;
  columnData?: TChartData[];
}

export interface IChartMultiData {
  data: TChartData[];
  categories?: any[];
}

export interface IChartsProps
  extends IPieChartProps,
    IAreasplineChartProps,
    IBarChartProps,
    ILineChartProps,
    IColumnChartProps {
  id?: string;
  withCard?: boolean;
  cardProps?: ICardProps;
  type: EChartType;
  backgroundColor?: string;
  height?: number;
  width?: number;
  legend?: LegendOptions;
  chartTitle?: string;
  title?: TitleOptions;
  tooltip?: TooltipOptions;
  XAxisOptions?: XAxisOptions;
  YAxisOptions?: YAxisOptions;
  plotOptions?: PlotOptions;
  ChartOptions?: ChartOptions;
  customOptions?: Options;
  series?:
    | SeriesPieOptions[]
    | SeriesAreasplineOptions[]
    | SeriesBarOptions[]
    | SeriesColumnOptions[]
    | SeriesLineOptions[];
  theme: ETheme;
}
