import React from "react";
import { Snackbar, Text } from "trolly/common";
import {
  HelperMessage,
  WatchlistAndBasketCRUD as CRUDDialog,
} from "components/common";
import { useBaskets } from "./useBaskets.hooks";
import "@brainhubeu/react-carousel/lib/style.css";
import UserBaskets from "./UserBaskets";
import WealthfaceBaskets from "./WealthfaceBaskets";

const ArchivePage: React.FC = () => {
  const {
    closeDialog,
    editMode,
    item,
    open,
    openDelete,
    error,
    onCloseSnackbar,
    wealthfaceStrategy,
    defaultNumOfItems,
    handleClick,
    handleCreate,
    handleEdit,
    openDeleteBasketDialog,
    openDeleteStrategyDialog,
    isStrategiesSubscribed,
  } = useBaskets();

  return (
    <>
      {!!error && (
        <Snackbar
          open={!!error}
          vertical="top"
          horizontal="center"
          severity="error"
          handleClose={onCloseSnackbar}
        >
          {error}
        </Snackbar>
      )}
      <Text fontSize="20px" fontWeight={600} mb="20px">
        Baskets
      </Text>
      <HelperMessage
        title="Why create a Basket"
        description="Creating a basket can help you rebalance your stocks."
      />
      {isStrategiesSubscribed && (
        <>
          <Text
            mb="25px"
            fontSize="16px"
            color="text.secondary"
            fontWeight={700}
          >
            Wealthface Baskets{" "}
          </Text>
          <WealthfaceBaskets
            handleClick={handleClick}
            openDeleteDialog={openDeleteStrategyDialog}
            defaultNumOfItems={defaultNumOfItems}
          />
        </>
      )}
      <Text
        mt="30px"
        mb="25px"
        fontSize="16px"
        color="text.secondary"
        fontWeight={700}
      >
        My Baskets
      </Text>
      <UserBaskets
        handleClick={handleClick}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        openDeleteDialog={openDeleteBasketDialog}
        defaultNumOfItems={defaultNumOfItems}
      />
      {open && (
        <CRUDDialog
          componentType="basket"
          type="create"
          open={open}
          onClose={closeDialog}
          item={item}
          headerText={editMode ? "Edit basket" : "Create a new basket"}
        />
      )}

      {openDelete && (
        <CRUDDialog
          componentType="basket"
          type="delete"
          open={openDelete}
          onClose={closeDialog}
          item={item}
          strategy={wealthfaceStrategy}
          headerText="Delete Basket"
        />
      )}
    </>
  );
};

export default ArchivePage;
