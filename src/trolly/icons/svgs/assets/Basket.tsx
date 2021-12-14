import useTheme from "@material-ui/core/styles/useTheme";
import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";
import { getColorByTheme } from "../../icons.utils";

const Basket: FC<IProps> = ({
  customColor,
  color,
  width,
  height,
  viewBox,
  ...rest
}) => {
  const theme = useTheme();
  const colorByTheme = getColorByTheme(color, theme, customColor);
  return (
    <Icon
      viewBox={viewBox}
      width={width}
      height={height}
      {...rest}
      customColor="transparent"
    >
      <line
        x1="-1.09278e-07"
        y1="11.7104"
        x2="36"
        y2="11.7104"
        stroke={colorByTheme}
        stroke-width="2.5"
      />
      <path
        d="M1.69141 11.771L5.86456 26.8242C6.16265 27.6191 7.0867 29.2386 8.39826 29.3579C9.70983 29.4771 20.9674 29.4075 26.4323 29.3579C27.2768 29.3579 29.115 28.9406 29.7112 27.2713C30.3073 25.602 32.543 16.2422 33.5862 11.771"
        stroke={colorByTheme}
        stroke-width="2.5"
      />
      <path
        d="M9.30859 11.6248L16.1645 1.78809"
        stroke={colorByTheme}
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <path
        d="M27.0852 11.3267L20.5273 1.78809"
        stroke={colorByTheme}
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </Icon>
  );
};

Basket.defaultProps = {
  width: "30",
  height: "30",
  viewBox: "0 0 36 31",
};

export default Basket;
