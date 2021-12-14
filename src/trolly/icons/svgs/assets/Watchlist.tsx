import useTheme from "@material-ui/core/styles/useTheme";
import React, { FC, useMemo } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const Watchlist: FC<IProps> = ({
  customColor,
  color,
  width,
  height,
  viewBox,
  ...rest
}) => {
  const theme = useTheme();
  const colorByTheme = useMemo(
    () =>
      color === "primary"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    [color, theme]
  );
  return (
    <Icon
      viewBox={viewBox}
      width={width}
      height={height}
      {...rest}
      customColor="transparent"
    >
      <path
        d="M30.6861 11.8188C31.4067 12.8399 31.4067 14.2183 30.6861 15.2378C28.4165 18.4476 22.971 25.0566 16.6135 25.0566C10.256 25.0566 4.81058 18.4476 2.5409 15.2378C2.19031 14.7489 2 14.1474 2 13.5283C2 12.9092 2.19031 12.3077 2.5409 11.8188C4.81058 8.609 10.256 2 16.6135 2C22.971 2 28.4165 8.609 30.6861 11.8188V11.8188Z"
        stroke={colorByTheme}
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.6153 18.4693C19.1341 18.4693 21.176 16.2573 21.176 13.5286C21.176 10.7999 19.1341 8.58789 16.6153 8.58789C14.0966 8.58789 12.0547 10.7999 12.0547 13.5286C12.0547 16.2573 14.0966 18.4693 16.6153 18.4693Z"
        stroke={colorByTheme}
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
};

Watchlist.defaultProps = {
  width: "30",
  height: "30",
  viewBox: "0 0 33 27",
};

export default Watchlist;
