import { IStoreAction } from "trolly/store";
import {
  INVEST_CLEAR_ALGO_COMB,
  INVEST_SET_ACCOUNT_ACTIVITY,
  INVEST_SET_ACCOUNT_INFO,
  INVEST_SET_ACCOUNT_STATEMENT,
  INVEST_SET_ALGO_COMB,
  INVEST_SET_PERFORMANCE_INFO,
  INVEST_SET_PORTFOLIO_PERFORMANCE,
  INVEST_SET_USER_ALLOCATION,
} from "../store.types";
import { IAccountActivity, IAccountStatement } from "./reducers.interface";

export type TAssetClass = {
  Equity?: number;
  Fixed_Income?: number;
};

export type TActualMemberData = {
  asset_class: string;
  expense_ratio: number;
  name: string;
  sub_class: string;
  sym: string;
  weight: number;
};
export interface IAlgoData {
  actual_members: TActualMemberData[];
  asset_class: TAssetClass;
  sub_asset_class: { [key: string]: number };
  wealth_index: number[];
  expected_return: number;
}

export interface IPerformanceInfo {
  accountBalance: number;
  dailyEarning: number;
  dailyReturn: number;
  deposits: number;
  fees: number;
  feesObj: any[];
  investmentAmount: number;
  portfolioValue: number;
  totalEarnings: number;
  totalReturn: number;
  withdrawals: number;
}

// Invest Account Info
type TAccountManagement = { name: string; description: string };

type TIvestCashObj = {
  cashAvailableForTrade: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
  cashSettlement: { utcTime: string; cash: number }[];
  noBuyingPowerReason: boolean;
  pendingPaymentsAmount: number;
};

export type TEquityPosition = {
  availableForTradingQty: number;
  avgPrice: number;
  costBasis: number;
  instrumentID: string;
  marketValue: number;
  mktPrice: number;
  openQty: number;
  priorClose: number;
  side: "B" | "S";
  symbol: string;
  unrealizedDayPL: number;
  unrealizedDayPLPercent: number;
  unrealizedPL: number;
  valuePercetage: number;
};

type TEquityObj = {
  equityValue: number;
  equityPositions: TEquityPosition[];
};

type TInvestAccountStatus = {
  description: string;
  name: string;
}
export interface IInvestAccountInfo {
  accountID: string;
  accountNo: string;
  accountMgmtType: TAccountManagement;
  cash: TIvestCashObj;
  equity: TEquityObj;
  status: TInvestAccountStatus;
}
/////////////////////////

export interface IUserAllocation {
  costBasis: number;
  equityValue: number;
  marketValue: number;
  equityPositions: TEquityPosition[];
}

export type TPortfolioPerformanceBoth = {
  cash: number;
  dateStr: string;
  equityValue: number;
  portfolio: number;
};
export interface IPortfolioPerformance {
  ChngData: number[];
  both: TPortfolioPerformanceBoth[];
  data: number[];
  labels: string[];
}
export interface IInvestState {
  algoCombData?: IAlgoData;
  performanceInfo?: IPerformanceInfo;
  investAccountActivity?: IAccountActivity[];
  investAccountStatements?: IAccountStatement[];
  accountInfo?: IInvestAccountInfo[];
  userAllocation?: IUserAllocation;
  portfolioPerformance?: IPortfolioPerformance;
}
const investReducer = (state: IInvestState = {}, action: IStoreAction) => {
  switch (action.type) {
    case INVEST_SET_ALGO_COMB:
      return {
        ...state,
        algoCombData: action.payload,
      };
    case INVEST_CLEAR_ALGO_COMB:
      return {
        ...state,
        algoCombData: undefined,
      };
    case INVEST_SET_PERFORMANCE_INFO:
      return {
        ...state,
        performanceInfo: action.payload,
      };
    case INVEST_SET_ACCOUNT_ACTIVITY:
      return {
        ...state,
        investAccountActivity: action.payload,
      };
    case INVEST_SET_ACCOUNT_STATEMENT:
      return {
        ...state,
        investAccountStatements: action.payload,
      };
    case INVEST_SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.payload,
      };
    case INVEST_SET_USER_ALLOCATION:
      return {
        ...state,
        userAllocation: action.payload,
      };
    case INVEST_SET_PORTFOLIO_PERFORMANCE:
      let reversedBoth = [];
      if (action.payload) {
        const { both } = action.payload;
        if (both && both.length > 0) {
          reversedBoth = both.reverse();
        }
      }
      return {
        ...state,
        portfolioPerformance: {
          ...action.payload,
          both: reversedBoth,
        },
      };
    default:
      return state;
  }
};

export default investReducer;
