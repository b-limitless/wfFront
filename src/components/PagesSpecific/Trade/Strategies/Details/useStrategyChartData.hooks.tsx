import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { IChartMultiData } from "trolly/charts";
import { Tooltip, TTableData } from "trolly/common";
import { Indicator } from "trolly/custom";

export const useStrategyDataHooks = (strategyName: string) => {
  const { strategyDetails, descriptions } = useSelector(
    (state: IAppState) => state.strategies
  );

  const renderTableNode = useCallback(
    (key) => {
      if (descriptions) {
        const { metrics } = descriptions;
        const description = metrics[key];
        if (description) {
          return (
            <Tooltip
              title={description}
              withHelpIcon={true}
              arrow
              isIconOnly={true}
              wrapperAlignment="flex-start"
              color="secondary"
            >
              {key}
            </Tooltip>
          );
        }
      }
      return key;
    },
    [descriptions]
  );

  const getValueUnit = useCallback((value: number, description: string) => {
    const noPercentageKeys = ["Ratio", "Number", "Beta"];
    const hasNoPercentage = noPercentageKeys.find(
      (key) => description.indexOf(key) >= 0
    );
    if (!hasNoPercentage) {
      return `${value}%`;
    }
    return value;
  }, []);

  const strategyData = useMemo(() => {
    let sectorsChartData = [] as any[];
    let firmSizeChartData = [] as any[];
    let factorIntensityData = {} as IChartMultiData;
    let historicalPerformanceData = {} as IChartMultiData;
    let annualReturnData = {} as IChartMultiData;
    let drawdownData = {} as IChartMultiData;

    if (strategyDetails) {
      const {
        strategy,
        lastRebalancing,
        lastUpdate,
        nextRebalancing,
        nextUpdate,
        benchmark,
        benchmarkName,
        description,
      } = strategyDetails;
      if (strategy) {
        // data preparation destruct all the required data for building the charts from the api responde
        const { actual, historical: strategyHistorical } = strategy;
        const { historical: benchmarkHistorical } = benchmark;
        const {
          cumulativePerformance: cumulativeStrategyPerformance,
          annualReturn: strategyAnnualReturn,
          drawdown: strategyDrawdown,
          metric: strategyMetric,
          performance: strategyPerformance,
          risk: strategyRisk,
        } = strategyHistorical || {};
        const {
          cumulativePerformance: cumulativeBenchmarkPerformance,
          annualReturn: benchmarkAnnualReturn,
          drawdown: benchmarkDrawdown,
          metric: benchmarkMetric,
          performance: benchmarkPerformance,
          risk: benchmarkRisk,
        } = benchmarkHistorical || {};
        const { sectorAllocation, firmSizeAllocation, factorIntensity } =
          actual || {};
        //////////////////////////////////////////

        // sectors chart data
        sectorsChartData = Object.keys(sectorAllocation).map((sector) => ({
          name: sector.replace(/_/g, " "),
          y: sectorAllocation[sector],
        }));
        //////////////////////////////////////////

        // firm size chart data
        firmSizeChartData = Object.keys(firmSizeAllocation).map((firmSize) => ({
          name: firmSize.replace(/_/g, " "),
          y: firmSizeAllocation[firmSize],
        }));
        // factor intensity chart data
        factorIntensityData.data = Object.keys(factorIntensity).map(
          (factor) => ({
            name: factor,
            data: [{ y: factorIntensity[factor], name: factor }],
          })
        );
        factorIntensityData.categories = Object.keys(factorIntensity);
        //////////////////////////////////////////

        // historical data
        const historicalStrategyData = Object.keys(
          cumulativeStrategyPerformance
        ).map((dateString) => ({
          y: cumulativeStrategyPerformance[dateString],
          name: dateString,
        }));
        const historicalBenchmarkData = Object.keys(
          cumulativeBenchmarkPerformance
        ).map((dateString) => ({
          y: cumulativeBenchmarkPerformance[dateString],
          name: dateString,
        }));
        historicalPerformanceData = {
          data: [
            { name: strategyName, data: historicalStrategyData },
            { name: benchmarkName, data: historicalBenchmarkData },
          ],
          categories: Object.keys(cumulativeStrategyPerformance),
        };
        //////////////////////////////////////////

        // annual Return
        const strategyAnnualReturnData = Object.keys(strategyAnnualReturn).map(
          (year) => ({
            y: strategyAnnualReturn[year],
            name: year,
          })
        );
        const benchmarkAnnualReturnData = Object.keys(
          benchmarkAnnualReturn
        ).map((year) => ({
          y: benchmarkAnnualReturn[year],
          name: year,
        }));
        annualReturnData = {
          data: [
            { name: strategyName, data: strategyAnnualReturnData },
            { name: benchmarkName, data: benchmarkAnnualReturnData },
          ],
          categories: Object.keys(benchmarkAnnualReturn),
        };
        //////////////////////////////////////////

        // drawdown
        const strategyDrawdownData = Object.keys(strategyDrawdown).map(
          (dateString) => ({
            y: strategyDrawdown[dateString] * 100,
            name: dateString,
          })
        );
        const benchmarkDrawdownData = Object.keys(benchmarkDrawdown).map(
          (dateString) => ({
            y: benchmarkDrawdown[dateString] * 100,
            name: dateString,
          })
        );
        drawdownData = {
          data: [
            {
              name: strategyName,
              data: strategyDrawdownData,
              isGradient: true,
              lineWidth: 2,
            },
            {
              name: benchmarkName,
              data: benchmarkDrawdownData,
              isGradient: true,
              lineWidth: 2,
            },
          ],
          categories: Object.keys(benchmarkDrawdown),
        };
        //////////////////////////////////////////

        // prepare the table headers
        const returnTableColumns: TTableData[] = [
          {
            id: "return",
            node: "Return",
            value: "return",
            align: "left",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "strategy",
            node: "Strategy",
            value: "strategy",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "benchmark",
            node: benchmarkName,
            value: "benchmark",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
        ];
        const metricTableColumns: TTableData[] = [
          {
            id: "metric",
            node: "Metrics",
            value: "metric",
            align: "left",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "strategy",
            node: "Strategy",
            value: "strategy",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "benchmark",
            node: benchmarkName,
            value: "benchmark",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
        ];
        const riskTableColumns: TTableData[] = [
          {
            id: "risk",
            node: "Risk",
            value: "risk",
            align: "left",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "strategy",
            node: "Strategy",
            value: "strategy",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
          {
            id: "benchmark",
            node: benchmarkName,
            value: "benchmark",
            align: "center",
            styles: {
              whiteSpace: "nowrap",
              fontWeight: 600,
              padding: "16px 8px",
            },
          },
        ];
        //////////////////////////////////////////

        //preare the table rows
        const returnTableRows: TTableData[][] = Object.keys(
          benchmarkPerformance
        ).map((key) => {
          const transformedKey = key.replace(/_/g, " ");
          const strategyNodeText = getValueUnit(
            strategyPerformance[key],
            key
          ) as number;
          const benchmarkNodeText = getValueUnit(
            benchmarkPerformance[key],
            key
          ) as number;
          return [
            {
              id: "return",
              node: renderTableNode(transformedKey),
              value: transformedKey,
              align: "left",
              styles: { whiteSpace: "nowrap", padding: "16px 8px" },
            },
            {
              id: "strategy",
              node: (
                <Indicator
                  value={strategyPerformance[key]}
                  withSign={false}
                  withIndicator={false}
                  flexAlignment="center"
                >
                  {strategyNodeText}
                </Indicator>
              ),
              value: strategyPerformance[key],
              align: "center",
              styles: { whiteSpace: "nowrap", padding: "16px 8px" },
            },
            {
              id: "benchmark",
              value: benchmarkPerformance[key],
              node: (
                <Indicator
                  value={benchmarkPerformance[key]}
                  withSign={false}
                  withIndicator={false}
                  flexAlignment="center"
                >
                  {benchmarkNodeText}
                </Indicator>
              ),
              align: "center",
              styles: { whiteSpace: "nowrap", padding: "16px 8px" },
            },
          ] as TTableData[];
        });
        const metricTableRows: TTableData[][] = Object.keys(
          benchmarkMetric
        ).map((key) => {
          const transformedKey = key.replace(/_/g, " ");
          const strategyNodeText = getValueUnit(
            strategyMetric[key],
            key
          ) as number;
          const benchmarkNodeText = getValueUnit(
            benchmarkMetric[key],
            key
          ) as number;
          return [
            {
              id: "metric",
              node: renderTableNode(transformedKey),
              value: transformedKey,
              align: "left",
              styles: { whiteSpace: "nowrap", padding: "16px 8px" },
            },
            {
              id: "strategy",
              node: (
                <Indicator
                  value={strategyMetric[key]}
                  withSign={false}
                  withIndicator={false}
                  flexAlignment="center"
                >
                  {strategyNodeText}
                </Indicator>
              ),
              value: strategyMetric[key],
              align: "center",
            },
            {
              id: "benchmark",
              node: (
                <Indicator
                  value={benchmarkMetric[key]}
                  withSign={false}
                  withIndicator={false}
                  flexAlignment="center"
                >
                  {benchmarkNodeText}
                </Indicator>
              ),
              value: benchmarkMetric[key],
              align: "center",
              style: { padding: "16px 8px" },
            },
          ] as TTableData[];
        });
        const riskTableRows: TTableData[][] = Object.keys(benchmarkRisk).map(
          (key) => {
            const transformedKey = key.replace(/_/g, " ");
            const strategyNodeText = getValueUnit(
              strategyRisk[key],
              key
            ) as number;
            const benchmarkNodeText = getValueUnit(
              benchmarkRisk[key],
              key
            ) as number;
            return [
              {
                id: "risk",
                node: renderTableNode(transformedKey),
                value: transformedKey,
                align: "left",
                styles: { whiteSpace: "nowrap", padding: "16px 8px" },
              },
              {
                id: "strategy",
                node: (
                  <Indicator
                    value={strategyRisk[key]}
                    withSign={false}
                    withIndicator={false}
                    flexAlignment="center"
                  >
                    {strategyNodeText}
                  </Indicator>
                ),
                value: strategyRisk[key],
                align: "center",
                style: { padding: "16px 8px" },
              },
              {
                id: "benchmark",
                node: (
                  <Indicator
                    value={benchmarkRisk[key]}
                    withSign={false}
                    withIndicator={false}
                    flexAlignment="center"
                  >
                    {benchmarkNodeText}
                  </Indicator>
                ),
                value: benchmarkRisk[key],
                align: "center",
                style: { padding: "16px 8px" },
              },
            ] as TTableData[];
          }
        );
        //////////////////////////////////////////

        return {
          sectorsChartData: [{ data: sectorsChartData }],
          firmSizeChartData: [{ data: firmSizeChartData }],
          factorIntensityData,
          historicalPerformanceData,
          annualReturnData,
          drawdownData,
          returnTableColumns,
          metricTableColumns,
          riskTableColumns,
          returnTableRows,
          metricTableRows,
          riskTableRows,
          lastRebalancing,
          lastUpdate,
          nextRebalancing,
          nextUpdate,
          description,
        };
      }
    }
    return {};
  }, [strategyDetails, strategyName, renderTableNode, getValueUnit]);

  return strategyData;
};
