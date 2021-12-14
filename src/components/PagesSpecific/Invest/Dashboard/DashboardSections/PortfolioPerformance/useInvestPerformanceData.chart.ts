import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { appUtils } from "trolly/utils";

const usePortfolioPerformanceDataChart = (period: string) => {
  const { portfolioPerformance } = useSelector(
    (state: IAppState) => state.invest
  );

  const data = useMemo(() => {
    let chartData: any[] = [];
    let chartCategories: any[] = [];
    if (portfolioPerformance) {
      const { both } = portfolioPerformance;
      const convertedPerformanceArr = both;
      let startWith: number;
      if (isNaN(+period)) {
        startWith = 0;
      } else {
        startWith = convertedPerformanceArr.length - +period;
      }
      if (convertedPerformanceArr && convertedPerformanceArr.length > 0) {
        convertedPerformanceArr
          .filter((single, index) => index >= startWith) // endWith = 4 && startWith 0
          .forEach((singleLine) => {
            const { portfolio, dateStr } = singleLine;
            // format date
            let formatedDate = dateStr;
            const [year, month, day] = dateStr ? dateStr.split("-") : [];
            if (year && month && day) {
              const extendedDate = new Date(+year, +month - 1, +day);
              formatedDate = appUtils.formatChartsDate(extendedDate, {
                period,
              });
            }
            if (!isNaN(portfolio)) {
              chartData.push(Number(appUtils.formatDecimal(portfolio, 3)));
            }
            chartCategories.push(formatedDate);
          });
      }
    }
    return [chartData, chartCategories];
  }, [period, portfolioPerformance]);

  return data;
};

export default usePortfolioPerformanceDataChart;
