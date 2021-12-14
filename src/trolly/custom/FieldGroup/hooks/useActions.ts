import { useCallback } from "react";
import { TResult } from "../FieldGroup.interface";

const useActionsReducer = (
  optionKey: string,
  valueKey: string,
  startupState?: TResult[],
  onChange?: (values: any[] | null) => void,
  isPercentage?: boolean
) => {
  let initialState = {} as any;
  if (startupState) {
    startupState.forEach((obj, index) => {
      initialState = { ...initialState, [index + 1]: obj };
    });
  } else {
    initialState = { 1: { [valueKey]: "", [optionKey]: "" } };
  }

  const onChangeHandler = useCallback(
    (state: any) => {
      const stateToCheck = Object.keys(state);
      let arrOfValues = [] as any;
      if (isPercentage) {
        let total = stateToCheck.reduce(
          (result, nextId) => result + Number(state[nextId][valueKey]),
          0
        );
        if (total === 100) {
          Object.keys(state).map((id) => arrOfValues.push(state[id]));
        }
      } else {
        Object.keys(state).map((id) => arrOfValues.push(state[id]));
      }
      if (onChange) {
        const updatedValues = arrOfValues.filter(
          (obj: TResult) => obj[valueKey]
        );
        onChange(updatedValues.length > 0 ? updatedValues : null);
      }
    },
    [onChange, isPercentage, valueKey]
  );

  const reducer = (state = initialState, { value, option, id, type }: any) => {
    let updatedState;
    switch (type) {
      case "SelectHandler":
        updatedState = {
          ...state,
          [id]: { ...state[id], [optionKey]: option },
        };
        onChangeHandler(updatedState);
        return updatedState;
      case "InputHandler":
        updatedState = {
          ...state,
          [id]: { ...state[id], [valueKey]: value },
        };
        onChangeHandler(updatedState);
        return updatedState;
      case "Increment":
        updatedState = { ...state, [id]: { [optionKey]: "", [valueKey]: "" } };
        onChangeHandler(updatedState);
        return updatedState;
      case "Decrement":
        delete state[id];
        let newState = {} as any;
        Object.keys(state).map(
          (id, index) => (newState[index + 1] = { ...state[id] })
        );
        onChangeHandler(newState);
        return newState;
      default:
        return state;
    }
  };
  return { initialState, reducer };
};

export default useActionsReducer;
