import React, { ReactElement } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grow from "@material-ui/core/Grow";
import { AlertWrapper, useGroupWrapper } from "./CheckboxGroup.style";
import { Checkbox, Alert } from "@wf-org/trolly.common";
import { IProps } from "./CheckboxGroup.interface";
import { IAnimationProps } from "../custom.interface";

const AnimationWrapper: React.FC<IAnimationProps> = ({
  animationTimeOutFixed = 0,
  withAnimation,
  children,
  index,
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
        {children as ReactElement}
      </Grow>
    );
  }
  return <>{children}</>;
};
const CheckboxGroup: React.FC<IProps> = ({
  error,
  errorMessage,
  onChangeValues,
  options = [],
  values = [],
  layout,
  withAnimation,
  animationTimeOut,
  ...rest
}) => {
  const { root } = useGroupWrapper({ layout });
  const singleCheckboxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const value = event.target.value;
    let updatedValues = [];
    if (checked) {
      updatedValues = [...values, value];
    } else {
      updatedValues = values.filter((single) => single !== value);
    }
    onChangeValues(updatedValues);
  };

  const renderCheckboxOption = () => {
    return options.map((option, index) => (
      <AnimationWrapper
        withAnimation={withAnimation}
        animationTimeOutFixed={animationTimeOut}
        index={index}
        key={`${option.id}`}
      >
        <Checkbox
          {...option}
          onChange={singleCheckboxChangeHandler}
          checked={values.includes(option.value)}
          {...rest}
        />
      </AnimationWrapper>
    ));
  };

  return (
    <FormControl component="fieldset" error={error} style={{ width: "100%" }}>
      {error && (
        <AlertWrapper>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </AlertWrapper>
      )}
      <FormGroup className={root}>{renderCheckboxOption()}</FormGroup>
    </FormControl>
  );
};

CheckboxGroup.defaultProps = {
  color: "primary",
  withAnimation: false,
  animationTimeOut: 100,
};
export default CheckboxGroup;
