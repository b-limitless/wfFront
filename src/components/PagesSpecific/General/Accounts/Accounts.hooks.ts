import { useDispatch } from "react-redux";
import {
  INVEST_GET_PERFORMANCE_INFO,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import {
  useInvestAccountInfo,
  useTradeAccountInfo,
} from "hooks/useAccountInfo";
import { apiActions, EApps } from "trolly/store";
import { ETheme } from "trolly/common";

const useAccountsInfo = (): {
  isLoading: boolean;
  error: string | string[];
  onCloseHandler: () => void;
  portfolioValue: number;
  theme: ETheme;
  appId: EApps;
} => {
  const { appId, theme } = useAppInfo();

  const dispatch = useDispatch();

  const { isLoading, error } = useApiInfo(
    appId === "A" ? INVEST_GET_PERFORMANCE_INFO : TRADE_GET_ACCOUNT_SUMMARY
  );

  const { portfolioValue: tradePortfolioValue } = useTradeAccountInfo();
  const { portfolioValue: investPortfolioValue } = useInvestAccountInfo();

  const onCloseHandler = () => {
    if (appId === "A") {
      dispatch(apiActions.clearApi(INVEST_GET_PERFORMANCE_INFO));
    } else if (appId === "C") {
      dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
    }
  };

  return {
    isLoading,
    error,
    onCloseHandler,
    portfolioValue: appId === "A" ? investPortfolioValue : tradePortfolioValue,
    theme,
    appId: appId ? appId : "A",
  };
};

export default useAccountsInfo;
