import {
  refId,
  WF_APPID,
  WF_EMAIL,
  WF_PLATFORM,
  WF_TOKEN,
} from "../store.constants";
import { IAuthState, IStoreAction } from "../store.interface";
import {
  AUTH_LOGIN,
  AUTH_SET_AF_TOKEN,
  AUTH_UPDATE_APP_ID,
  KYC_OBJ_UPDATE,
} from "../store.types";

const INITIAL_STATE = {
  // handle it from here because in auth
  // the appId for factorinvesting is B and cannot be changed due to backend restriction
  // here we need to set C to B to get secondary theme object
  appId: WF_APPID,
  token: WF_TOKEN,
  email: WF_EMAIL,
  refId: refId,
  platform: WF_PLATFORM,
} as IAuthState;
const authReducer = (
  state = INITIAL_STATE,
  { type, payload }: IStoreAction
) => {
  switch (type) {
    case AUTH_LOGIN:
      let isVerified = false;
      const { user } = payload;
      if (user) {
        const { verified } = user || {};
        isVerified = verified;
      }
      return {
        ...state,
        data: payload,
        isAuthenticated: true,
        isVerified,
      };
    case KYC_OBJ_UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          kycObj: payload,
        },
      } as IAuthState;
    case AUTH_UPDATE_APP_ID:
      return {
        ...state,
        appId: payload,
      };
    case AUTH_SET_AF_TOKEN:
      return {
        ...state,
        afData: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
