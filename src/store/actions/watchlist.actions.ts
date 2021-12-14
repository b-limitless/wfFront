import { Dispatch } from "redux";
import { apiAction } from "trolly/store";
import {
  WATCHLIST_CREATE_WATCHLIST,
  WATCHLIST_CREATED,
  WATCHLIST_GET_WATCHLISTS,
  WATCHLIST_SET_WATCHLISTS,
  WATCHLIST_EDITED,
  WATCHLIST_DELETED,
  WATCHLIST_DELETE_WATCHLIST,
  WATCHLIST_DELETE_TICKER,
  WATCHLIST_DELETE_TICKER_DONE,
  WATCHLIST_ADD_TICKER_DONE,
  WATCHLIST_ADD_TICKER,
  WATCHLIST_GET_QUOTES_DEFAULT,
  WATCHLIST_SET_QUOTES_DEFAULT,
  WATCHLIST_ADD_TICKER_TO_WATCHLIST,
  WATCHLIST_TICKER_ADDED_TO_WATCHLIST,
} from "../store.types";
import { watchlistEndpoints } from "../../config";

export const getWatchlists = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: WATCHLIST_GET_WATCHLISTS,
      url: watchlistEndpoints.GET_WATCHLISTS,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: WATCHLIST_SET_WATCHLISTS,
        payload: data,
      }),
    })
  );
};

export const createWatchlist = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: WATCHLIST_CREATE_WATCHLIST,
      url: watchlistEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: WATCHLIST_CREATED,
        payload: data,
      }),
    })
  );
};

export const updateWatchlist = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: WATCHLIST_CREATE_WATCHLIST,
      url: watchlistEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: WATCHLIST_EDITED,
        payload: data,
      }),
    })
  );
};

export const deleteWatchlist =
  (id: string | undefined) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        label: WATCHLIST_DELETE_WATCHLIST,
        url: `${watchlistEndpoints.DELETE}/${id}`,
        method: "DELETE",
        apiBase: "WF",
        onSuccess: () => ({
          type: WATCHLIST_DELETED,
          payload: id,
        }),
      })
    );
  };

export const addTicker =
  (updatedSelectedWatchlist: any, updatedWatchlist: any) =>
  (dispatch: Dispatch) => {
    const { _id, name, tickers } = updatedSelectedWatchlist;
    dispatch(
      apiAction({
        label: WATCHLIST_ADD_TICKER,
        url: watchlistEndpoints.CREATE,
        method: "POST",
        apiBase: "WF",
        data: { _id, name, tickers },
        onSuccess: () => ({
          type: WATCHLIST_ADD_TICKER_DONE,
          payload: {
            updatedWatchlist,
            updatedSelectedWatchlist,
          },
        }),
      })
    );
  };

export const addTickerToWatchlist =
  (requestPayload: any, updatedWatchlist: any) => (dispatch: Dispatch) => {
    const { _id, name, tickers } = requestPayload;
    dispatch(
      apiAction({
        label: WATCHLIST_ADD_TICKER_TO_WATCHLIST,
        url: watchlistEndpoints.CREATE,
        method: "POST",
        apiBase: "WF",
        data: { _id, name, tickers },
        onSuccess: ({ data }) => ({
          type: WATCHLIST_TICKER_ADDED_TO_WATCHLIST,
          payload: updatedWatchlist,
        }),
      })
    );
  };

export const deleteTicker =
  (updatedSelectedWatchlist: any, updatedWatchlist: any) =>
  (dispatch: Dispatch) => {
    const { _id, name, tickers } = updatedSelectedWatchlist;
    dispatch(
      apiAction({
        label: WATCHLIST_DELETE_TICKER,
        url: watchlistEndpoints.CREATE,
        method: "POST",
        apiBase: "WF",
        data: { _id, name, tickers },
        onSuccess: () => ({
          type: WATCHLIST_DELETE_TICKER_DONE,
          payload: {
            updatedWatchlist,
            updatedSelectedWatchlist,
          },
        }),
      })
    );
  };

export const getQuotesDefault = (symbols: string) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: WATCHLIST_GET_QUOTES_DEFAULT,
      url: watchlistEndpoints.GET_QUOTES_DEFAULT,
      method: "GET",
      apiBase: "WF",
      data: {
        symbols,
      },
      onSuccess: ({ data }) => ({
        type: WATCHLIST_SET_QUOTES_DEFAULT,
        payload: data,
      }),
    })
  );
};
