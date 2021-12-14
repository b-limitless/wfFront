import React, { useMemo, useState } from "react";
import { Box, Button, Input, Link, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import { TOrderDetails } from "../../Orders.interface";
import useSOrderValidation from "../../hooks/useOrdersValidation.hooks";

const MarketOrder: React.FC<{
  PnL: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  bid: number;
  position: number;
}> = ({ PnL, onCancel, bid, position, onPreview }) => {
  const { formatDecimal } = appUtils;
  const [cash, setCash] = useState<any>("");
  const [shares, setShares] = useState<any>("");

  const onClickPreview = () => {
    if (onPreview) {
      onPreview({
        cash: +cash,
        shares: +shares,
        priceType: "MARKET",
        wayToSend: "shares",
      });
    }
  };

  const { cashErr, shareErr } = useSOrderValidation({
    bid,
    position,
    shares,
    cash,
    priceType: "MARKET",
    orderType: "SELL",
  });

  const onChangeCash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value || !isNaN(+value)) {
      setCash(value);
      const shares = +value / bid;
      if (!isNaN(shares)) {
        setShares(formatDecimal(shares, 8));
      }
    }
  };

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value || !isNaN(+value)) {
      setShares(value);
      const cash = +value * bid;
      if (!isNaN(cash)) {
        setCash(formatDecimal(cash, 6));
      }
    }
  };

  const onSellAll = () => {
    if (onPreview) {
      const totalCash = position * bid;
      onPreview({
        cash: totalCash,
        shares: position,
        priceType: "MARKET",
        wayToSend: "shares",
      });
    }
  };

  const canPreview = useMemo(() => {
    if (shares && cash && !cashErr && !shareErr) {
      return true;
    }
  }, [cash, shares, cashErr, shareErr]);

  return (
    <Box gridGap="20px">
      <Box
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
        gridGap="20px"
      >
        <Input
          label="Cash"
          variant="outlined"
          size="medium"
          unit="$"
          unitPosition="start"
          value={cash}
          onChange={onChangeCash}
          color="secondary"
          error={!!cashErr}
          errorMessage={cashErr}
          errorMaxWidth="160px"
        />
        <Input
          label="Share amount"
          variant="outlined"
          size="medium"
          value={shares}
          onChange={onChangeShares}
          color="secondary"
          error={!!shareErr}
          errorMessage={shareErr}
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
          <Box display="flex" alignSelf="flex-end">
            <Link color="secondary" onClick={onSellAll}>
              Sell All
            </Link>
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
        <Button fullWidth round color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MarketOrder;
