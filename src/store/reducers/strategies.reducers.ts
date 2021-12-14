import { IStoreAction } from "trolly/store";
import {
  STRATEGIES_DELETED_USER_STRATEGY,
  STRATEGIES_SET_DESCRIPTIONS,
  STRATEGIES_SET_STRATEGIES_LIST,
  STRATEGIES_SET_STRATEGY_DETAILS,
  STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS,
  STRATEGIES_SET_USER_STRATEGIES,
  STRATEGIES_SUBSCRIBE,
} from "../store.types";

export interface IStrategyFilter {
  country: string;
  factors: string;
  firm_size: string;
  halal: "false" | "true";
  nstocks: number;
  rebalancing: string;
}

export type TTypeStrategyRisk = "High" | "Medium" | "Extreme" | "Low";

export interface IStrategy {
  "1M": number;
  "1Y": number;
  "3M": number;
  Annualized_Volatility: number;
  Maximum_Drawdown: number;
  Sharpe_Ratio: number;
  YTD: number;
  description: string;
  filters: IStrategyFilter;
  members: TMember[];
  strategy: string;
  name: string;
  risk: TTypeStrategyRisk;
  created_at: string;
}

export interface IStrategyList {
  nStrategies: number;
  strategies: IStrategy[];
}

/**
 * strategy details interface
 */

export interface IChartData {
  [key: string]: number;
}

export interface IHistorical {
  annualReturn: IChartData;
  cumulativePerformance: IChartData;
  drawdown: IChartData;
  metric: IChartData;
  performance: IChartData;
  risk: IChartData;
}

export interface IActual {
  factorIntensity: IChartData;
  firmSizeAllocation: IChartData;
  sectorAllocation: IChartData;
}

export interface IBenchmarkData {
  historical: IHistorical;
}

export interface IStrategyData {
  historical: IHistorical;
  actual: IActual;
}

export interface IStrategyDetails {
  benchmark: IBenchmarkData;
  benchmarkName: string;
  lastRebalancing: string;
  lastUpdate: string;
  nextRebalancing: string;
  nextUpdate: string;
  strategy: IStrategyData;
  tickers: number;
  tickersInUniverse: number;
  description: string;
}

export interface IStrategiesDescriptions {
  countries: { [key: string]: string };
  metrics: { [key: string]: string };
}

export type TMember = {
  companyname: string;
  firm_size: string;
  industry: string;
  investment: number;
  momentum: number;
  profitability: number;
  quality: number;
  sector: string;
  size: number;
  ticker: string;
  tradingitemid: number;
  value: number;
  volatility: number;
  weight: number;
  isin: string;
};

export interface IUserStrategies {
  nStrategies: number;
  userPrebuiltStrategies: IStrategy[];
}

export interface IStrategiesState {
  strategiesList?: IStrategyList;
  strategyDetails?: IStrategyDetails;
  descriptions?: IStrategiesDescriptions;
  members?: TMember[];
  userStrategies?: IUserStrategies;
  subscribed?: boolean;
}
const strategiesReducer = (
  state: IStrategiesState = {},
  action: IStoreAction
) => {
  switch (action.type) {
    case STRATEGIES_SET_STRATEGIES_LIST:
      return {
        ...state,
        strategiesList: action.payload,
      };
    case STRATEGIES_SET_STRATEGY_DETAILS:
      return {
        ...state,
        strategyDetails: action.payload,
      };
    case STRATEGIES_SET_DESCRIPTIONS:
      return {
        ...state,
        descriptions: action.payload,
      };
    case STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS:
      let members = [];
      const { strategy } = action.payload;
      if (strategy) {
        const { actual } = strategy;
        const { members: fetchedMembers } = actual || {};
        if (fetchedMembers) {
          members = fetchedMembers;
        }
      }
      return {
        ...state,
        members,
      };
    case STRATEGIES_SET_USER_STRATEGIES:
      return {
        ...state,
        userStrategies: action.payload,
      };
    case STRATEGIES_DELETED_USER_STRATEGY:
      const { userPrebuiltStrategies } = state.userStrategies || {};
      const updatedUserStrategies = userPrebuiltStrategies?.filter(
        (strategy) => strategy.strategy !== action.payload
      );
      return {
        ...state,
        userStrategies:
          updatedUserStrategies && updatedUserStrategies.length > 0
            ? {
                ...state.userStrategies,
                userPrebuiltStrategies: updatedUserStrategies,
              }
            : undefined,
      };
    // TODO: to be removed once we moved to proper subscription module
    case STRATEGIES_SUBSCRIBE:
      return {
        ...state,
        subscribed: true,
      };
    default:
      return state;
  }
};

export default strategiesReducer;
