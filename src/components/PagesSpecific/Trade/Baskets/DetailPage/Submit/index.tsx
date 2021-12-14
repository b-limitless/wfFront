import React, { useCallback, useEffect, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { history } from "config";
import {
  Box,
  Button,
  Table,
  Snackbar,
  Skeleton,
  ESeverity,
} from "trolly/common";
import {
  BASKETS_GET_REBALANCE_QUOTES,
  BASKETS_NAVIGATE,
  BASKETS_NAVIGATE_HOME,
  BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
  TRADE_GET_ACCOUNT_SUMMARY,
  BASKETS_POST_ORDER,
  TRADE_GET_ACCOUNT_CASH_SUMMARY,
} from "store/store.types";
import useTransformer from "./useTransformer";
import useStyles from "../../baskets.style";
import { DeleteDialog } from "components/common";
import BasketActions from "../Actions";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

const Submit: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rowsData, columnsData, allSubmitted, handleDelete, canDelete } =
    useTransformer();
  const { theme } = useAppInfo();
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });
  const { submitRowsData } = useSelector(
    (state: IAppState) => state.baskets.render
  );

  const { isLoading: isFetchingQuotes, error: errorFetchingQuotes } =
    useApiInfo(BASKETS_GET_REBALANCE_QUOTES);
  const { isLoading: isFetchingSummary, error: errorFetchingSummary } =
    useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);
  const { error: errorSubmittingOrder, isSuccess: successSubmittingOrder } =
    useApiInfo(BASKETS_POST_ORDER);
  const { error: errorCashSummary } = useApiInfo(
    TRADE_GET_ACCOUNT_CASH_SUMMARY
  );

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  useEffect(() => {
    if (successSubmittingOrder) {
      setSnackbar({
        show: true,
        message: "Order submitted successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(BASKETS_POST_ORDER));
    }
  }, [successSubmittingOrder, dispatch]);

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
    if (!!errorCashSummary) {
      setSnackbar({
        show: true,
        message: errorCashSummary,
        severity: "error",
      });
      dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_CASH_SUMMARY));
    }
    if (!!errorFetchingSummary) {
      setSnackbar({
        show: true,
        message: errorFetchingSummary,
        severity: "error",
      });
      dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
    }
    if (!!errorSubmittingOrder) {
      const updateState = submitRowsData.map((el) => {
        return {
          ...el,
          isSubmitting: false,
        };
      });
      dispatch({
        type: BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
        payload: updateState,
      });
      setSnackbar({
        show: true,
        message: errorSubmittingOrder,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_POST_ORDER));
    }
  }, [
    submitRowsData,
    errorSubmittingOrder,
    errorFetchingSummary,
    errorFetchingQuotes,
    errorCashSummary,
    dispatch,
  ]);

  const navigateBackToHome = useCallback(() => {
    dispatch({ type: BASKETS_NAVIGATE_HOME });
  }, [dispatch]);

  const goToRebalance = () => {
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

  const handleDeletion = () => {
    handleDelete();
    setOpenDeleteDialog(false);
  };
  // #endregion

  const goToPortfolio = () => {
    history.push("/trade/portfolio");
  };

  return (
    <>
      {openDeleteDialog && (
        <DeleteDialog
          title="Are you sure you want to delete?"
          open={openDeleteDialog}
          onCancel={onCancelDeleteDialog}
          onDelete={handleDeletion}
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
      <div>
        <Paper elevation={0} className={classes.paper}>
          {isFetchingQuotes || isFetchingSummary ? (
            <>
              <Table
                rows={[]}
                columns={columnsData}
                containerWidth="100%"
                borderRadius="10px"
                withPagination={false}
              />
              <div>
                {[1, 2, 3, 4].map((item) => (
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
          backTitle="Rebalance"
          backDisabled={isFetchingQuotes}
          onBack={goToRebalance}
          forwardTitle={allSubmitted ? "Portfolio" : "Cancel all"}
          forwardDisabled={
            allSubmitted && (!!errorFetchingQuotes || isFetchingQuotes)
          }
        />
        <Box
          display="flex"
          justifyContent="space-between"
          padding="0 16px"
          marginTop="24px"
        >
          <Button
            onClick={goToRebalance}
            disabled={isFetchingQuotes}
            variant="outlined"
            round
            className={classes.navigate}
            height="50px"
            width="160px"
          >
            <ArrowBackIosIcon /> Rebalance
          </Button>

          {allSubmitted ? (
            <Button
              variant="contained"
              round
              color={theme}
              className={classes.navigate}
              onClick={goToPortfolio}
              height="50px"
              width="160px"
            >
              Portfolio
            </Button>
          ) : (
            <Button
              onClick={navigateBackToHome}
              disabled={!!errorFetchingQuotes || isFetchingQuotes}
              variant="text"
              round
              color={theme}
              className={classes.cancelBtn}
            >
              Cancel all
            </Button>
          )}
        </Box>

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
    </>
  );
};

export default Submit;
