export type EApiMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type EApiBase = "WF" | "STRIPE" | "AF";
export type ETokenTypes = "jwt" | "Bearer";
export type ERegulations = "UAE" | "USA";
export type EProductIds = "prodA" | "prodC" | "prodB";

export type TWFResponsePayload = {
  code: number;
  data: any;
  message: string;
  success: boolean;
};
export type TNetwork = {
  apiBase: EApiBase;
  url: string;
  method: EApiMethods;
  data?: any;
  withToken?: boolean;
  token?: string;
  accountId?: string;
  isAbsoluteUrl?: boolean;
  headers?: object;
  withReqCode?: boolean;
};

export type TNetworkMultiRequests = {
  apiBase: EApiBase;
  url: string;
  method: EApiMethods;
  data?: any;
  withToken?: boolean;
  token?: string;
  accountId?: string;
  isAbsoluteUrl?: boolean;
  headers?: object;
};

export interface TNetworkMulti {
  requests: TNetworkMultiRequests[];
}
export interface IApiMultiPayload extends TNetworkMulti {
  label?: string;
  onSuccess?: (responses: TWFResponsePayload[]) => void;
  onFailure?: (errors: any[]) => void;
  onFinaly?: () => void;
}
export interface IApiPayload extends TNetwork {
  label?: string;
  onSuccess?: (response: TWFResponsePayload) => void;
  onFailure?: (error: any) => void;
  onFinaly?: () => void;
}

export interface IApiMiddlewareAction {
  type: string;
  payload?: IApiPayload | IApiMultiPayload;
}

export interface IStoreAction {
  type: string;
  payload?: any;
}

export interface IApiState {
  [key: string]: {
    isLoading: boolean;
    error: string | string[];
    done: boolean;
    isSuccess: boolean;
    message: string;
  };
}

export type EApps = "A" | "B" | "C";

export type TKYCPortfolioObj = {
  id: number;
  name: string;
  value?: string;
};

export type TKycObj = {
  KYCPortfolio: TKYCPortfolioObj;
  KYCAnswers: any;
  KYCAnswersNew: { [key: string]: any };
  KYCNextQuestion: number;
  KYCdw: any;
};

export type TProductActive = 0 | 1;

export type TUserObj = {
  first_name: string;
  last_name: string;
  address_country: string;
  regulation: ERegulations;
  phone_number: number;
  email: string;
  drivewealth_account_id: string;
  drivewealth_account_no?: string;
  drivewealth_status: string;
  risk_level: string;
  prodA?: TProductActive;
  prodB?: TProductActive;
  prodC?: TProductActive;
  verified?: TProductActive;
};

export type TUserData = {
  user: TUserObj;
  kycObj: TKycObj;
};

export type TTradeApp = {
  afToken: {
    success: boolean;
    code: number;
    data: {
      afToken: string;
      paid: boolean;
    };
    message: string;
  };
};
export interface IAfData {
  tradeApp: TTradeApp;
}

export interface IAuthState {
  appId: EApps;
  token: string;
  email: string;
  data: TUserData;
  refId: string;
  isAuthenticated: boolean;
  isVerified: boolean;
  platform?: string;
  afData?: IAfData;
}

export interface IState {
  api: IApiState;
  auth: IAuthState;
}
