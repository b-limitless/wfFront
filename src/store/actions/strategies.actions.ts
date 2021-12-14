import { strategiesEndPoints } from "config";
import { Dispatch } from "redux";
import { IStrategy } from "store/reducers/strategies.reducers";
import {
  STRATEGIES_DELETED_USER_STRATEGY,
  STRATEGIES_DELETE_USER_STRATEGY,
  STRATEGIES_GET_DESCRIPTIONS,
  STRATEGIES_GET_STRATEGIES_LIST,
  STRATEGIES_GET_STRATEGY_DETAILS,
  STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS,
  STRATEGIES_GET_USER_STRATEGIES,
  STRATEGIES_SAVE_STRATEGY,
  STRATEGIES_SET_DESCRIPTIONS,
  STRATEGIES_SET_STRATEGIES_LIST,
  STRATEGIES_SET_STRATEGY_DETAILS,
  STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS,
  STRATEGIES_SET_USER_STRATEGIES,
  STRATEGIES_SUBSCRIBE,
} from "store/store.types";
import { apiAction, apiMultiAction } from "trolly/store";

export const getStrategiesList = (country: string) =>
  apiAction({
    url: strategiesEndPoints.GET_PREBUILT_STRATEGIES,
    apiBase: "AF",
    method: "GET",
    withToken: false,
    label: STRATEGIES_GET_STRATEGIES_LIST,
    data: {
      country,
    },
    onSuccess: ({ data }) => ({
      type: STRATEGIES_SET_STRATEGIES_LIST,
      payload: data,
    }),
  });

export const getStrategyDetails = (
  strategy: string,
  nStock: number,
  country?: string
) =>
  apiAction({
    url: strategiesEndPoints.GET_PREBUILT_STRATEGY,
    method: "GET",
    apiBase: "AF",
    withToken: false,
    label: STRATEGIES_GET_STRATEGY_DETAILS,
    data: {
      nStock,
      country,
      strategy,
    },
    onSuccess: ({ data }) => ({
      type: STRATEGIES_SET_STRATEGY_DETAILS,
      payload: data,
    }),
  });

export const getStrategiesWithMembers = (
  strategy: string,
  nStock: number,
  country?: string
) =>
  apiAction({
    url: strategiesEndPoints.GET_PREBUILD_STRATEGIES_WITH_MEMBERS,
    method: "GET",
    apiBase: "AF",
    withToken: true,
    label: STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS,
    data: {
      nStock,
      country,
      strategy,
    },
    onSuccess: ({ data }) => ({
      type: STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS,
      payload: data,
    }),
  });

export const getDescriptionsList = () =>
  apiMultiAction({
    requests: [
      {
        url: strategiesEndPoints.GET_METRICS_DESCRIPTION,
        method: "GET",
        apiBase: "AF",
        withToken: true,
      },
      {
        url: strategiesEndPoints.GET_COUNTRIES_UNVERSE_DESCRIPTION,
        method: "GET",
        apiBase: "AF",
        withToken: true,
      },
    ],
    label: STRATEGIES_GET_DESCRIPTIONS,
    onSuccess: (responses) => (dispatch: Dispatch) => {
      const [metrics, countries] = responses;
      const descriptions = {
        metrics: metrics.data,
        countries: countries.data,
      };
      dispatch({
        type: STRATEGIES_SET_DESCRIPTIONS,
        payload: descriptions,
      });
    },
  });

interface ISaveStrategyArgs {
  strategy: IStrategy;
  nStock: number;
  country: string;
}
export const saveStrategy = ({ strategy, ...rest }: ISaveStrategyArgs) =>
  apiAction({
    url: strategiesEndPoints.POST_SAVE_PREBUILT_STRATEGY,
    method: "POST",
    label: STRATEGIES_SAVE_STRATEGY,
    apiBase: "AF",
    data: {
      strategyName: strategy.strategy,
      ...rest,
    },
    onSuccess: () => (dispatch: Dispatch) => {
      dispatch(getUserStrategies());
    },
  });

export const getUserStrategies = () =>
  apiAction({
    url: strategiesEndPoints.GET_PREBUILT_USER_STRATEGIES,
    method: "GET",
    apiBase: "AF",
    label: STRATEGIES_GET_USER_STRATEGIES,
    onSuccess: ({ data }) => ({
      type: STRATEGIES_SET_USER_STRATEGIES,
      payload: data,
    }),
  });

export const deleteUserStrategy = ({
  strategyName,
}: {
  strategyName: string;
}) =>
  apiAction({
    url: strategiesEndPoints.DELETE_PREBUILT_USER_STRATEGY,
    method: "DELETE",
    apiBase: "AF",
    label: STRATEGIES_DELETE_USER_STRATEGY,
    data: {
      strategyName,
    },
    onSuccess: () => ({
      type: STRATEGIES_DELETED_USER_STRATEGY,
      payload: strategyName,
    }),
  });

// TODO: to be replaced with proper subscription module later
export const subscribeToMembers = () => ({
  type: STRATEGIES_SUBSCRIBE,
});
