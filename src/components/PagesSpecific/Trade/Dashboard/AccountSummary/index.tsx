import { Box } from "@material-ui/core";
import React from "react";
import {
  TRADE_GET_ACCOUNT_PERFORMANCE,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { Chip, Skeleton } from "trolly/common";
import { useApiInfo, useBreakPoints } from "trolly/hooks";
import { useTradeAccountInfo } from "hooks/useAccountInfo";
import DesktopView from "./Responsive/desktop";
import MobileView from "./Responsive/mobile";
// import {
//   accountPerformance,
//   accountSummary,
// } from "store/reducers/__mocks__/trade.mock";

export const Loader = () => {
  return (
    <Box>
      <Skeleton width="120px" height={20} />
      <Box
        marginTop="20px"
        width="100%"
        display="grid"
        gridGap="40px"
        gridTemplateColumns="repeat(4, 1fr)"
      >
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
      </Box>
    </Box>
  );
};

const AccountSummary: React.FC = () => {
  const { isLoading: isPerformanceLoading } = useApiInfo(
    TRADE_GET_ACCOUNT_PERFORMANCE
  );
  const { isLoading: isSummaryLoading } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);

  const { portfolioValue, dayPl, totalPl, buyingPower, lastUpdate } =
    useTradeAccountInfo();

  const { xSmall } = useBreakPoints();

  // account Performance is part of the loading state
  // but due to performance issue , the loading state moved to the value block where we need
  // the account performance to be fetched (dayPl fetched from performance)
  if (isSummaryLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <Box>
      <Chip
        borderRadius="20px"
        padding="4px 12px 4px 4px"
        label={lastUpdate}
        color="default"
        backgroundColor="#fff"
      />
      {xSmall ? (
        <MobileView
          portfolioValue={portfolioValue}
          dayPl={dayPl}
          totalPl={totalPl}
          isPerformanceLoading={isPerformanceLoading}
          buyingPower={buyingPower}
        />
      ) : (
        <DesktopView
          portfolioValue={portfolioValue}
          dayPl={dayPl}
          totalPl={totalPl}
          isPerformanceLoading={isPerformanceLoading}
          buyingPower={buyingPower}
        />
      )}
    </Box>
  );
};

export default AccountSummary;
