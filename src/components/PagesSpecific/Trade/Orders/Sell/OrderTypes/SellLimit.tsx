import React, { useMemo, useState } from "react";
import { Box, Button, Input, Text } from "trolly/common";
import { TOrderDetails } from "../../Orders.interface";
import useSOrderValidation from "../../hooks/useOrdersValidation.hooks";

const SellLimit: React.FC<{
  PnL: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  bid: number;
  position: number;
}> = ({ PnL, onCancel, bid, position, onPreview }) => {
  const [shares, setShares] = useState<any>("");
  const [priceLimit, setPriceLimit] = useState<any>("");

  const onClickPreview = () => {
    if (onPreview) {
      const AllCash = shares * priceLimit;
      onPreview({
        cash: +AllCash,
        shares: +shares,
        priceType: "LIMIT",
        wayToSend: "shares",
        price: +priceLimit,
      });
    }
  };

  const { shareErr, limitErr } = useSOrderValidation({
    shares,
    priceLimit,
    bid,
    position,
    priceType: "LIMIT",
    orderType: "SELL",
  });

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value || !isNaN(+value)) {
      setShares(value);
    }
  };

  const onChangePriceLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(Number(value)) || !value) {
      setPriceLimit(value);
    }
  };

  const canPreview = useMemo(() => {
    if (shares && priceLimit && !shareErr && !limitErr) {
      return true;
    }
  }, [shares, priceLimit, shareErr, limitErr]);

  return (
    <Box gridGap="20px">
      <Box gridTemplateColumns="1fr" gridGap="20px">
        <Input
          id="sell-limit-share"
          label="Share amount"
          variant="outlined"
          size="medium"
          value={shares}
          onChange={onChangeShares}
          color="secondary"
          error={shareErr !== ""}
          errorMessage={shareErr}
          errorMaxWidth="160px"
        />
        <Input
          id="sell-limit-price"
          label="Price limit"
          variant="outlined"
          size="medium"
          unit="$"
          unitPosition="start"
          value={priceLimit}
          onChange={onChangePriceLimit}
          color="secondary"
          error={!!limitErr}
          errorMessage={limitErr}
          errorMaxWidth="160px"
        />
      </Box>
      <Box
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
        gridGap="20px"
      >
        <Box>
          <Text color="#444444" variant="subtitle1">
            P/L
          </Text>
          <Text variant="subtitle1">${PnL}</Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Box>
            <Text color="#444444" variant="subtitle1">
              Share amount
            </Text>
            <Text variant="subtitle1">{position}</Text>
          </Box>
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
          disabled={!canPreview}
          onClick={onClickPreview}
        >
          Review Order
        </Button>
        <Button width="100%" round color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SellLimit;
