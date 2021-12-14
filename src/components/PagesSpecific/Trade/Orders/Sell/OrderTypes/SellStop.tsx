import React, { useMemo, useState } from "react";
import { Alert, Box, Button, Input, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import { TOrderDetails } from "../../Orders.interface";
import useSOrderValidation from "../../hooks/useOrdersValidation.hooks";

const SellStop: React.FC<{
  PnL: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  bid: number;
  position: number;
}> = ({ PnL, onCancel, bid, position, onPreview }) => {
  const { formatDecimal } = appUtils;
  const [cash, setCash] = useState<any>("");
  const [shares, setShares] = useState<any>("");
  const [priceStop, setPriceStop] = useState<any>("");
  const [sellError, setSellError] = useState<boolean>(false);

  const onClickPreview = () => {
    if (onPreview) {
      onPreview({
        cash: +cash,
        shares: +shares,
        priceType: "STOP",
        wayToSend: "shares",
        price: +priceStop,
      });
    }
  };

  const { cashErr, stopErr, shareErr } = useSOrderValidation({
    cash,
    shares,
    priceStop,
    bid,
    position,
    priceType: "STOP",
    orderType: "SELL",
  });

  const onChangeCash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setCash(value);
      if (priceStop && !isNaN(priceStop)) {
        const shares = +value / +priceStop;
        if (!isNaN(shares)) {
          setShares(formatDecimal(shares, 8));
        }
      }
    }
  };

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setShares(value);
      if (priceStop && !isNaN(priceStop)) {
        const cash = +value * priceStop;
        if (!isNaN(cash)) {
          setCash(formatDecimal(cash, 6));
        }
      }
    }
  };

  const onChangePriceStop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setPriceStop(value);
      if (cash && !isNaN(cash)) {
        const totalShares = +cash / +value;
        if (!isNaN(totalShares)) {
          setShares(formatDecimal(totalShares, 8));
        }
      }
    }
  };

  const canPreview = useMemo(() => {
    if (shares && priceStop && cash && !shareErr && !cashErr && !stopErr) {
      return true;
    }
  }, [shares, cash, priceStop, stopErr, cashErr, shareErr]);

  const onCloseSellError = () => {
    setSellError(false);
  };

  return (
    <Box gridGap="20px">
      {sellError && (
        <Alert severity="error" type="standard" onClose={onCloseSellError}>
          Please enter your stop price
        </Alert>
      )}
      <Box
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
        gridGap="20px"
      >
        <Input
          id="sell-stop-cash"
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
          id="sell-stop-share"
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
      <Input
        id="sell-stop-price"
        label="Price stop"
        variant="outlined"
        size="medium"
        unit="$"
        unitPosition="start"
        value={priceStop}
        onChange={onChangePriceStop}
        color="secondary"
        error={!!stopErr}
        errorMessage={stopErr}
        errorMaxWidth="160px"
      />
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

export default SellStop;
