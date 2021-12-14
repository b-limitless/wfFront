import { Options, PlotPieOptions } from "highcharts";
import { useMemo } from "react";
import { appUtils } from "@wf-org/trolly.utils";
import {
  chartColors,
  getEndGradientColorByIndex,
  getStartGradientColorByIndex,
} from "../charts.contants";
import { IChartsProps } from "../charts.interface";
import { useTheme } from "@material-ui/core/styles";
import { getColorByIndex } from "..";

const useChartOptions = (props: IChartsProps) => {
  const {
    type,
    height,
    width,
    chartTitle,
    ChartOptions = {},
    tooltip = {},
    legend = {},
    title = {},
    plotPieOptions = {},
    plotAreasplineOptions = {},
    seriesPieDataLabels = {},
    XAxisOptions,
    YAxisOptions,
    series,
    pieData = [],
    areasplineData = [],
    barData = [],
    columnData = [],
    plotBarOptions = {},
    plotLineOptions = {},
    plotColumnOptions = {},
    customOptions,
    plotOptions,
    lineData = [],
    theme: themeProp,
  } = props;

  const theme = useTheme();

  const chartPieOptions = useMemo(() => {
    const data = pieData.map((dataObj) => ({
      type: "pie",
      ...dataObj,
    }));
    return {
      ...customOptions,
      chart: {
        renderTo: "container",
        backgroundColor: theme.palette.common.white,
        type,
        height,
        width,
        ...ChartOptions,
      },
      plotOptions: {
        ...plotOptions,
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          center: ["50%", "50%"],
          colors: chartColors[themeProp],
          dataLabels: {
            enabled: true,
            distance: -30,
            style: {
              textOutline: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: theme.palette.common.white,
            },
            formatter: function () {
              return `<br>${appUtils.formatDecimal(this.y, 0)} %`;
            },
            ...seriesPieDataLabels,
          },
          innerSize: "40%",
          showInLegend: true,
          ...plotPieOptions,
        } as PlotPieOptions,
      },
      legend: {
        enabled: true,
        width: "40%",
        itemWidth: 230,
        symbolRadius: 3,
        maxHeight: 300,
        symbolPadding: 10,
        itemMarginBottom: 15,
        itemStyle: {
          color: "#797878",
          cursor: "pointer",
          fontSize: "15px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "500",
          textOverflow: "ellipsis",
        },
        ...legend,
      },
      title: {
        ...title,
        text: chartTitle,
      },
      credits: {
        enabled: false,
      },
      series: series || data,
      tooltip: {
        ...tooltip,
        backgroundColor: theme.palette.common.white,
        style: {
          color: "#333333",
          cursor: "default",
          fontSize: "13px",
          whiteSpace: "nowrap",
        },
        headerFormat: " ",
        formatter: function () {
          return `<b>${this.key} <br/>${appUtils.formatDecimal(
            this.y,
            0
          )}%</b>`;
        },
      },
    } as Options;
  }, [
    type,
    height,
    chartTitle,
    title,
    tooltip,
    legend,
    width,
    customOptions,
    series,
    theme,
    pieData,
    plotPieOptions,
    ChartOptions,
    seriesPieDataLabels,
    plotOptions,
    themeProp,
  ]);

  const chartColumnOptions = useMemo(() => {
    let modifiedData = [];
    modifiedData = columnData.map((obj, index) => ({
      ...obj,
      color: getColorByIndex(index),
    }));

    return {
      ...customOptions,
      chart: {
        type,
        height,
        width,
        ...ChartOptions,
      },
      title: {
        ...title,
        text: chartTitle,
      },
      xAxis: {
        ...XAxisOptions,
      },
      yAxis: {
        ...YAxisOptions,
      },
      tooltip: {
        ...tooltip,
      },
      plotOptions: {
        areaspline: {
          ...plotColumnOptions,
        },
      },
      legend: {
        ...legend,
      },
      credits: {
        enabled: false,
      },
      series: series || modifiedData,
    };
  }, [
    customOptions,
    type,
    height,
    width,
    ChartOptions,
    title,
    chartTitle,
    legend,
    XAxisOptions,
    YAxisOptions,
    plotColumnOptions,
    tooltip,
    series,
    columnData,
  ]);

  const chartLineOptions = useMemo(() => {
    const data = [
      {
        ...lineData[0],
        type: "line",
        showInLegend: true,
        marker: { enabled: false, height: 2, width: 2, symbol: "circle" },
        color: getColorByIndex(0, themeProp),
      },
      {
        ...lineData[1],
        type: "line",
        showInLegend: true,
        marker: { enabled: false, height: 2, width: 2, symbol: "circle" },
        color: getColorByIndex(1, themeProp),
      },
    ];
    return {
      ...customOptions,
      chart: {
        type,
        height,
        width,
        ...ChartOptions,
      },
      title: {
        ...title,
        text: chartTitle,
      },
      xAxis: {
        ...XAxisOptions,
      },
      yAxis: {
        ...YAxisOptions,
      },
      tooltip: {
        ...tooltip,
      },
      plotOptions: {
        areaspline: {
          ...plotLineOptions,
        },
      },
      legend: {
        ...legend,
      },
      credits: {
        enabled: false,
      },
      series: series || data,
    };
  }, [
    lineData,
    customOptions,
    type,
    height,
    width,
    ChartOptions,
    title,
    chartTitle,
    legend,
    XAxisOptions,
    YAxisOptions,
    plotLineOptions,
    tooltip,
    series,
    themeProp,
  ]);

  const chartBarOptions = useMemo(() => {
    const data = barData.map((dataObj) => ({
      type: "bar",
      showInLegend: true,
      marker: { enabled: false, height: 2, width: 2, symbol: "circle" },
      ...dataObj,
    }));
    return {
      ...customOptions,
      chart: {
        type,
        height,
        width,
        ...ChartOptions,
      },
      title: {
        ...title,
        text: chartTitle,
      },
      xAxis: {
        visible: false,
        labels: {
          style: {
            color: "black",
            fontSize: "13px",
            fontFamily: "Poppins-Medium, Roboto,  Helvetica Neue, Arial",
          },
        },
        ...XAxisOptions,
      },
      yAxis: {
        min: -100,
        max: 100,
        title: {
          align: "high",
        },
        labels: {
          style: {
            color: "black",
            fontSize: "13px",
            fontFamily: "Poppins-Medium, Roboto,  Helvetica Neue, Arial",
          },
          overflow: "justify",
        },
        ...YAxisOptions,
      },
      tooltip: {
        ...tooltip,
      },
      plotOptions: {
        bar: {
          colors: chartColors[themeProp],
          ...plotBarOptions,
        },
      },
      legend: {
        width: "100%",
        ...legend,
      },
      credits: {
        enabled: false,
      },
      series: series || data,
    } as Options;
  }, [
    type,
    height,
    chartTitle,
    title,
    tooltip,
    legend,
    width,
    customOptions,
    series,
    ChartOptions,
    XAxisOptions,
    YAxisOptions,
    plotBarOptions,
    barData,
    themeProp,
  ]);

  const ChartAreasplineOptions = useMemo(() => {
    const data = areasplineData.map((dataObj, index) => {
      if (dataObj.isGradient) {
        return {
          type: "areaspline",
          showInLegend: true,
          marker: { enabled: false, height: 2, width: 2, symbol: "circle" },
          lineWidth: 3,
          color: getColorByIndex(index, themeProp),
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              getStartGradientColorByIndex(index, themeProp),
              getEndGradientColorByIndex(index, themeProp),
            ],
          },
          ...dataObj,
        };
      }
      return {
        type: "areaspline",
        showInLegend: true,
        marker: { enabled: false, height: 2, width: 2, symbol: "circle" },
        ...dataObj,
      };
    });
    return {
      chart: {
        type,
        height,
        ...ChartOptions,
      },
      legend: {
        ...legend,
      },
      credits: {
        enabled: false,
      },
      title: {
        ...title,
        text: chartTitle,
      },
      tooltip: {
        valueSuffix: " $",
        ...tooltip,
      },
      yAxis: {
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        title: {
          text: "",
        },
        ...YAxisOptions,
      },
      xAxis: {
        ...XAxisOptions,
      },
      plotOptions: {
        ...plotOptions,
        areaspline: {
          marker: {
            enabled: false,
          },
          ...plotAreasplineOptions,
        },
      },
      colors: chartColors[themeProp || "secondary"],
      series: series || data,
    } as Options;
  }, [
    type,
    areasplineData,
    series,
    ChartOptions,
    plotAreasplineOptions,
    legend,
    tooltip,
    title,
    chartTitle,
    XAxisOptions,
    YAxisOptions,
    height,
    plotOptions,
    themeProp,
  ]);

  switch (type) {
    case "pie":
      return chartPieOptions;
    case "areaspline":
      return ChartAreasplineOptions;
    case "bar":
      return chartBarOptions;
    case "line":
      return chartLineOptions;
    case "column":
      return chartColumnOptions;
    default:
      return {};
  }
};

export default useChartOptions;
