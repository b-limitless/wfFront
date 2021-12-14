import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiActions } from "trolly/store";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IWatchlistItem } from "store/reducers/watchlist.reducers";
import { Box, Dialog, ESeverity, Snackbar, Text } from "trolly/common";
import CreateAndEdit from "./CreateAndEdit";
import AddToList from "./Add";
import Delete from "./Delete";
import {
  BASKETS_ADD_TICKER_TO_BASKET,
  BASKETS_CREATE_BASKET,
  BASKETS_DELETE_BASKET,
  BASKETS_GET_BASKETS,
  STRATEGIES_DELETE_USER_STRATEGY,
  WATCHLIST_ADD_TICKER_TO_WATCHLIST,
  WATCHLIST_CREATE_WATCHLIST,
  WATCHLIST_DELETE_WATCHLIST,
  WATCHLIST_GET_WATCHLISTS,
} from "store/store.types";
import { IBasketItem } from "store/reducers/baskets.reducers";
import { IStrategy } from "store/reducers/strategies.reducers";

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

interface IProps {
  componentType: "watchlist" | "basket";
  open: boolean;
  headerText: string;
  type: "create" | "delete" | "addToWatchlist" | "addToBasket";
  item?: IWatchlistItem | IBasketItem;
  strategy?: IStrategy;
  onClose: () => void;
}

const Index: React.FC<IProps> = (props) => {
  const {
    componentType,
    type,
    open: openProp,
    headerText,
    item,
    onClose,
    strategy,
  } = props;
  const { theme } = useAppInfo();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(openProp);
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });

  const { error: errorFetchingWatchlists } = useApiInfo(
    WATCHLIST_GET_WATCHLISTS
  );
  const { error: errorFetchingBaskets } = useApiInfo(BASKETS_GET_BASKETS);
  const {
    isSuccess: isSuccessCreatingWatchlist,
    error: errorCreatingWatchlist,
  } = useApiInfo(WATCHLIST_CREATE_WATCHLIST);
  const { isSuccess: isSuccessCreatingBasket, error: errorCreatingBasket } =
    useApiInfo(BASKETS_CREATE_BASKET);
  const {
    isSuccess: isSuccessDeletingWatchlist,
    error: errorDeletingWatchlist,
  } = useApiInfo(WATCHLIST_DELETE_WATCHLIST);
  const { isSuccess: isSuccessDeletingBasket, error: errorDeletingBasket } =
    useApiInfo(BASKETS_DELETE_BASKET);
  const {
    isSuccess: isSuccessAddingTickerToWatchlist,
    error: errorAddingTickerToWatchlist,
  } = useApiInfo(WATCHLIST_ADD_TICKER_TO_WATCHLIST);
  const {
    isSuccess: isSuccessAddingTickerToBasket,
    error: errorAddingTickerToBasket,
  } = useApiInfo(BASKETS_ADD_TICKER_TO_BASKET);
  const { isSuccess: isSuccessDeleteStrategy, error: errorDeletingStrategy } =
    useApiInfo(STRATEGIES_DELETE_USER_STRATEGY);

  const closeDialog = useCallback(() => {
    onClose();
    dispatch(apiActions.clearApi(WATCHLIST_CREATE_WATCHLIST));
    dispatch(apiActions.clearApi(WATCHLIST_DELETE_WATCHLIST));
    dispatch(apiActions.clearApi(WATCHLIST_ADD_TICKER_TO_WATCHLIST));
    dispatch(apiActions.clearApi(STRATEGIES_DELETE_USER_STRATEGY));
  }, [dispatch, onClose]);

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  useEffect(() => {
    if (isSuccessCreatingWatchlist) {
      closeDialog();
      let message = "";
      if (id && !item) {
        message = "New Watchlist created and ticker added successfully!";
      } else if (!id && item && item._id) {
        message = "Watchlist updated successfully!";
      } else {
        message = "New Watchlist created successfully";
      }
      setSnackbar({
        show: true,
        message,
        severity: "success",
      });
      dispatch(apiActions.clearApi(WATCHLIST_CREATE_WATCHLIST));
    }
    if (isSuccessCreatingBasket) {
      closeDialog();
      let message = "";
      if (id && !item) {
        message = "New basket created and ticker added successfully!";
      } else if (!id && item && item._id) {
        message = "Basket updated successfully!";
      } else {
        message = "New basket created successfully";
      }
      setSnackbar({
        show: true,
        message,
        severity: "success",
      });
      dispatch(apiActions.clearApi(BASKETS_CREATE_BASKET));
    }
    if (isSuccessDeletingWatchlist) {
      closeDialog();
      setSnackbar({
        show: true,
        message: "Watchlist deleted successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(WATCHLIST_DELETE_WATCHLIST));
    }
    if (isSuccessDeletingBasket) {
      closeDialog();
      setSnackbar({
        show: true,
        message: "Basket deleted successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(BASKETS_DELETE_BASKET));
    }
    if (isSuccessAddingTickerToWatchlist) {
      closeDialog();
      setSnackbar({
        show: true,
        message: "Ticker added to watchlist successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(WATCHLIST_ADD_TICKER_TO_WATCHLIST));
    }
    if (isSuccessAddingTickerToBasket) {
      closeDialog();
      setSnackbar({
        show: true,
        message: "Ticker added to basket successfully!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(BASKETS_ADD_TICKER_TO_BASKET));
    }
    if (isSuccessDeleteStrategy) {
      closeDialog();
      setSnackbar({
        show: true,
        message: `${strategy?.name} Basket deleted successfully!`,
        severity: "success",
      });
    }
  }, [
    isSuccessAddingTickerToBasket,
    isSuccessDeletingBasket,
    isSuccessCreatingBasket,
    isSuccessAddingTickerToWatchlist,
    isSuccessCreatingWatchlist,
    isSuccessDeletingWatchlist,
    isSuccessDeleteStrategy,
    strategy,
    closeDialog,
    dispatch,
    id,
    item,
  ]);

  useEffect(() => {
    if (!!errorFetchingWatchlists) {
      setSnackbar({
        show: true,
        message: errorFetchingWatchlists,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_GET_WATCHLISTS));
    }
    if (!!errorFetchingBaskets) {
      setSnackbar({
        show: true,
        message: errorFetchingBaskets,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_GET_BASKETS));
    }
    if (!!errorCreatingWatchlist) {
      setSnackbar({
        show: true,
        message: errorCreatingWatchlist,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_CREATE_WATCHLIST));
    }
    if (!!errorCreatingBasket) {
      setSnackbar({
        show: true,
        message: errorCreatingBasket,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_CREATE_BASKET));
    }
    if (!!errorDeletingWatchlist) {
      setSnackbar({
        show: true,
        message: errorDeletingWatchlist,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_DELETE_WATCHLIST));
    }
    if (!!errorDeletingBasket) {
      setSnackbar({
        show: true,
        message: errorDeletingBasket,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_DELETE_BASKET));
    }
    if (!!errorDeletingStrategy) {
      setSnackbar({
        show: true,
        message: errorDeletingStrategy,
        severity: "error",
      });
      dispatch(apiActions.clearApi(STRATEGIES_DELETE_USER_STRATEGY));
    }
    if (!!errorAddingTickerToWatchlist) {
      setSnackbar({
        show: true,
        message: errorAddingTickerToWatchlist,
        severity: "error",
      });
      dispatch(apiActions.clearApi(WATCHLIST_ADD_TICKER_TO_WATCHLIST));
    }
    if (!!errorAddingTickerToBasket) {
      setSnackbar({
        show: true,
        message: errorAddingTickerToBasket,
        severity: "error",
      });
      dispatch(apiActions.clearApi(BASKETS_ADD_TICKER_TO_BASKET));
    }
  }, [
    errorAddingTickerToBasket,
    errorDeletingBasket,
    errorCreatingBasket,
    errorFetchingBaskets,
    errorAddingTickerToWatchlist,
    errorFetchingWatchlists,
    errorCreatingWatchlist,
    errorDeletingWatchlist,
    errorDeletingStrategy,
    dispatch,
  ]);

  const component = useMemo(() => {
    if (type === "addToWatchlist" || type === "addToBasket") {
      return (
        <AddToList
          componentType={componentType}
          onClose={closeDialog}
          tickerId={id}
        />
      );
    } else if (type === "create") {
      return (
        <CreateAndEdit
          componentType={componentType}
          onClose={closeDialog}
          item={item}
        />
      );
    } else if (type === "delete") {
      return (
        <Delete
          componentType={componentType}
          onClose={closeDialog}
          item={item}
          strategy={strategy}
        />
      );
    }
  }, [componentType, item, type, id, closeDialog, strategy]);

  return (
    <>
      <Dialog
        open={open}
        onClose={closeDialog}
        withCloseIcon={true}
        closeIconPosition="end"
        withAnimation={true}
        animationVariant="fade"
        color={type === "delete" ? "danger" : theme}
        withColoredHeader={true}
        borderRadius="10px"
        dialogTitle={
          <Text
            fontSize="18px"
            paddingLeft="10px"
            fontWeight={500}
            color="common.white"
          >
            {headerText}
          </Text>
        }
        titlePadding="10px 10px 3px 10px"
      >
        <Box
          display="flex"
          flexDirection="column"
          minWidth={["100%", "350px", "420px", "420px"]}
        >
          {component}
        </Box>
      </Dialog>

      <Snackbar
        severity={snackbar.severity}
        vertical="top"
        horizontal="center"
        open={snackbar.show}
        onClose={onCloseSnackbar}
        handleClose={onCloseSnackbar}
        autoHideDuration={5000}
        transitionDuration={{ enter: 250, exit: 0 }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export default Index;
