import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Button } from "trolly/common";
import { WatchlistAndBasketCRUD as CRUDDialog } from "components/common";
import { styled } from "@material-ui/core/styles";

const AddButton = styled(Button)({
  background: "#E7E7E7",
  height: "40px",
  padding: "8px 14px",
  "& svg": {
    color: "#000",
  },
});

const AddToBasket: React.FC = () => {
  const [addToBasket, setAddToBasket] = useState(false);

  const onCloseDialog = () => {
    setAddToBasket(false);
  };

  const onClickAddToBasket = () => {
    setAddToBasket(true);
  };

  return (
    <div>
      <AddButton onClick={onClickAddToBasket} round title="add to basket">
        <ShoppingBasketIcon />
      </AddButton>

      <CRUDDialog
        componentType="basket"
        type="addToBasket"
        open={addToBasket}
        onClose={onCloseDialog}
        headerText="Add to basket"
      />
    </div>
  );
};

export default AddToBasket;
