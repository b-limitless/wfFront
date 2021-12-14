import { apiError, apiStart, apiEnd } from "../actions/api.actions";
import { API } from "../store.types";
import {
  NetworkRequest,
  NetworkMultipleRequests,
} from "./api.middleware.helper";
import axios from "axios";
import { MiddlewareAPI } from "redux";
import {
  IApiMiddlewareAction,
  IApiMultiPayload,
  IApiPayload,
} from "../store.interface";
import { Dispatch } from "react";
import { IState } from "..";

const apiMiddleware =
  ({ dispatch, getState }: MiddlewareAPI<any>) =>
  (next: Dispatch<IApiMiddlewareAction>) =>
  async (action: any) => {
    next(action);
    if (action.type !== API) return;

    const {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label = "",
      apiBase,
      requests,
      withToken,
      token,
      withReqCode,
      isAbsoluteUrl,
      accountId,
      headers,
      onFinaly,
    } = action.payload as IApiPayload & IApiMultiPayload;

    const {
      auth: { afData },
    } = getState() as IState;

    /**
     * assign the afToken to a variable to make it ready for injection if exist
     */
    let updatedToken: string | undefined;
    if (afData) {
      const {
        tradeApp: {
          afToken: {
            data: { afToken },
          },
        },
      } = afData;
      updatedToken = afToken;
    }

    if (requests && requests.length > 0) {
      if (label) {
        dispatch(apiStart(label));
      }

      let updatedRequests = requests;

      /**
       * if the updated token is not undefined
       * then we have the af token , we loop into each request and see if the
       * withToken is enabled and the apiBase is af then inject the token to the request
       */
      if (updatedToken) {
        updatedRequests = requests.map((request) =>
          request.withToken && request.apiBase === "AF"
            ? { ...request, token: updatedToken }
            : request
        );
      }

      /**
       * in case the requests is available and have data
       * do multiple network requests
       * request data should include
       * @param url
       * @param method
       * @param data
       * @param withToken default to true
       * @param token to override the default process of fetching the token
       */
      NetworkMultipleRequests({ requests: updatedRequests })
        .then((responses) => {
          const transformedResponses = responses.map((response) => {
            if (response.data) {
              return response.data;
            }
            return { error: response };
          });
          if (onSuccess) {
            dispatch(onSuccess(transformedResponses));
          }
          dispatch(apiEnd(label, ""));
        })
        .catch((error) => {
          dispatch(apiError(error, label));
          if (onFailure) {
            dispatch(onFailure(error));
          }
        })
        .finally(() => {
          if (onFinaly) {
            dispatch(onFinaly());
          }
        });
    } else {
      if (label) {
        dispatch(apiStart(label));
      }

      /**
       * in case the data need reqCode we need to fetch it
       * (currently used in login and register only in auth app)
       */
      let finalDataToSend;
      if (withReqCode) {
        const response = await axios.get(
          "https://apis.wealthface.com/getLoginCode"
        );
        const { data: responseData } = response;
        if (responseData) {
          const { data: reqCodeData = {} } = responseData as any;
          const { code } = reqCodeData as any;
          finalDataToSend = { ...data, reqCode: code };
        }
      } else {
        finalDataToSend = { ...data };
      }

      const networkRequestData = {
        apiBase,
        method,
        url,
        data: finalDataToSend,
        headers,
        isAbsoluteUrl,
        token,
        withReqCode,
        withToken,
        accountId,
      };

      /**
       * we check if the apiBase is af and withToken is enabled
       * and the afToken is available by checking updatedToken is not undefined
       * then inject the token to the request
       */
      if (withToken && apiBase === "AF" && updatedToken) {
        networkRequestData.token = updatedToken;
      }

      NetworkRequest(networkRequestData)
        .then(({ data }: { data: any }) => {
          dispatch(apiEnd(label, data.message));
          if (onSuccess) {
            dispatch(onSuccess(data));
          }
        })
        .catch((error) => {
          dispatch(apiError(error, label));
          if (onFailure) {
            dispatch(onFailure(error));
          }
        })
        .finally(() => {
          if (onFinaly) {
            dispatch(onFinaly());
          }
        });
    }
  };

export default apiMiddleware;
