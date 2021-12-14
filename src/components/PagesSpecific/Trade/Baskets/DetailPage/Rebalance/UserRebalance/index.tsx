import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { apiActions } from "trolly/store";
import { useApiInfo } from "trolly/hooks";
import { useTradeAccountInfo } from "hooks/useAccountInfo";
import { Box, Table, Snackbar, Skeleton, ESeverity } from "trolly/common";
import {
  BASKETS_GET_REBALANCE_QUOTES,
  BASKETS_NAVIGATE,
  BASKETS_SET_REBALANCE_QUOTES_STATE,
  BASKETS_SET_SUBMIT_DATA,
} from "store/store.types";
import useTransformer from "./useTransformer";
import useStyles from "../../../baskets.style";
import BasketActions from "../../Actions";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

interface IProps {
  cashInput: number;
}

const Rebalance: React.FC<IProps> = ({ cashInput }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { buyingPower } = useTradeAccountInfo();
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });

  const {
    updateRebalanceQuotes,
    rowsData,
    tickersLength,
    columnsData,
    rebalance,
  } = useTransformer(cashInput);

  const { isLoading: isFetchingQuotes, error: errorFetchingQuotes } =
    useApiInfo(BASKETS_GET_REBALANCE_QUOTES);

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  const handleTradeBasket = () => {
    dispatch({ type: BASKETS_SET_SUBMIT_DATA, payload: rebalance });
    dispatch({ type: BASKETS_NAVIGATE, payload: 3 });
  };

  useEffect(() => {
    updateRebalanceQuotes();
  }, [updateRebalanceQuotes]);

  // Error Notifications
  useEffect(() => {
    if (!!errorFetchingQuotes) {
      setSnackbar({
        show: true,
        message: errorFetchingQuotes,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_GET_REBALANCE_QUOTES));
    }
  }, [errorFetchingQuotes, dispatch]);

  const goToBasketStep = () => {
    dispatch({
      type: BASKETS_SET_REBALANCE_QUOTES_STATE,
      payload: "",
    });
    dispatch({ type: BASKETS_NAVIGATE, payload: 1 });
  };

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        {isFetchingQuotes ? (
          <>
            <Table
              rows={[]}
              columns={columnsData}
              containerWidth="100%"
              borderRadius="10px"
              withPagination={false}
            />
            <div>
              {tickersLength.map((item) => (
                <Box key={item} padding="23px 16px" flexShrink={0}>
                  <Skeleton width="100%" height={36} />
                </Box>
              ))}
            </div>
          </>
        ) : (
          <Table
            rows={rowsData}
            columns={columnsData}
            containerWidth="100%"
            borderRadius="10px"
            withPagination={false}
          />
        )}
      </Paper>

      <BasketActions
        backTitle="Basket"
        onBack={goToBasketStep}
        backDisabled={isFetchingQuotes}
        forwardTitle="Trae Basket"
        forwardDisabled={
          !!errorFetchingQuotes || isFetchingQuotes || cashInput > buyingPower
        }
        onForward={handleTradeBasket}
      />

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

export default Rebalance;
