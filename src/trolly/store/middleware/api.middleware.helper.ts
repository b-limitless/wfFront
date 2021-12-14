import { API_CONFIG } from "../store.config";
import { API } from "../store.types";
import {
  IApiPayload,
  ETokenTypes,
  IApiMiddlewareAction,
  TNetwork,
  TNetworkMulti,
  IApiMultiPayload,
} from "../store.interface";
import axios from "axios";
import { appUtils } from "@wf-org/trolly.utils";

export const apiAction = ({
  url,
  isAbsoluteUrl,
  method,
  data,
  onSuccess,
  onFailure,
  label,
  accountId,
  // because this is initial project , others need some test
  apiBase = "WF",
  withToken = true,
  withReqCode,
  token,
}: IApiPayload): IApiMiddlewareAction => {
  return {
    type: API,
    payload: {
      url,
      method,
      isAbsoluteUrl,
      data,
      onSuccess,
      onFailure,
      label,
      accountId,
      apiBase,
      withToken,
      withReqCode,
      token,
    },
  };
};

export const apiMultiAction = ({
  requests,
  label,
  onSuccess,
  onFailure,
  onFinaly,
}: IApiMultiPayload): IApiMiddlewareAction => {
  return {
    type: API,
    payload: {
      requests,
      label,
      onSuccess,
      onFailure,
      onFinaly,
    },
  };
};

export const storeToken = (tokenValue: string) => {
  if (tokenValue) {
    setToLocalStorage("wf_token", tokenValue);
  }
};

export const setToLocalStorage = (name: string, value: string) => {
  if (typeof window !== undefined) {
    name && value && window.localStorage.setItem(name, value);
  }
};

export const getFromLocalStorage = (name: string) => {
  if (typeof window !== undefined) {
    return window.localStorage.getItem(name);
  }
};

export const performNavigation = (pathname: string) => {
  if (window.top) {
    window.top.location.href = pathname;
  }
};

export const clearAuthentication = () => {
  window.localStorage.removeItem("wf_token");
  window.localStorage.removeItem("wf_email");
  window.localStorage.removeItem("wf_appId");
};

export const replaceUrlVariables = (
  url: string,
  params: { [key: string]: any }
): string => {
  const regex = /[^{{}]+(?=}})/g;
  const matches = url.match(regex);
  let modifiedURL = url;
  if (matches) {
    matches.forEach((item: string) => {
      const value = params[item];
      modifiedURL = modifiedURL.replace(
        new RegExp("{{" + item + "}}"),
        !appUtils.isEmpty(value) || value === "" ? value : `{{${item}}}`
      );
    });
  }

  return modifiedURL;
};

export const getAuthorizationHeader = (
  token: string,
  tokenType: ETokenTypes = "Bearer"
) => {
  if (token) {
    return `${tokenType} ${token}`;
  }
  return "";
};

export const setAuthorizationHeaderToAxios = (
  token: string,
  tokenType: ETokenTypes = "Bearer"
) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${tokenType} ${token}`;
    return;
  }
  axios.defaults.headers.common["Authorization"] = "";
};

export const NetworkRequest = async ({
  apiBase = "WF",
  url,
  method,
  data,
  withToken,
  token,
  accountId,
  isAbsoluteUrl = false,
  headers = {},
}: TNetwork) => {
  const formatedUrl = accountId ? replaceUrlVariables(url, { accountId }) : url;
  const WF_TOKEN = getFromLocalStorage("wf_token");
  const AF_TOKEN = getFromLocalStorage("af_token");
  const { API_HEADERS_COMMON_CONFIG, DEFAULT_TOKEN_TYPE } = API_CONFIG;
  axios.defaults.baseURL = isAbsoluteUrl ? "/" : API_CONFIG.baseURL[apiBase];
  // Sets request "Headers" common attributes
  const finalHeaders = {
    ...headers,
    ...API_HEADERS_COMMON_CONFIG,
  };
  axios.defaults.headers.common = finalHeaders;
  // if token is provided
  if (token) {
    setAuthorizationHeaderToAxios(token, "Bearer");
  }
  // if with Token provided bring token from localstorage
  else if (withToken && WF_TOKEN && apiBase === "WF") {
    setAuthorizationHeaderToAxios(WF_TOKEN, DEFAULT_TOKEN_TYPE);
  } else if (withToken && AF_TOKEN && apiBase === "AF") {
    setAuthorizationHeaderToAxios(AF_TOKEN, DEFAULT_TOKEN_TYPE);
  }

  const dataOrParams = ["GET"].includes(method) ? "params" : "data";

  axios.interceptors.response.use(handleSuccess, handleError);
  try {
    const response = await axios.request({
      url: formatedUrl,
      method,
      [dataOrParams]: data,
    });
    return Promise.resolve(response);
  } catch (exception) {
    return Promise.reject(exception);
  }
};

// TODO: handle absolute url later
export const NetworkMultipleRequests = async ({ requests }: TNetworkMulti) => {
  // get Common headers
  const { API_HEADERS_COMMON_CONFIG, DEFAULT_TOKEN_TYPE } = API_CONFIG;
  // set base url

  const WF_TOKEN = getFromLocalStorage("wf_token");
  const AF_TOKEN = getFromLocalStorage("af_token");
  // iterate throught requests to build axios request and send them as Promise.all
  const transformedRequests = requests.map((request) => {
    const {
      url,
      method,
      data,
      withToken = true,
      token,
      headers,
      apiBase = "WF",
      accountId,
      isAbsoluteUrl,
    } = request;
    const formatedUrl = accountId
      ? replaceUrlVariables(url, { accountId })
      : url;
    axios.defaults.baseURL = isAbsoluteUrl ? "/" : API_CONFIG.baseURL[apiBase];
    const dataOrParams = ["GET"].includes(method) ? "params" : "data";

    let AuthorizationHeader = {
      ...headers,
      ...API_HEADERS_COMMON_CONFIG,
    };
    // if token is provided and the api base not DW
    if (token) {
      AuthorizationHeader = getAuthorizationHeader(token, DEFAULT_TOKEN_TYPE);
      // if no token provided but wants to get it from local storage just pass withToken
    } else if (withToken && WF_TOKEN && apiBase === "WF") {
      AuthorizationHeader = getAuthorizationHeader(
        WF_TOKEN,
        DEFAULT_TOKEN_TYPE
      );
    } else {
      // activfactor , if afToken is provided in redux and withToken is passed
      // set af Token in case the apiBase is activfactor and withToken is true
      if (withToken && AF_TOKEN && apiBase === "AF") {
        AuthorizationHeader = getAuthorizationHeader(
          AF_TOKEN,
          DEFAULT_TOKEN_TYPE
        );
      }
    }
    const dataSection = data ? { [dataOrParams]: data } : {};
    const headersSection = AuthorizationHeader
      ? { Authorization: AuthorizationHeader }
      : {};
    const finalRequest: any = {
      url: formatedUrl,
      method,
      headers: {
        ...headersSection,
      },
      ...dataSection,
    };
    return axios.request(finalRequest).catch((error) => error);
  });

  const responses = await Promise.all(transformedRequests);
  const errors = responses
    .map((response) => (response.isAxiosError ? response.message : null))
    .filter((item) => !!item);
  if (errors.length > 0) {
    return Promise.reject([...errors]);
  }
  return Promise.resolve(responses);
};

const handleSuccess = (response: any) => {
  const { message, success, error, data } = response.data;
  const { errorCode, message: dataMessage } = data || {};
  const { baseURL } = response.config;
  if (!success && !baseURL.includes("activfactor")) {
    return handleError(message || error);
  } else if (errorCode) {
    return Promise.reject(dataMessage);
  }
  return Promise.resolve(response);
};

const handleError = (error: any) => {
  const errorResponseStatus = (error.response || {}).status || 0;
  const errorData = (error.response || {}).data || {};
  const { message, error: errorMessage } = errorData;
  // TODO ADD NEW ERROR CODES FOR LOGOUT - CHECK WITH MOURHAF
  if (
    (error && error.response && [401].includes(errorResponseStatus)) ||
    error === "login has expired"
  ) {
    if (process.env.NODE_ENV !== "development") {
      clearAuthentication();
      // should be handled from one place which is inside auth
      performNavigation("/app/#/logout");
    }
  }
  if (/network\serror/gi.test(error)) {
    return Promise.reject(
      "Oops, something went wrong! Please check your network connection and try again."
    );
  } else if (`${errorResponseStatus}`.charAt(0) === "5") {
    return Promise.reject("Oops, something went wrong! Please try again later");
  }
  return Promise.reject(message || errorMessage || error);
};
