import React, { ReactElement } from "react";
import FormControl from "@material-ui/core/FormControl";
import Grow from "@material-ui/core/Grow";
import {
  useLabelStyles,
  useRadioStyles,
  useRadioGroup,
  AlertWrapper,
} from "./RadioGroup.style";
import { Icon } from "@wf-org/trolly.icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Alert } from "@wf-org/trolly.common";
import { IAnimationProps } from "../custom.interface";
import { IProps } from "./RadioGroup.interface";

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
const RadiosGroup: React.FC<IProps> = ({
  name,
  value,
  error,
  errorMessage,
  onChangeValue,
  labelColor,
  borderColor,
  width,
  height,
  fontSize,
  radioSize,
  options = [],
  spacing,
  layout,
  padding,
  margin,
  fontWeight,
  shouldPassOption,
  withAnimation,
  animationTimeOut,
  color,
  ...rest
}) => {
  const radioClasses = useRadioStyles({
    borderColor,
    radioSize,
    width,
    height,
  });
  const radioGroupClasses = useRadioGroup({ layout });
  const labelClasses = useLabelStyles({
    margin,
    padding,
    spacing,
    fontSize,
    fontWeight,
    labelColor,
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (shouldPassOption) {
      const selectedOption = options.filter(
        (option) => option.value === value || `${option.value}` === value
      )[0];
      onChangeValue(selectedOption);
    } else {
      onChangeValue(value);
    }
  };

  const renderRadioOptions = () => {
    return options.map((option, index) => (
      <AnimationWrapper
        withAnimation={withAnimation}
        animationTimeOutFixed={animationTimeOut}
        index={index}
        key={`${option.id}-${index}`}
      >
        <FormControlLabel
          {...option}
          classes={labelClasses}
          control={
            <Radio
              classes={radioClasses}
              icon={<Icon iconName="RadioUnchecked" />}
              checkedIcon={<Icon iconName="RadioChecked" customColor={color} />}
              {...rest}
            />
          }
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
      <RadioGroup
        classes={radioGroupClasses}
        value={value}
        onChange={onChange}
        defaultValue=""
      >
        {renderRadioOptions()}
      </RadioGroup>
    </FormControl>
  );
};

RadiosGroup.defaultProps = {
  color: "primary",
  withAnimation: false,
  animationTimeOut: 100,
  fontSize: "20px",
};
export default RadiosGroup;
