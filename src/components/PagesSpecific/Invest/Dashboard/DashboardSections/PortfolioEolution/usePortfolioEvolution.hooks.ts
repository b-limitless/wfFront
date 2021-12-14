import { useCallback, useMemo } from "react";
import { appUtils } from "trolly/utils";

const numOfYears = 30;
const numOfMonths = numOfYears * 12;

const usePortfolioEvolutionTrasnformer = (
  portfolioValue: number,
  monthlyIncome: number,
  rateOfReturn: number
): { chartsData: any[]; chartsCategories: any[] } => {
  const r = useMemo(() => (rateOfReturn * 0.01) / 12, [rateOfReturn]);
  // number of years (30 years)

  const getData = useCallback(() => {
    // old implementation
    // return Number(
    //   ((Math.pow(1 + R, year) - 1) / R) * montlyIncome +
    //     portfolioValue * Math.pow(1 + R, year)
    // );
    let updatedPortfolioValue = portfolioValue;
    const data = [portfolioValue];
    Array.from(Array(numOfMonths).keys()).forEach((month) => {
      updatedPortfolioValue = (r + 1) * updatedPortfolioValue;
      updatedPortfolioValue = updatedPortfolioValue + monthlyIncome;
      if ((month + 1) % 12 === 0) {
        data.push(Number(appUtils.formatDecimal(updatedPortfolioValue, 0)));
      }
    });
    return data;
  }, [monthlyIncome, portfolioValue, r]);

  const { data, categories } = useMemo(() => {
    const categories = Array.from(Array(numOfYears).keys()).map((year) => {
      return `${year + 1} ${year + 1 > 1 ? "Years" : "Year"}`;
    });
    const data = getData();
    return { data, categories };
  }, [getData]);

  return { chartsData: data, chartsCategories: categories };
};

export default usePortfolioEvolutionTrasnformer;
