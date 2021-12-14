import React, { useMemo } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Image, Tabs, Text, TSelectOption } from "trolly/common";
import MarketBuy from "./OrderTypes/MarketBuy";
import BuyLimit from "./OrderTypes/BuyLimit";
import BuyStop from "./OrderTypes/BuyStop";
import { TOrderDetails } from "../Orders.interface";
import { transferImageUrlToHTTPS } from "../../Trade.utils";

interface ITakeOrderProps {
  image: string;
  bid: number;
  ask: number;
  name: string;
  cashAvailableForTrade: number;
  portolioValue: number;
  symbol: string;
  options: TSelectOption[];
  onChangeOrder: (value: any) => void;
  selectedOrder: string;
  onCancel: () => void;
  onPreview: (data: TOrderDetails) => void;
}
const useSpanStyles = makeStyles((theme: Theme) => ({
  spanClass: {
    color: theme.palette.text.primary,
    fontSize: "13px",
    fontWeight: 500,
  },
}));

const TakeOrder: React.FC<ITakeOrderProps> = ({
  onCancel,
  onPreview,
  ...rest
}) => {
  const {
    image,
    bid,
    ask = 0,
    name,
    cashAvailableForTrade = 0,
    portolioValue = 0,
    symbol,
    selectedOrder,
    onChangeOrder,
    options,
  } = rest;

  const { spanClass } = useSpanStyles();

  const tabComponent = useMemo(() => {
    switch (selectedOrder) {
      case "MARKET":
        return (
          <MarketBuy
            availableCash={cashAvailableForTrade}
            ask={ask}
            portfolioValue={portolioValue}
            onCancel={onCancel}
            onPreview={onPreview}
          />
        );
      case "LIMIT":
        return (
          <BuyLimit
            availableCash={cashAvailableForTrade}
            ask={ask}
            portfolioValue={portolioValue}
            onCancel={onCancel}
            onPreview={onPreview}
          />
        );
      case "STOP":
        return (
          <BuyStop
            availableCash={cashAvailableForTrade}
            ask={ask}
            portfolioValue={portolioValue}
            onCancel={onCancel}
            onPreview={onPreview}
          />
        );
      default:
        return null;
    }
  }, [
    cashAvailableForTrade,
    selectedOrder,
    onCancel,
    ask,
    portolioValue,
    onPreview,
  ]);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        minWidth={["100%", "400px", "400px", "400px"]}
        paddingBottom="15px"
        borderBottom="1px solid #EDEDED"
      >
        <Box display="flex">
          <Image
            src={transferImageUrlToHTTPS(image)}
            alt="instrument logo"
            width="45px"
            height="45px"
            color="secondary"
          />
          <Box display="flex" flexDirection="column" marginLeft="10px">
            <Text fontSize="24px" fontWeight={700} color="text.primary">
              {symbol}
            </Text>
            <Text fontSize="13px" fontWeight={500} color="text.secondary">
              {name}
            </Text>
          </Box>
        </Box>
        <Box gridTemplateColumns="1fr" gridGap="5px">
          <Text variant="body1" color="text.secondary">
            Real time
          </Text>

          <Text fontSize="13px" color="text.secondary">
            Bid: <span className={spanClass}>{bid}</span>
          </Text>
          <Text fontSize="13px" color="text.secondary">
            Ask: <span className={spanClass}>{ask}</span>
          </Text>
        </Box>
      </Box>
      <Box gridGap="20px" marginTop="10px">
        <Tabs
          options={options}
          value={selectedOrder}
          handleTabClick={onChangeOrder}
          theme="secondary"
          tabsVariant="default"
          tabMarginRight="20px"
          width="100%"
          wrapperAlignment="center"
        />
        <Box marginTop="10px" padding="10px">
          {tabComponent}
        </Box>
      </Box>
    </Box>
  );
};

export default TakeOrder;
