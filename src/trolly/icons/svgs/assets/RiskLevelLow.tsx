import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";
import { useTheme } from "@material-ui/core/styles";

const RiskLevelLow: FC<IProps> = ({ ...rest }) => {
  const { palette } = useTheme();
  return (
    <Icon {...rest}>
      <path
        d="M3.74969 24.7069C2.63491 22.5843 2 20.1638 2 17.5944C2 9.22327 8.73298 2.43103 17.0385 2.43103C25.3439 2.43103 32.0769 9.22327 32.0769 17.6019C32.0769 20.1415 31.4568 22.5396 30.3641 24.6473"
        stroke="#EBEBEB"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        style={{ zIndex: -1 }}
      />
      <path
        d="M3.78265 17.7068C2.64688 15.5843 2.00001 13.1638 2.00001 10.5944C1.99672 8.94252 2.54646 4.91796 4.7718 2.03442"
        stroke={palette.success.main}
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        style={{ transform: "translate(0px, 7px)", zIndex: 1000 }}
      />
    </Icon>
  );
};

RiskLevelLow.defaultProps = {
  viewBox: "0 0 34 27",
  customColor: "transparent",
  fill: "none",
};

export default RiskLevelLow;
