import { investEndpoints } from "config";
import { Dispatch } from "redux";
import { IAppState } from "store/store.interface";
import { apiAction, replaceUrlVariables } from "trolly/store";
import {
  INVEST_CLEAR_ALGO_COMB,
  INVEST_GET_ACCOUNT_ACTIVITY,
  INVEST_GET_ACCOUNT_INFO,
  INVEST_GET_ACCOUNT_STATEMENT,
  INVEST_GET_ALGO_COMB,
  INVEST_GET_PERFORMANCE_INFO,
  INVEST_GET_PORTFOLIO_PERFORMANCE,
  INVEST_GET_STATEMENT_FILE,
  INVEST_GET_USER_ALLOCATION,
  INVEST_SET_ACCOUNT_ACTIVITY,
  INVEST_SET_ACCOUNT_INFO,
  INVEST_SET_ACCOUNT_STATEMENT,
  INVEST_SET_ALGO_COMB,
  INVEST_SET_PERFORMANCE_INFO,
  INVEST_SET_PORTFOLIO_PERFORMANCE,
  INVEST_SET_USER_ALLOCATION,
} from "../store.types";

export const getKycAlgoComb = (riskLevel: number) => (dispatch: Dispatch) => {
  const url = replaceUrlVariables(investEndpoints.GET_ALGO_COMB, {
    id: riskLevel,
  });
  dispatch(
    apiAction({
      url,
      method: "GET",
      label: INVEST_GET_ALGO_COMB,
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: INVEST_SET_ALGO_COMB,
        payload: data,
      }),
    })
  );
};

export const clearKycAlgoComb = () => ({
  type: INVEST_CLEAR_ALGO_COMB,
});

export const getInvestAccountActivities =
  (numOfMonths: number) => (dispatch: Dispatch, getState: () => IAppState) => {
    const {
      data: {
        user: { drivewealth_account_id },
      },
    } = getState().auth;
    const url = replaceUrlVariables(investEndpoints.GET_ACCOUNT_ACTIVITIES, {
      accountId: drivewealth_account_id,
      numOfMonths,
    });
    dispatch(
      apiAction({
        url,
        method: "GET",
        apiBase: "WF",
        label: INVEST_GET_ACCOUNT_ACTIVITY,
        onSuccess: ({ data }) => ({
          type: INVEST_SET_ACCOUNT_ACTIVITY,
          payload: data,
        }),
      })
    );
  };

export const getInvestAccountStatements =
  () => (dispatch: Dispatch, getState: () => IAppState) => {
    const {
      data: {
        user: { drivewealth_account_id },
      },
    } = getState().auth;
    const url = replaceUrlVariables(investEndpoints.GET_ACCOUNT_STATEMENTS, {
      accountId: drivewealth_account_id,
    });
    dispatch(
      apiAction({
        url,
        method: "GET",
        apiBase: "WF",
        label: INVEST_GET_ACCOUNT_STATEMENT,
        onSuccess: ({ data }) => ({
          type: INVEST_SET_ACCOUNT_STATEMENT,
          payload: data,
        }),
      })
    );
  };

export const downloadInvestStatementFile =
  (id: string) => (dispatch: Dispatch) => {
    const url = replaceUrlVariables(investEndpoints.GET_STATEMENT_FILE, {
      fileId: id,
    });
    dispatch(
      apiAction({
        url,
        apiBase: "WF",
        method: "GET",
        label: INVEST_GET_STATEMENT_FILE,
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
      })
    );
  };

export const getPerformanceInfo = () =>
  apiAction({
    url: investEndpoints.GET_PERFORMANCE_INFO,
    method: "GET",
    apiBase: "WF",
    label: INVEST_GET_PERFORMANCE_INFO,
    onSuccess: ({ data }) => ({
      type: INVEST_SET_PERFORMANCE_INFO,
      payload: data,
    }),
  });

export const getInvestAccountInfo = () =>
  apiAction({
    url: investEndpoints.GET_ACCOUNT_INFO,
    label: INVEST_GET_ACCOUNT_INFO,
    method: "GET",
    apiBase: "WF",
    onSuccess: ({ data }) => ({
      type: INVEST_SET_ACCOUNT_INFO,
      payload: data,
    }),
  });

export const getInvestUserAllocation = () =>
  apiAction({
    url: investEndpoints.GET_USER_ALLOCATION,
    method: "GET",
    apiBase: "WF",
    label: INVEST_GET_USER_ALLOCATION,
    onSuccess: ({ data }) => ({
      type: INVEST_SET_USER_ALLOCATION,
      payload: data,
    }),
  });

export const getInvestPortfolioPerformance = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      url: investEndpoints.GET_PORTFOLIO_PERFORMANCE,
      method: "GET",
      apiBase: "WF",
      label: INVEST_GET_PORTFOLIO_PERFORMANCE,
      data: {
        limit: 7200,
      },
      onSuccess: ({ data }) => ({
        type: INVEST_SET_PORTFOLIO_PERFORMANCE,
        payload: data,
      }),
    })
  );
};
