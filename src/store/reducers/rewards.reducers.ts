import { IStoreAction } from "trolly/store";
import {
  REWARDS_SET_LIST_REFERRED_CLIENTS,
  REWARDS_SET_REFERRAL_LINK,
  REWARDS_SET_REFERRAL_PLAN,
} from "../store.types";

interface IThreshold {
  toFund: number;
  currency: string;
}
interface IReward {
  value: number;
  currency: string;
}

interface IReferralPlan {
  threshold: IThreshold;
  reward: IReward;
}

export interface IListReferredClients {
  email: string;
  accStatus: string;
  stars: number;
  isAccountFunded2000: boolean;
  isAccountOpened: boolean;
}

export interface IRewardsState {
  listReferredClients: IListReferredClients[];
  referralPlan: IReferralPlan;
  referralLink: string;
}

const INITIAL_STATE = {};

const rewardsReducer = (state = INITIAL_STATE, action: IStoreAction) => {
  switch (action.type) {
    case REWARDS_SET_LIST_REFERRED_CLIENTS:
      return {
        ...state,
        listReferredClients: action.payload,
      };
    case REWARDS_SET_REFERRAL_PLAN:
      return {
        ...state,
        referralPlan: action.payload,
      };
    case REWARDS_SET_REFERRAL_LINK:
      return {
        ...state,
        referralLink: action.payload.link,
      };

    default:
      return state;
  }
};

export default rewardsReducer;
