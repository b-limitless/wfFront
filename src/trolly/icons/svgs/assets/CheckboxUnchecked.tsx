import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const CheckboxUnchecked: FC<IProps> = ({
  customColor,
  width,
  height,
  ...rest
}) => {
  return (
    <Icon {...rest} customColor="transparent">
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="4"
        stroke={customColor}
        strokeWidth="2"
      />
    </Icon>
  );
};

CheckboxUnchecked.defaultProps = {
  customColor: "#C3C3C3",
  width: "30px",
  height: "30px",
  viewBox: "0 0 38 38",
  fill: "transparent",
};
export default CheckboxUnchecked;
