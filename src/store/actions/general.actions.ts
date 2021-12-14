import { endpoints } from "config";
import { Dispatch } from "redux";
import { IAppState } from "store/store.interface";
import { TPhoneOption } from "trolly/custom";
import { TWFResponsePayload, apiAction } from "trolly/store";
import {
  apiMultiAction,
  replaceUrlVariables,
} from "trolly/store/middleware/api.middleware.helper";
import {
  GENERAL_GET_DATA,
  GENERAL_SET_DATA,
  GENERAL_SET_COUNTRIES,
  GENERAL_SET_ACCOUNT_OPENING,
  GENERAL_UPDATE_USER_PROFILE,
  GENERAL_ACTIVATE_PRODUCT,
} from "../store.types";
import { setAccountOpeningObject } from "./onBoardingProcess.actions";

export type TAllCountryObj = {
  iso: string;
  iso3: string;
  name: string;
  nicename: string;
  phonecode: number;
};

export type TDWCountryObj = {
  code3: string;
  name: string;
};
export const getAppData = () => (dispatch: Dispatch) => {
  dispatch(
    apiMultiAction({
      requests: [
        { url: endpoints.GET_APP_GENERIC_DATA, method: "GET", apiBase: "WF" },
        {
          url: endpoints.GET_ALL_COUNTRIES,
          method: "GET",
          apiBase: "WF",
          withToken: false,
        },
        {
          url: endpoints.GET_DW_SUPPORTED_COUNTRIES,
          method: "GET",
          apiBase: "WF",
        },
        {
          url: endpoints.GET_ACCOUNT_OPENING_OBJECT,
          method: "GET",
          apiBase: "WF",
          withToken: true,
        },
      ],
      label: GENERAL_GET_DATA,
      onSuccess: (responses) => (dispatch: Dispatch) => {
        const [config, allCountries, dwSupportedCountries, accountOpeningObj] =
          responses;
        const { data: accountOpeningData } = accountOpeningObj || {};
        if (config) {
          const {
            data: { data: generalData },
          } = config || {};

          /**
           * Countries Transoformer
           */
          dispatch(setCountriesData(allCountries, dwSupportedCountries) as any);
          dispatch(setGeneralAccountOpeningData(accountOpeningData));
          dispatch({
            type: GENERAL_SET_DATA,
            payload: generalData,
          });
        }
      },
    })
  );
};

export const setGeneralAccountOpeningData = (data: any) => ({
  type: GENERAL_SET_ACCOUNT_OPENING,
  payload: data,
});

const setCountriesData =
  (allCountries: TWFResponsePayload, dwCountries: TWFResponsePayload) =>
  (dispatch: Dispatch) => {
    const { data: allCountriesData, success: isAllCountriesSuccess } =
      allCountries;
    const { data: dwCountriesData, success: isDwCountriesSuccess } =
      dwCountries;
    if (isAllCountriesSuccess && isDwCountriesSuccess) {
      const allCountriesOptions = allCountriesData.map(
        ({ iso, nicename, iso3 }: TAllCountryObj) =>
          ({
            value: iso3,
            iso2: iso,
            label: nicename,
          } as TPhoneOption)
      );

      const phoneCodeOptions = allCountriesData.map(
        ({ iso, phonecode, iso3 }: TAllCountryObj) => ({
          value: iso3,
          iso2: iso,
          label: `+${phonecode}`,
          codeNumber: `+${phonecode}`,
        })
      );

      const phoneCodeDwOptions = allCountriesData
        .map(({ iso, phonecode, iso3 }: TAllCountryObj) => {
          const matchedCountry = dwCountriesData.find(
            ({ code3 }: TDWCountryObj) => iso3 === code3
          );
          if (matchedCountry) {
            return {
              value: iso3,
              iso2: iso,
              label: `+${phonecode}`,
              codeNumber: `+${phonecode}`,
            };
          }
          return undefined;
        })
        .filter((x: any) => typeof x !== "undefined");

      const dwSupportedCountriesOptions = allCountriesData
        .map(({ iso, iso3, nicename }: TAllCountryObj) => {
          const matchedCountry = dwCountriesData.find(
            ({ code3 }: TDWCountryObj) => iso3 === code3
          );
          if (matchedCountry) {
            return {
              value: iso3,
              label: nicename,
              iso2: iso,
            };
          }
          return undefined;
        })
        .filter((x: any) => typeof x !== "undefined");

      dispatch({
        type: GENERAL_SET_COUNTRIES,
        payload: {
          allCountriesOptions,
          dwSupportedCountriesOptions,
          phoneCodeOptions,
          phoneCodeDwOptions,
        },
      });
    }
  };

export const updateProfile =
  (phoneNumber: string) => (dispatch: Dispatch, getState: () => IAppState) => {
    const { onBoardingAnswers } = getState();
    const { answers } = onBoardingAnswers || {};
    dispatch(
      apiAction({
        url: endpoints.POST_USER_PROFILE,
        method: "POST",
        apiBase: "WF",
        label: GENERAL_UPDATE_USER_PROFILE,
        data: {
          phone_number: phoneNumber,
        },
        onSuccess: () => (dispatch: Dispatch) => {
          dispatch(
            setAccountOpeningObject({
              data: answers,
              shouldNotRelead: true,
            }) as any
          );
        },
      })
    );
  };

export const activateProduct =
  (product: "INVEST" | "TRADE") => (dispatch: Dispatch) => {
    const endpoint = replaceUrlVariables(endpoints.POST_PRODUCT_ACTIVATE, {
      product,
    });
    dispatch(
      apiAction({
        url: endpoint,
        apiBase: "WF",
        method: "POST",
        label: GENERAL_ACTIVATE_PRODUCT,
      })
    );
  };
