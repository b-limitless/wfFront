import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getConsolidatedQuoteLive,
  getInstrumentFundamental,
} from "store/actions/trade.actions";
import { Box, Card, Skeleton } from "trolly/common";
import useTickerDetailsTransformer from "./useTickerDetails.hooks";
import LeftPane from "./LeftPane";
import RightPage from "./RightPane";
import { useApiInfo } from "trolly/hooks";
import {
  TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE,
  TRADE_GET_INSTRUMENT_FUNDAMENTAL,
} from "store/store.types";

const Loader: React.FC = () => {
  return (
    <Card
      display="grid"
      gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      padding={["20px 15px", "30px"]}
      gridRowGap="30px"
    >
      <Box
        gridTemplateColumns="1fr"
        gridGap="10px"
        borderRight={["none", "none", `1px solid #E2E2E2`, `1px solid #E2E2E2`]}
        padding="0px 10px"
      >
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
      </Box>
      <Box gridTemplateColumns="1fr" gridGap="15px" padding="0px 10px">
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
        <Skeleton width="100%" height={15} />
      </Box>
    </Card>
  );
};

// default value for non present values
const defaultDisplay = "---";
const TickerDetails: React.FC<{
  symbol: string | null;
  canSell: boolean;
  instrumentId: string;
  canBuy: boolean;
}> = ({ symbol, canSell, instrumentId, canBuy }) => {
  const dispatch = useDispatch();

  // get the ticker details
  useEffect(() => {
    if (symbol) {
      dispatch(getConsolidatedQuoteLive(symbol));
      dispatch(getInstrumentFundamental(symbol));
    }
  }, [dispatch, symbol]);

  const { isSuccess: isFundamentalSuccess } = useApiInfo(
    TRADE_GET_INSTRUMENT_FUNDAMENTAL
  );
  const { isSuccess: isQuoteSuccess } = useApiInfo(
    TRADE_GET_CONSIDOLIDATED_QUOTE_LIVE
  );

  const {
    image,
    price = 0,
    change = 0,
    changePerc = 0,
    previousClose = 0,
    open = 0,
    dayRange,
    volume = 0,
    fiftyTwoWeekRange = 0,
    marketCap = 0,
    peRatio = 0,
    eps = 0,
    companyName,
    exchange,
  } = useTickerDetailsTransformer();

  if (!isQuoteSuccess || !isFundamentalSuccess) {
    return <Loader />;
  }
  return (
    <Card
      display="grid"
      gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      padding={["30px 10px", "30px 10px", "30px", "30px"]}
      gridRowGap="30px"
    >
      <LeftPane
        image={image}
        symbol={symbol}
        defaultDisplay={defaultDisplay}
        companyName={companyName}
        exchange={exchange}
        price={price}
        change={change}
        changePerc={changePerc}
        canSell={canSell}
        instrumentId={instrumentId}
        canBuy={canBuy}
      />
      <RightPage
        open={open}
        marketCap={marketCap}
        fiftyTwoWeekRange={fiftyTwoWeekRange}
        volume={volume}
        previousClose={previousClose}
        dayRange={dayRange}
        eps={eps}
        peRatio={peRatio}
        defaultDisplay={defaultDisplay}
      />
    </Card>
  );
};

export default TickerDetails;
