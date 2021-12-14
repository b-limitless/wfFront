import useAlgoChartsDataTransformer from "hooks/useAlgoChartData";
import React from "react";
import { INVEST_GET_ALGO_COMB } from "store/store.types";
import Charts from "trolly/charts";
import { Card, Skeleton } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { appUtils } from "trolly/utils";

const Loader: React.FC = () => {
  return (
    <Card
      display="flex"
      justifyContent="center"
      padding="20px"
      alignItems="center"
    >
      <Skeleton variant="circle" height="250px" width="250px" />
    </Card>
  );
};
const TargetAllocationChart: React.FC = () => {
  const { pieData } = useAlgoChartsDataTransformer();
  const { isLoading } = useApiInfo(INVEST_GET_ALGO_COMB);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Card padding="20px" display="grid">
      <Charts
        type="pie"
        theme="secondary"
        pieData={pieData}
        chartTitle="Asset Class"
        plotPieOptions={{
          innerSize: "50%",
        }}
        title={{
          style: {
            fontSize: "22px",
            fontWeight: "600",
            fontFamily: "Poppins, sans-serif",
            color: "black",
          },
        }}
        legend={{
          align: "center",
          verticalAlign: "bottom",
          width: "100%",
          itemWidth: 230,
          symbolRadius: 3,
          maxHeight: 300,
          symbolPadding: 5,
          itemMarginBottom: 5,
          itemStyle: {
            color: "#797878",
            cursor: "pointer",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            textOverflow: "ellipsis",
          },
        }}
        tooltip={{
          pointFormat: "<b>{point.percentage:.1f}%</b>",
        }}
        seriesPieDataLabels={{
          formatter: function () {
            return `<br>${appUtils.formatDecimal(this.y, 0)} %`;
          },
        }}
      />
    </Card>
  );
};

export default TargetAllocationChart;
