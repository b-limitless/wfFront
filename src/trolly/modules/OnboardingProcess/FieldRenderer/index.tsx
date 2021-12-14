import React, { useCallback, useMemo, useEffect } from "react";
import Grow from "@material-ui/core/Grow";
import {
  Text,
  Box,
  Link,
  FileUpload,
  Camera,
  Alert,
  Checkbox,
  TSelectOption,
  DatePicker,
  Select,
  Input,
} from "@wf-org/trolly.common";
import {
  PhoneInput,
  RadioGroup,
  CheckboxGroup,
  FieldGroup,
} from "@wf-org/trolly.custom";
import { IAnimation } from "../OnboardingProcess.interface";
import { IFieldRendererProps } from "./FieldRenderer.interface";
import { getProps } from "./utils";
import { useTheme } from "@material-ui/core/styles";
import useChange from "../hooks/useChange";
import useDateHandler from "../hooks/useDateHandler";
import usePhoneHandler from "../hooks/usePhoneHandler";
import _ from "lodash";

const AnimationWrapper: React.FC<IAnimation> = ({
  animationTimeOutFixed = 500,
  withAnimation,
  index = 1,
  children,
}) => {
  if (withAnimation) {
    return (
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(withAnimation
          ? { timeout: (index + 1) * animationTimeOutFixed }
          : {})}
      >
        {children}
      </Grow>
    );
  }
  return <>{children}</>;
};

const FieldRenderer: React.FC<IFieldRendererProps> = ({
  field,
  value,
  phoneValue,
  codeValue,
  animationIndex,
  options,
  onChange,
  theme,
  errors,
  setErrors,
  setOtherValues,
}) => {
  const { onChangeHandler, setOtherValuesHandler } = useChange({
    field,
    errors,
    setErrors,
    onChange,
    setOtherValues,
  });
  const [onChangeDateHandler, date] = useDateHandler(
    field,
    value,
    onChangeHandler
  );
  const [onChangePhoneHandler] = usePhoneHandler(field, onChangeHandler);

  /**
   * REPONSIBLE TO SET OTHER VALUES AT THE RENDER TIME
   */
  // set other values on render time if the onChange was not fire -
  // in case we click next without changing values (other values is acting like default values)
  useEffect(() => {
    const { otherValues } = field;
    if (otherValues) {
      const { conditions, values } = otherValues;
      if (
        conditions &&
        Array.isArray(conditions) &&
        conditions.length > 0 &&
        values &&
        Array.isArray(values) &&
        values.length > 0
      ) {
        setOtherValuesHandler(otherValues);
      }
    }
    // eslint-disable-next-line
  }, []);

  const {
    type,
    inputProps,
    withAnimation,
    animationTimeOut,
    title,
    checkedValue,
  } = field || {};

  /**
   * checkbox checked property
   */
  const checked = useMemo(() => {
    if (checkedValue) {
      return _.matches(checkedValue)(value);
    }
    return value === true;
  }, [value, checkedValue]);
  //==============================//

  /**
   * onLink click Handler
   */
  const onLinkClick = useCallback(() => {
    const { linkValue } = field;
    onChangeHandler(linkValue);
  }, [field, onChangeHandler]);

  //==============================//

  /**
   * value of the searchable list
   */
  const searchableListValue = useMemo(() => {
    const { type } = field;
    if ((type === "searchableList" || type === "select") && value && options) {
      const selectedOption: TSelectOption =
        options.filter(
          (option: TSelectOption) =>
            option.value === value ||
            option.label.toLowerCase() === value.toLowerCase() ||
            option.iso2 === value
        )[0] || {};
      if (selectedOption && type === "searchableList") {
        return selectedOption;
      } else if (selectedOption && type === "select") {
        return selectedOption.value;
      }
    }
    return null;
  }, [field, options, value]);
  //==============================//

  const { palette } = useTheme();

  const { text, props: titleProps } = title || {};

  const { label, fontColor } = inputProps || {};

  // get initial props for each component from renderer utils
  const props = getProps({
    error: errors[field.id],
    inputProps,
    value,
    type,
    id: field.id,
  });

  const renderInput = useCallback(() => {
    switch (type) {
      case "checkbox":
        return (
          <Checkbox
            color={theme}
            onChange={onChangeHandler}
            checked={checked}
            {...props}
          />
        );
      case "radioGroup":
        return (
          <RadioGroup
            name="onboarding-radio-group"
            layout="layout_1"
            options={options}
            color={theme}
            padding="15px 15px"
            shouldPassOption={true}
            labelColor={palette.grey[300]}
            onChangeValue={onChangeHandler}
            {...props}
          />
        );
      case "text":
        return (
          <Input
            color={theme}
            autoComplete="off"
            onChange={onChangeHandler}
            variant="filled"
            {...props}
          />
        );
      case "checkboxGroup":
        return (
          <CheckboxGroup
            layout="layout_1"
            name="checkbox-group"
            options={options}
            color={theme}
            padding="15px 25px"
            labelColor={palette.grey[300]}
            onChangeValues={onChangeHandler}
            {...props}
          />
        );
      case "title":
        return (
          <Text
            color={
              fontColor
                ? fontColor
                : theme === "primary"
                ? "primary.main"
                : "secondary.main"
            }
            {...props}
          >
            {label}
          </Text>
        );
      case "select":
        return (
          <Select
            variant="native"
            options={options}
            color={theme}
            onNativeChange={onChangeHandler}
            {...props}
          />
        );
      case "searchableList":
        return (
          <Select
            variant="default"
            fullWidth={true}
            options={options}
            color={theme}
            onChange={onChangeHandler}
            value={searchableListValue}
            noCloseIcon
            {...props}
          />
        );
      case "date":
        return (
          <DatePicker
            openTo="year"
            views={["year", "month", "date"]}
            onChange={onChangeDateHandler}
            value={date}
            color={theme}
            inputVariant="filled"
            {...props}
          />
        );
      case "link":
        return (
          <Link onClick={onLinkClick} color={theme} {...props}>
            {props.label}
          </Link>
        );
      case "phone":
        return (
          <PhoneInput
            options={options}
            onChange={onChangePhoneHandler}
            phone={phoneValue}
            code={codeValue}
            color={theme}
            {...props}
          />
        );
      case "file":
        return (
          <FileUpload
            round
            color={theme}
            onFileChange={onChangeHandler}
            {...props}
          />
        );
      case "camera":
        return (
          <Camera
            onImageChange={onChangeHandler}
            color={theme}
            maxWidth="216px"
            selectedImageWidth="60px"
            selectedImageHeight="50px"
            withCloseIcon
            {...props}
          />
        );
      case "fieldGroup":
        return (
          <FieldGroup
            color={theme}
            options={options}
            onChange={onChangeHandler}
            {...props}
          />
        );
      case "alert":
        return (
          <Alert {...props} type="text">
            {props.label}
          </Alert>
        );
      default:
        return;
    }
  }, [
    codeValue,
    props,
    date,
    fontColor,
    label,
    onChangeHandler,
    onChangeDateHandler,
    onChangePhoneHandler,
    onLinkClick,
    palette,
    theme,
    options,
    phoneValue,
    type,
    searchableListValue,
    checked,
  ]);
  return (
    <AnimationWrapper
      withAnimation={withAnimation}
      animationTimeOutFixed={animationTimeOut}
      index={animationIndex}
    >
      <Box>
        {text && (
          <Text
            marginBottom="8px"
            fontSize="16px"
            color="text.primary"
            {...titleProps}
          >
            {text}
          </Text>
        )}
        {renderInput()}
      </Box>
    </AnimationWrapper>
  );
};

FieldRenderer.defaultProps = {
  options: [],
};

export default FieldRenderer;
