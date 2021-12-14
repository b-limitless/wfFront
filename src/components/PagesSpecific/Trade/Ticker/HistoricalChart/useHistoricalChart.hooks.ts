import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";

const useHistoricalChart = () => {
  const { instrumentChart } = useSelector((state: IAppState) => state.trade);

  const data = useMemo(() => {
    let chartData: any[] = [];
    let chartCategories: any[] = [];
    if (instrumentChart && instrumentChart.data) {
      const { data } = instrumentChart;
      const dateData = data.split("|");
      dateData.forEach((singleLine) => {
        const [date, , , , close] = singleLine.split(",");
        if (!isNaN(Number(close))) {
          chartData.push(Number(close));
        }
        chartCategories.push(date);
      });
    }
    return [chartData, chartCategories];
  }, [instrumentChart]);

  return data;
};

export default useHistoricalChart;
