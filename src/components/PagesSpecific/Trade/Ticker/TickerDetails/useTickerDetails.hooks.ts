import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { appUtils } from "trolly/utils";

const defaultValue = null;
const useTickerDetailsTransformer = (): any => {
  const { instrumentQuoteLive, instrumentFundamental } = useSelector(
    (state: IAppState) => state.trade
  );

  const { formatDecimal, formatNumberWithUnit } = appUtils;

  // transform the instrument details to be listed in the details component
  const detailsValues = useMemo(() => {
    let values = {} as any;
    if (instrumentQuoteLive && instrumentQuoteLive.length > 0) {
      const { change, priorClose, lastTrade, open, high, low, volume } =
        instrumentQuoteLive[0];
      values = {
        ...values,
        price: lastTrade ? formatDecimal(lastTrade, 2) : defaultValue,
        change: change ? formatDecimal(change, 2) : defaultValue,
        changePerc:
          change && priorClose
            ? formatDecimal((change / priorClose) * 100, 2)
            : defaultValue,
        previousClose: priorClose ? formatDecimal(priorClose, 2) : defaultValue,
        open: open ? formatDecimal(open, 2) : defaultValue,
        dayRange:
          high && low
            ? `${formatDecimal(low, 2)} - ${formatDecimal(high, 2)}`
            : defaultValue,
        volume: volume ? formatNumberWithUnit(volume, 2) : defaultValue,
      };
    }
    if (instrumentFundamental) {
      const { image, fundamentalDataModel, name, exchange } =
        instrumentFundamental;
      const {
        fiftyTwoWeekHighPrice,
        fiftyTwoWeekLowPrice,
        marketCap,
        peRatio,
        earningsPerShare,
      } = fundamentalDataModel || {};
      values = {
        ...values,
        companyName: name ? name : defaultValue,
        image,
        fiftyTwoWeekRange:
          fiftyTwoWeekHighPrice && fiftyTwoWeekLowPrice
            ? `${formatDecimal(fiftyTwoWeekLowPrice, 2)} - ${formatDecimal(
                fiftyTwoWeekHighPrice,
                2
              )}`
            : defaultValue,
        marketCap: marketCap
          ? formatNumberWithUnit(marketCap, 2)
          : defaultValue,
        peRatio: peRatio ? formatDecimal(peRatio, 2) : defaultValue,
        eps: earningsPerShare
          ? formatDecimal(earningsPerShare, 2)
          : defaultValue,
        exchange: exchange ? exchange : defaultValue,
      };
    }
    return values;
  }, [
    instrumentFundamental,
    instrumentQuoteLive,
    formatDecimal,
    formatNumberWithUnit,
  ]);

  return detailsValues;
};

export default useTickerDetailsTransformer;
