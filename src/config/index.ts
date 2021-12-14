import { createHashHistory } from "history";
import { isProd } from "trolly/utils/app.utils";

const history = createHashHistory();

const endpoints = {
  GET_KYC_OBJ: "GetKycObj",
  SET_KYC_OBJ: "SetKycObj",
  GET_APP_GENERIC_DATA: isProd
    ? "getAppConfig/appConfig|general|front"
    : "getAppConfig/appConfig|general|front|dev",
  GET_KYC_QUESTIONS: isProd ? "getAppConfig/kyc|v1" : "getAppConfig/kyc|dev|v1",
  GET_ACCOUNT_OPENING_QUESTIONS: isProd
    ? "getAppConfig/accountopening|v1|{{regulation}}"
    : "getAppConfig/accountopening|dev|v1|{{regulation}}",
  GET_DOCUMENTS_QUESTIONS: isProd
    ? "getAppConfig/documents|v1"
    : "getAppConfig/documents|dev|v1",
  GET_ACCOUNT_OPENING_OPTIONS: "getAppConfig/accountopening|v1|options",
  GET_KYC_CONFIG: "getAppConfig/appConfig|kyc",
  GET_ALL_COUNTRIES: "ListCountryAPI",
  GET_DW_SUPPORTED_COUNTRIES: "listDWCountries",
  GET_ACCOUNT_OPENING_OBJECT: "GetOpenRAccObj",
  SET_ACCOUNT_OPENING_OBJECT: "SetOpenRAccObj",
  POST_USER_PROFILE: "UpdateUserProfile",
  POST_PRODUCT_ACTIVATE: "submitProductActivation/{{product}}",
};

const investEndpoints = {
  GET_ALGO_COMB: "GetAlgoCombsAsArr/{{id}}",
  GET_PERFORMANCE_INFO: "getWithdrawlAndDepositsAPI",
  GET_ACCOUNT_ACTIVITIES:
    "/getAccountTransactionsAPI/{{accountId}}/{{numOfMonths}}",
  GET_ACCOUNT_STATEMENTS: "getAccStatementsAPI/{{accountId}}",
  GET_STATEMENT_FILE: "getStatementFileAPI/{{fileId}}",
  GET_ACCOUNT_INFO: "getAccountsInfoAPI",
  GET_USER_ALLOCATION: "CurrUserAllocationAPI",
  GET_PORTFOLIO_PERFORMANCE: "GetPGbyAccID",
};

const tradeEndpoints = {
  GET_INNSTRUMENT_DETAILS: "getInstrumentAPI/{{id}}",
  GET_LIST_INSTRUMENTS_DW: "tradeAccAPI/instruments/list",
  GET_LIST_INSTRUMENTS_WF: "listInstrumentsAPI",
  GET_LIST_INSTRUMENTS_AF: "getAppConfig/enhancedInstrumentsList-fouad-2021",
  GET_ACCOUNT_SUMMARY: "tradeAccAPI/account/summary",
  GET_ACCOUNT_CASH_SUMMARY: "tradeAccAPI/account/cashSummary",
  GET_ACCOUNT_PERFORMANCE: "tradeAccAPI/account/performance",
  GET_CONSOLIDATED_QUOTE_15_MINUTES_DELAY: "tradeAccAPI/quotes/vdr15",
  GET_CONSOLIDATED_QUOTE: "tradeAccAPI/quotes/vdr",
  GET_CONSOLIDATED_QUOTE_LIVE: "tradeAccAPI/quotes/default",
  GET_INSTRUMENT_FUNDAMENTAL: "tradeAccAPI/instruments/fundamentals",
  GET_CHART_DATA: "tradeAccAPI/bars",
  POST_PLACE_ORDER: "tradeAccAPI/orders/post",
  CANCEL_ORDER: "tradeAccAPI/orders/cancel",
  GET_ACCOUNT_ACTIVITIES: "tradeAccAPI/account/transactions",
  GET_ACCOUNT_STATEMENTS: "tradeAccAPI/account/statements",
  GET_STATEMENT_FILE: "tradeAccAPI/account/getStatementFile",
};

const fundingEndpoints = {
  GET_FUNDING_OPTIONS: "getAppConfig/fundingOptionsByCountry",
  GET_FUNDING_PAYMENT_INITIALIZE: "paymentInitialize",
  SUBMIT_FUNDING_TRANSFER_PROCESS: "addClientLocalPaymentAPI",
};

const fundingAbsoluteBaseURL = "https://apis.wealthface.com:7770/api/v1";

const fundingAbsoluteURL = {
  GET_FUNDING_EXCHANGE_RATE: `${fundingAbsoluteBaseURL}/getExchangeRate`,
  GET_FUNDING_BANK_LIST: `${fundingAbsoluteBaseURL}/getBankList`,
  GET_FUNDING_BANK_ACCOUNT: `${fundingAbsoluteBaseURL}/getBankAccount`,
};

const withdrawalEndpoints = {
  WITHDRAWAL_SAVE_REQUEST: "saveWithdrawalRequestAPI",
};

const watchlistEndpoints = {
  GET_WATCHLISTS: "getWatchListAPI",
  CREATE: "setWatchListAPI",
  DELETE: "delWatchListAPI",
  GET_QUOTES_DEFAULT: "tradeAccAPI/quotes/default",
};

const rewardsEndpoints = {
  GET_REFERRAL_PLAN: "getReferralPlan",
  GET_LIST_REFERRED_CLIENTS: "listReferredClients",
  ADD_REFERRAL: "addReferralAPI",
  GET_REFERRAL_LINK: "getReferralLinkAPI",
};

const basketsEndpoints = {
  GET_BASKETS: "getTradeBasketAPI",
  CREATE: "setTradeBasketAPI",
  DELETE: "delTradeBasketAPI",
  GET_QUOTES_DEFAULT: "tradeAccAPI/quotes/default",
  POST_PLACE_ORDER: "tradeAccAPI/orders/post",
};

const strategiesEndPoints = {
  GET_PREBUILT_STRATEGIES: "portfoliostemplate/prebuilt/strategies",
  GET_PREBUILT_STRATEGY: "portfoliostemplate/prebuilt/strategy",
  GET_METRICS_DESCRIPTION: "metricslist",
  GET_COUNTRIES_UNVERSE_DESCRIPTION: "countrieslist",
  GET_PREBUILD_STRATEGIES_WITH_MEMBERS:
    "portfoliostemplate/prebuilt/strategywithmembers",
  POST_SAVE_PREBUILT_STRATEGY: "prebuilt/monitor",
  GET_PREBUILT_USER_STRATEGIES: "prebuilt/monitors",
  DELETE_PREBUILT_USER_STRATEGY: "prebuilt/monitor",
};

type TRoute = {
  to: string;
  label: string;
};
interface IRoute {
  trade: TRoute[];
  tradeDropDown: TRoute[];
  invest: TRoute[];
  investDropDown: TRoute[];
}
const routes: IRoute = {
  trade: [
    { to: "/trade/dashboard", label: "Dashboard" },
    { to: "/trade/portfolio", label: "Portfolio" },
    { to: "/trade/funding", label: "Funding" },
    { to: "/trade/baskets", label: "Baskets" },
    { to: "/trade/watchlists", label: "Watchlists" },
    // TODO ENABLE_FOR_NEW_FEATURE
    // { to: "/trade/strategies", label: "Strategies" },
    ///////////////////////////////////
    // { to: "/trade/rewards", label: "Rewards" },
  ],
  tradeDropDown: [
    { to: "/trade/orders", label: "Orders Status" },
    { to: "/trade/activities", label: "Activities" },
    { to: "/trade/withdrawal", label: "Withdrawal" },
    { to: "/trade/statements", label: "Statements" },
    { to: "/agreements", label: "Agreements" },
    { to: "/identity", label: "Documents" },
    { to: "/account/settings", label: "Settings" },
  ],
  invest: [
    { to: "/invest/dashboard", label: "Dashboard" },
    { to: "/invest/portfolio", label: "Portfolio" },
    { to: "/invest/activities", label: "Activities" },
    { to: "/invest/funding", label: "Funding" },
  ],
  investDropDown: [
    { to: "/invest/withdrawal", label: "Withdrawal" },
    { to: "/invest/statements", label: "Statements" },
    { to: "/agreements", label: "Agreements" },
    { to: "/identity", label: "Documents" },
    { to: "/account/settings", label: "Settings" },
  ],
};

const RiskLevelsSubText = [
  "",
  "",
  "",
  "",
  "",
  "Semi-aggressive",
  "Aggressive",
  "Very Aggressive",
];

const disableProductSwitchRoutes: string[] = [
  "/",
  "/kyc/retake",
  "/kyc",
  "/account/opening",
  "/account/opening/retry",
  "/kyc/dashboard",
  "/account/starter/documents",
  "/account/submit/documents",
];

const ignoreForceNavigationRoutes: string[] = [
  "/",
  "/kyc/retake",
  "/kyc",
  "/account/opening",
  "/account/opening/retry",
  "/kyc/dashboard",
  "/account/starter/documents",
  "/account/submit/documents",
  "/support",
  "/activation",
];

export {
  history,
  endpoints,
  investEndpoints,
  tradeEndpoints,
  fundingEndpoints,
  fundingAbsoluteURL,
  withdrawalEndpoints,
  watchlistEndpoints,
  rewardsEndpoints,
  basketsEndpoints,
  routes,
  RiskLevelsSubText,
  strategiesEndPoints,
  disableProductSwitchRoutes,
  ignoreForceNavigationRoutes,
};
