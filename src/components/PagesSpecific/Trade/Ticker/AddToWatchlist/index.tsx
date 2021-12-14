import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

const AddToWatchlist: React.FC = () => {
  const [addToWatchlist, setAddTOWatchlist] = useState(false);

  const onCloseDialog = () => {
    setAddTOWatchlist(false);
  };

  const onClickAddToWatchlist = () => {
    setAddTOWatchlist(true);
  };

  return (
    <div>
      <AddButton onClick={onClickAddToWatchlist} round title="add to watchlist">
        <VisibilityIcon />
      </AddButton>

      <CRUDDialog
        componentType="watchlist"
        type="addToWatchlist"
        open={addToWatchlist}
        onClose={onCloseDialog}
        headerText="Add to watchlist"
      />
    </div>
  );
};

export default AddToWatchlist;
