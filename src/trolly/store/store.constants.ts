import { getFromLocalStorage } from "./middleware/api.middleware.helper";

export const WF_TOKEN = getFromLocalStorage("wf_token") || "";
export const WF_EMAIL = getFromLocalStorage("wf_email") || "";
export const WF_APPID = getFromLocalStorage("wf_appId") || "A";
export const refId = getFromLocalStorage("wf_refId") || "";
export const WF_PLATFORM = getFromLocalStorage("wf_platform") || "";

export const INITIAL_STATE_API = {};
