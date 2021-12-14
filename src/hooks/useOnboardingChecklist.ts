import { useApiInfo } from "trolly/hooks";
import { apiActions, performNavigation, STORE_TYPES } from "trolly/store";
import { appUtils } from "trolly/utils";
import { setOldAnswers, setQuestionIndex } from "trolly/modules";
import { history, ignoreForceNavigationRoutes } from "config";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import {
  GENERAL_GET_DATA,
  KYC_GET_ACCOUNT_OPENING,
  PROCESS_GET_DATA,
} from "store/store.types";
import {
  getAccountOpeningObject,
  getProcessQuestions,
} from "store/actions/onBoardingProcess.actions";
import useUserInfo from "./useUserIInfo";
import { useLocation } from "react-router";

interface IOnboardingAvailability {
  noKYC: boolean;
  isKYCStarted: boolean;
  isAccountOpeningStarted: boolean;
  isOnboardingCompleted: boolean;
  isKYCCompleted: boolean;
  isInvestCreated: boolean;
  isTradeCreated: boolean;
  kYCAnswers: any;
  questionIndex: number;
  isInvestError: boolean;
  isTradeError: boolean;
  investError: string;
  tradeError: string;
  isDocumentSubmitted: boolean;
}

export const useOnboardingAvailability = (): IOnboardingAvailability => {
  const { data, accountOpening } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.general,
  }));

  const { isSuccess: isAuthSuccess } = useApiInfo(STORE_TYPES.AUTH_VERIFY);
  const { isSuccess: isGeneralSuccess } = useApiInfo(GENERAL_GET_DATA);
  const {
    noKYC,
    isKYCStarted,
    isAccountOpeningStarted,
    isOnboardingCompleted,
    questionIndex,
    kYCAnswers,
    isKYCCompleted,
    isInvestCreated,
    isTradeCreated,
    isInvestError,
    isTradeError,
    investError,
    tradeError,
    isDocumentSubmitted,
  } = useMemo(() => {
    let noKYC = false;
    let isKYCStarted = false;
    let isKYCCompleted = false;
    let isAccountOpeningStarted = false;
    let isOnboardingCompleted = false;
    let isInvestCreated = false;
    let isTradeCreated = false;
    let isInvestError = false;
    let isTradeError = false;
    let isDocumentSubmitted = false;
    let kYCAnswers = {};
    let questionIndex = 1;
    let investError = "";
    let tradeError = "";
    const { isEmpty } = appUtils;
    if (isAuthSuccess && isGeneralSuccess) {
      const { kycObj, user } = data;
      /**
       * if the kycObj is empty then it's initial signup
       */
      if (!isEmpty(kycObj)) {
        const {
          KYCPortfolio,
          KYCAnswersNew,
          KYCNextQuestion,
          KYCAnswers: KYCOldWayAnswers,
        } = kycObj;

        const {
          status,
          dwAccErr,
          dwTradeAccErr,
          dwAccount,
          dwTradeAccount,
          dwTradeUserErr,
          dwUserErr,
        } = accountOpening || {};
        // if the kycObj is not empty but no the portfolio was not calculated
        // then the kyc is not completed (invest and trade)
        if (isEmpty(KYCPortfolio)) {
          noKYC = true;
        }
        // if the kyc portfolio is calculated and there are some answers then the kyc is started (trade annd invest)
        if (!isEmpty(KYCAnswersNew) || !isEmpty(KYCOldWayAnswers)) {
          isKYCStarted = true;
        }
        const { drivewealth_account_id } = user || {};
        // if the kyc Portfolio is calculated then kyc is completed
        if (!isEmpty(KYCPortfolio)) {
          isKYCCompleted = true;
        }

        // is the status is not empty , then the account opening started
        if (!isEmpty(status)) {
          isAccountOpeningStarted = true;
        }

        // if the user submit the form with or without documents
        if (status && (status.submit || status.submitTrade)) {
          isDocumentSubmitted = true;
        }

        //is the upload documents completed
        if (status && status.isAccountOpeningCompleted) {
          isOnboardingCompleted = true;
        }
        //

        // if there is drivewealth account id , then the account opening is completed (invest)
        if (drivewealth_account_id || dwAccount) {
          isInvestCreated = true;
        }

        // if trade account tried to activate but got an error (may be at user level or account level)
        if (!isEmpty(dwTradeAccErr) || !isEmpty(dwTradeUserErr)) {
          isTradeError = true;
          if (dwTradeAccErr) {
            tradeError = dwTradeAccErr.message;
          } else if (dwTradeUserErr) {
            tradeError = dwTradeUserErr.message;
          }
        }

        // if invest account tried to activate but got an error (maybe at user level or account level)
        if (!isEmpty(dwUserErr) || !isEmpty(dwAccErr)) {
          isInvestError = true;
          if (dwUserErr) {
            investError = dwUserErr.message;
          } else if (dwAccErr) {
            investError = dwAccErr.message;
          }
        }

        // TODO : check the identifier that the trade is created or not
        if (dwTradeAccount) {
          isTradeCreated = true;
        }

        // TODO need to see how the isAccountOpeningstarted and isOnboardingCompleted will be
        // calculated for trade app

        kYCAnswers = KYCAnswersNew;
        questionIndex = KYCNextQuestion;
      } else {
        noKYC = true;
        isKYCStarted = false;
        isAccountOpeningStarted = false;
        isOnboardingCompleted = false;
        isKYCCompleted = false;
        isInvestCreated = false;
        isTradeCreated = false;
        isTradeError = false;
        isInvestError = false;
        isDocumentSubmitted = false;
        kYCAnswers = {};
        questionIndex = 1;
        investError = "";
        tradeError = "";
      }
    }
    return {
      noKYC,
      isKYCStarted,
      isAccountOpeningStarted,
      isOnboardingCompleted,
      isKYCCompleted,
      kYCAnswers,
      isInvestCreated,
      isTradeCreated,
      questionIndex,
      isInvestError,
      isTradeError,
      investError,
      tradeError,
      isDocumentSubmitted,
    };
  }, [data, accountOpening, isAuthSuccess, isGeneralSuccess]);
  return {
    noKYC,
    isKYCStarted,
    isAccountOpeningStarted,
    isOnboardingCompleted,
    kYCAnswers,
    questionIndex,
    isKYCCompleted,
    isInvestCreated,
    isTradeCreated,
    isInvestError,
    isTradeError,
    investError,
    tradeError,
    isDocumentSubmitted,
  };
};

interface IOnboardingActions {
  retakeKYC?: boolean;
  ignoreForceNavigation?: boolean;
  retryAccountOpening?: boolean;
}
export const useOnboardingActions = (
  options?: IOnboardingActions
): { isNavigationCompleted?: boolean } => {
  const {
    isTradeCreated,
    noKYC,
    isKYCStarted,
    isInvestCreated,
    isOnboardingCompleted,
    isTradeError,
    isInvestError,
    isAccountOpeningStarted,
    isDocumentSubmitted,
  } = useOnboardingAvailability();
  const { regulation } = useUserInfo();
  const { appId } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.general,
  }));

  const { pathname } = useLocation();

  const { isSuccess: generalDataSuccess } = useApiInfo(GENERAL_GET_DATA);
  const { isSuccess: authVerifySuccess } = useApiInfo(STORE_TYPES.AUTH_VERIFY);

  // #region onboarding actions v1
  // const onboardingActionsV1 = useCallback(() => {
  //   const { pathname } = history.location;
  //   if (authVerifySuccess && generalSuccess) {
  //     // TODO , this need to be checked , and removed when we open trade to USA environment
  //     if (appId === "C" && regulation === "USA") {
  //       performNavigation("/auth/#/login");
  //     } else {
  //       if (isInvestCreated || isTradeCreated) {
  //         if (appId === "A") {
  //           if (isInvestCreated) {
  //             if (!ignoreForceNavigation || pathname.indexOf("/trade") > -1) {
  //               history.push("/invest/dashboard");
  //             }
  //           } else if (isInvestError && !retryAccountOpening) {
  //             history.push("/support");
  //           } else if (!retryAccountOpening) {
  //             history.push("/activation");
  //           }
  //         } else if (appId === "C") {
  //           if (isTradeCreated) {
  //             if (!ignoreForceNavigation || pathname.indexOf("/invest") > -1) {
  //               history.push("/trade/dashboard");
  //             }
  //           } else if (isTradeError && !retryAccountOpening) {
  //             history.push("/support");
  //           } else if (!retryAccountOpening) {
  //             history.push("/activation");
  //           }
  //         }
  //       } else if (!retakeKYC) {
  //         if (noKYC) {
  //           if (["/kyc", "/"].indexOf(pathname) < 0) {
  //             if (isKYCStarted) {
  //               history.push("/kyc");
  //             } else {
  //               history.push("/");
  //             }
  //           }
  //         } else if (!isOnboardingCompleted && !isAccountOpeningStarted) {
  //           if (["/account/opening", "/kyc/dashboard"].indexOf(pathname) < 0) {
  //             history.push("/kyc/dashboard");
  //           }
  //         } else if (isAccountOpeningStarted && !isOnboardingCompleted) {
  //           if (["/account/opening", "/kyc/dashboard"].indexOf(pathname) < 0) {
  //             history.push("/account/opening");
  //           }
  //         } else if (isOnboardingCompleted && !isDocumentSubmitted) {
  //           if (
  //             [
  //               "/account/submit/documents",
  //               "/account/starter/documents",
  //             ].indexOf(pathname) < 0
  //           ) {
  //             history.push("/account/starter/documents");
  //           }
  //         } else if (appId === "A" && isInvestError && !retryAccountOpening) {
  //           history.push("/support");
  //         } else if (appId === "C" && isTradeError && !retryAccountOpening) {
  //           history.push("/support");
  //         }
  //       }
  //     }
  //   }
  //   setIsProcessing(false);
  // }, [
  //   appId,
  //   isTradeCreated,
  //   isInvestCreated,
  //   isOnboardingCompleted,
  //   noKYC,
  //   generalSuccess,
  //   authVerifySuccess,
  //   retakeKYC,
  //   ignoreForceNavigation,
  //   isTradeError,
  //   isInvestError,
  //   isAccountOpeningStarted,
  //   isKYCStarted,
  //   retryAccountOpening,
  //   regulation,
  //   isDocumentSubmitted,
  // ])
  // #endregion

  // #region onboarding actions v2
  const isNavigationCompleted = useMemo(() => {
    const isRetakeKYC = pathname.indexOf("/kyc/retake") > -1;
    const isAccountOpeningRetry =
      pathname.indexOf("/account/opening/retry") > -1;
    // TODO , this need to be checked , and removed when we open trade to USA environment
    if (generalDataSuccess && authVerifySuccess) {
      if (appId === "C" && regulation === "USA") {
        performNavigation("/auth/#/login");
      } else {
        if (isInvestCreated || isTradeCreated) {
          if (appId === "A") {
            if (isInvestCreated) {
              if (
                ignoreForceNavigationRoutes.includes(pathname) ||
                pathname.indexOf("/trade") > -1
              ) {
                history.push("/invest/dashboard");
                return true;
              }
            } else if (isInvestError && !isAccountOpeningRetry) {
              history.push("/support");
              return true;
            } else if (!isAccountOpeningRetry) {
              history.push("/activation");
              return true;
            }
          } else if (appId === "C") {
            if (isTradeCreated) {
              if (
                ignoreForceNavigationRoutes.includes(pathname) ||
                pathname.indexOf("/invest") > -1
              ) {
                history.push("/trade/dashboard");
                return true;
              }
            } else if (isTradeError && !isAccountOpeningRetry) {
              history.push("/support");
              return true;
            } else if (!isAccountOpeningRetry) {
              history.push("/activation");
              return true;
            }
          }
        } else if (!isRetakeKYC) {
          if (noKYC) {
            if (["/kyc", "/"].indexOf(pathname) < 0) {
              if (isKYCStarted) {
                history.push("/kyc");
                return true;
              } else {
                history.push("/");
                return true;
              }
            }
          } else if (!isOnboardingCompleted && !isAccountOpeningStarted) {
            if (["/account/opening", "/kyc/dashboard"].indexOf(pathname) < 0) {
              history.push("/kyc/dashboard");
              return true;
            }
          } else if (isAccountOpeningStarted && !isOnboardingCompleted) {
            if (["/account/opening", "/kyc/dashboard"].indexOf(pathname) < 0) {
              history.push("/account/opening");
              return true;
            }
          } else if (isOnboardingCompleted && !isDocumentSubmitted) {
            if (
              [
                "/account/submit/documents",
                "/account/starter/documents",
              ].indexOf(pathname) < 0
            ) {
              history.push("/account/starter/documents");
              return true;
            }
          } else if (appId === "A" && isInvestError && !isAccountOpeningRetry) {
            history.push("/support");
            return true;
          } else if (appId === "C" && isTradeError && !isAccountOpeningRetry) {
            history.push("/support");
            return true;
          }
        }
      }
    }
  }, [
    appId,
    isTradeCreated,
    isInvestCreated,
    isOnboardingCompleted,
    noKYC,
    isTradeError,
    isInvestError,
    isAccountOpeningStarted,
    isKYCStarted,
    regulation,
    isDocumentSubmitted,
    pathname,
    authVerifySuccess,
    generalDataSuccess,
  ]);

  return { isNavigationCompleted };

  // #endregion
};

// #region preare account opening questions , fetch or start from begining and get the loading state
interface IAccontOpeningPreparatoinOptions {
  start?: boolean;
  startFromBegining?: boolean;
}
export const useAccountOpeningPreparation = (
  options?: IAccontOpeningPreparatoinOptions
): {
  isProcessing: boolean;
  error?: string | string[];
  clearError?: () => void;
} => {
  const { start, startFromBegining } = options || {};
  const [isProcessing, setIsProcessing] = useState(true);

  const { isLoading, error, done } = useApiInfo(KYC_GET_ACCOUNT_OPENING);
  const { data, questions } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.onBoardingQuestions,
  }));
  const dispatch = useDispatch();

  /**
   * if no kyc take the user to kyc
   * if there is token and get the account opening is not done and the account opening process is started and not completed
   * then get the account opening object
   */
  useEffect(() => {
    if (start || typeof start === "undefined") {
      dispatch(getAccountOpeningObject({ startFromBegining }));
      const { user } = data || {};
      const { regulation } = user;
      if (regulation) {
        dispatch(getProcessQuestions("acountOpening", regulation));
      }
    }
  }, [data, dispatch, start, startFromBegining]);

  if (!isLoading && done && !appUtils.isEmpty(questions) && isProcessing) {
    setIsProcessing(false);
  }

  const clearError = () => {
    apiActions.clearApi(KYC_GET_ACCOUNT_OPENING);
  };

  return {
    isProcessing,
    error,
    clearError,
  };
};

// #endregion

// #region prepare the kyc question and options , start from begining , get the loading state
export const useKYCPreparation = (options: {
  retakeKYC?: boolean;
  start?: boolean;
}): {
  isChecking: boolean;
  error?: string | string[];
  onClearError: () => void;
} => {
  const { retakeKYC, start } = options;
  const [isProcessing, setIsProcessing] = useState(true);
  const { error } = useApiInfo(STORE_TYPES.AUTH_VERIFY);
  const { error: error_process } = useApiInfo(PROCESS_GET_DATA);
  const { questions, config } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.onBoardingQuestions,
  }));

  const { kYCAnswers, questionIndex } = useOnboardingAvailability();

  const dispatch = useDispatch();
  const handleClearError = () => {
    apiActions.clearApi(PROCESS_GET_DATA);
  };

  useEffect(() => {
    dispatch(getProcessQuestions("kyc"));
  }, [dispatch]);

  useEffect(() => {
    if (start && !retakeKYC) {
      dispatch(setOldAnswers({ KYCAnswersNew: kYCAnswers }));
      dispatch(setQuestionIndex(questionIndex));
    }
    if (
      !appUtils.isEmpty(questions) &&
      !appUtils.isEmpty(config) &&
      isProcessing
    ) {
      setIsProcessing(false);
    }
  }, [
    config,
    questions,
    dispatch,
    kYCAnswers,
    questionIndex,
    retakeKYC,
    start,
    isProcessing,
  ]);
  return {
    isChecking: isProcessing,
    error: error_process || error,
    onClearError: handleClearError,
  };
};

// #endregion

// #region preapre the documents component , get the loading state
export const useUSADocumentsPreparation = (options?: {
  startFromBegining?: boolean;
}): {
  isChecking: boolean;
  error?: string | string[];
  onClearError: () => void;
} => {
  const { startFromBegining } = options || {};
  const { error } = useApiInfo(STORE_TYPES.AUTH_VERIFY);
  const { error: error_process, isLoading: isGettingProcessData } =
    useApiInfo(PROCESS_GET_DATA);
  const { isLoading: isGettingAccountOpeningObj } = useApiInfo(
    KYC_GET_ACCOUNT_OPENING
  );
  const { questions, config } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.onBoardingQuestions,
  }));

  const dispatch = useDispatch();
  const handleClearError = () => {
    apiActions.clearApi(PROCESS_GET_DATA);
  };

  useEffect(() => {
    dispatch(getAccountOpeningObject({ startFromBegining }));
    dispatch(getProcessQuestions("documents"));
  }, [dispatch, startFromBegining]);

  return {
    isChecking:
      appUtils.isEmpty(questions) ||
      appUtils.isEmpty(config) ||
      isGettingAccountOpeningObj ||
      isGettingProcessData,
    error: error_process || error,
    onClearError: handleClearError,
  };
};
// #endregion
