import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppData } from "store/actions/general.actions";
import { IAppState } from "store/store.interface";
import { GENERAL_GET_DATA } from "store/store.types";
import { ETheme } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { authActions, WF_TOKEN } from "trolly/store";
import { STORE_TYPES } from "trolly/store";
import { useOnboardingActions } from "./useOnboardingChecklist";

const useAppInit = (): {
  isAppLoading: boolean;
  error: any;
  isAuthenticated: boolean;
  onLogout: () => void;
  isVerified?: boolean;
  email?: string;
  theme?: ETheme;
} => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isProductActivated, setIsProductActivated] = useState(false);

  const { isNavigationCompleted } = useOnboardingActions();

  const { appId, theme } = useAppInfo();

  // auth verify api status
  const {
    done: authVerifyDone,
    error: authVerifyError,
    isSuccess: isAuthVerifySuccess,
  } = useApiInfo(STORE_TYPES.AUTH_VERIFY);

  // app config general api status
  const { error: generalDataError, isSuccess: generalDataSuccess } =
    useApiInfo(GENERAL_GET_DATA);

  //product activation api status
  const {
    isLoading: isActivationLoading,
    error: activationError,
    done: isActivationDone,
  } = useApiInfo(STORE_TYPES.AUTH_ACTIVATE_PRODUCT_ID);

  const dispatch = useDispatch();

  const {
    isAuthenticated,
    countries,
    isVerified,
    email,
    data: tokenData,
  } = useSelector((state: IAppState) => ({
    ...state.general,
    ...state.auth,
  }));

  // logout process to be generic
  const onLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  // verify token - if expired will be handled in the protected route to show message before it logout
  useEffect(() => {
    if (WF_TOKEN) {
      dispatch(authActions.verifyToken(WF_TOKEN));
    } else {
      setIsAppLoading(false);
      onLogout();
    }
  }, [dispatch, onLogout]);

  // when the token is set and the user verified , fetch the app general data
  useEffect(() => {
    if (WF_TOKEN && isAuthVerifySuccess && !countries) {
      dispatch(getAppData());
    }
  }, [dispatch, isAuthVerifySuccess, countries]);

  // check if the product is activated
  useEffect(() => {
    if (tokenData && appId && !isProductActivated && !isActivationDone) {
      const { user } = tokenData;
      const { prodA, prodC } = user || {};
      const isActivated = (prodA && appId === "A") || (prodC && appId === "C");
      if (!isActivated) {
        dispatch(
          authActions.activateProdId([appId === "A" ? "prodA" : "prodC"])
        );
      } else {
        setIsProductActivated(true);
      }
    }
  }, [dispatch, appId, tokenData, isProductActivated, isActivationDone]);

  // set product activation loading state to true if done
  useEffect(() => {
    if (isActivationDone && !isActivationLoading) {
      setIsProductActivated(true);
    }
  }, [isActivationDone, isActivationLoading]);

  useEffect(() => {
    if (
      (generalDataSuccess &&
        isAuthVerifySuccess &&
        isProductActivated &&
        isProductActivated) ||
      (authVerifyDone && !isAuthVerifySuccess)
    ) {
      setIsAppLoading(false);
    }
  }, [
    isNavigationCompleted,
    generalDataSuccess,
    isAuthVerifySuccess,
    authVerifyDone,
    isProductActivated,
  ]);

  const [isLoading, error] = useMemo(() => {
    // should handle more logic in future
    return [
      isAppLoading,
      generalDataError || authVerifyError || activationError,
    ];
  }, [isAppLoading, generalDataError, authVerifyError, activationError]);

  return {
    isAppLoading: isLoading,
    error,
    isAuthenticated,
    onLogout,
    isVerified,
    email,
    theme,
  };
};

export default useAppInit;
