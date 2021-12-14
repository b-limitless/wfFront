import { Dispatch } from "redux";
import { apiAction } from "trolly/store";
import { basketsEndpoints } from "config";
import {
  BASKETS_DELETE_TICKER,
  BASKETS_ADD_TICKER_TO_BASKET,
  BASKETS_CREATE_BASKET,
  BASKETS_CREATE_BASKET_FROM_TICKER,
  BASKETS_CREATED,
  BASKETS_CREATED_FROM_TICKER,
  BASKETS_DELETE_BASKET,
  BASKETS_DELETED,
  BASKETS_EDITED,
  BASKETS_GET_BASKETS,
  BASKETS_SET_BASKETS,
  BASKETS_TICKER_ADDED_TO_BASKET,
  BASKETS_TICKER_DELETED,
  BASKETS_EDIT_TICKERS,
  BASKETS_TICKERS_EDITED,
  BASKETS_GET_BASKET_QUOTES,
  BASKETS_SET_BASKET_QUOTES,
  BASKETS_SET_REBALANCE_QUOTES,
  BASKETS_GET_REBALANCE_QUOTES,
  BASKETS_POST_ORDER,
} from "../store.types";

export const getBaskets = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_GET_BASKETS,
      url: basketsEndpoints.GET_BASKETS,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: BASKETS_SET_BASKETS,
        payload: data,
      }),
    })
  );
};

export const createBasket = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_CREATE_BASKET,
      url: basketsEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: BASKETS_CREATED,
        payload: data,
      }),
    })
  );
};

export const createBasketFromTicker = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_CREATE_BASKET_FROM_TICKER,
      url: basketsEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: BASKETS_CREATED_FROM_TICKER,
        payload: data,
      }),
    })
  );
};

export const updateBasket = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_CREATE_BASKET,
      url: basketsEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: BASKETS_EDITED,
        payload: data,
      }),
    })
  );
};

export const deleteBasket =
  (id: string | undefined) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        label: BASKETS_DELETE_BASKET,
        url: `${basketsEndpoints.DELETE}/${id}`,
        method: "DELETE",
        apiBase: "WF",
        onSuccess: () => ({
          type: BASKETS_DELETED,
          payload: id,
        }),
      })
    );
  };

export const addTickerToBasket =
  (requestPayload: any, updatedBasket: any) => (dispatch: Dispatch) => {
    const { _id, name, tickers } = requestPayload;
    dispatch(
      apiAction({
        label: BASKETS_ADD_TICKER_TO_BASKET,
        url: basketsEndpoints.CREATE,
        method: "POST",
        apiBase: "WF",
        data: { _id, name, tickers },
        onSuccess: () => ({
          type: BASKETS_TICKER_ADDED_TO_BASKET,
          payload: updatedBasket,
        }),
      })
    );
  };

export const deleteTicker =
  (updatedSelectedBasket: any, updatedBaskets: any) => (dispatch: Dispatch) => {
    const { _id, name, tickers } = updatedSelectedBasket;
    dispatch(
      apiAction({
        label: BASKETS_DELETE_TICKER,
        url: basketsEndpoints.CREATE,
        method: "POST",
        apiBase: "WF",
        data: { _id, name, tickers },
        onSuccess: () => ({
          type: BASKETS_TICKER_DELETED,
          payload: {
            updatedBaskets,
            updatedSelectedBasket,
          },
        }),
      })
    );
  };

export const editTickers = (requestPayload: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_EDIT_TICKERS,
      url: basketsEndpoints.CREATE,
      method: "POST",
      apiBase: "WF",
      data: requestPayload,
      onSuccess: ({ data }) => ({
        type: BASKETS_TICKERS_EDITED,
        payload: data,
      }),
    })
  );
};

export const getBasketQuotes = (symbols: string) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_GET_BASKET_QUOTES,
      url: `${basketsEndpoints.GET_QUOTES_DEFAULT}?symbols=${symbols}`,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: BASKETS_SET_BASKET_QUOTES,
        payload: data,
      }),
    })
  );
};

export const getRebalanceQuotes = (symbols: string) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_GET_REBALANCE_QUOTES,
      url: `${basketsEndpoints.GET_QUOTES_DEFAULT}?symbols=${symbols}`,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: BASKETS_SET_REBALANCE_QUOTES,
        payload: data,
      }),
    })
  );
};

export const placeBasketOrder = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: BASKETS_POST_ORDER,
      url: basketsEndpoints.POST_PLACE_ORDER,
      apiBase: "WF",
      method: "POST",
      data,
    })
  );
};
