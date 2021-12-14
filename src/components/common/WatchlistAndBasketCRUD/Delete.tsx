import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteWatchlist } from "store/actions/watchlist.actions";
import { IWatchlistItem } from "store/reducers/watchlist.reducers";
import {
  BASKETS_DELETE_BASKET,
  STRATEGIES_DELETE_USER_STRATEGY,
  WATCHLIST_DELETE_WATCHLIST,
} from "store/store.types";
import { Box, Button, Text } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { useStyles } from "./CustomDialog.style";
import { IBasketItem } from "store/reducers/baskets.reducers";
import { deleteBasket } from "store/actions/baskets.actions";
import { deleteUserStrategy } from "store/actions/strategies.actions";
import { IStrategy } from "store/reducers/strategies.reducers";

interface IProps {
  componentType: "watchlist" | "basket";
  item?: IWatchlistItem | IBasketItem;
  onClose: () => void;
  strategy?: IStrategy;
}

const CreateAndEdit: React.FC<IProps> = ({
  item,
  onClose,
  componentType,
  strategy,
}) => {
  const classes = useStyles();
  const { theme } = useAppInfo();

  const dispatch = useDispatch();
  // loading state
  const { isLoading: isDeletingWatchlist } = useApiInfo(
    WATCHLIST_DELETE_WATCHLIST
  );
  const { isLoading: isDeletingBasket } = useApiInfo(BASKETS_DELETE_BASKET);
  const { isLoading: isDeletingStrategy } = useApiInfo(
    STRATEGIES_DELETE_USER_STRATEGY
  );
  ////////////////

  const onClickHandler = useCallback(() => {
    if (componentType === "watchlist") {
      if (item && item._id) {
        dispatch(deleteWatchlist(item._id));
      }
    }
    if (componentType === "basket") {
      if (item && item._id) {
        dispatch(deleteBasket(item._id));
      } else if (strategy && strategy.strategy) {
        dispatch(deleteUserStrategy({ strategyName: strategy.strategy }));
      }
    }
  }, [dispatch, item, componentType, strategy]);

  return (
    <Box display="block" p="0 20px 20px">
      <Box maxWidth="100%" width="420px" pt="10px">
        <Text
          fontSize="16px"
          width={400}
          maxWidth="100%"
          padding="5px 0 30px"
          fontWeight={400}
        >
          Are you sure to delete{" "}
          <span className={classes.deleteTextFocus}>
            {item?.name || strategy?.name}
          </span>{" "}
          ?
        </Text>
      </Box>
      <Box display="grid" gridTemplateColumns={"1fr 1fr"} gridGap="20px">
        <Button
          round
          fullWidth
          variant="outlined"
          color={theme}
          onClick={onClose}
          type="button"
          disabled={
            isDeletingStrategy || isDeletingWatchlist || isDeletingBasket
          }
          customVariant="danger"
        >
          Cancel
        </Button>
        <Button
          round
          fullWidth
          variant="contained"
          color={theme}
          disabled={!item?._id && !strategy?.strategy}
          isLoading={
            isDeletingStrategy || isDeletingWatchlist || isDeletingBasket
          }
          type="button"
          onClick={onClickHandler}
          customVariant="danger"
        >
          Yes
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAndEdit;
