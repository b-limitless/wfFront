import React from "react";
import { IChartMultiData } from "trolly/charts";
import { Box, TTableData } from "trolly/common";
import AnnualReturnChart from "./AnnualReturnChart";
import DrawdownChart from "./DrawdownChart";
import HistoricalPerformanceChart from "./HistoricalPerformanceChart";
import MetricsTable from "./MetricsTable";
import ReturnTable from "./ReturnTable";
import RiskTable from "./RiskTable";

interface IPerformanceBlocksProps {
  performanceData: {
    historical?: IChartMultiData;
    annualReturn?: IChartMultiData;
    drawDown?: IChartMultiData;
    returnTableColumns?: TTableData[];
    returnTableRows?: TTableData[][];
    metricsTableColumns?: TTableData[];
    metricsTableRows?: TTableData[][];
    riskTableColumns?: TTableData[];
    riskTableRows?: TTableData[][];
  };
}
const PerformanceBlocks: React.FC<IPerformanceBlocksProps> = ({
  performanceData,
}) => {
  const {
    annualReturn,
    drawDown,
    historical,
    returnTableColumns,
    returnTableRows,
    metricsTableColumns,
    metricsTableRows,
    riskTableColumns,
    riskTableRows,
  } = performanceData;
  return (
    <Box gridGap="20px">
      <Box
        gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gridGap="20px"
      >
        <HistoricalPerformanceChart historicalData={historical} />
        <AnnualReturnChart annualReturn={annualReturn} />
        <DrawdownChart drawdown={drawDown} />
      </Box>
      <Box
        gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gridGap="20px"
      >
        <ReturnTable columns={returnTableColumns} rows={returnTableRows} />
        <MetricsTable columns={metricsTableColumns} rows={metricsTableRows} />
        <RiskTable columns={riskTableColumns} rows={riskTableRows} />
      </Box>
    </Box>
  );
};

export default PerformanceBlocks;
