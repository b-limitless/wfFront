import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { apiActions } from "trolly/store";
import useStyles from "../watchlists.style";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { addTicker } from "store/actions/watchlist.actions";
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
  WATCHLIST_ADD_TICKER,
  WATCHLIST_DELETE_TICKER,
  WATCHLIST_GET_QUOTES_DEFAULT,
  WATCHLISTS_NAVIGATE_BACK,
  TRADE_GET_INSTRUMENTS_LIST_AF,
} from "store/store.types";
import useTransformer from "./useTransformer";
import { DeleteDialog, TickerSearch } from "components/common";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

const Loader: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="20px" padding="24px 20px">
      {[1, 2, 3, 4, 5].map((item) => (
        <Skeleton key={item} width="100%" height={2} />
      ))}
    </Box>
  );
};

const WatchlistDetail: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { theme } = useAppInfo();
  const [inputError, setInputError] = useState("");
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });
  const [option, setOption] = useState<any>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { columnsData, rowsData, canDelete, handleDeletion } = useTransformer();
  const {
    watchlists,
    render: { selectedWatchlist },
  } = useSelector((state: IAppState) => ({
    ...state.trade,
    ...state.watchlist,
  }));
  const {
    isLoading: isFetchingInstrumentList,
    error: errorFetchingInstrumentList,
  } = useApiInfo(TRADE_GET_INSTRUMENTS_LIST_AF);
  const { isLoading: isAddingTicker, error: errorAddingTicker } =
    useApiInfo(WATCHLIST_ADD_TICKER);
  const {
    isLoading: isDeletingTicker,
    error: errorDeletingTicker,
    isSuccess: successDeletingTicker,
  } = useApiInfo(WATCHLIST_DELETE_TICKER);
  const { isLoading: isFetchingQuotes, error: errorFetchingQuotes } =
    useApiInfo(WATCHLIST_GET_QUOTES_DEFAULT);

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  const onInputChange = (event: any, option: any) => {
    setInputError("");
    setOption(option);
  };

  const handleAddItem = (e: any) => {
    e.preventDefault();
    if (option && watchlists) {
      const tickerAlreadyExists = selectedWatchlist?.tickers.includes(
        option.value
      );
      if (tickerAlreadyExists) {
        setInputError("Ticker already available in your watchlist!");
        return;
      }
      const addTickerToWatchlistState = watchlists.map((w) => {
        if (w._id === selectedWatchlist?._id) {
          return {
            ...w,
            tickers: [...w.tickers, option.value],
          };
        }
        return w;
      });
      const addTickerToSelectedWatchlist = addTickerToWatchlistState.filter(
        (w) => w._id === selectedWatchlist?._id
      )[0];
      dispatch(
        addTicker(addTickerToSelectedWatchlist, addTickerToWatchlistState)
      );
    }
    setOption(null);
  };

  useEffect(() => {
    return () => {
      dispatch({ type: WATCHLISTS_NAVIGATE_BACK });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!!errorFetchingInstrumentList) {
      setSnackbar({
        show: true,
        message: errorFetchingInstrumentList,
        severity: "error",
      });
      dispatch(apiActions.clearApi(TRADE_GET_INSTRUMENTS_LIST_AF));
    }
    if (!!errorAddingTicker) {
      setSnackbar({
        show: true,
        message: errorAddingTicker,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_ADD_TICKER));
    }
    if (!!errorDeletingTicker) {
      setSnackbar({
        show: true,
        message: errorDeletingTicker,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_DELETE_TICKER));
    }
    if (!!errorFetchingQuotes) {
      setSnackbar({
        show: true,
        message: errorFetchingQuotes,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_GET_QUOTES_DEFAULT));
    }
  }, [
    errorFetchingInstrumentList,
    errorAddingTicker,
    errorDeletingTicker,
    errorFetchingQuotes,
    dispatch,
  ]);

  useEffect(() => {
    if (successDeletingTicker) {
      setInputError("");
      setOpenDeleteDialog(false);
      setOption(null);
      setSnackbar({
        show: true,
        message: "Ticker removed successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(WATCHLIST_DELETE_TICKER));
    }
  }, [successDeletingTicker, dispatch]);

  const onBackClick = useCallback(() => {
    dispatch({ type: WATCHLISTS_NAVIGATE_BACK });
  }, [dispatch]);

  const onCancelDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

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
      <Box display="flex" alignItems="center" mb="14px">
        <Text fontSize="20px" fontWeight={600} marginLeft="10px">
          {selectedWatchlist?.name}
        </Text>
      </Box>
      <form className={classes.search} onSubmit={handleAddItem}>
        <TickerSearch
          placeholder="Add a ticker"
          fullWidth={true}
          variant="search"
          size="medium"
          searchIconPosition="end"
          searchIconSpacing="10px"
          inputVariant="outlined"
          color={theme}
          onChange={onInputChange}
          value={option}
          error={!!inputError}
          errorMessage={inputError}
        />
        <Button
          type="submit"
          disabled={
            isFetchingInstrumentList || isAddingTicker || isDeletingTicker
          }
          variant="outlined"
          round
          className={classes.addButton}
        >
          <AddIcon />
        </Button>
      </form>
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
        ) : selectedWatchlist?.tickers.length === 0 && rowsData.length === 0 ? (
          <Box display="block" padding="40px 16px 50px">
            <Text variant="body1" fontWeight={500} textAlign="center">
              Your Watchlist is empty. Add symbols to get started.
            </Text>
          </Box>
        ) : isAddingTicker || isDeletingTicker || isFetchingQuotes ? (
          <>
            <Table
              rows={[]}
              columns={columnsData}
              containerWidth="100%"
              borderRadius="10px"
              withPagination={false}
            />
            <div>
              {selectedWatchlist?.tickers.map(() => (
                <Box display="flex" alignItems="center">
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
      <Box display="block" paddingRight="0px" marginTop="24px">
        <Button
          onClick={onBackClick}
          variant="outlined"
          round
          className={classes.back}
          height="50px"
          width="150px"
        >
          <ArrowBackIosIcon /> Watchlists
        </Button>
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
  );
};

export default WatchlistDetail;
