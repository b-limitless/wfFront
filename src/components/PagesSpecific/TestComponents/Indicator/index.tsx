import React from "react";
import { Box } from "trolly/common";
import { Indicator } from "trolly/custom";

const IndicatorComp: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Indicator value={-14.5} fill="full" fontSize="18px">
        14.5% (isNegative full variant with sign)
      </Indicator>
      <Indicator value={14.5} fill="full" fontSize="18px">
        14.5% (isPositive full variant with sign)
      </Indicator>
      <Indicator value={-14.5} fill="part" fontSize="18px" withSign={false}>
        14.5% (isNegative part variant without sign)
      </Indicator>
      <Indicator value={-14.5} fill="full" fontSize="18px" withSign={false}>
        14.5% (isNegative full variant without sign)
      </Indicator>
      <Indicator
        value={-14.5}
        fill="full"
        fontSize="18px"
        withSign
        withIndicator={false}
      >
        14.5% (isNegative full variant with sign and without indicator)
      </Indicator>
      <Indicator value={14.5} fill="part" fontSize="18px">
        14.5% (isPositive part variant with sign)
      </Indicator>
      <Indicator value={0} fill="part" fontSize="18px">
        0% (isZero part variant with sign)
      </Indicator>
      <Indicator
        value={0}
        fill="full"
        fontSize="18px"
        withSign
        withIndicator={false}
      >
        0% (isZero full variant with sign and without indicator)
      </Indicator>
      <Indicator
        value={0}
        withIndicator={false}
        withSign={false}
        fill="full"
        fontSize="18px"
      >
        0% (isZero full variant without indicator, without sign)
      </Indicator>
    </Box>
  );
};

export default IndicatorComp;
