import React from "react";
import { Box } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";
import SummaryBlock from "../SummaryBlock";
import { IAccountSummaryProps, ValueLoader } from "./desktop";

const MobileView: React.FC<IAccountSummaryProps> = ({
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
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="row"
        padding="0px"
        margin="0px"
        justifyContent="space-between"
        width="100%"
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
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        padding="0px"
        margin="0px"
        justifyContent="space-between"
        width="100%"
      >
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
    </Box>
  );
};

export default MobileView;
