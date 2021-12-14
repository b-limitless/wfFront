import { useSelector } from "react-redux";
import { IOnboardingState } from "../OnboardingProcess.interface";
import _ from "lodash";
import { Efields } from "../OnboardingProcess.interface";
import { useCallback } from "react";

const useStateValue = () => {
  const state = useSelector((state: IOnboardingState) => state);
  const getValue = useCallback(
    ({ keys, type }: { keys?: string[]; type?: Efields }, isRoot?: boolean) => {
      if (keys && keys.length > 0) {
        const {
          onBoardingAnswers: { answers },
        } = state;
        const value = _.get(isRoot ? state : answers, keys.join("."));
        if (typeof value === "undefined" && type === "checkbox") {
          return [];
        }
        return value;
      }
    },
    [state]
  );
  return { getValue };
};

export default useStateValue;
