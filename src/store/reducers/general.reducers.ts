import { IAccountOpeningObj } from "store/actions/onBoardingProcess.actions";
import { TSelectOption } from "trolly/common";
import { TPhoneOption } from "trolly/custom";
import { IStoreAction } from "trolly/store";
import {
  GENERAL_SET_ACCOUNT_OPENING,
  GENERAL_SET_COUNTRIES,
  GENERAL_SET_DATA,
} from "../store.types";

export type TRiskLevel = {
  id: number;
  name: string;
  min?: number;
  max?: number;
  description?: string;
};

export type TKYCQuestionCategory = {
  min: number;
  max: number;
  mark: number;
};

type TCommission = {
  min: number;
  cps: number;
};

type ITradeCommision = {
  buy: TCommission;
  sell: TCommission;
};

type TWatchListSymbol = {
  symbol: string;
  name: string;
};

export type ITrade = {
  commission: ITradeCommision;
  watchlistSymbols: TWatchListSymbol[];
};

export interface IInvest {
  riskLevels: TRiskLevel[];
  KYCQuestionCategories: TKYCQuestionCategory[];
}
export interface ICountries {
  dwSupportedCountriesOptions: TSelectOption[];
  allCountriesOptions: TSelectOption[];
  phoneCodeOptions: TPhoneOption[];
  phoneCodeDwOptions: TPhoneOption[];
}

export type TLocalFunding = {
  minAllowedFundingAmount: number;
  minAllowedFundingAmountErrorMessage: string;
};

export interface ICashFlow {
  localFunding: TLocalFunding;
}
export interface IGeneralData {
  invest?: IInvest;
  trade?: ITrade;
  cashFlow?: ICashFlow;
  countries?: ICountries;
  accountOpening?: IAccountOpeningObj;
  tradeAccountId?: string;
}
const generalReducer = (state: IGeneralData = {}, action: IStoreAction) => {
  switch (action.type) {
    case GENERAL_SET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case GENERAL_SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GENERAL_SET_ACCOUNT_OPENING:
      const { dwTradeAccount } = action.payload || {};
      return {
        ...state,
        accountOpening: action.payload,
        tradeAccountId: dwTradeAccount,
      };
    default:
      return state;
  }
};

export default generalReducer;
