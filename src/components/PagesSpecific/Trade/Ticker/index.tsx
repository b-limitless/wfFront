import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box } from "trolly/common";
import TickerDetails from "./TickerDetails";
import Description from "./Description";
import HistoricalChart from "./HistoricalChart";
import OpenPosition from "./OpenPosition";

const Ticker: React.FC<{ instrumentId: string }> = ({ instrumentId }) => {
  const { instrumentsListAf, accountSummary, instrumentQuoteLive } =
    useSelector((state: IAppState) => state.trade);
  const symbol = useMemo(() => {
    if (instrumentsListAf && instrumentsListAf.length > 0) {
      return (
        instrumentsListAf.filter((option) => option.id_ === instrumentId)[0] ||
        {}
      ).symbol;
    }
    return null;
  }, [instrumentsListAf, instrumentId]);

  const canSell = useMemo(() => {
    if (accountSummary) {
      const { equity } = accountSummary;
      const { equityPositions } = equity;
      if (equityPositions && equityPositions.length > 0) {
        const filteredPosition = equityPositions.filter(
          (position) => position.instrumentID === instrumentId
        );
        // position is exist and the quote live is giving data
        if (filteredPosition.length > 0 && !!instrumentQuoteLive) {
          return true;
        }
      }
    }
    return false;
  }, [accountSummary, instrumentId, instrumentQuoteLive]);

  const canBuy = useMemo(
    () =>
      Array.isArray(instrumentQuoteLive) &&
      instrumentQuoteLive.length > 0 &&
      !!instrumentQuoteLive[0].bid,
    [instrumentQuoteLive]
  );

  return (
    <Box display="flex" flexDirection="column">
      <TickerDetails
        symbol={symbol}
        canSell={canSell}
        instrumentId={instrumentId}
        canBuy={canBuy}
      />
      <Box
        gridTemplateColumns={["1fr", "1fr", "9fr 3fr", "9fr 3fr"]}
        gridGap="20px"
        marginY="20px"
      >
        <HistoricalChart instrumentId={instrumentId} symbol={symbol} />
        <Description symbol={symbol} />
      </Box>
      <OpenPosition instrumentId={instrumentId} symbol={symbol} />
    </Box>
  );
};

export default Ticker;
