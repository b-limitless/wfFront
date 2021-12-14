import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo } from "trolly/hooks";
import {
  Box,
  Button,
  Text,
  Table,
  Snackbar,
  Skeleton,
  ESeverity,
} from "trolly/common";
import {
  BASKETS_DELETE_TICKER,
  BASKETS_EDIT_TICKERS,
  BASKETS_GET_BASKET_QUOTES,
  BASKETS_NAVIGATE,
  BASKETS_NAVIGATE_HOME,
  TRADE_GET_INSTRUMENTS_LIST_AF,
} from "store/store.types";
import useTransformer from "./useTransformer";
import useStyles from "../../../baskets.style";
import { DeleteDialog } from "components/common";
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

const UserBasket: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });
  const {
    render: { selectedBasket, weight: weightState },
  } = useSelector((state: IAppState) => state.baskets);
  const { rowsData, columnsData, isEditing, canDelete, handleDeletion } =
    useTransformer();

  const { isLoading: isFetchingInstrumentList } = useApiInfo(
    TRADE_GET_INSTRUMENTS_LIST_AF
  );
  const { isLoading: isEditingTicker, error: errorEditingTicker } =
    useApiInfo(BASKETS_EDIT_TICKERS);
  const {
    isLoading: isDeletingTicker,
    error: errorDeletingTicker,
    isSuccess: successDeletingTicker,
  } = useApiInfo(BASKETS_DELETE_TICKER);
  const { isLoading: isFetchingQuotes, error: errorFetchingQuotes } =
    useApiInfo(BASKETS_GET_BASKET_QUOTES);

  const disableSubmit =
    isDeletingTicker ||
    isFetchingQuotes ||
    isFetchingInstrumentList ||
    isEditing ||
    weightState !== 100 ||
    selectedBasket?.tickers.length === 0;

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  useEffect(() => {
    if (successDeletingTicker) {
      setSnackbar({
        show: true,
        message: "Ticker is removed successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(BASKETS_DELETE_TICKER));
      setOpenDeleteDialog(false);
    }
  }, [successDeletingTicker, dispatch]);

  useEffect(() => {
    if (!!errorEditingTicker) {
      setSnackbar({
        show: true,
        message: errorEditingTicker,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_EDIT_TICKERS));
    }
    if (!!errorDeletingTicker) {
      setSnackbar({
        show: true,
        message: errorDeletingTicker,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_DELETE_TICKER));
    }
    if (!!errorFetchingQuotes) {
      setSnackbar({
        show: true,
        message: errorFetchingQuotes,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_GET_BASKET_QUOTES));
    }
  }, [errorEditingTicker, errorDeletingTicker, errorFetchingQuotes, dispatch]);

  const goToBaskets = () => {
    dispatch({ type: BASKETS_NAVIGATE_HOME });
  };

  const onRebalance = () => {
    dispatch({ type: BASKETS_NAVIGATE, payload: 2 });
  };

  // #region deletion section
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onCancelDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  // #endregion

  return (
    <div>
      {openDeleteDialog && (
        <DeleteDialog
          title="Are you sure you want to delete?"
          open={openDeleteDialog}
          onCancel={onCancelDeleteDialog}
          onDelete={handleDeletion}
          isLoading={isDeletingTicker}
        />
      )}
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          customVariant="danger"
          variant="outlined"
          round
          disabled={!canDelete}
          onClick={onOpenDeleteDialog}
        >
          Delete selected
        </Button>
      </Box>
      <Paper elevation={0} className={classes.paper}>
        {isFetchingInstrumentList ? (
          <Loader />
        ) : selectedBasket?.tickers.length === 0 ? (
          <Box display="block" padding="40px 16px 50px">
            <Text textAlign="center">Empty Basket</Text>
          </Box>
        ) : isDeletingTicker ||
          isFetchingQuotes ||
          isEditingTicker ||
          rowsData.length === 0 ? (
          <>
            <Table
              rows={[]}
              columns={columnsData}
              containerWidth="100%"
              borderRadius="10px"
              withPagination={false}
            />
            <div>
              {selectedBasket?.tickers.map((item, i) => (
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
        backDisabled={isDeletingTicker || isFetchingQuotes}
        backTitle="Baskets"
        onBack={goToBaskets}
        onForward={onRebalance}
        forwardTitle="Rebalance"
        forwardDisabled={disableSubmit}
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

export default UserBasket;
