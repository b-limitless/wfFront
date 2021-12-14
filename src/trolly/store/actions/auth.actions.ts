import { Dispatch } from "redux";
import { apiAction } from "../middleware/api.middleware.helper";
import { EApps, EProductIds, TKycObj } from "../store.interface";
import {
  AUTH_VERIFY,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  KYC_OBJ_UPDATE,
  AUTH_CHANGE_PASSWORD,
  AUTH_UPDATE_APP_ID,
  AUTH_GET_AF_TOKEN,
  AUTH_SET_AF_TOKEN,
  AUTH_ACTIVATE_PRODUCT_ID,
} from "../store.types";

export const getAfToken = () =>
  apiAction({
    url: "getAFtokenAPI",
    method: "GET",
    label: AUTH_GET_AF_TOKEN,
    apiBase: "WF",
    onSuccess: ({ data }) => ({
      type: AUTH_SET_AF_TOKEN,
      payload: data,
    }),
  });
export const verifyToken = (token: string) =>
  apiAction({
    url: "verifyToken",
    label: AUTH_VERIFY,
    method: "POST",
    data: {
      token,
    },
    apiBase: "WF",
    onSuccess: ({ data }) => ({
      type: AUTH_LOGIN,
      payload: data,
    }),
  });

export const changePassword = (oldPassword: string, newPassword: string) =>
  apiAction({
    url: "changePassword",
    label: AUTH_CHANGE_PASSWORD,
    method: "POST",
    apiBase: "WF",
    data: {
      password: oldPassword,
      newPassword,
    },
  });

// activate product Id
export const activateProdId = (prods: EProductIds[]) =>
  apiAction({
    url: "prodActivateAPI",
    method: "POST",
    label: AUTH_ACTIVATE_PRODUCT_ID,
    apiBase: "WF",
    data: {
      prods,
    },
  });

export const updateKYCObj = (kycObj: TKycObj) => ({
  type: KYC_OBJ_UPDATE,
  payload: kycObj,
});

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: AUTH_LOGOUT });
  if (process.env.NODE_ENV !== "development") {
    window.localStorage.removeItem("wf_token");
    window.localStorage.removeItem("wf_appId");
    window.localStorage.removeItem("wf_email");
    window.localStorage.removeItem("af_token");
    if (window.top) {
      window.top.location.href = "/auth/#/login";
    }
  }
};

export const setAppId = (appId: EApps) => ({
  type: AUTH_UPDATE_APP_ID,
  payload: appId,
});
