import {
  setAnswers,
  setQuestionIndex,
  resetAnswers,
  setFullAnswers as setOldAnswers,
} from "./OnboardingProcess/redux/actions";

export { default as OnboardingProcess } from "./OnboardingProcess";
export { default as OnboardingAnswersReducers } from "./OnboardingProcess/redux/reducers";
export type {
  Efields,
  IAnimation,
  IOnboarding,
  IOnboardingProps,
  IOnboardingState,
  TAnswerOption,
  TConfig,
  TField,
  THint,
  TInputProps,
  TQuestion,
  TQuestionBoxContent,
  TQuestionData,
  TStyle,
  TTextType,
  TValidation,
  TValidatorByCondition,
  TCondition,
} from "./OnboardingProcess/OnboardingProcess.interface";
export { setAnswers, setQuestionIndex, setOldAnswers, resetAnswers };
