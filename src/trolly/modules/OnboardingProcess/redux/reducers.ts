import {
  ONBOARDING_SET_ANSWERS,
  ONBOARDING_SET_QUESTION_INDEX,
  ONBOARDING_SET_OLD_ANSWERS,
  ONBOARDING_RESET_ANSWERS,
} from "./types";
import { IStoreAction } from "@wf-org/trolly.store";

export const INITIAL_STATE_ONBOARDING_ANSWERS = {
  answers: {},
  questionIndex: 1,
};
const onboardingReducer = (
  state = INITIAL_STATE_ONBOARDING_ANSWERS,
  { type, payload }: IStoreAction
) => {
  switch (type) {
    case ONBOARDING_SET_ANSWERS:
      return {
        ...state,
        answers: payload,
      };
    case ONBOARDING_SET_QUESTION_INDEX:
      return {
        ...state,
        questionIndex: payload,
      };
    case ONBOARDING_SET_OLD_ANSWERS:
      return {
        ...state,
        answers: payload,
      };
    case ONBOARDING_RESET_ANSWERS:
      return {
        ...state,
        answers: {},
        questionIndex: 1,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
