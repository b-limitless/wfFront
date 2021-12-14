import { setAnswers, setQuestionIndex } from "../redux/actions";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IOnboardingState,
  TAnswerOption,
  TCondition,
  TField,
  TOtherValue,
  TQuestion,
  TQuestionData,
} from "../OnboardingProcess.interface";
import useStateValue from "./useStateValue";
import { TPhoneOption } from "@wf-org/trolly.custom";
import { TSelectOption } from "@wf-org/trolly.common";
/**
 *
 * @param questions
 * @returns selectedQuestion, questionIndex, totalQuestions, onNextHandler, onBackHandler, validateConditions, clearReleventData, lastAction
 * @description this hook is responsible for select the question based on the current index or ,start from 1
 * onNext if no handler was passed , onBack if no handler was passed , assign the default values
 */
const useQuestion = (
  questions: TQuestion[],
  options: {
    [key: string]: TAnswerOption[] | TPhoneOption[] | TSelectOption[];
  },
  registeredFields: TField[],
  setRegisteredFields: Dispatch<SetStateAction<TField[]>>,
  setLastAction: Dispatch<SetStateAction<"next" | "back" | undefined>>,
  onSkip?: (answers: any) => void
): [
  TQuestion,
  number,
  number,
  () => void,
  () => void,
  () => void,
  (otherValues: TOtherValue, changedValue?: any) => void,
  (conditions: TCondition[] | undefined) => boolean,
  (data: TQuestionData[] | TQuestionData) => void,
  boolean
] => {
  const [isDefaultSet, setIsDefaultSet] = useState<boolean>(false);
  const { questionIndex, answers } = useSelector(
    (state: IOnboardingState) => state.onBoardingAnswers
  );

  const { getValue } = useStateValue();

  // TODO: make sure to set the current question index from the returned paylaod
  const dispatch = useDispatch();
  const [selectedQuestion, currentQuestionIndex, totalQuestions] =
    useMemo(() => {
      setIsDefaultSet(false);
      let selectedQuestion = {} as TQuestion;
      if (questions && questions.length > 0) {
        selectedQuestion =
          questions.filter((question) => question.index === questionIndex)[0] ||
          {};
        setIsDefaultSet(true);
      }
      if (!questionIndex) {
        dispatch(setQuestionIndex(questionIndex));
        setIsDefaultSet(true);
      }
      return [
        selectedQuestion,
        questionIndex,
        questions ? questions.length : 0,
      ];
    }, [questionIndex, questions, dispatch]);

  const setDefaultValue = useCallback(
    ({
      value,
      keysOfDefaultValue,
      keys,
      isRoot,
      isPhoneCode,
      phoneCodeOptions,
    }: {
      value: any;
      keysOfDefaultValue?: string[];
      keys?: string[];
      isRoot?: boolean;
      isPhoneCode?: boolean;
      phoneCodeOptions?: TPhoneOption[];
    }) => {
      const existingValue = getValue({ keys });
      // check the type of the existing value is undefined , as (0 , false) could be a value set by the user
      // we didn't check the type as undefined ,as getValue is returning string type with empty string by lodash
      if (typeof existingValue === "undefined" && keys) {
        if (value) {
          dispatch(setAnswers(value, keys));
        } else if (keysOfDefaultValue) {
          const valueToInsert = getValue({ keys: keysOfDefaultValue }, isRoot);
          // if isPhoneCode , then we need to make sure that the phone code is fetched properly from phone code options
          // get the default value first which should bee a country here and then fetch the country value from the phone code options
          if (isPhoneCode && phoneCodeOptions && phoneCodeOptions.length > 0) {
            const allCountriesOptions = options["countries"] as TSelectOption[];
            const countryOption = allCountriesOptions.find(
              (option: TSelectOption) =>
                (option.label || "").toLowerCase() ===
                (valueToInsert || "").toLowerCase()
            );
            if (countryOption) {
              const codeValue = phoneCodeOptions.find(
                (option: TPhoneOption) => option.value === countryOption.value
              );
              if (codeValue) {
                dispatch(setAnswers(codeValue.value, keys));
              }
            }
          } else if (!isPhoneCode) {
            dispatch(setAnswers(valueToInsert, keys));
          }
        }
      }
    },
    [dispatch, getValue, options]
  );

  useEffect(() => {
    if (selectedQuestion) {
      /**
       * set the default values
       */
      const { data } = selectedQuestion;
      if (data) {
        data.forEach(({ content }) => {
          content.forEach(({ fields }) => {
            fields.forEach((field) => {
              const {
                defaultValue,
                keys,
                phoneCodeKeys,
                phoneNumberKeys,
                conditions,
              } = field;
              if (defaultValue) {
                const {
                  keys: keysOfDefaultValue,
                  phoneCodeKeys: phoneCodeKeysOfDefaultValue,
                  phoneNumberKeys: phoneNumberKeysOfDefaultValue,
                  value,
                  phoneValue,
                  codeValue,
                  isRoot,
                } = defaultValue;
                // responsible to set the default values of non phone fields (either static value of existing value in the state)
                if (
                  (value || keysOfDefaultValue) &&
                  validateConditions(conditions)
                ) {
                  setDefaultValue({ value, keysOfDefaultValue, keys, isRoot });
                }
                // responsible to set the default values of phone fields (either static value of existing value in the state)
                // for phone number and code
                if (
                  (phoneValue || phoneNumberKeysOfDefaultValue) &&
                  validateConditions(conditions)
                ) {
                  setDefaultValue({
                    value: phoneValue,
                    keysOfDefaultValue: phoneNumberKeysOfDefaultValue,
                    keys: phoneNumberKeys,
                    isRoot,
                  });
                }
                if (
                  (codeValue || phoneCodeKeysOfDefaultValue) &&
                  validateConditions(conditions)
                ) {
                  setDefaultValue({
                    value: codeValue,
                    keysOfDefaultValue: phoneCodeKeysOfDefaultValue,
                    keys: phoneCodeKeys,
                    isRoot,
                    isPhoneCode: true,
                    phoneCodeOptions: (options[field.optionsKey || ""] ||
                      []) as TPhoneOption[],
                  });
                }
              }
            });
          });
        });
      }
      setIsDefaultSet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedQuestion]);

  /**
   * @description go to next question if no handler was passed
   */
  const onNextHandler = useCallback(() => {
    setLastAction("next");
    if (questionIndex + 1 <= totalQuestions) {
      dispatch(setQuestionIndex(questionIndex + 1));
    }
  }, [dispatch, questionIndex, totalQuestions, setLastAction]);

  /**
   * @description go to previous question if no handler was passed
   */
  const onBackHandler = useCallback(() => {
    setLastAction("back");
    if (questionIndex - 1 >= 1) {
      dispatch(setQuestionIndex(questionIndex - 1));
    }
  }, [dispatch, questionIndex, setLastAction]);

  /**
   * @param conditions
   * @param changedValue (to validate the conditions based on the passed value not from the store directly)
   * @description responsible for getting conditions validations
   * @description the changed value passed here to avoid any latency in extracting the value from the store during the field change
   * due to a lot of validations been triggered on triggering the change event
   */
  const validateConditions = useCallback(
    (conditions: TCondition[] | undefined, changedValue?: any) => {
      let isValid = true;
      if (conditions) {
        const shouldRenderConditions = [] as boolean[];
        conditions.forEach((condition) => {
          const { keys: conditionsKeys, operator, values, isRoot } = condition;
          const existingValue = changedValue
            ? changedValue
            : getValue({ keys: conditionsKeys }, isRoot);
          if (operator === "equal") {
            if (values.indexOf(existingValue) > -1) {
              shouldRenderConditions.push(true);
            } else {
              shouldRenderConditions.push(false);
            }
          } else {
            if (values.indexOf(existingValue) < 0) {
              shouldRenderConditions.push(true);
            } else {
              shouldRenderConditions.push(false);
            }
          }
        });
        isValid =
          shouldRenderConditions.filter((condition) => !condition).length === 0;
      }
      return isValid;
    },
    [getValue]
  );

  /**
   *  Set other values (that is not part of any field)
   *  changedValue could be passed to this function when field value trigger the onChangeHandler
   *  then on every change event on the field level this function will be triggered with changedValue Parameter
   *  but if the changedValue was not passed then then we should know that this function is triggered once on the render time of the question
   *  ---------------------------------------------------------------------------------------------------------
   *  NOTE: IF WE DIDN"T RECIEVE changedValue THEN WE SHOULD KNOW THAT THE FUNCTION IS TRIGGERED ON THE RENDER TIME
   */
  // ================================================================================//
  const setOtherValues = useCallback(
    (otherValues: TOtherValue, changedValue?: any) => {
      if (otherValues) {
        const { conditions, values, onFailure } = otherValues;
        const { clearOnChange = false, clearOnRender = false } =
          onFailure || {};
        if (conditions && Array.isArray(conditions) && conditions.length > 0) {
          const isConditionsPassed = validateConditions(
            conditions,
            changedValue
          );
          if (values && Array.isArray(values) && values.length > 0) {
            values.forEach(({ keys, value }) => {
              const existingValue = changedValue
                ? changedValue
                : getValue({ keys }, false);
              if (isConditionsPassed) {
                let valueToSet = value;
                if (value.keys) {
                  const { keys: detaulsValueKeys, isRoot: defaultValueIsRoot } =
                    value;
                  valueToSet = getValue(
                    { keys: detaulsValueKeys },
                    defaultValueIsRoot
                  );
                }
                dispatch(setAnswers(valueToSet, keys));
              } else {
                if (typeof existingValue !== "undefined") {
                  // means the function triggered on the render time (one time trigger)
                  if (
                    (!changedValue && clearOnRender) ||
                    (changedValue && clearOnChange)
                  ) {
                    // if the clearOnRender been passed and the trigger happened on
                    // the first render of the question then clear the value if the condition was not passed
                    // ------------------------------------------------------
                    // or if the clearOnChange been passed and he trigger happened on the
                    // field change event then clear the value if the condition was not passed
                    dispatch(setAnswers("", keys));
                  }
                }
              }
            });
          }
        }
      }
    },
    [dispatch, getValue, validateConditions]
  );
  // ================================================================================//

  /**
   * Responsible to clear box relevant data inside a page
   */
  const clearCardReleventData = useCallback(
    async (card: TQuestionData) => {
      const { content } = card;
      content.forEach((box) => {
        const { fields } = box;
        if (fields) {
          fields.forEach((field) => {
            if (field) {
              const { keys, id, shouldNotClearOnConditions, otherValues } =
                field;
              const isFieldRegistered =
                registeredFields.filter((existField) => existField.id === id)
                  .length > 0;
              if (isFieldRegistered) {
                setRegisteredFields((oldState) =>
                  oldState.filter((field) => field.id !== id)
                );
              }
              // user can set should not clear on conditions on the field level
              // to prevent clearing the value if the conditions was not passed
              if (keys && keys.length > 0 && !shouldNotClearOnConditions) {
                dispatch(setAnswers("", keys));
              }
              // if the condition was not passed then clear the other value that was set on the question enter level
              if (otherValues && otherValues.values) {
                const { values } = otherValues;
                if (values.length > 0) {
                  values.forEach((otherValue) => {
                    const { keys } = otherValue;
                    if (keys && keys.length > 0) {
                      dispatch(setAnswers("", keys));
                    }
                  });
                }
              }
            }
          });
        }
      });
    },
    [dispatch, setRegisteredFields, registeredFields]
  );

  /**
   * @param data
   * @description responsible to clear the (page) data from state if conditions was not passed
   */
  const clearReleventData = useCallback(
    async (data?: TQuestionData[] | TQuestionData) => {
      if (data) {
        if (Array.isArray(data)) {
          data.forEach(async (card) => {
            await clearCardReleventData(card);
          });
        } else {
          await clearCardReleventData(data);
        }
      }
    },
    [clearCardReleventData]
  );

  /**
   * @description skip the step even if it doesn't pass the validations
   * clear the question answers from the state - TODO: check with management if should clear the relevent data or not
   */
  const onSkipHandler = useCallback(async () => {
    setLastAction("next");
    if (questionIndex + 1 <= totalQuestions) {
      const currentQuestion = selectedQuestion;
      const { skip } = currentQuestion;
      const { shouldNotClearData } = skip || {};
      if (!shouldNotClearData) {
        clearReleventData(currentQuestion.data);
      }
      dispatch(setQuestionIndex(questionIndex + 1));
    } else {
      const currentQuestion = selectedQuestion;
      const { skip } = currentQuestion;
      const { shouldNotClearData } = skip || {};
      if (!shouldNotClearData) {
        await clearReleventData(currentQuestion.data);
      }
      if (onSkip) {
        onSkip(answers);
      }
    }
  }, [
    setLastAction,
    selectedQuestion,
    clearReleventData,
    dispatch,
    questionIndex,
    totalQuestions,
    onSkip,
    answers,
  ]);

  return [
    selectedQuestion,
    currentQuestionIndex,
    totalQuestions,
    onNextHandler,
    onBackHandler,
    onSkipHandler,
    setOtherValues,
    validateConditions,
    clearReleventData,
    isDefaultSet,
  ];
};

export default useQuestion;
