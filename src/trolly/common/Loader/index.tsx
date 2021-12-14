import React, { FC, useMemo } from "react";
import { CircularProgress, CircularProgressProps } from "@material-ui/core";
import { useLoaderStyles } from "./Loader.style";
import { Icon } from "@wf-org/trolly.icons";

const Loader: FC<CircularProgressProps & { withLogo?: boolean }> = ({
  variant = "indeterminate",
  disableShrink = true,
  withLogo,
  color,
  ...rest
}) => {
  const { top, circle, root, bottom, icon, iconWrapper, middleWrapper } =
    useLoaderStyles({ withLogo });

  const loaderSize = useMemo(() => (withLogo ? 75 : 50), [withLogo]);

  const CircularProgressMoving = useMemo(
    () => (
      <CircularProgress
        variant="indeterminate"
        disableShrink={disableShrink}
        className={top}
        size={loaderSize}
        color={color}
        classes={{
          circle: circle,
        }}
        {...rest}
      />
    ),
    [circle, disableShrink, color, top, rest, loaderSize]
  );

  const CircularProgressFixed = useMemo(
    () => (
      <CircularProgress
        variant="determinate"
        className={bottom}
        color="secondary"
        size={loaderSize}
        value={100}
        {...rest}
      />
    ),
    [bottom, rest, loaderSize]
  );
  if (withLogo) {
    return (
      <div className={root}>
        <div className={middleWrapper}>
          <div className={iconWrapper}>
            {CircularProgressFixed}
            <Icon
              iconName="LogoCircle"
              iconSize="CUSTOM"
              width="57px"
              height="57px"
              customColor={color}
              className={icon}
            />
          </div>
        </div>
        {CircularProgressMoving}
      </div>
    );
  }
  return (
    <div className={root}>
      {CircularProgressFixed}
      {CircularProgressMoving}
    </div>
  );
};

export default Loader;
