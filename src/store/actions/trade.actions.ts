import { tradeEndpoints } from "config";
import { Dispatch } from "redux";
import { apiAction, replaceUrlVariables } from "trolly/store";
import { appUtils } from "trolly/utils";
import {
  TRADE_CANCEL_ORDER,
  TRADE_GET_ACCOUNT_ACTIVITY,
  TRADE_GET_ACCOUNT_PERFORMANCE,
  TRADE_GET_ACCOUNT_SUMMARY,
  TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE,
  TRADE_GET_CONSOLIDATED_QUOTE,
  TRADE_GET_INSTRUMENT_CHART_DATA,
  TRADE_GET_INSTRUMENT_DETAILS,
  TRADE_GET_INSTRUMENT_FUNDAMENTAL,
  TRADE_GET_INSTRUREMENTS_LIST,
  TRADE_POST_ORDER,
  TRADE_SET_ACCOUNT_ACTIVITY,
  TRADE_SET_ACCOUNT_PERFORMANCE,
  TRADE_SET_ACCOUNT_SUMMARY,
  TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE,
  TRADE_SET_CONSOLIDATED_QUOTE,
  TRADE_SET_INSTRUMENTS_LIST,
  TRADE_SET_INSTRUMENT_CHART_DATA,
  TRADE_SET_INSTRUMENT_DETAILS,
  TRADE_SET_INSTRUMENT_FUNDAMENTAL,
  TRADE_GET_ACCOUNT_STATEMENTS,
  TRADE_SET_ACCOUNT_STATEMENTS,
  TRADE_GET_STATEMENT_FILE,
  TRADE_GET_INSTRUMENTS_LIST_WF,
  TRADE_GET_WATCHLIST_DASHBOARD,
  TRADE_SET_WATCHLIST_DASHBOARD,
  TRADE_SET_INSTRUMENTS_LIST_WF,
  TRADE_GET_ACCOUNT_CASH_SUMMARY,
  TRADE_SET_ACCOUNT_CASH_SUMMARY,
  TRADE_GET_INSTRUMENTS_LIST_AF,
  TRADE_SET_INSTRUMENTS_LIST_AF,
} from "../store.types";

export const getInstrumentDetails = (id: string) => (dispatch: Dispatch) => {
  const url = replaceUrlVariables(tradeEndpoints.GET_INNSTRUMENT_DETAILS, {
    id,
  });
  dispatch(
    apiAction({
      label: TRADE_GET_INSTRUMENT_DETAILS,
      url,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: TRADE_SET_INSTRUMENT_DETAILS,
        payload: data,
      }),
    })
  );
};

export const getInstrumentsList = () =>
  apiAction({
    label: TRADE_GET_INSTRUREMENTS_LIST,
    url: tradeEndpoints.GET_LIST_INSTRUMENTS_DW,
    method: "GET",
    apiBase: "WF",
    onSuccess: ({ data }) => ({
      type: TRADE_SET_INSTRUMENTS_LIST,
      payload: data,
    }),
  });

export const getInstrumentsWfList = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: TRADE_GET_INSTRUMENTS_LIST_WF,
      url: tradeEndpoints.GET_LIST_INSTRUMENTS_WF,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: TRADE_SET_INSTRUMENTS_LIST_WF,
        payload: data,
      }),
    })
  );
};

export const getInstrumentsAfList = () =>
  apiAction({
    url: tradeEndpoints.GET_LIST_INSTRUMENTS_AF,
    label: TRADE_GET_INSTRUMENTS_LIST_AF,
    method: "GET",
    apiBase: "WF",
    onSuccess: ({ data: { instrumentsList } }) => ({
      type: TRADE_SET_INSTRUMENTS_LIST_AF,
      payload: instrumentsList,
    }),
  });

export const getAccountSummary = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: TRADE_GET_ACCOUNT_SUMMARY,
      url: tradeEndpoints.GET_ACCOUNT_SUMMARY,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: TRADE_SET_ACCOUNT_SUMMARY,
        payload: data,
      }),
    })
  );
};

export const getAccountCashSummary = () =>
  apiAction({
    url: tradeEndpoints.GET_ACCOUNT_CASH_SUMMARY,
    label: TRADE_GET_ACCOUNT_CASH_SUMMARY,
    method: "GET",
    apiBase: "WF",
    onSuccess: ({ data }) => ({
      type: TRADE_SET_ACCOUNT_CASH_SUMMARY,
      payload: data,
    }),
  });

export const getAccountPerformance = () => (dispatch: Dispatch) => {
  const to = appUtils.removeFromToday({ days: 0, format: "yyyyMMdd" });
  const from = "20210101";
  dispatch(
    apiAction({
      url: tradeEndpoints.GET_ACCOUNT_PERFORMANCE,
      label: TRADE_GET_ACCOUNT_PERFORMANCE,
      method: "GET",
      apiBase: "WF",
      data: {
        from,
        to,
        // period: "1d",
      },
      onSuccess: ({ data }) => ({
        type: TRADE_SET_ACCOUNT_PERFORMANCE,
        payload: data,
      }),
    })
  );
};

export const getConsolidatedQuoteLive =
  (symbol: string) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        url: tradeEndpoints.GET_CONSOLIDATED_QUOTE_LIVE,
        label: TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE,
        method: "GET",
        apiBase: "WF",
        data: {
          symbols: symbol,
        },
        onSuccess: ({ data }) => ({
          type: TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE,
          payload: data,
        }),
      })
    );
  };

export const getConsolidatedQuote =
  (symbol: string) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        url: tradeEndpoints.GET_CONSOLIDATED_QUOTE_LIVE,
        method: "GET",
        label: TRADE_GET_CONSOLIDATED_QUOTE,
        apiBase: "WF",
        data: {
          symbols: symbol,
        },
        onSuccess: ({ data }) => ({
          type: TRADE_SET_CONSOLIDATED_QUOTE,
          payload: data,
        }),
      })
    );
  };

export const placeTradeOrder =
  ({
    orderType,
    amountCash,
    accountNo,
    symbol,
    quantity,
    price,
    side,
    wayToSend,
    commission,
  }: {
    orderType: "MARKET" | "STOP" | "LIMIT";
    accountNo: string;
    symbol: string;
    side: "BUY" | "SELL";
    quantity?: number;
    amountCash?: number;
    price?: number;
    wayToSend: "cash" | "shares";
    commission?: number;
  }) =>
  (dispatch: Dispatch) => {
    const dataToSend: { [key: string]: any } = {
      orderType,
      accountNo,
      symbol,
      side,
    };
    if (amountCash || quantity) {
      if (wayToSend === "cash" && amountCash) {
        dataToSend.amountCash = amountCash;
      } else if (wayToSend === "shares" && quantity) {
        dataToSend.quantity = quantity;
      }
      if (price) {
        dataToSend.price = price;
      }
      if (commission) {
        dataToSend.commission = commission;
      }
      dispatch(
        apiAction({
          url: tradeEndpoints.POST_PLACE_ORDER,
          label: TRADE_POST_ORDER,
          apiBase: "WF",
          method: "POST",
          data: dataToSend,
        })
      );
    }
  };

export const getInstrumentFundamental = (instrument: string) =>
  apiAction({
    url: tradeEndpoints.GET_INSTRUMENT_FUNDAMENTAL,
    method: "GET",
    apiBase: "WF",
    label: TRADE_GET_INSTRUMENT_FUNDAMENTAL,
    data: {
      instrument,
    },
    onSuccess: ({ data }) => ({
      type: TRADE_SET_INSTRUMENT_FUNDAMENTAL,
      payload: data,
    }),
  });

export const cancelOrder = (orderID: string) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      url: tradeEndpoints.CANCEL_ORDER,
      label: TRADE_CANCEL_ORDER,
      apiBase: "WF",
      method: "GET",
      data: {
        orderID,
      },
    })
  );
};

export type TPeriod = "1d" | "5d" | "1m" | "3m" | "1y" | "5y";
export const getInstrumentChartDetails =
  (instrumentId: string, period: TPeriod) => (dispatch: Dispatch) => {
    let compression;
    let tradingDays = 0;
    let dateStart;
    let dateEnd = new Date(new Date()).toISOString().replace(/\.\d+Z/, "Z");
    switch (period) {
      case "1d":
        tradingDays = 1;
        compression = 1;
        break;
      case "5d":
        tradingDays = 5;
        compression = 8;
        break;
      case "1m":
        tradingDays = 20;
        compression = 9;
        break;
      case "3m":
        dateStart = appUtils.removeFromToday({ days: 90 });
        compression = 0;
        break;
      case "1y":
        dateStart = appUtils.removeFromToday({ days: 365 });
        compression = 0;
        break;
      case "5y":
        dateStart = appUtils.removeFromToday({ days: 365 * 5 });
        compression = 10;
        break;
    }
    let dataToSend: any = {
      instrumentID: instrumentId,
      compression,
    };
    if (dateStart) {
      dataToSend = {
        ...dataToSend,
        dateStart,
        dateEnd,
      };
    } else if (tradingDays) {
      dataToSend = {
        ...dataToSend,
        tradingDays,
      };
    }
    dispatch(
      apiAction({
        url: tradeEndpoints.GET_CHART_DATA,
        label: TRADE_GET_INSTRUMENT_CHART_DATA,
        method: "GET",
        apiBase: "WF",
        data: dataToSend,
        onSuccess: ({ data }) => ({
          type: TRADE_SET_INSTRUMENT_CHART_DATA,
          payload: data,
        }),
      })
    );
  };

export const getTradeAccountActivities =
  (numOfMonths: number) => (dispatch: Dispatch) => {
    const to = new Date();
    const from = appUtils.removeFromToday({ months: numOfMonths });
    dispatch(
      apiAction({
        url: tradeEndpoints.GET_ACCOUNT_ACTIVITIES,
        apiBase: "WF",
        method: "GET",
        label: TRADE_GET_ACCOUNT_ACTIVITY,
        data: {
          from,
          to,
        },
        onSuccess: ({ data }) => ({
          type: TRADE_SET_ACCOUNT_ACTIVITY,
          payload: data,
        }),
      })
    );
  };

export const getTradeAccountStatements =
  (numOfYears: number) => (dispatch: Dispatch) => {
    const to = new Date();
    const from = appUtils.removeFromToday({ years: numOfYears });
    dispatch(
      apiAction({
        url: tradeEndpoints.GET_ACCOUNT_STATEMENTS,
        apiBase: "WF",
        method: "GET",
        label: TRADE_GET_ACCOUNT_STATEMENTS,
        data: {
          from,
          to,
        },
        onSuccess: ({ data }) => ({
          type: TRADE_SET_ACCOUNT_STATEMENTS,
          payload: data,
        }),
      })
    );
  };

export const downloadTradeStatementFile = (id: string) =>
  apiAction({
    url: tradeEndpoints.GET_STATEMENT_FILE,
    apiBase: "WF",
    method: "GET",
    label: TRADE_GET_STATEMENT_FILE,
    data: {
      fileKey: id,
    },
    onSuccess:
      ({ data }) =>
      () => {
        const { url } = data || {};
        if (url) {
          const win = window.open(url, "_blank");
          if (win) {
            win.focus();
          }
        }
      },
  });

export const getWatchlistDashboardData = (symbols: string) =>
  apiAction({
    url: tradeEndpoints.GET_CONSOLIDATED_QUOTE_LIVE,
    apiBase: "WF",
    method: "GET",
    label: TRADE_GET_WATCHLIST_DASHBOARD,
    data: {
      symbols,
    },
    onSuccess: ({ data }) => ({
      type: TRADE_SET_WATCHLIST_DASHBOARD,
      payload: data,
    }),
  });
