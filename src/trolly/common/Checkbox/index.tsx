import React, { useMemo } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "../Tooltip";
import {
  useCheckBoxStyles,
  CheckboxWrapper,
  useFormControlLabelStyles,
} from "./Checkbox.style";
import { IProps } from "./Checkbox.interface";
import CheckboxComp from "@material-ui/core/Checkbox";
import { Icon } from "@wf-org/trolly.icons";
import useTheme from "@material-ui/core/styles/useTheme";

const Checkbox: React.FC<IProps> = (props) => {
  const {
    color,
    withTooltip,
    tooltipTitle,
    withArrow,
    wrapperStyle,
    label,
    checkboxSize,
    labelColor,
    margin,
    padding,
    fontSize,
    fontWeight,
    spacing,
    borderColor,
    width,
    height,
    style,
    alignItems,
    customColor,
    ...rest
  } = props;

  const theme = useTheme();

  const labelClasses = useFormControlLabelStyles({
    labelColor,
    fontSize,
    fontWeight,
    margin,
    padding,
    spacing,
    alignItems,
  });

  const classes = useCheckBoxStyles({
    color,
    width,
    height,
    checkboxSize,
    borderColor,
  });

  const checkboxColor = useMemo(() => {
    if (customColor === "danger") {
      return theme.palette.error.main;
    } else {
      return color;
    }
  }, [color, customColor, theme]);

  const [checkboxWidth, checkboxHeight] = useMemo(() => {
    switch (checkboxSize) {
      case "large":
        return ["40px", "40px"];
      case "medium":
        return ["30px", "30px"];
      case "custom":
        return [width, height];
      default:
        return ["25px", "25px"];
    }
  }, [checkboxSize, width, height]);

  const IconUnCheckedComponent = useMemo(() => {
    return (
      <Icon
        iconName="CheckboxUnchecked"
        width={checkboxWidth}
        height={checkboxHeight}
      />
    );
  }, [checkboxWidth, checkboxHeight]);

  const IconCheckedComponent = useMemo(() => {
    return (
      <Icon
        iconName="CheckboxChecked"
        customColor={checkboxColor}
        width={checkboxWidth}
        height={checkboxHeight}
      />
    );
  }, [checkboxWidth, checkboxHeight, checkboxColor]);

  const CheckboxComponent = (
    <CheckboxComp
      color={color}
      classes={classes}
      checkedIcon={IconCheckedComponent}
      icon={IconUnCheckedComponent}
      {...rest}
    />
  );

  const renderComponent = () => {
    if (label) {
      if (withTooltip) {
        return (
          <CheckboxWrapper style={{ ...wrapperStyle }}>
            <Tooltip
              arrow={withArrow}
              title={tooltipTitle}
              withHelpIcon={true}
              wrapperAlignment="flex-start"
              wrapperMargin="0px"
              isIconOnly={true}
            >
              <FormControlLabel
                control={CheckboxComponent}
                classes={labelClasses}
                label={label}
                style={style}
              />
            </Tooltip>
          </CheckboxWrapper>
        );
      }
      return (
        <FormControlLabel
          control={CheckboxComponent}
          classes={labelClasses}
          label={label}
          style={style}
        />
      );
    }
    if (withTooltip) {
      return (
        <CheckboxWrapper style={{ ...wrapperStyle }}>
          <Tooltip
            title={tooltipTitle}
            arrow={withArrow}
            withHelpIcon={true}
            wrapperAlignment="flex-start"
            wrapperMargin="0px"
            isIconOnly={true}
          >
            {CheckboxComponent}
          </Tooltip>
        </CheckboxWrapper>
      );
    }
    return CheckboxComponent;
  };

  return renderComponent();
};

Checkbox.defaultProps = {
  color: "primary",
  checkboxSize: "medium",
  withTooltip: false,
  wrapperStyle: {},
};

export default Checkbox;
