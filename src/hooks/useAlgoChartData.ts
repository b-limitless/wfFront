import { useMemo } from "react";
import { useInvestAccountInfo } from "./useAccountInfo";

const useAlgoChartsDataTransformer = () => {
  const { sub_asset_class, wealth_index } = useInvestAccountInfo();

  const [pieData, areasplineData] = useMemo(() => {
    let pieData: any[] = [];
    let areasplineData: any = {};
    if (sub_asset_class && typeof wealth_index !== "undefined") {
      Object.keys(sub_asset_class).forEach((key) => {
        pieData.push({
          name: key.replace(/_/g, " "),
          y: sub_asset_class[key],
        });
      });

      areasplineData = {
        data: wealth_index,
        categories: wealth_index.map((x: any, index: number) =>
          index === 0 ? "Now" : `${index} ${index === 1 ? "Year" : "Years"}`
        ),
      };
    }
    return [pieData, areasplineData];
  }, [sub_asset_class, wealth_index]);

  return { pieData: [{ data: pieData }], areasplineData };
};

export default useAlgoChartsDataTransformer;
