import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const RadioUnchecked: FC<IProps> = ({ customColor, ...rest }) => {
  return (
    <Icon viewBox="0 0 42 42" fill="white" {...rest} customColor="transparent">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1 21 1C9.9543 1 1 9.95431 1 21C1 32.0457 9.9543 41 21 41Z"
        stroke={customColor}
        strokeWidth="2"
      />
    </Icon>
  );
};

RadioUnchecked.defaultProps = {
  customColor: "#C3C3C3",
};
export default RadioUnchecked;
