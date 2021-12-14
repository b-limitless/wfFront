import React, { useMemo, useState } from "react";
import { Box, Button, Input, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import useOrderValidation from "../../hooks/useOrdersValidation.hooks";
import { TOrderDetails } from "../../Orders.interface";

const BuyStop: React.FC<{
  availableCash: number;
  portfolioValue?: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  ask: number;
}> = ({ availableCash, portfolioValue, onCancel, ask, onPreview }) => {
  const { formatDecimal } = appUtils;
  const [priceStop, setPriceStop] = useState<any>("");
  const [shares, setShares] = useState<any>("");
  const [cash, setCash] = useState<any>("");
  const [positionsOff, setPositionsOff] = useState<number | string>(0);

  const { cashErr, stopErr, shareErr } = useOrderValidation({
    cash,
    shares,
    priceStop,
    availableCash,
    ask,
    priceType: "STOP",
    orderType: "BUY",
  });

  const onClickPreview = () => {
    if (onPreview) {
      onPreview({
        cash: +cash,
        shares: +shares,
        priceType: "STOP",
        price: +priceStop,
        wayToSend: "cash",
      });
    }
  };

  const calculatePositions = (cash: number) => {
    if (cash) {
      if (portfolioValue && portfolioValue > 0) {
        const positions = appUtils.formatDecimal(
          (cash / portfolioValue) * 100,
          8
        );
        setPositionsOff(positions ? positions : 0);
      }
    }
  };

  const onChangePriceStop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setPriceStop(value);
      if (cash) {
        const cashNum = +cash;
        const totalShares = cashNum / +value;
        if (!isNaN(totalShares)) {
          setShares(formatDecimal(totalShares, 8));
        }
        calculatePositions(cashNum);
      }
    }
  };

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setShares(value);
      if (priceStop) {
        // if shares change set the cash
        const cash = +value * +priceStop;
        if (!isNaN(cash)) {
          setCash(formatDecimal(cash, 6));
        }
        // if share is there , then cash will be calculated among with the positions
        calculatePositions(cash);
      }
    }
  };

  const onChangeCash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setCash(value);
      if (priceStop) {
        const shares = +value / +priceStop;
        if (!isNaN(shares)) {
          setShares(formatDecimal(shares, 8));
        }
      }
    }
  };

  const canPreview = useMemo(() => {
    if (priceStop && shares && cash && !cashErr && !stopErr && !shareErr) {
      return true;
    }
  }, [priceStop, shares, cash, cashErr, stopErr, shareErr]);

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
      <Input
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
            Available
          </Text>
          <Text variant="subtitle1">{availableCash}</Text>
        </Box>
        <Box>
          <Text color="#444444" variant="subtitle1">
            Off positions
          </Text>
          <Text variant="subtitle1">{positionsOff}%</Text>
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

export default BuyStop;
