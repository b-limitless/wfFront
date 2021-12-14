import React, { FC, useMemo } from "react";
import { IProps } from "./Button.interface";
import MuiButton from "@material-ui/core/Button";
import {
  useButtonStyles,
  CustomMuiDangerButton,
  CustomMuiWhiteButton,
  useWrapperStyle,
} from "./Button.style";
import LinearProgress from "@material-ui/core/LinearProgress";
import Loader from "../Loader";
import clsx from "clsx";

const Button: FC<IProps> = (props) => {
  const {
    children,
    isLoading,
    color,
    disableShrink,
    round,
    loaderVariant = "linear",
    disabled,
    loaderWithLogo = false,
    wrapperClassName,
    customVariant,
    ...rest
  } = props;
  const { root: buttonRootClass, loading: loadingClass } =
    useButtonStyles(props);
  const { root, loader } = useWrapperStyle(props);
  const loaderColor = useMemo(
    () => (color === "secondary" ? "secondary" : "primary"),
    [color]
  );

  if (isLoading && loaderVariant === "circular") {
    return (
      <Loader
        disableShrink={disableShrink}
        color={loaderColor}
        withLogo={loaderWithLogo}
      />
    );
  }
  if (loaderVariant === "linear") {
    if (!!customVariant) {
      return (
        <div className={`${root} ${wrapperClassName}`}>
          {isLoading && (
            <LinearProgress
              variant="indeterminate"
              {...(customVariant === "white"
                ? { color: loaderColor }
                : { className: loader })}
            />
          )}
          {customVariant === "danger" ? (
            <CustomMuiDangerButton
              disabled={disabled || isLoading}
              classes={{ root: buttonRootClass }}
              color={color}
              {...rest}
              className={clsx(
                rest.className || "",
                isLoading ? loadingClass : ""
              )}
            >
              {children}
            </CustomMuiDangerButton>
          ) : (
            <CustomMuiWhiteButton
              disabled={disabled || isLoading}
              classes={{ root: buttonRootClass }}
              color={color}
              {...rest}
              className={clsx(
                rest.className || "",
                isLoading ? loadingClass : ""
              )}
            >
              {children}
            </CustomMuiWhiteButton>
          )}
        </div>
      );
    }
    return (
      <div className={`${root} ${wrapperClassName}`}>
        {isLoading && (
          <LinearProgress variant="indeterminate" color={loaderColor} />
        )}
        <MuiButton
          disabled={disabled || isLoading}
          classes={{ root: buttonRootClass }}
          color={color}
          {...rest}
          className={clsx(rest.className || "", isLoading ? loadingClass : "")}
        >
          {children}
        </MuiButton>
      </div>
    );
  } else if (!!customVariant) {
    return (
      <>
        {customVariant === "danger" ? (
          <CustomMuiDangerButton
            disabled={disabled || isLoading}
            classes={{ root: buttonRootClass }}
            color={color}
            {...rest}
          >
            {children}
          </CustomMuiDangerButton>
        ) : (
          <CustomMuiWhiteButton
            disabled={disabled || isLoading}
            classes={{ root: buttonRootClass }}
            color={color}
            {...rest}
          >
            {children}
          </CustomMuiWhiteButton>
        )}
      </>
    );
  }
  return (
    <MuiButton
      disabled={disabled || isLoading}
      classes={{ root: buttonRootClass }}
      color={color}
      {...rest}
      className={clsx(rest.className || "", isLoading ? loadingClass : "")}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
