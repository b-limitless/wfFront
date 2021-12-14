import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBasketItem } from "store/reducers/baskets.reducers";
import {
  BASKETS_DETAIL_PAGE,
  BASKETS_GET_BASKETS,
  BASKETS_SET_PAGE,
  STRATEGIES_GET_USER_STRATEGIES,
} from "store/store.types";
import { useApiInfo, useBreakPoints } from "trolly/hooks";
import { apiActions } from "trolly/store";
import { IStrategy } from "store/reducers/strategies.reducers";
import { IAppState } from "store/store.interface";

export const useBaskets = () => {
  // #region data and actions
  const dispatch = useDispatch();

  const { subscribed } = useSelector((state: IAppState) => state.strategies);

  const { error: basketsError } = useApiInfo(BASKETS_GET_BASKETS);
  const { error: userStrategiesError } = useApiInfo(
    STRATEGIES_GET_USER_STRATEGIES
  );

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [item, setItem] = useState<IBasketItem>();
  const [wealthfaceStrategy, setWealthfaceStrategy] = useState<IStrategy>();

  const onCloseSnackbar = () => {
    dispatch(apiActions.clearApi(BASKETS_GET_BASKETS));
    dispatch(apiActions.clearApi(STRATEGIES_GET_USER_STRATEGIES));
  };

  const openDialog = () => {
    setOpen(true);
  };

  const openDeleteBasketDialog = (item: IBasketItem) => () => {
    setItem(item);
    setOpenDelete(true);
    setWealthfaceStrategy(undefined);
  };

  const openDeleteStrategyDialog = useCallback(
    (wealthfaceStrategy: IStrategy) => () => {
      setWealthfaceStrategy(wealthfaceStrategy);
      setOpenDelete(true);
      setItem(undefined);
    },
    []
  );

  const closeDialog = () => {
    setOpen(false);
    setOpenDelete(false);
    setItem(undefined);
    setWealthfaceStrategy(undefined);
  };

  const handleCreate = useCallback(() => {
    setEditMode(false);
    openDialog();
  }, []);

  const handleEdit = useCallback(
    (item: IBasketItem) => () => {
      setEditMode(true);
      setItem(item);
      openDialog();
    },
    []
  );

  const handleClick = useCallback(
    (item: any, type: "wealthface" | "user") => () => {
      dispatch({
        type: BASKETS_SET_PAGE,
        payload: {
          page: BASKETS_DETAIL_PAGE,
          step: 1,
          selectedBasket: type === "user" ? item : null,
          selectedStrategy: type === "wealthface" ? item : null,
          type,
        },
      });
    },
    [dispatch]
  );

  const error = useMemo(
    () => basketsError || userStrategiesError,
    [basketsError, userStrategiesError]
  );
  // #endregion

  // #region breakpoints and sizeProperties (numOfItems, width, height)
  const { xSmall, small, medium } = useBreakPoints();
  const [numOfItems, width, height] = useMemo(() => {
    if (xSmall) {
      return [1, 220, 180];
    } else if (small) {
      return [2, 240, 180];
    } else if (medium) {
      return [3, 280, 180];
    }
    return [3, 350, 180];
  }, [small, xSmall, medium]);
  // #endregion

  return {
    closeDialog,
    editMode,
    handleCreate,
    item,
    open,
    openDelete,
    error,
    onCloseSnackbar,
    wealthfaceStrategy,
    handleClick,
    handleEdit,
    openDeleteBasketDialog,
    openDeleteStrategyDialog,
    basketHeight: height,
    basketWidth: width,
    defaultNumOfItems: numOfItems,
    isStrategiesSubscribed: subscribed,
  };
};
