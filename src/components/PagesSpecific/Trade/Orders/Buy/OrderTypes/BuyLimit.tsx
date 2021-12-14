import React, { useMemo, useState } from "react";
import { Box, Button, Input, Text } from "trolly/common";
import { appUtils } from "trolly/utils";
import useOrderValidation from "../../hooks/useOrdersValidation.hooks";
import { TOrderDetails } from "../../Orders.interface";

const BuyLimit: React.FC<{
  availableCash: number;
  portfolioValue?: number;
  onCancel?: () => void;
  onPreview?: (data: TOrderDetails) => void;
  ask: number;
}> = ({ availableCash, portfolioValue, onCancel, ask, onPreview }) => {
  const [priceLimit, setPriceLimit] = useState<any>("");
  const [shares, setShares] = useState<any>("");
  const [cash, setCash] = useState<any>("");
  const [positionsOff, setPositionsOff] = useState<number | string>(0);

  const { cashErr, limitErr, shareErr } = useOrderValidation({
    cash,
    shares,
    priceLimit,
    ask,
    availableCash,
    orderType: "BUY",
    priceType: "LIMIT",
  });

  const onClickPreview = () => {
    if (onPreview) {
      onPreview({
        cash: +shares * +priceLimit,
        shares: +shares,
        priceType: "LIMIT",
        price: +priceLimit,
        wayToSend: "shares",
      });
    }
  };

  const calculateCashAndPositions = ({
    priceLimitVal,
    sharesVal,
  }: {
    priceLimitVal?: string;
    sharesVal?: string;
  }) => {
    if (priceLimitVal && sharesVal) {
      const priceLimitNum = +priceLimitVal;
      const sharesNum = +sharesVal;
      const cash = priceLimitNum * sharesNum;
      if (!isNaN(cash)) {
        setCash(cash);
        if (portfolioValue && portfolioValue > 0) {
          const positions = appUtils.formatDecimal(
            (cash / portfolioValue) * 100,
            8
          );
          setPositionsOff(positions ? positions : 0);
        }
      }
    }
  };

  const onChangePriceLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(+value) || !value) {
      setPriceLimit(value);
      calculateCashAndPositions({ priceLimitVal: value, sharesVal: shares });
    }
  };

  const onChangeShares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value || !isNaN(+value)) {
      setShares(value);
      calculateCashAndPositions({
        sharesVal: value,
        priceLimitVal: priceLimit,
      });
    }
  };

  const canPreview = useMemo(() => {
    if (priceLimit && shares && !limitErr && !shareErr && !cashErr) {
      return true;
    }
  }, [priceLimit, shares, shareErr, limitErr, cashErr]);

  return (
    <Box gridGap="20px">
      <Box gridTemplateColumns="1fr" gridGap="20px">
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
        <Input
          label="Price limit"
          variant="outlined"
          size="medium"
          unit="$"
          unitPosition="start"
          value={priceLimit}
          onChange={onChangePriceLimit}
          color="secondary"
          error={!!limitErr || !!cashErr}
          errorMessage={limitErr || cashErr}
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

export default BuyLimit;
