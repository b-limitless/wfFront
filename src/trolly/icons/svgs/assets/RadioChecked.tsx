import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const RadioChecked: FC<IProps> = ({ customColor, color, ...rest }) => {
  return (
    <Icon viewBox="0 0 40 40" {...rest} customColor={customColor}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
        fill={customColor}
      />
      <path
        d="M10.9805 20.7353L16.232 25.8824L28.2354 14.1176"
        stroke="white"
        strokeWidth="2"
      />
    </Icon>
  );
};

export default RadioChecked;
