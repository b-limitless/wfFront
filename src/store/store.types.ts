/**
 * Process
 */
export const PROCESS_GET_DATA = "PROCESS_GET_DATA";
export const PROCESS_SET_QUESTIONS = "PROCESS_SET_QUESTIONS";
export const PROCESS_SET_CONFIG = "PROCESS_SET_CONFIG";
export const PROCESS_RESET_QUESTIONS = "PROCESS_RESET_QUESTIONS";

/**
 * KYC and account opening
 */
export const KYC_SET_OBJ = "KYC_SET_OBJ";
export const KYC_CHANGE_RISK_LEVEL = "KYC_CHANGE_RISK_LEVEL";
export const KYC_GET_ACCOUNT_OPENING = "KYC_GET_ACCOUNT_OPENING";
export const KYC_SET_ACCOUNT_OPENING = "KYC_SET_ACCOUNT_OPENING";

/**
 * general
 */
export const GENERAL_GET_DATA = "GENERAL_GET_DATA";
export const GENERAL_SET_DATA = "GENERAL_SET_DATA";
export const GENERAL_SET_COUNTRIES = "GENERAL_SET_COUNTRIES";
export const GENERAL_SET_ACCOUNT_OPENING = "GENERAL_SET_ACCOUNT_OPENING";
export const GENERAL_UPDATE_USER_PROFILE = "GENERAL_UPDATE_USER_PROFILE";
export const GENERAL_ACTIVATE_PRODUCT = "GENERAL_ACTIVATE_PRODUCT";
export const GENERAL_MAKE_PRODUCT_ACTIVE = "GENERAL_MAKE_PRODUCT_ACTIVE";

/**
 * Invest
 */
export const INVEST_GET_ALGO_COMB = "INVEST_GET_ALGO_COMB";
export const INVEST_SET_ALGO_COMB = "INVEST_SET_ALGO_COMB";
export const INVEST_CLEAR_ALGO_COMB = "INVEST_CLEAR_ALGO_COMB";
export const INVEST_GET_PERFORMANCE_INFO = "INVEST_GET_PERFORMANCE_INFO";
export const INVEST_SET_PERFORMANCE_INFO = "INVEST_SET_PERFORMANCE_INFO";
export const INVEST_GET_ACCOUNT_ACTIVITY = "INVEST_GET_ACCOUNT_ACTIVITY";
export const INVEST_SET_ACCOUNT_ACTIVITY = "INVEST_SET_ACCOUNT_ACTIVITY";
export const INVEST_GET_ACCOUNT_STATEMENT = "INVEST_GET_ACCOUNT_STATEMENT";
export const INVEST_SET_ACCOUNT_STATEMENT = "INVEST_SET_ACCOUNT_STATEMENT";
export const INVEST_GET_STATEMENT_FILE = "INVEST_GET_STATEMENT_FILE";
export const INVEST_GET_ACCOUNT_INFO = "INVEST_GET_ACCOUNT_INFO";
export const INVEST_SET_ACCOUNT_INFO = "INVEST_SET_ACCOUNT_INFO";
export const INVEST_GET_USER_ALLOCATION = "INVEST_GET_USER_ALLOCATION";
export const INVEST_SET_USER_ALLOCATION = "INVEST_SET_USER_ALLOCATION";
export const INVEST_GET_PORTFOLIO_PERFORMANCE =
  "INVEST_GET_PORTFOLIO_PERFORMANCE";
export const INVEST_SET_PORTFOLIO_PERFORMANCE =
  "INVEST_SET_PORTFOLIO_PERFORMANCE";

/**
 * Trade
 */
export const TRADE_GET_INSTRUREMENTS_LIST = "TRADE_GET_INSTRUREMENTS_LIST";
export const TRADE_SET_INSTRUMENTS_LIST = "TRADE_SET_INSTRUMENTS_LIST";
export const TRADE_GET_INSTRUMENTS_LIST_WF = "TRADE_GET_INSTRUMENTS_LIST_WF";
export const TRADE_SET_INSTRUMENTS_LIST_WF = "TRADE_SET_INSTRUMENTS_LIST_WF";
export const TRADE_GET_INSTRUMENTS_LIST_AF = "TRADE_GET_INSTRUMENTS_LIST_AF";
export const TRADE_SET_INSTRUMENTS_LIST_AF = "TRADE_SET_INSTRUMENTS_LIST_AF";
export const TRADE_GET_INSTRUMENT_DETAILS = "TRADE_GET_INSTRUMENT_DETAILS";
export const TRADE_SET_INSTRUMENT_DETAILS = "TRADE_SET_INSTRUMENT_DETAILS";
export const TRADE_GET_ACCOUNT_SUMMARY = "TRADE_GET_ACCOUNT_SUMMARY";
export const TRADE_SET_ACCOUNT_SUMMARY = "TRADE_SET_ACCOUNT_SUMMARY";
export const TRADE_GET_ACCOUNT_CASH_SUMMARY = "TRADE_GET_ACCOUNT_CASH_SUMMARY";
export const TRADE_SET_ACCOUNT_CASH_SUMMARY = "TRADE_SET_ACCOUNT_CASH_SUMMARY";
export const TRADE_GET_ACCOUNT_PERFORMANCE = "TRADE_GET_ACCOUNT_PERFORMANCE";
export const TRADE_SET_ACCOUNT_PERFORMANCE = "TRADE_SET_ACCOUNT_PERFORMANCE";
export const TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE =
  "TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE";
export const TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE =
  "TRADE_SET_CONSIDOLIDATED_QUOTE_LIVE";
export const TRADE_GET_CONSOLIDATED_QUOTE = "TRADE_GET_CONSOLIDATED_QUOTE";
export const TRADE_SET_CONSOLIDATED_QUOTE = "TRADE_SET_CONSOLIDATED_QUOTE";
export const TRADE_GET_INSTRUMENT_FUNDAMENTAL =
  "TRADE_GET_INSTRUMENT_FUNDAMENTAL";
export const TRADE_SET_INSTRUMENT_FUNDAMENTAL =
  "TRADE_SET_INSTRUMENT_FUNDAMENTAL";
export const TRADE_GET_INSTRUMENT_CHART_DATA =
  "TRADE_GET_INSTRUMENT_CHART_DATA";
export const TRADE_SET_INSTRUMENT_CHART_DATA =
  "TRADE_SET_INSTRUMENT_CHART_DATA";
export const TRADE_POST_ORDER = "TRADE_POST_ORDER";
export const TRADE_CANCEL_ORDER = "TRADE_CANCEL_ORDER";
export const TRADE_GET_ACCOUNT_ACTIVITY = "TRADE_GET_ACCOUNT_ACTIVITY";
export const TRADE_SET_ACCOUNT_ACTIVITY = "TRADE_SET_ACCOUNT_ACTIVITY";
export const TRADE_SET_ACCOUNT_STATEMENTS = "TRADE_SET_ACCOUNT_STATEMENTS";
export const TRADE_GET_ACCOUNT_STATEMENTS = "TRADE_GET_ACCOUNT_STATEMENTS";
export const TRADE_GET_STATEMENT_FILE = "TRADE_GET_STATEMENT_FILE";
export const TRADE_GET_WATCHLIST_DASHBOARD = "TRADE_GET_WATCHLIST_DASHBOARD";
export const TRADE_SET_WATCHLIST_DASHBOARD = "TRADE_SET_WATCHLIST_DASHBOARD";

/**
 * Funding
 */
export const FUNDING_GET_FUNDING_OPTIONS_COUNTRIES =
  "FUNDING_GET_FUNDING_OPTIONS_COUNTRIES";
export const FUNDING_SET_FUNDING_OPTIONS_COUNTRIES =
  "FUNDING_SET_FUNDING_OPTIONS_COUNTRIES";
export const FUNDING_SET_FUNDING_OPTIONS = "FUNDING_SET_FUNDING_OPTIONS";
export const FUNDING_GET_PAYMENT_INITIALIZE = "FUNDING_GET_PAYMENT_INITIALIZE";
export const FUNDING_GET_EXCHANGE_RATE = "FUNDING_GET_EXCHANGE_RATE";
export const FUNDING_SET_EXCHANGE_RATE = "FUNDING_SET_EXCHANGE_RATE";
export const FUNDING_SET_TRANSFER_STEPS = "FUNDING_SET_TRANSFER_STEPS";
export const FUNDING_GET_BANK_LIST = "FUNDING_GET_BANK_LIST";
export const FUNDING_SET_BANK_LIST = "FUNDING_SET_BANK_LIST";
export const FUNDING_GET_BANK_ACCOUNT = "FUNDING_GET_BANK_ACCOUNT";
export const FUNDING_SET_FUNDING_URL = "FUNDING_SET_FUNDING_URL";
/**
 * Funding Page
 */
export const FUNDING_PAGE_HOME = "FUNDING_PAGE_HOME";
export const FUNDING_PAGE_NAVIGATION_BACK = "FUNDING_PAGE_NAVIGATION_BACK";
export const FUNDING_PAGE_RESET = "FUNDING_PAGE_RESET";
export const FUNDING_PAGE_OTHER_OPTIONS = "FUNDING_PAGE_OTHER_OPTIONS";
export const FUNDING_PAGE_AMOUNT_SUBMITTED = "FUNDING_PAGE_AMOUNT_SUBMITTED";
export const FUNDING_PAGE_BANK_SUBMITTING = "FUNDING_PAGE_BANK_SUBMITTING";
export const FUNDING_PAGE_BANK_SUBMITTED = "FUNDING_PAGE_BANK_SUBMITTED";
export const FUNDING_PAGE_TRANSACTION_SUBMITTING =
  "FUNDING_PAGE_TRANSACTION_SUBMITTED";
export const FUNDING_PAGE_TRANSACTION_SUBMITTED =
  "FUNDING_PAGE_TRANSACTION_SUBMITTED";
export const FUNDING_TRANSFER_PROCESS_STATUS =
  "FUNDING_TRANSFER_PROCESS_STATUS";
export const LOCAL_TRANSFER = "LOCAL_TRANSFER";
export const WIRE_TRANSFER = "WIRE_TRANSFER";

export const WITHDRAWAL_SAVE_REQUEST = "WITHDRAWAL_SAVE_REQUEST";
export const WITHDRAWAL_SAVE_REQUEST_COMPLETED =
  "WITHDRAWAL_SAVE_REQUEST_COMPLETED";

/**
 * Watchlists
 */
export const WATCHLISTS_SET_PAGE = "WATCHLISTS_SET_PAGE";
export const WATCHLISTS_RESET_PAGE = "WATCHLISTS_RESET_PAGE";
export const WATCHLISTS_NAVIGATE_BACK = "WATCHLISTS_NAVIGATE_BACK";
export const WATCHLISTS_ARCHIVE = "WATCHLISTS_ARCHIVE";
export const WATCHLISTS_DETAIL = "WATCHLISTS_DETAIL";
export const WATCHLIST_GET_WATCHLISTS = "WATCHLIST_GET_WATCHLISTS";
export const WATCHLIST_SET_WATCHLISTS = "WATCHLIST_SET_WATCHLISTS";
export const WATCHLIST_CREATE_WATCHLIST = "WATCHLIST_CREATE_WATCHLIST";
export const WATCHLIST_CREATED = "WATCHLIST_CREATED";
export const WATCHLIST_EDITED = "WATCHLIST_EDITED";
export const WATCHLIST_DELETE_WATCHLIST = "WATCHLIST_DELETE_WATCHLIST";
export const WATCHLIST_DELETED = "WATCHLIST_DELETED";
export const WATCHLIST_ADD_TICKER = "WATCHLIST_ADD_TICKER";
export const WATCHLIST_ADD_TICKER_DONE = "WATCHLIST_ADD_TICKER_DONE";
export const WATCHLIST_ADD_TICKER_TO_WATCHLIST =
  "WATCHLIST_ADD_TICKER_TO_WATCHLIST";
export const WATCHLIST_TICKER_ADDED_TO_WATCHLIST =
  "WATCHLIST_TICKER_ADDED_TO_WATCHLIST";
export const WATCHLIST_DELETE_TICKER = "WATCHLIST_DELETE_TICKER";
export const WATCHLIST_DELETE_TICKER_DONE = "WATCHLIST_DELETE_TICKER_DONE";
export const WATCHLIST_GET_QUOTES_DEFAULT = "WATCHLIST_GET_QUOTES_DEFAULT";
export const WATCHLIST_SET_QUOTES_DEFAULT = "WATCHLIST_SET_QUOTES_DEFAULT";
export const WATCHLIST_DELETE_QUOTES_DEFAULT =
  "WATCHLIST_DELETE_QUOTES_DEFAULT";

/**
 * Rewards
 */
export const REWARDS_GET_LIST_REFERRED_CLIENTS =
  "REWARDS_GET_LIST_REFERRED_CLIENTS";
export const REWARDS_SET_LIST_REFERRED_CLIENTS =
  "REWARDS_SET_LIST_REFERRED_CLIENTS";
export const REWARDS_GET_REFERRAL_PLAN = "REWARDS_GET_REFERRAL_PLAN";
export const REWARDS_SET_REFERRAL_PLAN = "REWARDS_SET_REFERRAL_PLAN";
export const REWARDS_ADD_REFERRAL = "REWARDS_ADD_REFERRAL";
export const REWARDS_GET_REFERRAL_LINK = "REWARDS_GET_REFERRAL_LINK";
export const REWARDS_SET_REFERRAL_LINK = "REWARDS_SET_REFERRAL_LINK";

/**
 * Baskets
 */
export const BASKETS_SET_PAGE = "BASKETS_SET_PAGE";
export const BASKETS_ARCHIVE_PAGE = "BASKETS_ARCHIVE_PAGE";
export const BASKETS_DETAIL_PAGE = "BASKETS_DETAIL_PAGE";
export const BASKETS_GET_BASKETS = "BASKETS_GET_BASKETS";
export const BASKETS_SET_BASKETS = "BASKETS_SET_BASKETS";
export const BASKETS_NAVIGATE = "BASKETS_NAVIGATE";
export const BASKETS_NAVIGATE_HOME = "BASKETS_NAVIGATE_HOME";
export const BASKETS_CREATE_BASKET = "BASKETS_CREATE_BASKET";
export const BASKETS_CREATED = "BASKETS_CREATED";
export const BASKETS_CREATE_BASKET_FROM_TICKER =
  "BASKETS_CREATE_BASKET_FROM_TICKER";
export const BASKETS_CREATED_FROM_TICKER = "BASKETS_CREATED_FROM_TICKER";
export const BASKETS_EDITED = "BASKETS_EDITED";
export const BASKETS_DELETE_BASKET = "BASKETS_DELETE_BASKET";
export const BASKETS_DELETED = "BASKETS_DELETED";
export const BASKETS_ADD_TICKER_TO_BASKET = "BASKETS_ADD_TICKER_TO_BASKET";
export const BASKETS_TICKER_ADDED_TO_BASKET = "BASKETS_TICKER_ADDED_TO_BASKET";
export const BASKETS_DELETE_TICKER = "BASKETS_DELETE_TICKER";
export const BASKETS_TICKER_DELETED = "BASKETS_TICKER_DELETED";
export const BASKETS_EDIT_TICKERS = "BASKETS_EDIT_TICKERS";
export const BASKETS_TICKERS_EDITED = "BASKETS_TICKERS_EDITED";
export const BASKETS_SET_TICKERS_EDIT_MODE = "BASKETS_SET_TICKERS_EDIT_MODE";
export const BASKETS_SET_TOTAL_WEIGHT = "BASKETS_SET_TOTAL_WEIGHT";
export const BASKETS_GET_BASKET_QUOTES = "BASKETS_GET_BASKET_QUOTES";
export const BASKETS_SET_BASKET_QUOTES = "BASKETS_SET_BASKET_QUOTES";
export const BASKETS_GET_REBALANCE_QUOTES = "BASKETS_GET_REBALANCE_QUOTES";
export const BASKETS_SET_REBALANCE_QUOTES = "BASKETS_SET_REBALANCE_QUOTES";
export const BASKETS_SET_REBALANCE_QUOTES_STATE =
  "BASKETS_SET_REBALANCE_QUOTES_STATE";
export const BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE =
  "BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE";
export const BASKETS_UPDATE_ORDER_SUBMIT_STATUS =
  "BASKETS_UPDATE_ORDER_SUBMIT_STATUS";
export const BASKETS_POST_ORDER = "BASKETS_POST_ORDER";
export const BASKETS_SET_SUBMIT_DATA = "BASKETS_SET_SUBMIT_DATA";

/**
 * Strategies
 */
export const STRATEGIES_GET_STRATEGIES_LIST = "STRATEGIES_GET_STRATEGIES_LIST";
export const STRATEGIES_SET_STRATEGIES_LIST = "STRATEGIES_SET_STRATEGIES_LIST";
export const STRATEGIES_GET_STRATEGY_DETAILS =
  "STRATEGIES_GET_STRATEGY_DETAILS";
export const STRATEGIES_SET_STRATEGY_DETAILS =
  "STRATEGIES_SET_STRATEGY_DETAILS";
export const STRATEGIES_GET_DESCRIPTIONS = "STRATEGIES_GET_DESCRIPTIONS";
export const STRATEGIES_SET_DESCRIPTIONS = "STRATEGIES_SET_DESCRIPTIONS";
export const STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS =
  "STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS";
export const STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS =
  "STRATEGIES_SET_STRATEGY_DETAILS_WITH_MEMBERS";
export const STRATEGIES_SAVE_STRATEGY = "STRATEGIES_SAVE_STRATEGY";
export const STRATEGIES_GET_USER_STRATEGIES = "STRATEGIES_GET_USER_STRATEGIES";
export const STRATEGIES_SET_USER_STRATEGIES = "STRATEGIES_SET_USER_STRATEGIES";
export const STRATEGIES_DELETE_USER_STRATEGY =
  "STRATEGIES_DELETE_USER_STRATEGY";
export const STRATEGIES_DELETED_USER_STRATEGY =
  "STRATEGIES_DELETED_USER_STRATEGY";
// TODO to be removed once we replaced with proper subscription module
export const STRATEGIES_SUBSCRIBE = "STRATEGIES_SUBSCRIBE";
