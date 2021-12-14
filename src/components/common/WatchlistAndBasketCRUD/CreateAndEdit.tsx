import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWatchlist,
  updateWatchlist,
} from "store/actions/watchlist.actions";
import { IWatchlistItem } from "store/reducers/watchlist.reducers";
import { IAppState } from "store/store.interface";
import {
  BASKETS_CREATE_BASKET,
  WATCHLIST_CREATE_WATCHLIST,
} from "store/store.types";
import { Box, Button, Input } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IBasketItem } from "store/reducers/baskets.reducers";
import { createBasket, updateBasket } from "store/actions/baskets.actions";

interface IProps {
  componentType: "watchlist" | "basket";
  item?: IWatchlistItem | IBasketItem;
  onClose: () => void;
}

const CreateAndEdit: React.FC<IProps> = ({ item, onClose, componentType }) => {
  const { watchlists = [], baskets = [] } = useSelector((state: IAppState) => ({
    ...state.watchlist,
    ...state.baskets,
  }));
  const { theme } = useAppInfo();
  const [listName, setListName] = useState(item && item.name);
  const [touched, setTouched] = useState(!!item?._id ? false : true);
  const [inputError, setInputError] = useState("");

  const dispatch = useDispatch();

  const isEdit = useMemo(() => !!item?._id, [item]);
  // loading state
  const { isLoading: isCreatingWatchlist } = useApiInfo(
    WATCHLIST_CREATE_WATCHLIST
  );
  const { isLoading: isCreatingBasket } = useApiInfo(BASKETS_CREATE_BASKET);
  ////////////////

  const onClickHandler = useCallback(() => {
    if (componentType === "watchlist") {
      if (isEdit) {
        if (item && item._id) {
          dispatch(
            updateWatchlist({
              _id: item._id,
              tickers: item.tickers,
              name: listName,
            })
          );
        }
      } else {
        dispatch(
          createWatchlist({
            _id: "",
            tickers: [],
            name: listName,
          })
        );
      }
    }

    if (componentType === "basket") {
      if (isEdit) {
        if (item && item._id) {
          dispatch(
            updateBasket({
              _id: item._id,
              tickers: item.tickers,
              name: listName,
            })
          );
        }
      } else {
        dispatch(
          createBasket({
            _id: "",
            tickers: [],
            name: listName,
          })
        );
      }
    }
  }, [dispatch, listName, item, isEdit, componentType]);

  const onChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!item?._id) {
      setTouched(true);
    }
    const listNameValue = event.target.value;
    setListName(listNameValue);
    setInputError("");

    if (componentType === "watchlist") {
      const nameExist =
        watchlists.filter(
          (watchlist) =>
            watchlist.name.toLowerCase() === listNameValue.toLowerCase().trim()
        ).length > 0;
      if (nameExist) {
        setInputError(`${listNameValue} already exist`);
      }
    }

    if (componentType === "basket") {
      const nameExist =
        baskets.filter(
          (basket) =>
            basket.name.toLowerCase() === listNameValue.toLowerCase().trim()
        ).length > 0;
      if (nameExist) {
        setInputError(`${listNameValue} already exist`);
      }
    }
  };
  return (
    <Box display="block" p="24px">
      <Box maxWidth="100%" width="420px" mb="24px">
        <Input
          variant="outlined"
          size="medium"
          value={listName}
          label={`${
            componentType === "watchlist" ? "Watchlist" : "Basket"
          } name`}
          onChange={onChangeNameHandler}
          color={theme}
          error={!!inputError}
          errorMessage={inputError}
        />
      </Box>
      <Box display="grid" gridTemplateColumns={"1fr 1fr"} gridGap="20px">
        <Button
          round
          fullWidth
          variant="outlined"
          color={theme}
          onClick={onClose}
          type="button"
          disabled={isCreatingWatchlist || isCreatingBasket}
        >
          Cancel
        </Button>
        <Button
          round
          fullWidth
          variant="contained"
          color={theme}
          disabled={!listName || !touched || !!inputError}
          isLoading={isCreatingWatchlist || isCreatingBasket}
          type="button"
          onClick={onClickHandler}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAndEdit;
