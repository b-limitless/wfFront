import { useMemo } from "react";
import { useSelector } from "react-redux";
import { TPeriod } from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import { appUtils } from "trolly/utils";

const useHistoricalChart = (period: TPeriod) => {
  const { accountPerformance } = useSelector((state: IAppState) => state.trade);

  const data = useMemo(() => {
    let chartData: any[] = [];
    let chartCategories: any[] = [];
    if (accountPerformance) {
      const { performance } = accountPerformance;
      let startWith: number;
      switch (period) {
        case "5d":
          startWith = performance.length - 5;
          break;
        case "1m":
          startWith = performance.length - 20;
          break;
        case "3m":
          startWith = performance.length - 60;
          break;
        case "1y":
          startWith = performance.length - 252;
          break;
        case "5y":
          startWith = performance.length - 252 * 5;
          break;
        default:
          break;
      }
      if (performance && performance.length > 0) {
        performance
          .filter((single, index) => index >= startWith) // endWith = 4 && startWith 0
          .forEach((singleLine) => {
            const { date, cash, equity } = singleLine;
            // format date
            let formatedDate = date;
            const [year, month, day] = date ? date.split("-") : [];
            if (year && month && day) {
              const extendedDate = new Date(+year, +month - 1, +day);
              formatedDate = appUtils.formatChartsDate(extendedDate, {
                period,
              });
            }
            ////////////////////////
            const totalCash = +cash + +equity;
            if (!isNaN(Number(totalCash))) {
              chartData.push(Number(totalCash));
            }
            chartCategories.push(formatedDate);
          });
      }
    }
    return [chartData, chartCategories];
  }, [accountPerformance, period]);

  return data;
};

export default useHistoricalChart;
