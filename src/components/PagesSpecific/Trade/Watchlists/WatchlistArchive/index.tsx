import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { useApiInfo } from "trolly/hooks";
import { IWatchlistItem } from "store/reducers/watchlist.reducers";
import { Text, Box, Skeleton } from "trolly/common";
import {
  WATCHLIST_GET_WATCHLISTS,
  WATCHLISTS_DETAIL,
  WATCHLISTS_SET_PAGE,
} from "store/store.types";
import ButtonItem from "components/common/ButtonItem";
import ButtonCreate from "components/common/ButtonCreate";
import {
  HelperMessage,
  WatchlistAndBasketCRUD as CRUDDialog,
} from "components/common";
import { getWatchlists } from "store/actions/watchlist.actions";

const Loader: React.FC = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
      gridGap="40px 30px"
    >
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
    </Box>
  );
};

const WatchlistArchive: React.FC = () => {
  const dispatch = useDispatch();
  const { watchlists } = useSelector((state: IAppState) => state.watchlist);
  const { isLoading: isFetchingWatchlists } = useApiInfo(
    WATCHLIST_GET_WATCHLISTS
  );

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [item, setItem] = useState<IWatchlistItem>();

  useEffect(() => {
    dispatch(getWatchlists());
  }, [dispatch]);

  const openDialog = () => {
    setOpen(true);
  };

  const openDeleteDialog = (item: IWatchlistItem) => () => {
    setItem(item);
    setOpenDelete(true);
  };

  const handleCreate = () => {
    setEditMode(false);
    openDialog();
  };

  const closeDialog = () => {
    setOpen(false);
    setOpenDelete(false);
    setItem(undefined);
  };

  const handleEdit = (item: IWatchlistItem) => () => {
    setEditMode(true);
    setItem(item);
    openDialog();
  };

  const onWatchlistButtonClick = (item: IWatchlistItem) => () => {
    dispatch({
      type: WATCHLISTS_SET_PAGE,
      payload: {
        page: WATCHLISTS_DETAIL,
        selectedWatchlist: item,
      },
    });
  };

  return (
    <>
      <Text fontSize="20px" fontWeight={600} mb="20px">
        Watchlists
      </Text>
      <HelperMessage
        title="Why create a watchlist"
        description="Create a watchlist to follow all your favourite stocks and keep track of everything"
      />

      {isFetchingWatchlists ? (
        <Loader />
      ) : (
        <>
          <Box
            display="grid"
            gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
            gridGap="30px 20px"
          >
            {watchlists &&
              watchlists.length > 0 &&
              watchlists.map((item) => (
                <ButtonItem
                  icon="watchlist"
                  type="user"
                  key={item._id}
                  onClick={onWatchlistButtonClick(item)}
                  onEdit={handleEdit(item)}
                  onDelete={openDeleteDialog(item)}
                  title={item.name}
                  subTitle={
                    item.tickers.length === 0
                      ? `0 Ticker`
                      : `${item.tickers.length} Tickers`
                  }
                  height={160}
                  createdAt={item.created_at}
                />
              ))}

            <ButtonCreate onClick={handleCreate} height={160} />
          </Box>
        </>
      )}

      <CRUDDialog
        componentType="watchlist"
        type="create"
        open={open}
        onClose={closeDialog}
        item={item}
        headerText={editMode ? "Edit watchlist" : "Create a new watchlist"}
      />

      <CRUDDialog
        componentType="watchlist"
        type="delete"
        open={openDelete}
        onClose={closeDialog}
        item={item}
        headerText="Delete Watchlist"
      />
    </>
  );
};

export default WatchlistArchive;
