import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";
import { useTheme } from "@material-ui/core/styles";

const RiskLevelMedium: FC<IProps> = ({ ...rest }) => {
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
        d="M3.70451 23.8879C2.56874 21.7653 1.92188 19.3449 1.92188 16.7754C1.92188 8.4043 8.78162 1.61206 17.2435 1.61206C19.5455 1.61206 21.5864 2.11101 23.3936 3.00767"
        stroke={palette.warning.main}
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        style={{ transform: "translate(0px, 1px)", zIndex: 1000 }}
      />
    </Icon>
  );
};

RiskLevelMedium.defaultProps = {
  viewBox: "0 0 34 27",
  fill: "none",
  customColor: "transparent",
};

export default RiskLevelMedium;
