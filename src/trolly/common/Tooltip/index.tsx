import React, { useMemo } from "react";
import { StyledToolTip, Wrapper, useHelpIconStyles } from "./Tooltip.style";
import HelpIcon from "@material-ui/icons/Help";
import { IProps } from "./Tooltip.interface";

const Tooltip: React.FC<IProps> = ({
  children,
  title,
  arrow,
  placement,
  withHelpIcon,
  iconPlacement,
  wrapperAlignment,
  wrapperMargin,
  wrapperWidth,
  isIconOnly,
  color,
  iconSize,
  width,
  height,
  icon,
}) => {
  const iconClasses = useHelpIconStyles({
    iconPlacement,
    color,
    iconSize,
    width,
    height,
  });
  const iconComponent = useMemo(() => {
    if (icon) {
      return React.cloneElement(icon, { classes: iconClasses });
    }
    return <HelpIcon classes={iconClasses} />;
  }, [icon, iconClasses]);

  if (withHelpIcon) {
    if (isIconOnly) {
      if (iconPlacement === "start") {
        return (
          <Wrapper
            justifyContent={wrapperAlignment}
            margin={wrapperMargin}
            width={wrapperWidth}
          >
            <StyledToolTip title={title} arrow={arrow} placement={placement}>
              {iconComponent}
            </StyledToolTip>
            {children}
          </Wrapper>
        );
      } else if (iconPlacement === "end") {
        return (
          <Wrapper
            justifyContent={wrapperAlignment}
            margin={wrapperMargin}
            width={wrapperWidth}
          >
            {children}
            <StyledToolTip title={title} arrow={arrow} placement={placement}>
              {iconComponent}
            </StyledToolTip>
          </Wrapper>
        );
      }
    }
    return (
      <StyledToolTip title={title} arrow={arrow} placement={placement}>
        {iconPlacement === "end" ? (
          <Wrapper
            justifyContent={wrapperAlignment}
            margin={wrapperMargin}
            width={wrapperWidth}
          >
            {children}
            {iconComponent}
          </Wrapper>
        ) : (
          <Wrapper
            justifyContent={wrapperAlignment}
            margin={wrapperMargin}
            width={wrapperWidth}
          >
            {iconComponent}
            {children}
          </Wrapper>
        )}
      </StyledToolTip>
    );
  }
  return (
    <StyledToolTip title={title} arrow={arrow} placement={placement}>
      {children}
    </StyledToolTip>
  );
};

Tooltip.defaultProps = {
  placement: "bottom",
  iconPlacement: "end",
  wrapperAlignment: "center",
  wrapperMargin: "auto",
};

export default Tooltip;