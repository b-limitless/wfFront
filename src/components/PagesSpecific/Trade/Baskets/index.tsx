import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { BASKETS_ARCHIVE_PAGE, BASKETS_DETAIL_PAGE } from "store/store.types";
import ArchivePage from "./ArchivePage";
import DetailPage from "./DetailPage";

const BasketComponent: React.FC = () => {
  const { page } = useSelector((state: IAppState) => state.baskets.render);

  const renderComponent = useCallback(() => {
    switch (page) {
      case BASKETS_ARCHIVE_PAGE:
        return <ArchivePage />;
      case BASKETS_DETAIL_PAGE:
        return <DetailPage />;

      default:
        return null;
    }
  }, [page]);

  return <div>{renderComponent()}</div>;
};

export default BasketComponent;
