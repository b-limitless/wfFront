import React, {
  useState,
  FC,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import { Link, Box, Text } from "@wf-org/trolly.common";
import { IFieldGroupProps } from "./FieldGroup.interface";
import Field from "./FieldGroup";
import { validators } from "@wf-org/trolly.utils";
import useActionsReducer from "./hooks/useActions";

const FieldGroup: FC<IFieldGroupProps> = (props) => {
  const {
    conditions,
    color,
    addButtonLabel,
    removeButtonLabel,
    values,
    spacing,
    error,
    errorMessage,
    onChange,
    optionKey,
    valueKey,
    ...rest
  } = props;

  const [optionAttr, valueAttr] = useMemo(
    () => [optionKey || "option", valueKey || "value"],
    [optionKey, valueKey]
  );
  const { isPercentage, max = 20, min = 1 } = conditions || {};
  const { initialState, reducer } = useActionsReducer(
    optionAttr,
    valueAttr,
    values,
    onChange,
    isPercentage
  );
  const [numOfFields, setNumOfFields] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [internalError, setInternalError] = useState("");

  const message = useMemo(() => {
    if (error && errorMessage) {
      return errorMessage;
    } else if (internalError) {
      return internalError;
    }
  }, [error, errorMessage, internalError]);

  useEffect(() => {
    if (values) {
      setNumOfFields(values.length);
    }
  }, [values, numOfFields]);

  const IncreaseNumberOfSources = () => {
    const newFieldsNum = numOfFields + 1;
    if (newFieldsNum <= max) {
      setInternalError("");
      dispatch({ type: "Increment", id: newFieldsNum });
      setNumOfFields(newFieldsNum);
    } else {
      setInternalError(`You cannot add more than ${max} fields`);
    }
  };

  const DecreaseNumberOfSources = () => {
    const newFieldsNum = numOfFields - 1;
    if (newFieldsNum >= min) {
      setInternalError("");
      dispatch({ type: "Decrement", id: numOfFields });
      setNumOfFields(newFieldsNum);
    } else {
      setInternalError(
        `You cannot have less than ${min} ${min === 1 ? "field" : "fields"}`
      );
    }
  };

  const numberOfInputs = useMemo(
    () => Array.from({ length: numOfFields }, (el, i) => i + 1),
    [numOfFields]
  );

  const onSelectHandler = useCallback(
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalError("");
      dispatch({ type: "SelectHandler", id, option: e.target.value });
    },
    []
  );

  const onInputHandler = useCallback(
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value = "" } = e.target;
      if (isPercentage) {
        if (validators.regEx.number.test(value) || value === "") {
          const InputsArr = Object.keys(state);
          let total;
          if (InputsArr.length === 1) {
            total = +value;
          } else {
            const stateToCheck = Object.keys(state).filter(
              (item) => +item !== id
            );
            total = stateToCheck.reduce(
              (result, nextId) => result + Number(state[nextId][valueAttr]),
              0
            );
            total = total + Number(value);
          }
          if (total <= 100) {
            setInternalError("");
            dispatch({ type: "InputHandler", id, value });
          } else {
            setInternalError("Your group of fields must have 100%");
          }
        }
      } else {
        dispatch({ type: "InputHandler", id, value });
        setInternalError("");
      }
    },
    [state, isPercentage, valueAttr]
  );

  const fieldsToRender = useMemo(() => {
    if (numberOfInputs && state) {
      return numberOfInputs.map((item, index) => {
        const optionValue = state[item][optionAttr];
        const inputValiue = state[item][valueAttr];
        return (
          <Box marginBottom={spacing} key={`${index}-${item}`}>
            <Field
              onChangeInput={onInputHandler(item)}
              onChangeSelect={onSelectHandler(item)}
              selectValue={optionValue}
              inputValue={inputValiue}
              spacing={spacing}
              color={color}
              {...rest}
            />
          </Box>
        );
      });
    }
    return null;
  }, [
    numberOfInputs,
    state,
    onInputHandler,
    onSelectHandler,
    rest,
    spacing,
    color,
    optionAttr,
    valueAttr,
  ]);

  return (
    <Box>
      {message && (
        <Box marginY="10px">
          <Text
            textAlign="left"
            fontWeight={600}
            fontStyle="underline"
            color="error.main"
          >
            {message}
          </Text>
        </Box>
      )}
      {fieldsToRender}
      <Box
        marginTop={spacing}
        display="flex"
        flexDirection={["column", "row", "row", "row"]}
        justifyContent={[
          "flex-start",
          "space-between",
          "space-between",
          "space-between",
        ]}
      >
        {addButtonLabel && (
          <Link
            fontSize={rest.fontSize}
            fontWeight={rest.fontWeight}
            onClick={IncreaseNumberOfSources}
            color={color}
          >
            {addButtonLabel}
          </Link>
        )}
        {removeButtonLabel && (
          <Link
            fontSize={rest.fontSize}
            fontWeight={rest.fontWeight}
            onClick={DecreaseNumberOfSources}
            color="danger"
          >
            {removeButtonLabel}
          </Link>
        )}
      </Box>
    </Box>
  );
};

FieldGroup.defaultProps = {
  addButtonLabel: "Add +",
  removeButtonLabel: "Delete",
  fontSize: "16px",
  fontWeight: 500,
};

export default FieldGroup;
