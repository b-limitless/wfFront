import {
  FUNDING_PAGE_AMOUNT_SUBMITTED,
  FUNDING_PAGE_BANK_SUBMITTED,
  FUNDING_PAGE_BANK_SUBMITTING,
  FUNDING_PAGE_HOME,
  LOCAL_TRANSFER,
  FUNDING_PAGE_NAVIGATION_BACK,
  FUNDING_PAGE_OTHER_OPTIONS,
  FUNDING_PAGE_RESET,
  FUNDING_PAGE_TRANSACTION_SUBMITTED,
  WIRE_TRANSFER,
  FUNDING_SET_BANK_LIST,
  FUNDING_SET_EXCHANGE_RATE,
  FUNDING_SET_FUNDING_OPTIONS,
  FUNDING_SET_FUNDING_OPTIONS_COUNTRIES,
  FUNDING_SET_TRANSFER_STEPS,
  FUNDING_TRANSFER_PROCESS_STATUS,
  FUNDING_SET_FUNDING_URL,
} from "../store.types";
import { TSelectOption } from "trolly/common";

export interface FundingAction {
  type: string;
  payload?: any;
}

type TFundingOptionsByCountry = {
  UAE?: Array<object>;
  USA?: Array<object>;
  type?: string;
  created_at?: string;
  updated_at?: string;
};

type TFundingData = {
  fundingOptionsByCountry: TFundingOptionsByCountry | any;
  fundingOptions: string[];
  otherFundingMethods: string[];
};

type TOnClick = {
  typeURL: string;
  url: string;
  user?: string;
};

type TExchangeRate = {
  UAE: number;
  USA: number;
};

type TAccountInfoType = {
  beneficiary_name: string;
  beneficiary_account_number: string;
  bank_name: string;
  bank_address: string;
  aba_routing: string;
  swift_code: string;
  currency: string;
  iban: string;
  country: string;
  branchName: string;
  branchAddress: string;
  line1: string;
  line2: string;
  line3: string;
};

type TAccountInfo = {
  bank: string;
  accountInfo: TAccountInfoType;
};

export type TSelectedBank = {
  name: string;
  fullName: string;
  bankId: string;
  link: string;
};

type TComponent = {
  type: string;
  activeStep: number;
  amountEnter: string;
  convertedAmount: string;
  transactionSubmitted: boolean;
  isSubmitting: boolean;
  exchangeRate: TExchangeRate;
  steps: string[];
  currencySelected: keyof TExchangeRate;
  accountInfo: TAccountInfo;
  selectedBankString: string;
  bankList: TSelectedBank[];
  selectedBank: TSelectedBank;
  selectedBankTransformed: TSelectOption;
};

export interface IFundingState {
  data: TFundingData;
  render: string;
  onClick: TOnClick;
  component: TComponent;
  iframeUrl?: string;
}

const INITIAL_STATE = {
  data: {
    fundingOptionsByCountry: {},
    fundingOptions: [],
    otherFundingMethods: [],
  },
  render: FUNDING_PAGE_HOME,
  onClick: {},
  component: {
    steps: [],
    currencySelected: "AED",
    activeStep: 0,
    exchangeRate: {},
    convertedAmount: "",
    selectedBankString: "",
    selectedBank: {
      name: "",
      fullName: "",
      bankId: "",
      link: "",
    },
    selectedBankTransformed: {
      iso2: "",
      label: "",
      value: "",
    },
    bankList: [],
    isSubmitting: false,
    amountEnter: "",
    transactionSubmitted: false,
  },
};

export const fundingReducer = (
  state = INITIAL_STATE,
  action: FundingAction
) => {
  switch (action.type) {
    case FUNDING_PAGE_HOME:
      return {
        ...state,
        render: INITIAL_STATE.render,
        component: {
          ...INITIAL_STATE.component,
        },
      };
    case FUNDING_PAGE_RESET:
      return {
        ...state,
        render: INITIAL_STATE.render,
        component: {
          ...INITIAL_STATE.component,
        },
      };
    case FUNDING_PAGE_NAVIGATION_BACK:
      return {
        ...state,
        component: {
          ...state.component,
          isSubmitting: false,
          ...action.payload,
        },
      };
    case FUNDING_SET_FUNDING_OPTIONS_COUNTRIES:
      return {
        ...state,
        data: {
          ...state.data,
          fundingOptionsByCountry: action.payload,
        },
      };
    case FUNDING_SET_FUNDING_OPTIONS:
      return {
        ...state,
        data: {
          ...state.data,
          fundingOptions: action.payload.fundingOptions,
          otherFundingMethods: action.payload.otherFundingMethods,
        },
      };
    case FUNDING_PAGE_OTHER_OPTIONS:
      return {
        ...state,
        render: FUNDING_PAGE_OTHER_OPTIONS,
      };
    case LOCAL_TRANSFER:
      return {
        ...state,
        render: LOCAL_TRANSFER,
      };
    case WIRE_TRANSFER:
      return {
        ...state,
        render: WIRE_TRANSFER,
      };
    case FUNDING_SET_EXCHANGE_RATE:
      return {
        ...state,
        component: {
          ...state.component,
          exchangeRate: { ...action.payload.result.exchangeRates },
        },
      };
    case FUNDING_PAGE_AMOUNT_SUBMITTED:
      return {
        ...state,
        component: {
          ...state.component,
          activeStep: state.component.activeStep + 1,
          ...action.payload,
        },
      };
    case FUNDING_SET_TRANSFER_STEPS:
      return {
        ...state,
        component: {
          ...state.component,
          ...action.payload,
        },
      };
    case FUNDING_SET_BANK_LIST:
      return {
        ...state,
        component: {
          ...state.component,
          bankList: action.payload,
        },
      };
    case FUNDING_PAGE_BANK_SUBMITTING:
      return {
        ...state,
        component: {
          ...state.component,
          isSubmitting: true,
        },
      };
    case FUNDING_PAGE_BANK_SUBMITTED:
      return {
        ...state,
        component: {
          ...state.component,
          isSubmitting: false,
          activeStep: state.component.activeStep + 1,
          accountInfo: action.payload.data,
          selectedBank: action.payload.selectedBank,
          selectedBankString: action.payload.selectedBankString,
          selectedBankTransformed: action.payload.selectedBankTransformed,
        },
      };
    case FUNDING_PAGE_TRANSACTION_SUBMITTED:
      return {
        ...state,
        render: FUNDING_TRANSFER_PROCESS_STATUS,
        component: {
          ...state.component,
          transactionSubmitted: true,
        },
      };
    case FUNDING_SET_FUNDING_URL:
      return {
        ...state,
        iframeUrl: action.payload,
      };
    default:
      return state;
  }
};

export default fundingReducer;
