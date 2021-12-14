import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo } from "trolly/hooks";
import { Box, Text, Table, Snackbar, Skeleton, ESeverity } from "trolly/common";
import {
  BASKETS_GET_BASKET_QUOTES,
  BASKETS_NAVIGATE,
  BASKETS_NAVIGATE_HOME,
  TRADE_GET_INSTRUMENTS_LIST_AF,
} from "store/store.types";
import useTransformer from "./useTrasnformer";
import useStyles from "../../../baskets.style";
import BasketActions from "../../Actions";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

const Loader: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="20px" padding="24px 20px">
      {[1, 2, 3, 4, 5].map((item) => (
        <Skeleton key={item} width="100%" height={20} />
      ))}
    </Box>
  );
};

const Rebalance: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });
  const {
    render: { selectedStrategy, weight: weightState },
  } = useSelector((state: IAppState) => state.baskets);
  const { rowsData, columnsData } = useTransformer();

  const { isLoading: isFetchingInstrumentList } = useApiInfo(
    TRADE_GET_INSTRUMENTS_LIST_AF
  );
  const { isLoading: isFetchingQuotes, error: errorFetchingQuotes } =
    useApiInfo(BASKETS_GET_BASKET_QUOTES);

  const disableRebalancing =
    isFetchingQuotes ||
    isFetchingInstrumentList ||
    weightState !== 100 ||
    selectedStrategy?.members.length === 0;

  console.log(
    isFetchingInstrumentList,
    isFetchingQuotes,
    weightState,
    selectedStrategy,
    "state for rebalancing"
  );

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  const goToBaskets = () => {
    dispatch({ type: BASKETS_NAVIGATE_HOME });
  };

  useEffect(() => {
    if (!!errorFetchingQuotes) {
      setSnackbar({
        show: true,
        message: errorFetchingQuotes,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_GET_BASKET_QUOTES));
    }
  }, [errorFetchingQuotes, dispatch]);

  const onRebalance = () => {
    dispatch({ type: BASKETS_NAVIGATE, payload: 2 });
  };

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        {isFetchingInstrumentList ? (
          <Loader />
        ) : selectedStrategy?.members.length === 0 ? (
          <Box display="block" padding="40px 16px 50px">
            <Text textAlign="center">Empty Basket</Text>
          </Box>
        ) : isFetchingQuotes || rowsData.length === 0 ? (
          <>
            <Table
              rows={[]}
              columns={columnsData}
              containerWidth="100%"
              borderRadius="10px"
              withPagination={false}
            />
            <div>
              {selectedStrategy?.members.map((item, i) => (
                <Box key={i} display="flex" alignItems="center">
                  <Box padding="23px 16px" flexShrink={0}>
                    <Skeleton width={120} height={36} />
                  </Box>
                  <Box padding="23px 16px" flex={1}>
                    <Skeleton width="100%" height={36} />
                  </Box>
                  <Box padding="23px 16px" flexShrink={0}>
                    <Skeleton width={36} height={36} />
                  </Box>
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
        backDisabled={isFetchingQuotes}
        onBack={goToBaskets}
        backTitle="Baskets"
        forwardDisabled={disableRebalancing}
        forwardTitle="Rebalance"
        onForward={onRebalance}
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
