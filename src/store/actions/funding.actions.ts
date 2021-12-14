import { Dispatch } from "redux";
import { apiAction } from "trolly/store";
import {
  fundingAbsoluteURL,
  fundingEndpoints,
  withdrawalEndpoints,
} from "config";
import {
  FUNDING_GET_BANK_ACCOUNT,
  FUNDING_GET_BANK_LIST,
  FUNDING_GET_EXCHANGE_RATE,
  FUNDING_GET_FUNDING_OPTIONS_COUNTRIES,
  FUNDING_GET_PAYMENT_INITIALIZE,
  FUNDING_PAGE_BANK_SUBMITTED,
  FUNDING_PAGE_TRANSACTION_SUBMITTED,
  FUNDING_PAGE_TRANSACTION_SUBMITTING,
  FUNDING_SET_BANK_LIST,
  FUNDING_SET_EXCHANGE_RATE,
  FUNDING_SET_FUNDING_OPTIONS_COUNTRIES,
  FUNDING_SET_FUNDING_URL,
  WITHDRAWAL_SAVE_REQUEST,
  WITHDRAWAL_SAVE_REQUEST_COMPLETED,
} from "../store.types";
import { TSelectedBank } from "../reducers/funding.reducers";
import { TSelectOption } from "../../trolly/common";

export const getFundingOptions = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: FUNDING_GET_FUNDING_OPTIONS_COUNTRIES,
      url: fundingEndpoints.GET_FUNDING_OPTIONS,
      method: "GET",
      apiBase: "WF",
      onSuccess: ({ data }) => ({
        type: FUNDING_SET_FUNDING_OPTIONS_COUNTRIES,
        payload: data,
      }),
    })
  );
};

export const getFundingExchangeRate = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: FUNDING_GET_EXCHANGE_RATE,
      url: fundingAbsoluteURL.GET_FUNDING_EXCHANGE_RATE,
      method: "GET",
      apiBase: "WF",
      isAbsoluteUrl: true,
      onSuccess: ({ data }) => ({
        type: FUNDING_SET_EXCHANGE_RATE,
        payload: data,
      }),
    })
  );
};

export const setFundingIframeUrl = (url: string) => ({
  type: FUNDING_SET_FUNDING_URL,
  payload: url,
});

export const getFundingPaymentInitialize =
  (slug: string, isIframe?: boolean) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        label: FUNDING_GET_PAYMENT_INITIALIZE,
        url: `${fundingEndpoints.GET_FUNDING_PAYMENT_INITIALIZE}/${slug}`,
        method: "GET",
        apiBase: "WF",
        onSuccess:
          ({ data }) =>
          (dispatch: Dispatch) => {
            const { url } = data || {};
            if (url) {
              if (isIframe) {
                dispatch(setFundingIframeUrl(url));
              } else {
                const win = window.open(url, "_blank");
                if (win) {
                  win.focus();
                }
              }
            }
          },
      })
    );
  };

export const getFundingBankList = () => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: FUNDING_GET_BANK_LIST,
      url: fundingAbsoluteURL.GET_FUNDING_BANK_LIST,
      method: "GET",
      apiBase: "WF",
      isAbsoluteUrl: true,
      onSuccess: ({ data }) => ({
        type: FUNDING_SET_BANK_LIST,
        payload: data.result.BANKS_LIST,
      }),
    })
  );
};

export const getFundingBankAccount =
  (
    currency: string,
    bank: string,
    selectedBank: TSelectedBank,
    selectedBankTransformed: TSelectOption,
    selectedBankString: string
  ) =>
  (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        label: FUNDING_GET_BANK_ACCOUNT,
        url: `${fundingAbsoluteURL.GET_FUNDING_BANK_ACCOUNT}/${currency}/${bank}`,
        method: "GET",
        apiBase: "WF",
        isAbsoluteUrl: true,
        onSuccess: ({ data }) => ({
          type: FUNDING_PAGE_BANK_SUBMITTED,
          payload: {
            data: data.result,
            selectedBank,
            selectedBankString,
            selectedBankTransformed,
          },
        }),
      })
    );
  };

export const submitFundingTransferProcess =
  (data: any) => (dispatch: Dispatch) => {
    dispatch(
      apiAction({
        label: FUNDING_PAGE_TRANSACTION_SUBMITTING,
        url: fundingEndpoints.SUBMIT_FUNDING_TRANSFER_PROCESS,
        data,
        method: "POST",
        apiBase: "WF",
        onSuccess: (data) => ({
          type: FUNDING_PAGE_TRANSACTION_SUBMITTED,
          payload: data,
        }),
      })
    );
  };

export const saveWithdrawalRequestAPI = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: WITHDRAWAL_SAVE_REQUEST,
      url: withdrawalEndpoints.WITHDRAWAL_SAVE_REQUEST,
      method: "POST",
      apiBase: "WF",
      data,
      onSuccess: ({ data }) => ({
        type: WITHDRAWAL_SAVE_REQUEST_COMPLETED,
        payload: data,
      }),
    })
  );
};
