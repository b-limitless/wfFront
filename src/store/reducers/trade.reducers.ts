import { IStoreAction } from "trolly/store";
import {
  TRADE_SET_ACCOUNT_ACTIVITY,
  TRADE_SET_ACCOUNT_CASH_SUMMARY,
  TRADE_SET_ACCOUNT_PERFORMANCE,
  TRADE_SET_ACCOUNT_STATEMENTS,
  TRADE_SET_ACCOUNT_SUMMARY,
  TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE,
  TRADE_SET_CONSOLIDATED_QUOTE,
  TRADE_SET_INSTRUMENTS_LIST,
  TRADE_SET_INSTRUMENTS_LIST_AF,
  TRADE_SET_INSTRUMENTS_LIST_WF,
  TRADE_SET_INSTRUMENT_CHART_DATA,
  TRADE_SET_INSTRUMENT_DETAILS,
  TRADE_SET_INSTRUMENT_FUNDAMENTAL,
  TRADE_SET_WATCHLIST_DASHBOARD,
} from "../store.types";
import { IAccountActivity, IAccountStatement } from "./reducers.interface";

/**
 * Performance and summary
 */
export type TInstrumentType = {
  id: string;
  symbol: string;
  name: string;
  status: string;
};

export type TInstrumentWfType = {
  did: string;
  image: string;
  name: string;
  symbol: string;
  _id: string;
};

export type TInstrumentAFType = {
  symbol: string;
  name: string;
  id_: string;
  asset: string;
  status: string;
  image: string;
  ISIN: string;
  industry: string;
  sector: string;
  halal: boolean;
};

export type TPerformance = {
  realizedDayPL: number;
  unrealizedDayPL: number;
  cumRealizedPL: number;
  date: string;
  equity: number;
  cash: number;
  deposits: number;
  withdrawals: number;
  fees: number;
};

export interface IAccountPerformance {
  accountID: string;
  accountNo: string;
  startDate: string;
  endDate: string;
  performance: TPerformance[] | [];
}

type TCashType = {
  cashAvailableForTrade: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
};

type TEquityPosition = {
  symbol: string;
  instrumentID: string;
  openQty: number;
  costBasis: number;
  marketValue: number;
  side: string;
  priorClose: number;
  availableForTradingQty: number;
  avgPrice: number;
  mktPrice: number;
  unrealizedPL: number;
  unrealizedDayPLPercent: number;
  unrealizedDayPL: number;
};

type TEquityType = {
  equityValue: number;
  equityPositions: TEquityPosition[];
};

type TTransactionType = {
  orderId: string;
  orderNo: string;
  symbol: string;
  cumQty: number;
  orderStatus: string;
  orderType: string;
  orderQty: number;
  limitPrice: number;
  stopPrice: number;
  executedPrice: number | null;
  side: string;
  createdWhen: string;
  updatedWhen: null;
  updatedReason: string;
  commission: number;
  commissionDesc: string;
  isoTimeRestingOrderExpires: string;
  executedWhen: string | null;
  realizedPL: string | null;
  orderCashAmt: number;
};

type TOrderType = {
  orderID: string;
  orderNo: string;
  createdWhen: string;
  symbol: string;
  cumQty: number;
  orderStatus: string;
  orderType: string;
  orderQty: number;
  isoTimeRestingOrderExpires: number | null;
  limitPrice: number;
  side: string;
  orderCashAmt: number;
  stopPrice: number;
  avgPrice?: number;
};

export interface IAccountSummary {
  accountID: string;
  accountNo: string;
  tradingType: string;
  cash: TCashType;
  equity: TEquityType;
  transactions: TTransactionType[];
  orders: TOrderType[];
  lastUpdated: string;
}

export interface IInstrumentDetails {
  symbol: string;
  name: string;
  description: string;
  image: string;
}

type TInstrumentChart = {
  data: string;
};

type TInstrumentQuoteLive = {
  symbol: string;
  bid: number;
  ask: number;
  lastTrade: number;
  change: number;
  open: number;
  high: number;
  low: number;
  close: number;
  priorClose: number;
  volume: number;
  marketCondition: string;
  dataProvider: string;
};

type TInstrumentQuote = {
  symbol: string;
  bid: number;
  ask: number;
  open: number;
  high: number;
  low: number;
  timeOffset: number;
  volume: number;
  askSize: number;
  bidSize: number;
  change: number;
  lastTradeExchange: string;
  bestBidExchange: string;
  bestAskExchange: string;
  lastTrade: number;
  lastTradeSize: number;
  marketCondition: string;
  tradeCount: number;
  close: number;
  priorClose: number;
};

type TFundamentalModel = {
  instrumentID: string;
  symbol: string;
  companyName: string;
  openPrice: number;
  bidPrice: number;
  askPrice: number;
  lowPrice: number;
  highPrice: number;
  fiftyTwoWeekLowPrice: number;
  fiftyTwoWeekHighPrice: number;
  cumulativeVolume: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  earningsPerShare: number;
  dividend: number;
  sharesOutstanding: number;
  timeLastUpdate: string;
  bookValuePerShare: string;
  cashFlowPerShare: string;
  operatingIncome: string;
  pbRatio: string;
  volumeMovingAverage10Day: number;
  volumeMovingAverage25Day: number;
  volumeMovingAverage50Day: number;
  priceMovingAverage50Day: number;
  priceMovingAverage150Day: number;
  priceMovingAverage200Day: number;
  roe: string;
};

type TInstrumentFundamental = {
  symbol: string;
  reutersPrimaryRic: string;
  name: string;
  description: string;
  sector: string;
  longOnly: boolean;
  orderSizeMax: number;
  orderSizeMin: any;
  orderSizeStep: any;
  exchangeNickelSpread: boolean;
  close: number;
  fundamentalDataModel: TFundamentalModel;
  id: string;
  type: string;
  exchange: string;
  url: string;
  status: string;
  exchangeThresholdOverride: number | null;
  houseThresholdOverride: number | null;
  closePrior: number;
  image: string;
};

type TInstrumentDetails = {
  symbol: string;
  reutersPrimaryRic: string;
  name: string;
  description: string;
  sector: string;
  longOnly: boolean;
  orderSizeMax: number;
  orderSizeMin: number;
  orderSizeStep: number;
  exchangeNickelSpread: boolean;
  close: number;
  descriptionChinese: string;
  id: string;
  type: string;
  exchange: string;
  url: string;
  status: string;
  exchangeThresholdOverride: number | null;
  houseThresholdOverride: number | null;
  closePrior: number;
  image: string;
};

export type TCashSettlement = {
  cash: number;
  utcTime: string;
};

export type TCashSummaryPaymentBuyingPower = {
  pendingDepositsAmountAvailable: number;
  pendingDepositsAmountNotAvailable: number;
};

export type TCashSummaryPayment = {
  buyingPower: TCashSummaryPaymentBuyingPower;
  redemptions: {
    amountWithheldFromRedemptions: number;
  };
};

export type TSeasoningDepositsType = {
  paymentID: string;
  created: string;
  updated: string;
  status: string;
  amount: string;
  currencyCode: string;
};

export type TAccountCashType = {
  cashAvailableForTrade: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
  cashSettlement: TCashSettlement[];
  noBuyingPowerReason: any[] | null;
  pendingPaymentsAmount: number;
};
export interface IAccountCashSummary {
  cash: TAccountCashType;
  payments: TCashSummaryPayment;
  seasoningDeposits: TSeasoningDepositsType;
  accountID: string;
  accountNo: string;
  updated: string;
  tradingType: string;
}

type TTradeAccountStatus = {
  description: string;
  name: string;
}
export interface IAccountDetails {
  status: TTradeAccountStatus;
  accountNo: string;
  id: string;
  accountType: {
    name: string;
    description: string;
  }
}

export interface ITradeState {
  instrumentsList?: TInstrumentType[];
  instrumentsListWf?: TInstrumentWfType[];
  instrumentsListAf?: TInstrumentAFType[];
  instrumentDetails?: TInstrumentDetails;
  accountSummary?: IAccountSummary;
  account?: IAccountDetails;
  accountCashSummary?: IAccountCashSummary;
  accountPerformance?: IAccountPerformance;
  instrumentChart?: TInstrumentChart;
  instrumentQuoteLive?: TInstrumentQuoteLive[];
  instrumentQuote?: TInstrumentQuote[];
  instrumentFundamental?: TInstrumentFundamental;
  tradeAccountActivity?: IAccountActivity[];
  tradeAccountStatements?: IAccountStatement[];
  watchlistDashboard?: TInstrumentQuoteLive[];
}

export ////////////////////////////////////////////
const tradeReducer = (state: ITradeState = {}, action: IStoreAction) => {
  switch (action.type) {
    case TRADE_SET_INSTRUMENTS_LIST:
      return {
        ...state,
        instrumentsList: action.payload,
      };
    case TRADE_SET_INSTRUMENTS_LIST_WF:
      return {
        ...state,
        instrumentsListWf: action.payload,
      };
    case TRADE_SET_INSTRUMENT_DETAILS:
      return {
        ...state,
        instrumentDetails: action.payload,
      };
    case TRADE_SET_ACCOUNT_SUMMARY:
      // duplicate key from the payload
      return {
        ...state,
        ...action.payload
      };
    case TRADE_SET_ACCOUNT_PERFORMANCE:
      return {
        ...state,
        accountPerformance: action.payload,
      };
    case TRADE_SET_INSTRUMENT_CHART_DATA:
      return {
        ...state,
        instrumentChart: action.payload,
      };
    case TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE:
      return {
        ...state,
        instrumentQuoteLive: action.payload,
      };
    case TRADE_SET_CONSOLIDATED_QUOTE:
      return {
        ...state,
        instrumentQuote: action.payload,
      };
    case TRADE_SET_INSTRUMENT_FUNDAMENTAL:
      return {
        ...state,
        instrumentFundamental: action.payload,
      };
    case TRADE_SET_ACCOUNT_ACTIVITY:
      return {
        ...state,
        tradeAccountActivity: action.payload,
      };
    case TRADE_SET_ACCOUNT_STATEMENTS:
      return {
        ...state,
        tradeAccountStatements: action.payload,
      };
    case TRADE_SET_WATCHLIST_DASHBOARD:
      return {
        ...state,
        watchlistDashboard: action.payload,
      };
    case TRADE_SET_INSTRUMENTS_LIST_AF:
      return {
        ...state,
        instrumentsListAf: action.payload,
      };
    case TRADE_SET_ACCOUNT_CASH_SUMMARY:
      return {
        ...state,
        accountCashSummary: action.payload,
      };
    default:
      return state;
  }
};

export default tradeReducer;
