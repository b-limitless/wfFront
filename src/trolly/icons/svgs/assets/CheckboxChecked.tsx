import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const CheckboxChecked: FC<IProps> = ({ customColor, color, ...rest }) => {
  return (
    <Icon {...rest} customColor={customColor}>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="4"
        fill={customColor}
        strokeWidth="2"
      />
      <path
        d="M11 20.6176L16.2515 25.7647L28.2549 14"
        stroke="white"
        strokeWidth="2"
      />
    </Icon>
  );
};

CheckboxChecked.defaultProps = {
  width: "30",
  height: "30",
  viewBox: "0 0 40 40",
};

export default CheckboxChecked;
