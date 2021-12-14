import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";
import { useTheme } from "@material-ui/core/styles";

const RiskLevelHigh: FC<IProps> = ({ ...rest }) => {
  const { palette } = useTheme();
  return (
    <Icon {...rest}>
      <path
        d="M4.24357 24.7069C3.1078 22.5843 2.46094 20.1638 2.46094 17.5944C2.46094 9.22327 9.32068 2.43103 17.7825 2.43103C22.7243 2.43103 26.4631 4.73038 29.2686 8.32758C31.2346 10.7007 34.2601 17.299 30.6346 24.7069"
        stroke={palette.error.main}
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </Icon>
  );
};

RiskLevelHigh.defaultProps = {
  viewBox: "0 0 34 27",
  customColor: "transparent",
  fill: "none",
};

export default RiskLevelHigh;
