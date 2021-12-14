import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TField, TOtherValue } from "../OnboardingProcess.interface";
import { setAnswers } from "../redux/actions";
import useValidationErrors from "./useValidationErrors";
import { appUtils, validators } from "@wf-org/trolly.utils";

interface IOnChangeHookProps {
  field: TField;
  errors: { [key: string]: boolean };
  setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  onChange?: (option: any, keys?: string[]) => void;
  setOtherValues?: (otherValues: TOtherValue, changedValue?: any) => void;
}

const useChange = (options: IOnChangeHookProps) => {
  const { errors, field, setErrors, onChange, setOtherValues } = options;
  const [validateInputs, ,] = useValidationErrors(errors, setErrors);
  const dispatch = useDispatch();
  /**
   * Handle set other values for the question on render time at once and on change value
   */

  const setOtherValuesHandler = useCallback(
    (otherValues?: TOtherValue, changedValue?: any) => {
      // /**
      //  *
      // set other values based on conditions (supposed to be on question level , but has been moved to field level
      // valueToInsert been passed to set other values to check the value that need to be checked with on validating the conditions
      // due to redundant checkers on the render time
      //  */
      if (otherValues) {
        const { conditions, values } = otherValues;
        if (
          conditions &&
          Array.isArray(conditions) &&
          conditions.length > 0 &&
          values &&
          Array.isArray(values) &&
          values.length > 0 &&
          setOtherValues
        ) {
          setOtherValues(otherValues, changedValue);
        }
      }
    },
    [setOtherValues]
  );
  /**
   * handle the change of all the input fields
   */
  const onChangeHandler = useCallback(
    /**
     * option here is represent the onChange value from the single component
     * could be object , event or string value
     */
    (...args: any) => {
      const {
        type,
        keys,
        validation,
        id,
        changeHandlerType,
        phoneCodeKeys,
        phoneNumberKeys,
        checkedValue,
        unCheckedValue,
      } = field;
      let valueToInsert = "" as any;
      let phoneNumberToInsert = "" as any;
      let phoneCodeToInsert = "" as any;
      switch (type) {
        case "text":
          const [textEvent] = args;
          const { value } = textEvent.target;
          if (!value.trim()) {
            valueToInsert = value.trim();
          } else {
            valueToInsert = value;
          }
          break;
        case "radioGroup":
          const [radioGroupOption] = args;
          valueToInsert = radioGroupOption.value;
          break;
        case "checkboxGroup":
          const [checkboxGroupOption] = args;
          valueToInsert = checkboxGroupOption;
          break;
        case "select":
          const [selectEvent] = args;
          valueToInsert = selectEvent.target.value;
          break;
        case "searchableList":
          const [, second] = args;
          valueToInsert = second ? second.value : "";
          break;
        case "checkbox":
          const [, checked] = args;
          if (checkedValue && unCheckedValue) {
            if (checked) {
              valueToInsert = checkedValue;
            } else {
              valueToInsert = unCheckedValue;
            }
          } else {
            valueToInsert = checked;
          }
          break;
        case "date":
          const [fullDate, formatedDate] = args;
          if (changeHandlerType === "custom") {
            let dateToInsert: any;
            // if date is value
            if (validators.isDate(fullDate)) {
              dateToInsert = {
                birthDay: fullDate.getDate(),
                birthMonth: fullDate.getMonth() + 1,
                birthYear: fullDate.getFullYear(),
              };
            } else {
              dateToInsert = {
                birthDay: "",
                birthMonth: "",
                birthYear: "",
              };
            }
            valueToInsert = dateToInsert;
          } else {
            valueToInsert = formatedDate;
          }
          break;
        case "link":
          const [linkValue] = args;
          valueToInsert = linkValue;
          break;
        case "phone":
          const [fullPhoneObj] = args;
          const { phone, code } = fullPhoneObj;
          phoneNumberToInsert = phone;
          phoneCodeToInsert = code;
          break;
        case "file":
          const [file] = args;
          valueToInsert = file;
          break;
        case "camera":
          const [image] = args;
          valueToInsert = image;
          break;
        case "fieldGroup":
          const [values] = args;
          valueToInsert = values;
          break;
        default:
          break;
      }

      /**
       * on Change we need to reset the error state first then check the validation again
       */
      setErrors((oldErrors) => ({ ...oldErrors, [id]: false }));
      if (type === "phone" && phoneNumberKeys && phoneCodeKeys) {
        validateInputs(phoneNumberToInsert, validation, id, field.type);
        validateInputs(phoneCodeToInsert, validation, id, field.type);
        dispatch(setAnswers(phoneNumberToInsert, phoneNumberKeys));
        dispatch(setAnswers(phoneCodeToInsert, phoneCodeKeys));
      } else {
        // validation will take care of type of field
        validateInputs(valueToInsert, validation, id, field.type);
        // if the value to insert is object then , set each value separetly
        if (appUtils.isObject(valueToInsert)) {
          Object.keys(valueToInsert).forEach((key) => {
            dispatch(setAnswers(valueToInsert[key], [...(keys || []), key]));
          });
        } else {
          // only set one time if the value to insert is anything except object
          dispatch(setAnswers(valueToInsert, keys));
          if (onChange) {
            onChange(args, keys);
          }
        }
      }

      const { otherValues } = field;
      setOtherValuesHandler(otherValues, valueToInsert);
    },
    [
      dispatch,
      validateInputs,
      field,
      setErrors,
      onChange,
      setOtherValuesHandler,
    ]
  );
  return { onChangeHandler, setOtherValuesHandler };
};

export default useChange;
