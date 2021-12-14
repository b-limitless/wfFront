import { Dispatch } from "redux";
import {
  PROCESS_SET_CONFIG,
  PROCESS_SET_QUESTIONS,
  PROCESS_GET_DATA,
  KYC_SET_OBJ,
  KYC_GET_ACCOUNT_OPENING,
  KYC_CHANGE_RISK_LEVEL,
  KYC_SET_ACCOUNT_OPENING,
  PROCESS_RESET_QUESTIONS,
} from "../store.types";
import { EProcessTypes } from "store/reducers/onBoardingQuestions.reducers";
import { IAppState } from "store/store.interface";
import {
  apiAction,
  authActions,
  TKYCPortfolioObj,
  TKycObj,
} from "trolly/store";
import { endpoints, history } from "config";
import { resetAnswers, setOldAnswers, setQuestionIndex } from "trolly/modules";
import { verifyToken } from "trolly/store/actions/auth.actions";
import {
  apiMultiAction,
  replaceUrlVariables,
} from "trolly/store/middleware/api.middleware.helper";
import AccountOpening from "services/AccountOpening";
import { setGeneralAccountOpeningData } from "./general.actions";

const accountOpening = new AccountOpening();

type IAccountOpeningStatus = {
  submit?: boolean;
  submitTrade?: boolean;
  pageIndex?: number;
  isNewOnboarding?: boolean;
  isAccountOpeningCompleted?: boolean;
};

type TDWError = {
  errorCode: string;
  message: string;
};

export interface IAccountOpeningObj {
  dw: any;
  other: any;
  status: IAccountOpeningStatus;
  docs: any[];
  dwUserErr?: TDWError;
  dwAccErr?: TDWError;
  dwAccount?: string;
  dwTradeAccErr?: TDWError;
  dwTradeUserErr?: TDWError;
  dwTradeAccount?: string;
}

export const resetProcessQuestions = () => ({
  type: PROCESS_RESET_QUESTIONS,
});

export const getProcessQuestions =
  (processType: EProcessTypes, regulation?: string) => (dispatch: Dispatch) => {
    // TODO make it flexible from the static api
    dispatch(resetAnswers());
    dispatch(resetProcessQuestions());
    if (processType === "kyc") {
      dispatch(
        apiMultiAction({
          requests: [
            { url: endpoints.GET_KYC_QUESTIONS, apiBase: "WF", method: "GET" },
            { url: endpoints.GET_KYC_CONFIG, apiBase: "WF", method: "GET" },
          ],
          label: PROCESS_GET_DATA,
          onSuccess: (responses: any[]) => (dispatch: Dispatch) => {
            const [questionsRes, configRes] = responses;
            if (questionsRes.success) {
              const {
                data: { data: questions },
              } = questionsRes;
              dispatch(setQuestions(questions));
            }
            if (configRes.success) {
              const {
                data: { data: config },
              } = configRes;
              dispatch(setConfig(config));
            }
          },
        })
      );
    } else if (processType === "acountOpening") {
      // TODO make it proper fetched from static api
      const url = replaceUrlVariables(endpoints.GET_ACCOUNT_OPENING_QUESTIONS, {
        regulation: regulation ? regulation.toLowerCase() : "",
      });
      dispatch(
        apiMultiAction({
          requests: [
            { url, apiBase: "WF", method: "GET" },
            {
              url: endpoints.GET_ACCOUNT_OPENING_OPTIONS,
              apiBase: "WF",
              method: "GET",
            },
          ],
          label: PROCESS_GET_DATA,
          onSuccess: (responses: any[]) => (dispatch: Dispatch) => {
            const [questionsRes, configRes] = responses;
            if (questionsRes.success) {
              const {
                data: { data: questions },
              } = questionsRes;
              dispatch(setQuestions(questions));
            }
            if (configRes.success) {
              const {
                data: { data: config },
              } = configRes;
              dispatch(setConfig(config));
            }
          },
        })
      );
    } else if (processType === "documents") {
      dispatch(
        apiMultiAction({
          requests: [
            {
              url: endpoints.GET_DOCUMENTS_QUESTIONS,
              apiBase: "WF",
              method: "GET",
            },
            {
              url: endpoints.GET_ACCOUNT_OPENING_OPTIONS,
              apiBase: "WF",
              method: "GET",
            },
          ],
          label: PROCESS_GET_DATA,
          onSuccess: (responses: any[]) => (dispatch: Dispatch) => {
            const [questionsRes, configRes] = responses;
            if (questionsRes.success) {
              const {
                data: { data: questions },
              } = questionsRes;
              dispatch(setQuestions(questions));
            }
            if (configRes.success) {
              const {
                data: { data: config },
              } = configRes;
              dispatch(setConfig(config));
            }
          },
        })
      );
    }
  };

const setQuestions = (data: any) => ({
  type: PROCESS_SET_QUESTIONS,
  payload: data,
});

const setConfig = (data: any) => ({
  type: PROCESS_SET_CONFIG,
  payload: data,
});

export const setKYCObj =
  (data: any, shouldGoNext?: boolean) =>
  (dispatch: Dispatch, getState: () => IAppState) => {
    const {
      onBoardingAnswers: { questionIndex = 1 },
      auth: { token },
    } = getState();
    dispatch(
      apiAction({
        url: endpoints.SET_KYC_OBJ,
        label: KYC_SET_OBJ,
        method: "POST",
        apiBase: "WF",
        data,
        onSuccess: () => (dispatch: Dispatch) => {
          if (shouldGoNext) {
            dispatch(setQuestionIndex(questionIndex + 1) as any);
          } else {
            dispatch(verifyToken(token));
            history.push("/kyc/dashboard");
          }
        },
      })
    );
  };

export const getAccountOpeningObject = (options?: {
  startFromBegining?: boolean;
}) =>
  apiAction({
    apiBase: "WF",
    method: "GET",
    url: endpoints.GET_ACCOUNT_OPENING_OBJECT,
    label: KYC_GET_ACCOUNT_OPENING,
    onSuccess:
      ({ data }) =>
      (dispatch: Dispatch) => {
        const { answers, questionIndex } =
          accountOpening.transformWFToApp(data);
        dispatch(setOldAnswers(answers));
        const { startFromBegining } = options || {};
        if (!startFromBegining) {
          dispatch(setQuestionIndex(questionIndex) as any);
        }
      },
  });

export const setAccountOpeningObject =
  (options?: {
    data: any;
    shouldGoNext?: boolean;
    shouldNotRelead?: boolean;
    shouldGoToDocuments?: boolean;
  }) =>
  (dispatch: Dispatch, getState: () => IAppState) => {
    const { data, shouldGoNext, shouldNotRelead, shouldGoToDocuments } =
      options || {};
    const { onBoardingAnswers } = getState();
    const { questionIndex = 1 } = onBoardingAnswers;
    dispatch(
      apiAction({
        url: endpoints.SET_ACCOUNT_OPENING_OBJECT,
        label: KYC_SET_ACCOUNT_OPENING,
        method: "POST",
        apiBase: "WF",
        data,
        onSuccess: () => (dispatch: Dispatch) => {
          if (shouldGoToDocuments) {
            // should start from 1 , as the documents hold one question
            // and documents is being shared in shape in the configuration
            dispatch(setGeneralAccountOpeningData(data));
            dispatch(setQuestionIndex(1) as any);
            history.push("/account/starter/documents");
          } else if (shouldGoNext) {
            dispatch(setQuestionIndex(questionIndex + 1) as any);
          } else if (!shouldNotRelead) {
            window.location.reload();
          }
        },
      })
    );
  };

export const changeRiskLevel =
  (newRiskLevel?: TKYCPortfolioObj) =>
  (dispatch: Dispatch, getState: () => IAppState) => {
    const {
      auth: {
        data: { kycObj },
      },
    } = getState();
    const newKYCObj = {
      ...kycObj,
      KYCPortfolio: newRiskLevel,
    } as TKycObj;
    dispatch(
      apiAction({
        apiBase: "WF",
        method: "POST",
        url: endpoints.SET_KYC_OBJ,
        label: KYC_CHANGE_RISK_LEVEL,
        data: newKYCObj,
        onSuccess: () => (dispatch: Dispatch) => {
          dispatch(authActions.updateKYCObj(newKYCObj));
        },
      })
    );
  };
