import _ from "lodash";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { appUtils, validators } from "@wf-org/trolly.utils";
import { Efields, TField, TValidation } from "../OnboardingProcess.interface";
import useStateValue from "./useStateValue";

/**
 *
 * @returns validateInputs, validateFields, setRegisteredFields, registeredFields
 */
const useValidationErrors = (
  errors: { [key: string]: boolean },
  setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>
): [
  (
    value: string,
    validation: TValidation | undefined,
    id: string,
    type?: Efields
  ) => void,
  (shouldRegisterErrors?: boolean) => boolean,
  Dispatch<SetStateAction<TField[]>>,
  TField[]
] => {
  /**
   * register fields to have full control on what is rendered
   */
  const [registeredFields, setRegisteredFields] = useState<TField[]>([]);

  const { getValue } = useStateValue();

  // responsible to check the age of the date
  const isDateLimitInvalid = useCallback(
    (value: any, maxDate: number, minDate: number) => {
      if (value) {
        let formatedDate = value;
        if (value.birthYear) {
          formatedDate = new Date(
            value.birthYear,
            value.birthMonth - 1,
            value.birthDay
          );
        }
        const exactAgeByDate = appUtils.getAgeFromDate(formatedDate);
        if (
          isNaN(exactAgeByDate) ||
          exactAgeByDate < minDate ||
          exactAgeByDate > maxDate
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    []
  );

  /**
   * validate maximum and minimum
   */
  const isLimitInvalid = (value: any, validation: TValidation) => {
    const {
      min = 0,
      max = Number.MAX_VALUE,
      minChars = 0,
      maxChars = 500,
    } = validation;
    let inValid = false;
    if (value.length < minChars || value.length > maxChars) {
      inValid = true;
    } else if (!isNaN(value) && (+value < min || +value > max)) {
      inValid = true;
    }
    return inValid;
  };

  /**
   * validate inputs and set errors
   */
  const validateInputs = useCallback(
    (
      value: any,
      validation: TValidation | undefined,
      id: string,
      type?: Efields
    ) => {
      let inValid = false;
      /**
       * @description if validation is exist
       */
      if (validation) {
        const {
          validator,
          isRequired,
          minDate = 0,
          maxDate = 100,
        } = validation;
        let validatorRegex: RegExp | undefined;
        /**
         * @description if validator is date
         */
        if (isRequired) {
          if (typeof value === "undefined" || value === "") {
            inValid = true;
          } else if (type === "text") {
            if (isLimitInvalid(value, validation)) {
              inValid = true;
            }
          }
        }
        if (validator === "date") {
          if (typeof value === "string" && !validators.isDate(value)) {
            inValid = true;
          } else {
            if (appUtils.isObjectAndEmpty(value)) {
              inValid = true;
            }
          }
          if (isDateLimitInvalid(value, maxDate, minDate)) {
            inValid = true;
          }
        } else if (validator) {
          /**
           * @description if validator string or condition is exist
           */
          if (typeof validator === "string") {
            validatorRegex = validators.regEx[validator];
          } else {
            const { keys, as, isRoot } = validator;
            const existingValue = getValue({ keys }, isRoot);
            if (existingValue) {
              validatorRegex = validators.regEx[as[existingValue]];
            }
          }
          if (validatorRegex && !validatorRegex.test(value)) {
            inValid = true;
          }
        }
        if (!isRequired && typeof value !== "undefined") {
          if (type === "text") {
            if (isLimitInvalid(value, validation)) {
              inValid = true;
            }
          }
        }
      }
      setErrors((oldErrors) => ({ ...oldErrors, [id]: inValid }));
    },
    [getValue, setErrors, isDateLimitInvalid]
  );

  /**
   * function to check if the registered values is required and has value and to
   * check the validations based on the provided validators
   * the validator is working on non phone value for now
   */
  const validateFields = useCallback(
    (shouldRegisterErrors?: boolean) => {
      let updatedErrors = { ...errors };
      const instantFieldsHasError = registeredFields.map((field: TField) => {
        const {
          validation = {},
          keys,
          phoneCodeKeys,
          phoneNumberKeys,
          checkedValue,
        } = field;
        const {
          isRequired,
          validator,
          minDate = 0,
          maxDate = 100,
        } = validation;
        let validationRule: RegExp | undefined;
        let inValid = false;
        const value = getValue({ keys });
        if (isRequired) {
          // if the value is required
          /**
           * validate non phone values
           */
          if (keys) {
            if (typeof value === "undefined" || value === "") {
              inValid = true;
            } else if (
              // check the limit only if the field is text
              field.type === "text"
            ) {
              if (isLimitInvalid(value, validation)) {
                inValid = true;
              }
            } else if (!_.matches(checkedValue)(value)) {
              // check values inside the object
              inValid = true;
            }
          }
          /**
           * validate phone values
           */
          if (phoneCodeKeys) {
            const value = getValue({ keys: phoneCodeKeys });
            if (!value) {
              inValid = true;
            }
          }
          if (phoneNumberKeys) {
            const value = getValue({ keys: phoneNumberKeys });
            if (!value) {
              inValid = true;
            }
          }
        }
        if (validator) {
          /**
           * @description - validator is string to get the regex from predefined rules
           */
          const value = getValue({ keys });
          if (typeof validator === "string") {
            /**
             * validator of date check date without regular expressions to cover other formats
             * check if the date limit is passed  (max age and min age) if available default will be 0 - 100
             * */
            if (validator === "date") {
              if (typeof value === "string" && !validators.isDate(value)) {
                inValid = true;
              } else {
                if (appUtils.isObjectAndEmpty(value)) {
                  inValid = true;
                }
              }
              if (isDateLimitInvalid(value, maxDate, minDate)) {
                inValid = true;
              }
            }
            validationRule = validators.regEx[validator];
          } else {
            /**
             * @description , validation has a conditions and based on the value stored
             * we get the string validator to get the regex from predefined rules
             */
            const { keys, as, isRoot } = validator;
            const existingValue = getValue({ keys }, isRoot);
            if (existingValue) {
              validationRule = validators.regEx[as[existingValue]];
            }
          }
          if (validationRule && !validationRule.test(value)) {
            inValid = true;
          }
        }
        // if the field is not required , and is text , check the limit if there is value
        if (!isRequired && value) {
          if (field.type === "text") {
            if (isLimitInvalid(value, validation)) {
              inValid = true;
            }
          }
        }
        updatedErrors = { ...updatedErrors, [field.id]: inValid };
        return !inValid;
      });
      if (shouldRegisterErrors) {
        setErrors((oldErrors) => ({
          ...oldErrors,
          ...updatedErrors,
        }));
      }
      return instantFieldsHasError.filter((error) => !error).length === 0;
    },
    [getValue, registeredFields, errors, setErrors, isDateLimitInvalid]
  );

  return [
    validateInputs,
    validateFields,
    setRegisteredFields,
    registeredFields,
  ];
};

export default useValidationErrors;
