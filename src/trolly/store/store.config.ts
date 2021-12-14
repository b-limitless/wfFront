import { appUtils } from "@wf-org/trolly.utils";

export const API_CONFIG: { [key: string]: any } = {
  baseURL: {
    AF:
      process.env.NODE_ENV !== "development"
        ? "https://api.activfactor.com"
        : "http://api.activfactor.com",
    WF:
      process.env.NODE_ENV !== "development"
        ? "https://apis.wealthface.com"
        : "https://apis.wealthface.com",
    STRIPE:
      process.env.NODE_ENV !== "development"
        ? "https://apis.wealthface.com:8880/payment"
        : "http://localhost:5000/payment",
    DW: appUtils.isProd
      ? "https://bo-api.drivewealth.io/back-office"
      : "https://bo-api.drivewealth.io/back-office",
  },
  API_HEADERS_COMMON_CONFIG: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  DEFAULT_TOKEN_TYPE: "Bearer",
};
