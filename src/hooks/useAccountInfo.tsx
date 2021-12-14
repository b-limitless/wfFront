import { AccessTime } from "@material-ui/icons";
import { MONTHS_NAMES } from "components/PagesSpecific/Trade/Trade.config";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvestAccountInfo,
  getPerformanceInfo,
} from "store/actions/invest.actions";
import {
  getAccountPerformance,
  getAccountSummary,
} from "store/actions/trade.actions";
import {
  IAlgoData,
  IPerformanceInfo,
  TActualMemberData,
  TAssetClass,
  TEquityPosition,
} from "store/reducers/invest.reducers";
import { IAppState } from "store/store.interface";
import {
  INVEST_GET_ACCOUNT_INFO,
  INVEST_GET_PERFORMANCE_INFO,
  TRADE_GET_ACCOUNT_PERFORMANCE,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { Box, Text } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { appUtils } from "trolly/utils";

export const useTradeAccountInfo = () => {
  const { accountSummary, accountPerformance } = useSelector(
    (state: IAppState) => state.trade
  );

  const { appId } = useAppInfo();

  const dispatch = useDispatch();

  const { isLoading: isGettingPerformance, done: performanceDone } = useApiInfo(
    TRADE_GET_ACCOUNT_PERFORMANCE
  );
  const { isLoading: isGettingSummary, done: summaryDone } = useApiInfo(
    TRADE_GET_ACCOUNT_SUMMARY
  );

  useEffect(() => {
    if (appId === "C") {
      if (!isGettingPerformance) {
        dispatch(getAccountPerformance());
      }
      if (!isGettingSummary) {
        dispatch(getAccountSummary());
      }
    }
    // eslint-disable-next-line
  }, [dispatch, appId]);

  const {
    portfolioValue,
    dayPl,
    totalPl,
    buyingPower,
    lastUpdate,
    accountNumber,
    cashAvailableForWithdrawal,
    isLoading,
  } = useMemo(() => {
    let portfolioValue = 0;
    let dayPl = 0;
    let totalPl = 0;
    let buyingPower = 0;
    let lastUpdate = "" as any;
    let accountNumber = "";
    let cashAvailableForWithdrawal = 0;
    if (accountSummary && accountSummary.cash) {
      const {
        cash: summaryCash,
        equity,
        lastUpdated,
        accountNo,
      } = accountSummary;
      if (summaryCash) {
        const {
          cashAvailableForTrade,
          cashBalance,
          cashAvailableForWithdrawal: summaryCashAvailableForWithdrawal,
        } = summaryCash;
        const { equityValue, equityPositions = [] } = equity || {};
        buyingPower = cashAvailableForTrade;
        portfolioValue = cashBalance + equityValue;
        equityPositions.forEach((position) => {
          totalPl = totalPl + position.unrealizedPL;
        });
        accountNumber = accountNo;
        cashAvailableForWithdrawal = summaryCashAvailableForWithdrawal;
      }
      if (lastUpdated) {
        const LastUpdateAsDate = new Date(lastUpdated);
        const hours = LastUpdateAsDate.getHours();
        const minutes = LastUpdateAsDate.getMinutes();
        const day = LastUpdateAsDate.getDate();
        const month = MONTHS_NAMES[LastUpdateAsDate.getMonth()];
        lastUpdate = (
          <Box display="flex" justifyContent="center" alignItems="center">
            <AccessTime color="secondary" />
            <Text
              fontSize="13px"
              marginLeft="5px"
            >{`As of ${day}, ${month} at ${appUtils.formatTime(
              hours
            )}:${appUtils.formatTime(minutes)}`}</Text>
          </Box>
        );
      }
    }
    if (accountPerformance) {
      const { performance } = accountPerformance;
      if (performance && performance.length > 0) {
        const { unrealizedDayPL } = performance[performance.length - 1];
        dayPl = unrealizedDayPL;
      }
    }
    return {
      portfolioValue,
      dayPl,
      totalPl,
      buyingPower,
      lastUpdate,
      accountNumber,
      cashAvailableForWithdrawal,
      isLoading:
        isGettingPerformance ||
        isGettingSummary ||
        !summaryDone ||
        !performanceDone,
    };
  }, [
    accountPerformance,
    accountSummary,
    isGettingPerformance,
    isGettingSummary,
    summaryDone,
    performanceDone,
  ]);

  return {
    portfolioValue,
    dayPl,
    totalPl,
    buyingPower,
    lastUpdate,
    accountNumber,
    cashAvailableForWithdrawal,
    isLoading,
  };
};

export interface IInvestAccountInfo extends IPerformanceInfo, IAlgoData {
  drivewealth_account_no: string;
  drivewealth_account_id: string;
  equityValue: number;
  cashValue: number;
  equityPositions: TEquityPosition[];
  isLoading: boolean;
}
export const useInvestAccountInfo = (options?: {
  accountId?: string;
  doNotFetchData?: boolean;
}): IInvestAccountInfo => {
  const { accountId, doNotFetchData } = options || {};
  const {
    performanceInfo = {},
    data,
    accountInfo,
    algoCombData,
    userAllocation,
  } = useSelector((state: IAppState) => ({
    ...state.invest,
    ...state.auth,
  }));

  const dispatch = useDispatch();

  const { appId } = useAppInfo();

  const { isLoading, done } = useApiInfo(INVEST_GET_ACCOUNT_INFO);

  const { isLoading: isGettingAccountInfo } = useApiInfo(
    INVEST_GET_ACCOUNT_INFO
  );
  const { isLoading: isGettingPerformance } = useApiInfo(
    INVEST_GET_PERFORMANCE_INFO
  );

  useEffect(() => {
    if (appId === "A" && !doNotFetchData) {
      if (!isGettingAccountInfo) {
        dispatch(getInvestAccountInfo());
      }
      if (!isGettingPerformance) {
        dispatch(getPerformanceInfo());
      }
    }
    // eslint-disable-next-line
  }, [dispatch, appId, doNotFetchData]);

  const algoData = useMemo(() => {
    let assetClass: TAssetClass = {};
    let actualMembers: TActualMemberData[] = [];
    let subAssetClass = {};
    let expectedReturn: number = 0;
    let wealthIndex: number[] = [];
    if (algoCombData) {
      const {
        asset_class,
        actual_members,
        sub_asset_class,
        expected_return,
        wealth_index,
      } = algoCombData;
      assetClass = asset_class;
      actualMembers = actual_members;
      subAssetClass = sub_asset_class;
      expectedReturn = expected_return;
      wealthIndex = wealth_index;
    }
    return {
      asset_class: assetClass,
      actual_members: actualMembers,
      sub_asset_class: subAssetClass,
      expected_return: expectedReturn,
      wealth_index: wealthIndex,
    };
  }, [algoCombData]);

  const extractedEquityPositions = useMemo(() => {
    let finalEquityPositions: TEquityPosition[] = [];
    if (userAllocation) {
      const { equityPositions = [] } = userAllocation;
      finalEquityPositions = equityPositions;
    }
    return { equityPositions: finalEquityPositions };
  }, [userAllocation]);

  const extractedData = useMemo(() => {
    let cashValue = 0;
    let finalEquityValue = 0;
    if (accountInfo && accountInfo.length > 0) {
      let extractedAccountObj = accountInfo[0];
      if (accountId) {
        const selectedAccount = accountInfo.find(
          (account) => account.accountID === accountId
        );
        if (selectedAccount) {
          extractedAccountObj = selectedAccount;
        }
      }
      const { cash, equity } = extractedAccountObj;
      if (cash) {
        const { cashBalance = 0 } = cash;
        cashValue = cashBalance;
      }
      if (equity) {
        const { equityValue } = equity;
        finalEquityValue = equityValue;
      }
    }
    return {
      cashValue,
      equityValue: finalEquityValue,
    };
  }, [accountInfo, accountId]);

  const {
    accountBalance = 0,
    dailyEarning = 0,
    dailyReturn = 0,
    deposits = 0,
    fees = 0,
    investmentAmount = 0,
    portfolioValue = 0,
    totalEarnings = 0,
    feesObj = [],
    totalReturn = 0,
    withdrawals = 0,
    drivewealth_account_id,
    drivewealth_account_no,
  } = useMemo(() => {
    const { user } = data || {};
    const { drivewealth_account_id, drivewealth_account_no } = user;
    return {
      ...performanceInfo,
      drivewealth_account_id,
      drivewealth_account_no,
    } as IInvestAccountInfo;
  }, [performanceInfo, data]);

  return {
    accountBalance,
    dailyEarning,
    dailyReturn,
    deposits,
    fees,
    investmentAmount,
    portfolioValue,
    totalEarnings,
    feesObj,
    totalReturn,
    withdrawals,
    drivewealth_account_id,
    drivewealth_account_no,
    ...extractedData,
    ...algoData,
    ...extractedEquityPositions,
    isLoading: isLoading || !done,
  };
};
