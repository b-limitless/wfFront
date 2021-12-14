import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { apiActions } from "trolly/store";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { Box, ESeverity, Input, Snackbar, Text } from "trolly/common";
import { IAppState } from "store/store.interface";
import {
  BASKETS_NAVIGATE_HOME,
  TRADE_GET_ACCOUNT_SUMMARY,
  TRADE_GET_INSTRUMENTS_LIST_AF,
} from "store/store.types";
import {
  getAccountSummary,
  getInstrumentsAfList,
} from "store/actions/trade.actions";
import UserRebalance from "./Rebalance/UserRebalance";
import WealthfaceRebalance from "./Rebalance/WealthfaceRebalance";
import Progress from "./Progress";
import UserBasket from "./Basket/UserBasket";
import WealthfaceBasket from "./Basket/WealthfaceBasket";
import Submit from "./Submit";
import useStyles from "../baskets.style";
import { useTradeAccountInfo } from "hooks/useAccountInfo";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

const DetailPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { theme } = useAppInfo();
  const { palette } = useTheme();
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });

  const {
    selectedBasket: selectedUserBasket,
    selectedStrategy,
    type,
    step,
    accountSummary,
    instrumentsListAf,
  } = useSelector((state: IAppState) => ({
    ...state.baskets.render,
    ...state.trade,
  }));

  const selectedBasket = useMemo(
    () => (type === "user" ? selectedUserBasket : selectedStrategy),
    [selectedStrategy, selectedUserBasket, type]
  );

  const { error: errorFetchingInstrumentList } = useApiInfo(
    TRADE_GET_INSTRUMENTS_LIST_AF
  );
  const { error: errorFetchingAccountSummary } = useApiInfo(
    TRADE_GET_ACCOUNT_SUMMARY
  );

  const { buyingPower } = useTradeAccountInfo();
  const [cashInput, setCashInput] = useState<number>(0);

  const onChangeCashInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!isNaN(Number(inputValue)) || !inputValue) {
      setCashInput(+inputValue);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return type === "user" ? <UserBasket /> : <WealthfaceBasket />;
      case 2:
        return type === "user" ? (
          <UserRebalance cashInput={cashInput} />
        ) : (
          <WealthfaceRebalance cashInput={cashInput} />
        );
      case 3:
        return <Submit />;

      default:
        return null;
    }
  };

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  const checkData = useCallback(() => {
    if (!accountSummary) {
      dispatch(getAccountSummary());
    }
    if (!instrumentsListAf) {
      dispatch(getInstrumentsAfList());
    }
  }, [instrumentsListAf, accountSummary, dispatch]);

  useEffect(() => {
    checkData();
  }, [checkData]);

  // Errors Notifications
  useEffect(() => {
    if (!!errorFetchingAccountSummary) {
      setSnackbar({
        show: true,
        message: errorFetchingAccountSummary,
        severity: "error",
      });
      dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
    }
    if (!!errorFetchingInstrumentList) {
      setSnackbar({
        show: true,
        message: errorFetchingInstrumentList,
        severity: "error",
      });
      dispatch(apiActions.clearApi(TRADE_GET_INSTRUMENTS_LIST_AF));
    }
  }, [errorFetchingAccountSummary, errorFetchingInstrumentList, dispatch]);

  // Navigate back to Archive Page
  useEffect(() => {
    return () => {
      dispatch({ type: BASKETS_NAVIGATE_HOME });
    };
  }, [dispatch]);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="14px"
      >
        <Box display="flex" alignItems="center">
          <Text fontSize="20px" fontWeight={600} ml="10px" mb="15px">
            {selectedBasket?.name}
          </Text>
        </Box>
        {step === 2 && (
          <Box display="flex">
            <Text
              lineHeight="50px"
              fontSize="14px"
              color={palette.text.secondary}
            >
              Add money to current weights
            </Text>

            <Box display="block" maxWidth="230px" ml={2}>
              <Input
                size="medium"
                variant="outlined"
                color={theme}
                unitPosition="end"
                unit="USD"
                value={cashInput}
                onChange={onChangeCashInput}
                inputStartPadding="15px"
                error={cashInput > buyingPower}
                errorMessage={
                  "The buying power in your account will not cover this trade"
                }
                className={classes.input}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Progress steps={["Basket", "Rebalance", "Submit"]} activeStep={step} />

      <div>{renderStep()}</div>

      <Snackbar
        severity={snackbar.severity}
        vertical="top"
        horizontal="center"
        open={snackbar.show}
        handleClose={onCloseSnackbar}
        onClose={onCloseSnackbar}
        autoHideDuration={5000}
        transitionDuration={{ enter: 250, exit: 0 }}
      >
        {snackbar.message}
      </Snackbar>
    </div>
  );
};

export default DetailPage;
