import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountPerformance,
  getAccountSummary,
} from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import {
  TRADE_GET_ACCOUNT_PERFORMANCE,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { Card, Skeleton, Table } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import DashboardSection from "../../Dashboard/DashboardSection";
import useOpenPositionTransformer from "../../Dashboard/OpenPositions/useTransformer";

const Loader: React.FC = () => {
  return (
    <Card display="flex" justifyContent="space-between">
      <Skeleton width="100px" height={10} />
      <Skeleton width="100px" height={10} />
      <Skeleton width="100px" height={10} />
      <Skeleton width="100px" height={10} />
      <Skeleton width="100px" height={10} />
      <Skeleton width="100px" height={10} />
    </Card>
  );
};
const OpenPosition: React.FC<{
  instrumentId: string;
  symbol: string | null;
}> = ({ instrumentId, symbol }) => {
  const { accountPerformance, accountSummary } = useSelector(
    (state: IAppState) => state.trade
  );
  const { columnsData, rowsData, isLoading } = useOpenPositionTransformer(
    instrumentId
  );

  const { isSuccess: isPerformanceSuccess } = useApiInfo(
    TRADE_GET_ACCOUNT_PERFORMANCE
  );
  const { isSuccess: isSummarySuccess } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (!accountPerformance || !accountPerformance) &&
      !isPerformanceSuccess &&
      !isSummarySuccess
    ) {
      dispatch(getAccountSummary());
      dispatch(getAccountPerformance());
    }
  }, [
    dispatch,
    accountPerformance,
    accountSummary,
    isPerformanceSuccess,
    isSummarySuccess,
  ]);

  if (isLoading) {
    return (
      <DashboardSection header={symbol ? `Your ${symbol} position` : ""}>
        <Loader />
      </DashboardSection>
    );
  }
  if (rowsData.length > 0) {
    return (
      <DashboardSection header={`Your ${symbol} position`}>
        <Table
          rows={rowsData}
          columns={columnsData}
          containerWidth="100%"
          maxHeight="400px"
          borderRadius="10px"
          withPagination={false}
          withSorting={true}
          paginationAlignment="center"
          paginationSpacing="10px"
          paginationPlacement="outside"
        />
      </DashboardSection>
    );
  }
  return null;
};

export default OpenPosition;
