import {
  BASKETS_ARCHIVE_PAGE,
  BASKETS_CREATED,
  BASKETS_CREATED_FROM_TICKER,
  BASKETS_DELETED,
  BASKETS_EDITED,
  BASKETS_NAVIGATE,
  BASKETS_NAVIGATE_HOME,
  BASKETS_SET_BASKETS,
  BASKETS_SET_PAGE,
  BASKETS_SET_BASKET_QUOTES,
  BASKETS_SET_TOTAL_WEIGHT,
  BASKETS_TICKER_ADDED_TO_BASKET,
  BASKETS_TICKER_DELETED,
  BASKETS_TICKERS_EDITED,
  BASKETS_SET_REBALANCE_QUOTES,
  BASKETS_SET_REBALANCE_QUOTES_STATE,
  BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE,
  BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
  BASKETS_SET_SUBMIT_DATA,
} from "../store.types";
import { IStrategy } from "./strategies.reducers";

export type TBasketType = "user" | "wealthface";
interface BasketAction {
  type: string;
  payload?: any;
}

interface ISymbolQuote {
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
}

export interface IBasketTicker {
  inst: string;
  weight: number;
}

export interface IBasketItem {
  _id: string;
  name: string;
  tickers: IBasketTicker[];
  created_at: string;
  updated_at: string;
}

export interface IRebalanceRowsData {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  price: number;
  positionOpen: number;
  marketValue: number;
  allocation: number;
  targetAllocation: number;
  changeAllocation: number;
  estimatedValue: number;
  bid: number;
  ask: number;
  type: string;
  amount: number;
  shares: number;
  commission: number;
  total: number;
  accountNo: string;
  isSubmitting: false;
  isSubmitted: boolean;
}

interface IRender {
  page: string;
  step: number;
  weight?: number;
  selectedBasket: IBasketItem | null;
  selectedStrategy: IStrategy | null;
  basketQuote: ISymbolQuote[];
  rebalanceQuote: ISymbolQuote[];
  submitRowsData: IRebalanceRowsData[];
  type?: TBasketType;
}

export interface IBasketsState {
  baskets?: IBasketItem[];
  render: IRender;
}

const INITIAL_STATE: IBasketsState = {
  render: {
    page: BASKETS_ARCHIVE_PAGE,
    step: 1,
    selectedBasket: null,
    selectedStrategy: null,
    basketQuote: [],
    rebalanceQuote: [],
    submitRowsData: [],
  },
};

export const basketReducer = (state = INITIAL_STATE, action: BasketAction) => {
  switch (action.type) {
    case BASKETS_SET_BASKETS:
      return {
        ...state,
        baskets: action.payload,
      };
    case BASKETS_SET_PAGE:
      return {
        ...state,
        render: {
          ...state.render,
          ...action.payload,
        },
      };
    case BASKETS_NAVIGATE_HOME:
      return {
        ...state,
        render: INITIAL_STATE.render,
      };
    case BASKETS_NAVIGATE:
      return {
        ...state,
        render: {
          ...state.render,
          step: action.payload,
        },
      };
    case BASKETS_CREATED:
      return (
        state.baskets && {
          ...state,
          baskets: [...state.baskets, action.payload],
        }
      );
    case BASKETS_CREATED_FROM_TICKER:
      const newState = state.baskets
        ? {
            ...state,
            baskets: [...state.baskets, action.payload],
          }
        : state;
      return { ...newState };
    case BASKETS_EDITED:
      const updated = state.baskets?.map((item: IBasketItem) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            name: action.payload.name,
          };
        }
        return item;
      });

      return {
        ...state,
        baskets: updated,
      };
    case BASKETS_DELETED:
      const newBaskets = state.baskets?.filter(
        (item: IBasketItem) => item._id !== action.payload
      );
      return {
        ...state,
        baskets: newBaskets,
      };
    case BASKETS_TICKER_ADDED_TO_BASKET:
      return {
        ...state,
        baskets: action.payload,
      };
    case BASKETS_TICKER_DELETED:
      return {
        ...state,
        baskets: action.payload.updatedBaskets,
        render: {
          ...state.render,
          selectedBasket: action.payload.updatedSelectedBasket,
          basketQuote: [],
        },
      };
    case BASKETS_TICKERS_EDITED:
      const baskets = state.baskets?.map((el) => {
        if (el._id === action.payload._id) {
          return {
            ...el,
            ...action.payload,
          };
        }
        return el;
      });
      return {
        ...state,
        baskets,
        render: {
          ...state.render,
          selectedBasket: {
            ...state.render.selectedBasket,
            ...action.payload,
          },
        },
      };
    case BASKETS_SET_TOTAL_WEIGHT:
      return {
        ...state,
        render: {
          ...state.render,
          weight: action.payload,
        },
      };
    case BASKETS_SET_BASKET_QUOTES:
      return {
        ...state,
        render: {
          ...state.render,
          basketQuote: action.payload,
        },
      };
    case BASKETS_SET_REBALANCE_QUOTES:
      return {
        ...state,
        render: {
          ...state.render,
          rebalanceQuote: action.payload,
        },
      };
    case BASKETS_SET_REBALANCE_QUOTES_STATE:
      return {
        ...state,
        render: {
          ...state.render,
          submitRowsData: action.payload,
        },
      };
    case BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE:
      return {
        ...state,
        render: {
          ...state.render,
          submitRowsData: action.payload,
        },
      };
    case BASKETS_UPDATE_ORDER_SUBMIT_STATUS:
      return {
        ...state,
        render: {
          ...state.render,
          submitRowsData: action.payload,
        },
      };
    case BASKETS_SET_SUBMIT_DATA:
      return {
        ...state,
        render: {
          ...state.render,
          submitRowsData: action.payload,
        },
      };

    default:
      return state;
  }
};

export default basketReducer;
