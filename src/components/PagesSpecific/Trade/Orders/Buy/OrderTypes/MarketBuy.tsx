import React, { useMemo, useState } from "react";
import { Box, Button, Input, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import { TOrderDetails } from "../../Orders.interface";
import useOrderValidation from "../../hooks/useOrdersValidation.hooks";

const MarketOrder: React.FC<{
  availableCash: number;
  portfolioValue?: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  ask: number;
}> = ({ availableCash, portfolioValue, onCancel, ask, onPreview }) => {
  const { formatDecimal } = appUtils;
  const [cash, setCash] = useState<any>("");
  const [shares, setShares] = useState<any>("");
  const [positionsOff, setPositionsOff] = useState<number | string>(0);

  const { cashErr, shareErr } = useOrderValidation({
    shares,
    cash,
    availableCash,
    ask,
    priceType: "MARKET",
    orderType: "BUY",
  });

  const onClickPreview = () => {
    if (onPreview) {
      onPreview({
        cash: +cash,
        shares: +shares,
        priceType: "MARKET",
        wayToSend: "cash",
      });
    }
  };

  const calculatePositions = (cash: number) => {
    if (portfolioValue && portfolioValue > 0) {
      const positions = appUtils.formatDecimal(
        (cash / portfolioValue) * 100,
        8
      );
      setPositionsOff(positions ? positions : 0);
    }
  };

  const onChangeCash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value || +value === 0) {
      setCash(value);
      calculatePositions(+value);
      // shares cannot be less than 0.000001
      const calculatedShares = +value / ask;
      if (!isNaN(calculatedShares)) {
        setShares(formatDecimal(calculatedShares, 8));
      }
    }
  };

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setShares(value);
      const valueNum = Number(value);
      const cash = +value * ask;
      calculatePositions(cash);
      if (!isNaN(cash)) {
        setCash(formatDecimal(valueNum * ask, 7));
      }
    }
  };

  const canPreview = useMemo(() => {
    if (shares && cash && !cashErr && !shareErr) {
      return true;
    }
  }, [shareErr, shares, cash, cashErr]);

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

export default MarketOrder;
