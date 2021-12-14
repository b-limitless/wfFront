import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTickerToWatchlist,
  createWatchlist,
  getWatchlists,
} from "store/actions/watchlist.actions";
import { IAppState } from "store/store.interface";
import {
  BASKETS_ADD_TICKER_TO_BASKET,
  BASKETS_CREATE_BASKET,
  BASKETS_GET_BASKETS,
  WATCHLIST_ADD_TICKER_TO_WATCHLIST,
  WATCHLIST_CREATE_WATCHLIST,
  WATCHLIST_GET_WATCHLISTS,
} from "store/store.types";
import {
  Alert,
  Box,
  Button,
  Input,
  Select,
  Skeleton,
  Tabs,
} from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import {
  addTickerToBasket,
  createBasket,
  getBaskets,
} from "store/actions/baskets.actions";
import { apiActions } from "trolly/store";

const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

interface IAddProps {
  componentType: "watchlist" | "basket";
  tickerId: string;
  onClose: () => void;
}

const options = [
  { label: "Existing", value: "existing" },
  { label: "New", value: "new" },
];

const Add: React.FC<IAddProps> = ({ componentType, onClose, tickerId }) => {
  const dispatch = useDispatch();
  const { watchlists = [], baskets = [] } = useSelector((state: IAppState) => ({
    ...state.watchlist,
    ...state.baskets,
  }));

  const { isLoading: isLoadingWatchlists, error: watchlistsError } = useApiInfo(
    WATCHLIST_GET_WATCHLISTS
  );
  const { isLoading: isLoadingBaskets, error: basketsError } =
    useApiInfo(BASKETS_GET_BASKETS);

  useEffect(() => {
    if (componentType === "basket" && !baskets.length) {
      dispatch(getBaskets());
    } else if (componentType === "watchlist" && !watchlists.length) {
      dispatch(getWatchlists());
    }
    // eslint-disable-next-line
  }, []);

  const [inputError, setInputError] = useState("");
  // selected item from existing list
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  // new list name state
  const [newItemName, setNewItemName] = useState<string>("");

  const [isAlreadyExistItem, setIsAlreadyExistItem] = useState(false);

  // loading state
  const { isLoading: isAdding } = useApiInfo(WATCHLIST_ADD_TICKER_TO_WATCHLIST);
  const { isLoading: isCreating } = useApiInfo(WATCHLIST_CREATE_WATCHLIST);
  const { isLoading: isAddingBasket } = useApiInfo(
    BASKETS_ADD_TICKER_TO_BASKET
  );
  const { isLoading: isCreatingBasket } = useApiInfo(BASKETS_CREATE_BASKET);
  ////////////////

  // old list state
  const listOptions = useMemo(() => {
    // if component type is in watchlist
    if (componentType === "watchlist") {
      return watchlists.map((w) => ({ label: w.name, value: w._id }));
    }
    // if component type is in basket
    if (componentType === "basket") {
      return baskets.map((b) => ({ label: b.name, value: b._id }));
    }

    return [];
  }, [baskets, watchlists, componentType]);

  const isListExists = useMemo(
    () => listOptions && listOptions.length > 0,
    [listOptions]
  );
  /////////////////

  const { theme } = useAppInfo();
  // action will be taken from a tab (for new and existing list)
  const [selectedAction, setSelectedActions] = useState(
    isListExists ? options[0].value : options[1].value
  );
  const onChangeTabHandler = (value: any) => {
    setSelectedActions(value);
  };

  const onClickHandler = useCallback(() => {
    if (selectedAction === "new") {
      // Create New Watchlist
      if (componentType === "watchlist") {
        dispatch(
          createWatchlist({ _id: "", tickers: [tickerId], name: newItemName })
        );
      }
      // Create New Basket
      if (componentType === "basket") {
        dispatch(
          createBasket({
            _id: "",
            tickers: [{ inst: tickerId, weight: 0 }],
            name: newItemName,
          })
        );
      }
    } else {
      // add Watchlist from ticker page
      if (componentType === "watchlist") {
        const updatedWatchlistState = watchlists.map((w) => {
          if (w._id === selectedItemId) {
            return {
              ...w,
              tickers: [...w.tickers, tickerId],
            };
          }
          return w;
        });
        const requestPayload = updatedWatchlistState.filter(
          (w) => w._id === selectedItemId
        )[0];
        dispatch(addTickerToWatchlist(requestPayload, updatedWatchlistState));
      }

      // add basket from ticker page
      if (componentType === "basket") {
        const updatedBasketState = baskets.map((b) => {
          if (b._id === selectedItemId) {
            return {
              ...b,
              tickers: [...b.tickers, { inst: tickerId, weight: 0 }],
            };
          }
          return b;
        });
        const requestPayload = updatedBasketState.filter(
          (b) => b._id === selectedItemId
        )[0];
        dispatch(addTickerToBasket(requestPayload, updatedBasketState));
      }
    }
  }, [
    baskets,
    selectedAction,
    componentType,
    newItemName,
    tickerId,
    dispatch,
    selectedItemId,
    watchlists,
  ]);

  const onChangeSelectedItemHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsAlreadyExistItem(false);
    const listId = event.target.value;
    setSelectedItemId(listId);

    // Ticker exist in Watchlist
    if (componentType === "watchlist") {
      const tickerAlreadyExists =
        watchlists.filter(
          (watchlist) =>
            watchlist._id === listId && watchlist.tickers.includes(tickerId)
        ).length > 0;
      if (tickerAlreadyExists) {
        setIsAlreadyExistItem(true);
      }
    }

    // Ticker exist in Basket
    if (componentType === "basket") {
      const matchedBasket = baskets.find((b) => b._id === listId);
      const matchedTicker = matchedBasket?.tickers.filter(
        (t) => t.inst === tickerId
      );
      if (matchedTicker && matchedTicker.length) {
        setIsAlreadyExistItem(true);
      }
    }
  };

  const onChangeNewItemNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputError("");
    const listName = event.target.value;
    setNewItemName(listName);
    if (componentType === "watchlist") {
      if (
        watchlists &&
        watchlists.find(
          (watchlist) =>
            watchlist.name.toLowerCase() === listName.toLowerCase().trim()
        )
      ) {
        setInputError(`${listName} already exist`);
      }
    }
    if (componentType === "basket") {
      if (
        baskets &&
        baskets.find(
          (basket) =>
            basket.name.toLowerCase() === listName.toLowerCase().trim()
        )
      ) {
        setInputError(`${listName} already exist`);
      }
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (!tickerId) {
      return true;
    } else {
      if (
        selectedAction === "existing" &&
        (!selectedItemId || isAlreadyExistItem)
      ) {
        return true;
      } else if (selectedAction === "new" && (!newItemName || !!inputError)) {
        return true;
      }
    }
    return false;
  }, [
    selectedAction,
    selectedItemId,
    newItemName,
    tickerId,
    inputError,
    isAlreadyExistItem,
  ]);

  const onCloseErrors = () => {
    dispatch(apiActions.clearApi(WATCHLIST_GET_WATCHLISTS));
    dispatch(apiActions.clearApi(BASKETS_GET_BASKETS));
  };

  if (isLoadingBaskets || isLoadingWatchlists) {
    return (
      <Box gridTemplateColumns="1fr" gridGap="25px" padding="20px">
        {(!!watchlistsError || !!basketsError) && (
          <Alert severity="error" onClose={onCloseErrors}>
            {watchlistsError || basketsError}
          </Alert>
        )}
        <Skeleton height={20} />
        <Skeleton height={45} />
      </Box>
    );
  }

  return (
    <Box display="block" p="0 24px 24px">
      <Box display="block" width="100%" pt="10px">
        <Tabs
          tabsVariant="default"
          value={selectedAction}
          handleTabClick={onChangeTabHandler}
          theme={theme}
          options={options}
          width="100%"
          wrapperAlignment="center"
        />
      </Box>
      {selectedAction === "existing" && (
        <Box display="grid" mt="24px">
          <Select
            label={`Select ${componentType}`}
            color={theme}
            inputVariant="outlined"
            size="medium"
            variant="native"
            onNativeChange={onChangeSelectedItemHandler}
            nativeValue={selectedItemId}
            options={listOptions}
            error={isAlreadyExistItem}
            errorMessage={"Ticker already exist in this list"}
          />
        </Box>
      )}
      {selectedAction === "new" && (
        <Box display="block" mt="24px">
          <Input
            variant="outlined"
            size="medium"
            value={newItemName}
            label={`${capitalizeFirstLetter(componentType)} name`}
            onChange={onChangeNewItemNameHandler}
            color={theme}
            error={!!inputError}
            errorMessage={inputError}
          />
        </Box>
      )}
      <Box
        display="grid"
        gridTemplateColumns={"1fr 1fr"}
        gridGap="20px"
        mt="24px"
      >
        <Button
          round
          fullWidth
          variant="outlined"
          color={theme}
          onClick={onClose}
          type="button"
          disabled={
            isCreating || isAdding || isAddingBasket || isCreatingBasket
          }
        >
          Cancel
        </Button>
        <Button
          round
          fullWidth
          variant="contained"
          color={theme}
          disabled={isButtonDisabled}
          isLoading={
            isCreating || isAdding || isCreatingBasket || isAddingBasket
          }
          type="button"
          onClick={onClickHandler}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
