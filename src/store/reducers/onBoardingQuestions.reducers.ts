import { TAnswerOption, TQuestion } from "trolly/modules";
import { IStoreAction } from "trolly/store";
import {
  PROCESS_RESET_QUESTIONS,
  PROCESS_SET_CONFIG,
  PROCESS_SET_QUESTIONS,
} from "../store.types";

export type EProcessTypes = "kyc" | "acountOpening" | "documents";

export interface TConfig {
  options: {
    [key: string]: TAnswerOption[];
  };
  [key: string]: any;
}
export interface IOnBoardingQuestionsState {
  questions?: TQuestion[];
  config?: TConfig;
}

const onBoardingProcessReducer = (
  state: IOnBoardingQuestionsState = {},
  action: IStoreAction
) => {
  switch (action.type) {
    case PROCESS_SET_CONFIG:
      return {
        ...state,
        config: action.payload,
      };
    case PROCESS_SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case PROCESS_RESET_QUESTIONS:
      return {
        ...state,
        questions: [],
        config: {},
      };
    default:
      return state;
  }
};

export default onBoardingProcessReducer;
