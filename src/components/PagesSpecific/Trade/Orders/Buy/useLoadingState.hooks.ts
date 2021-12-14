import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  TRADE_GET_ACCOUNT_SUMMARY,
  TRADE_GET_CONSOLIDATED_QUOTE,
  TRADE_GET_INSTRUMENT_FUNDAMENTAL,
} from "store/store.types";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";

const useLoadingState = () => {
  const {
    isLoading: isSummaryLoading,
    error: summaryError,
    isSuccess: isSummarySuccess,
  } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);
  const {
    isLoading: isConsolidatedLoading,
    error: consolidatedError,
    isSuccess: isConsoludatedSuccess,
  } = useApiInfo(TRADE_GET_CONSOLIDATED_QUOTE);

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
    dispatch(apiActions.clearApi(TRADE_GET_CONSOLIDATED_QUOTE));
    dispatch(apiActions.clearApi(TRADE_GET_INSTRUMENT_FUNDAMENTAL));
  };

  const { isLoading, error, isSuccess } = useMemo(() => {
    return {
      isLoading: isSummaryLoading || isConsolidatedLoading,
      error: summaryError || consolidatedError,
      isSuccess: isSummarySuccess || isConsoludatedSuccess,
    };
  }, [
    isSummaryLoading,
    isConsolidatedLoading,
    isConsoludatedSuccess,
    summaryError,
    consolidatedError,
    isSummarySuccess,
  ]);

  return { isLoading, error, isSuccess, clearError };
};

export default useLoadingState;
