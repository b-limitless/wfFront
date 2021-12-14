import { Dispatch } from 'redux';
import { apiAction } from 'trolly/store';
import { rewardsEndpoints } from 'config';
import {
  REWARDS_ADD_REFERRAL,
  REWARDS_GET_LIST_REFERRED_CLIENTS,
  REWARDS_GET_REFERRAL_LINK,
  REWARDS_GET_REFERRAL_PLAN,
  REWARDS_SET_LIST_REFERRED_CLIENTS,
  REWARDS_SET_REFERRAL_LINK,
  REWARDS_SET_REFERRAL_PLAN
} from '../store.types';

export const getReferralPlan = (prodType: String) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: REWARDS_GET_REFERRAL_PLAN,
      url: `${rewardsEndpoints.GET_REFERRAL_PLAN}/${prodType}`,
      method: 'GET',
      apiBase: 'WF',
      onSuccess: ({ data }) => ({
        type: REWARDS_SET_REFERRAL_PLAN,
        payload: data
      })
    })
  );
};

export const getListReferredClients = (prodType: String) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: REWARDS_GET_LIST_REFERRED_CLIENTS,
      url: `${rewardsEndpoints.GET_LIST_REFERRED_CLIENTS}/${prodType}`,
      method: 'GET',
      apiBase: 'WF',
      onSuccess: ({ data }) => ({
        type: REWARDS_SET_LIST_REFERRED_CLIENTS,
        payload: data
      })
    })
  );
};

export const addReferral = (data: any) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: REWARDS_ADD_REFERRAL,
      url: rewardsEndpoints.ADD_REFERRAL,
      method: 'POST',
      apiBase: 'WF',
      data,
      onSuccess: ({ data }) => ({
        type: '',
        payload: data
      })
    })
  );
};

export const getReferralLink = (prodType: String) => (dispatch: Dispatch) => {
  dispatch(
    apiAction({
      label: REWARDS_GET_REFERRAL_LINK,
      url: `${rewardsEndpoints.GET_REFERRAL_LINK}/${prodType}`,
      method: 'GET',
      apiBase: 'WF',
      onSuccess: ({ data }) => ({
        type: REWARDS_SET_REFERRAL_LINK,
        payload: data
      })
    })
  );
};
