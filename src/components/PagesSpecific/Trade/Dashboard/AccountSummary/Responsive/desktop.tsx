import React from "react";
import { Box, Skeleton } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";
import SummaryBlock from "../SummaryBlock";

export interface IAccountSummaryProps {
  portfolioValue: number;
  isPerformanceLoading?: boolean;
  dayPl: number;
  totalPl: number;
  buyingPower: number;
}

export const ValueLoader: React.FC = () => {
  return (
    <Box gridTemplateAreas="1fr" gridGap="3px">
      <Skeleton width={120} height={20} />
      <Box mt="8px">
        <Skeleton variant="text" width={120} />
      </Box>
    </Box>
  );
};

const DesktopView: React.FC<IAccountSummaryProps> = ({
  buyingPower,
  dayPl,
  portfolioValue,
  totalPl,
  isPerformanceLoading,
}) => {
  const { formatDecimal } = appUtils;
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      marginTop="25px"
      flexWrap
      flexDirection="row"
    >
      <SummaryBlock header="Portfolio value">
        <Indicator
          value={portfolioValue}
          withSign={true}
          withIndicator={false}
          fill="part"
          fontSize={["28px", "36px"]}
          color="#000"
        >
          ${formatDecimal(Math.abs(portfolioValue), 2)}
        </Indicator>
      </SummaryBlock>
      {!isPerformanceLoading ? (
        <SummaryBlock header="Daily P&L">
          <Indicator
            withSign={false}
            spacing="10px"
            fontSize={["20px", "24px"]}
            value={dayPl}
            color="#000"
          >
            ${formatDecimal(Math.abs(dayPl), 2)}
          </Indicator>
        </SummaryBlock>
      ) : (
        <ValueLoader />
      )}
      <SummaryBlock header="Unrealized P&L">
        <Indicator
          withSign={false}
          spacing="10px"
          fontSize={["20px", "22px"]}
          value={totalPl}
          color="#000"
        >
          ${formatDecimal(Math.abs(totalPl), 2)}
        </Indicator>
      </SummaryBlock>
      <SummaryBlock header="Buying Power" withMargin={false}>
        <Indicator
          spacing="10px"
          fontSize={["20px", "22px"]}
          value={buyingPower}
          withIndicator={false}
          withSign={false}
          fill="part"
        >
          ${formatDecimal(Math.abs(buyingPower), 2)}
        </Indicator>
      </SummaryBlock>
    </Box>
  );
};

export default DesktopView;
