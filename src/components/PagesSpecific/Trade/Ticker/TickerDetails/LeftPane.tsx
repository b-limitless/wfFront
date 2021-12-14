import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Box, Button, Image, Text } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";
import BuyOrder from "../../Orders/Buy";
import SellOrder from "../../Orders/Sell";
import { transferImageUrlToHTTPS } from "../../Trade.utils";
import { useDispatch } from "react-redux";
import { apiActions } from "trolly/store";
import { TRADE_POST_ORDER } from "store/store.types";
import AddToBasket from "../AddToBasket";
import AddToWatchlist from "../AddToWatchlist";

interface ILeftPaneProps {
  image: string;
  symbol: string | null;
  instrumentId: string;
  companyName: string;
  defaultDisplay: string;
  exchange: string;
  price: number;
  change: number;
  changePerc: number;
  canSell: boolean;
  canBuy: boolean;
}

//Image Class
const useImageStyles = makeStyles({
  image: {
    marginRight: "20px",
  },
});

const LeftPaneTickerDetails: React.FC<ILeftPaneProps> = ({
  image,
  symbol,
  companyName,
  defaultDisplay,
  price,
  change,
  changePerc,
  exchange,
  canSell,
  canBuy,
  instrumentId,
}) => {
  const { image: imageClass } = useImageStyles();
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);

  const dispatch = useDispatch();

  const onCancelBuyOrder = () => {
    dispatch(apiActions.clearApi(TRADE_POST_ORDER));
    setOpenBuy(false);
  };

  const onCancelSellOrder = () => {
    dispatch(apiActions.clearApi(TRADE_POST_ORDER));
    setOpenSell(false);
  };

  const onOpenBuyOrder = () => {
    setOpenBuy(true);
  };

  const onOpenSellOrder = () => {
    setOpenSell(true);
  };

  return (
    <>
      {openBuy && (
        <BuyOrder
          open={openBuy}
          symbol={symbol as string}
          onCancel={onCancelBuyOrder}
        />
      )}
      {openSell && (
        <SellOrder
          open={openSell}
          symbol={symbol as string}
          onCancel={onCancelSellOrder}
          instrumentId={instrumentId}
        />
      )}
      <Box
        gridTemplateColumns="1fr"
        gridGap="20px"
        borderRight={["none", "none", `1px solid #E2E2E2`, `1px solid #E2E2E2`]}
        padding={["0px 10px", "0px 20px"]}
      >
        <Box
          display="flex"
          flexDirection={["column", "row", "row", "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box display="flex" marginBottom={["15px", "0px", "0px", "0px"]}>
            <Image
              src={transferImageUrlToHTTPS(image)}
              alt="company logo"
              className={imageClass}
              margin="0 15px 0 0"
              width="45px"
              height="45px"
              color="secondary"
            />
            <Box display="flex" flexDirection="column">
              <Text
                fontSize={["22px", "30px", "30px", "30px"]}
                fontWeight={700}
                color="text.primary"
              >
                {symbol}
              </Text>
              <Text fontSize="13px" fontWeight={500} color="text.secondary">
                {companyName}
              </Text>
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="row"
                marginRight="30px"
                alignItems="center"
              >
                <Text
                  fontSize={["22px", "30px", "30px", "30px"]}
                  fontWeight={600}
                  color="text.primary"
                  marginRight="10px"
                  height="fit-content"
                >
                  {price ? price : defaultDisplay}
                </Text>
                <Box display="flex" flexDirection="column" height="fit-content">
                  <Indicator
                    fill="full"
                    withIndicator={true}
                    withSign={true}
                    value={change}
                  >
                    {change || change === 0
                      ? appUtils.formatDecimal(Math.abs(change), 2)
                      : defaultDisplay}
                  </Indicator>
                  <Indicator
                    fill="full"
                    withIndicator={false}
                    withSign={true}
                    value={changePerc}
                  >
                    {changePerc || changePerc === 0
                      ? `${appUtils.formatDecimal(Math.abs(changePerc), 2)}%`
                      : defaultDisplay}
                  </Indicator>
                </Box>
              </Box>
              <Text fontSize="12px" color="text.secondary" fontWeight={400}>
                Real Time | {exchange ? exchange : defaultDisplay}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection={["column", "row", "row", "row"]}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridGap={["10px", "20px"]}
            flex="1"
          >
            <Button
              {...(!canBuy ? { customVariant: "danger", custom: true } : {})}
              variant="contained"
              color="secondary"
              round
              fontSize="14px"
              fullWidth
              minWidth="100%"
              onClick={onOpenBuyOrder}
              disabled={!canBuy}
            >
              BUY
            </Button>
            <Button
              customVariant="danger"
              variant="contained"
              color="secondary"
              round
              fontSize="14px"
              fullWidth
              disabled={!canSell}
              onClick={onOpenSellOrder}
            >
              SELL
            </Button>
          </Box>

          <Box
            display="flex"
            marginLeft={["0px", "40px"]}
            marginTop={["15px", "0px"]}
          >
            <Box marginRight="15px">
              <AddToBasket />
            </Box>
            <AddToWatchlist />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeftPaneTickerDetails;
