import React from "react";
import { Box, Button, Image, Text } from "trolly/common";
import { transferImageUrlToHTTPS } from "../../Trade.utils";

interface ISummaryProps {
  symbol: string;
  image: string;
  name: string;
  cash: number;
  shares: number;
  commission: string;
  price: number;
  onCancel: () => void;
  onPlaceOrder: () => void;
  orderType: string;
  isLoading: boolean;
}
const Summary: React.FC<ISummaryProps> = ({
  symbol,
  name,
  image,
  cash,
  shares,
  commission,
  price,
  onCancel,
  onPlaceOrder,
  orderType,
  isLoading,
}) => {
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
      </Box>
      <Box display="flex" flexDirection="column">
        <Text
          fontSize="16px"
          fontWeight={600}
          marginBottom="25px"
          marginTop="25px"
        >
          {orderType}
        </Text>
        <Text
          fontSize="16px"
          fontWeight={600}
          color="secondary.main"
          marginBottom="25px"
        >
          Order Summary
        </Text>
        <Box gridGap="15px" marginBottom="30px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #EDEDED"
            paddingBottom="5px"
          >
            <Text fontSize="13px" fontWeight={500}>
              {`${
                orderType && orderType.toLowerCase().indexOf("limit") < 0
                  ? "Est. Amount"
                  : "Amount"
              }`}
            </Text>
            <Text fontSize="13px" fontWeight={500}>
              ${cash}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #EDEDED"
            paddingBottom="5px"
          >
            <Text fontSize="13px" fontWeight={500}>
              {`${
                orderType && orderType.toLowerCase().indexOf("limit") < 0
                  ? "Est. Share amount"
                  : "Share amount"
              }`}
            </Text>
            <Text
              fontSize="13px"
              fontWeight={500}
            >{`${shares} @ ${price}`}</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #EDEDED"
            paddingBottom="5px"
          >
            <Text fontSize="13px" fontWeight={500}>
              Est. Commission
            </Text>
            <Text fontSize="13px" fontWeight={500}>
              ${commission}
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #EDEDED"
            paddingBottom="5px"
          >
            <Text fontSize="13px" fontWeight={500}>
              Est. Total
            </Text>
            <Text fontSize="13px" fontWeight={500}>
              ${Number(commission) + Number(cash)}
            </Text>
          </Box>
        </Box>
        <Box
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
          gridGap="20px"
        >
          <Button
            width="100%"
            round
            variant="contained"
            color="secondary"
            onClick={onPlaceOrder}
            isLoading={isLoading}
          >
            Place Order
          </Button>
          <Button width="100%" round color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
