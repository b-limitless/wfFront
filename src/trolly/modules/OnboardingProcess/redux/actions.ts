import {
  ONBOARDING_SET_ANSWERS,
  ONBOARDING_SET_QUESTION_INDEX,
  ONBOARDING_SET_OLD_ANSWERS,
  ONBOARDING_RESET_ANSWERS,
} from "./types";
import { IOnboardingState } from "../OnboardingProcess.interface";
import _ from "lodash";
import { Dispatch } from "redux";
import { appUtils } from "@wf-org/trolly.utils";

export const setFullAnswers = (oldAnswers: any) => ({
  type: ONBOARDING_SET_OLD_ANSWERS,
  payload: oldAnswers,
});

export const setAnswers = (value: any, keys?: string[]) => (
  dispatch: Dispatch,
  getState: () => IOnboardingState
) => {
  const {
    onBoardingAnswers: { answers = {} },
  } = getState();
  let finalObject = {};
  let formatedAnswer = value;
  /**
   * process to insert the array values
   */
  const currentAnswers = { ...answers };
  if (!keys || keys.length === 0) {
    finalObject = _.merge(currentAnswers, formatedAnswer);
  } else {
    finalObject = _.omit(currentAnswers, keys.join("."));
    if (typeof value === "boolean" || !appUtils.isEmpty(value)) {
      const formatedAnswer = appUtils.convertArrayOfKeysToObject(keys, value);
      finalObject = _.merge(finalObject, formatedAnswer);
    }
  }
  if (!_.isEqual(finalObject, answers)) {
    dispatch({
      type: ONBOARDING_SET_ANSWERS,
      payload: finalObject,
    });
  }
};

export const setQuestionIndex = (index: number) => (dispatch: Dispatch) => {
  dispatch({
    type: ONBOARDING_SET_QUESTION_INDEX,
    payload: index,
  });
};

export const resetAnswers = () => ({
  type: ONBOARDING_RESET_ANSWERS,
});
