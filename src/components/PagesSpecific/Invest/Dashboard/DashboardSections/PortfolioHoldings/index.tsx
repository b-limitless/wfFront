import React from "react";
import { useDispatch } from "react-redux";
import { INVEST_GET_USER_ALLOCATION } from "store/store.types";
import { Alert, Table } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";
import useTransformer from "./useTransformer";
import { PortfolioHoldingsLoader } from "../Loaders";

const PortfolioHoldings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useApiInfo(INVEST_GET_USER_ALLOCATION);
  const { rowsData, columnsData } = useTransformer();
  if (isLoading) {
    return <PortfolioHoldingsLoader />;
  }

  const onCloseError = () => {
    dispatch(apiActions.clearApi(INVEST_GET_USER_ALLOCATION));
  };
  return (
    <>
      {error && (
        <Alert
          severity="error"
          variant="filled"
          type="standard"
          onClose={onCloseError}
        >
          {error}
        </Alert>
      )}
      <Table
        rows={rowsData}
        columns={columnsData}
        containerWidth="100%"
        maxHeight="400px"
        withPagination={false}
        withSorting={false}
        paginationAlignment="center"
        paginationSpacing="10px"
        paginationPlacement="outside"
        boxShadow="none"
        headerBgColor="#f4f4f4"
      />
    </>
  );
};

export default PortfolioHoldings;
