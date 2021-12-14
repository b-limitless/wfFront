import {
  WATCHLIST_ADD_TICKER_DONE,
  WATCHLIST_CREATED,
  WATCHLIST_DELETE_QUOTES_DEFAULT,
  WATCHLIST_DELETE_TICKER_DONE,
  WATCHLIST_DELETED,
  WATCHLIST_EDITED,
  WATCHLIST_SET_QUOTES_DEFAULT,
  WATCHLIST_SET_WATCHLISTS,
  WATCHLIST_TICKER_ADDED_TO_WATCHLIST,
  WATCHLISTS_ARCHIVE,
  WATCHLISTS_NAVIGATE_BACK,
  WATCHLISTS_RESET_PAGE,
  WATCHLISTS_SET_PAGE,
} from "../store.types";

interface WatchListAction {
  type: string;
  payload?: any;
}

export interface IWatchlistItem {
  _id: string;
  name: string;
  tickers: string[];
  created_at: string;
  updated_at: string;
}

export interface ISymbolQuote {
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
interface IRender {
  page: string;
  selectedWatchlist: IWatchlistItem | null;
  symbolQuote: ISymbolQuote[];
}
export interface IWatchlistState {
  watchlists?: IWatchlistItem[];
  render: IRender;
}
const INITIAL_STATE: IWatchlistState = {
  render: {
    page: WATCHLISTS_ARCHIVE,
    selectedWatchlist: null,
    symbolQuote: [],
  },
};

export const watchlistReducer = (
  state = INITIAL_STATE,
  action: WatchListAction
) => {
  switch (action.type) {
    case WATCHLIST_SET_WATCHLISTS:
      return {
        ...state,
        watchlists: action.payload,
      };
    case WATCHLIST_CREATED:
      return (
        state.watchlists && {
          ...state,
          watchlists: [...state.watchlists, action.payload],
        }
      );
    case WATCHLIST_EDITED:
      const updatedWatchlists = state.watchlists?.map(
        (item: IWatchlistItem) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              name: action.payload.name,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        watchlists: updatedWatchlists,
      };
    case WATCHLIST_DELETED:
      const newWatchlist = state.watchlists?.filter(
        (item: IWatchlistItem) => item._id !== action.payload
      );
      return {
        ...state,
        watchlists: newWatchlist,
      };
    case WATCHLISTS_SET_PAGE:
      return {
        ...state,
        render: {
          ...state.render,
          ...action.payload,
        },
      };
    case WATCHLISTS_RESET_PAGE:
      return INITIAL_STATE;
    case WATCHLISTS_NAVIGATE_BACK:
      return {
        ...state,
        render: INITIAL_STATE.render,
      };
    case WATCHLIST_ADD_TICKER_DONE:
      return {
        ...state,
        watchlists: action.payload.updatedWatchlist,
        render: {
          ...state.render,
          selectedWatchlist: action.payload.updatedSelectedWatchlist,
        },
      };
    case WATCHLIST_DELETE_TICKER_DONE:
      return {
        ...state,
        watchlists: action.payload.updatedWatchlist,
        render: {
          ...state.render,
          selectedWatchlist: action.payload.updatedSelectedWatchlist,
          symbolQuote: [],
        },
      };
    case WATCHLIST_SET_QUOTES_DEFAULT:
      return {
        ...state,
        render: {
          ...state.render,
          symbolQuote: action.payload,
        },
      };
    case WATCHLIST_DELETE_QUOTES_DEFAULT:
      return {
        ...state,
        render: {
          ...state.render,
          symbolQuote: INITIAL_STATE.render.symbolQuote,
        },
      };
    case WATCHLIST_TICKER_ADDED_TO_WATCHLIST:
      return {
        ...state,
        watchlists: action.payload,
      };

    default:
      return state;
  }
};

export default watchlistReducer;
