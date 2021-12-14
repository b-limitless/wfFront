import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IAppState } from "store/store.interface";
import { Text, Input, Box, Button, Alert } from "trolly/common";
import { getFundingExchangeRate } from "store/actions/funding.actions";
import {
  FUNDING_GET_EXCHANGE_RATE,
  FUNDING_PAGE_AMOUNT_SUBMITTED,
  LOCAL_TRANSFER,
  WIRE_TRANSFER,
} from "store/store.types";
import Loader from "../components/Loader";
import useStyles from "./Amount.style";
import { validators } from "trolly/utils";

const Amount: React.FC = () => {
  const {
    render,
    component: {
      exchangeRate: exchangeRateState,
      currencySelected: currencySelectedState,
      amountEnter: amountEnterState,
      convertedAmount: convertedAmountState,
    },
    cashFlow,
  } = useSelector((state: IAppState) => ({
    ...state.funding,
    ...state.general,
  }));
  const dispatch = useDispatch();
  const [currencySelected, setCurrencySelected] = useState(
    currencySelectedState
  );
  const [amountEnter, setAmountEnter] = useState(amountEnterState);
  const [exchangeRate, setExchangeRate] = useState(exchangeRateState);
  const [convertedAmount, setConvertedAmount] = useState(convertedAmountState);
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const classes = useStyles({ theme });

  // #region add min local funding allowed amount
  const { canFund, errorMessag } = useMemo(() => {
    let canFund = true;
    let errorMessag;
    if (cashFlow) {
      const { localFunding } = cashFlow;
      const {
        minAllowedFundingAmount = 0,
        minAllowedFundingAmountErrorMessage,
      } = localFunding || {};
      if (convertedAmount && +convertedAmount > 0) {
        canFund = +convertedAmount >= minAllowedFundingAmount;
        errorMessag = minAllowedFundingAmountErrorMessage;
      }
    }
    return { canFund, errorMessag };
  }, [cashFlow, convertedAmount]);
  // #endregion

  const { isLoading, error: errorFetchingExchangeRate } = useApiInfo(
    FUNDING_GET_EXCHANGE_RATE
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if ((!isNaN(Number(value)) && validators.isNumber(value)) || !value) {
      setAmountEnter(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: FUNDING_PAGE_AMOUNT_SUBMITTED,
      payload: {
        amountEnter,
        currencySelected: render === LOCAL_TRANSFER ? currencySelected : "USD",
        convertedAmount,
      },
    });
  };

  useEffect(() => {
    if (
      render === LOCAL_TRANSFER &&
      Object.keys(exchangeRateState).length === 0
    ) {
      dispatch(getFundingExchangeRate());
    }
    setExchangeRate(exchangeRateState);
  }, [exchangeRateState, render, dispatch]);

  useEffect(() => {
    if (String(currencySelected) === "AED") {
      const amount = parseInt(amountEnter) / exchangeRate[currencySelected];
      if (amount) {
        setConvertedAmount((Math.floor(amount * 100) / 100).toFixed(2));
      } else {
        setConvertedAmount("");
      }
    } else {
      if (amountEnter) {
        setConvertedAmount(amountEnter);
      } else {
        setConvertedAmount("");
      }
    }
  }, [amountEnter, currencySelected, exchangeRate]);

  if (errorFetchingExchangeRate)
    return (
      <Alert margin="70px 0" severity="error" icon={false}>
        Sorry we're unable to process right not.
      </Alert>
    );

  if (isLoading) return <Loader />;

  return (
    <div>
      <Text fontSize={20} mt={3} mb={3} fontWeight={500} color="#000">
        Enter the amount
      </Text>
      <Text
        fontSize={16}
        mb="10px"
        fontWeight={500}
        color={palette.grey["300"]}
      >
        Your account currency
      </Text>

      {render === LOCAL_TRANSFER && (
        <RadioGroup
          className={classes.radioGroup}
          aria-label="currency"
          name="currency"
          value={currencySelected}
          onChange={(event: any) => setCurrencySelected(event.target.value)}
        >
          <FormControlLabel
            className={classes.radioLabel}
            value="AED"
            control={<Radio />}
            label="AED"
          />
          <FormControlLabel
            className={classes.radioLabel}
            value="USD"
            control={<Radio />}
            label="USD"
          />
        </RadioGroup>
      )}

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Box display="block" mt={2}>
          <Input
            id={render}
            label="You are sending"
            onChange={handleInputChange}
            value={amountEnter}
            color={theme}
            fullWidth={true}
            variant="outlined"
            unit={render === WIRE_TRANSFER ? "USD" : currencySelected}
            unitPosition="start"
            className={classes.input}
          />
        </Box>

        {render === LOCAL_TRANSFER && (
          <>
            <div className={classes.separator}>
              <div className={classes.separatorLine}>
                <div className="dot" />
              </div>
              <Text className={classes.separatorText}>
                Rate Exchange:{" "}
                <span style={{ color: palette[theme].main }}>
                  $1 = {String(currencySelected) === "AED" ? "AED " : "$"}
                  {exchangeRate[currencySelected]}
                </span>
              </Text>
            </div>

            <Input
              label="Your account will be funded by"
              fullWidth={true}
              variant="outlined"
              unit="USD"
              unitPosition="start"
              value={convertedAmount}
              disabled
              className={classes.input}
              error={!canFund}
              errorMessage={errorMessag}
            />
          </>
        )}

        <Box mt={5}>
          <Button
            variant="contained"
            color={theme}
            round
            disabled={!amountEnter || !canFund}
            type="submit"
            fullWidth
            height="56px"
            fontSize="18px"
          >
            Next
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Amount;
