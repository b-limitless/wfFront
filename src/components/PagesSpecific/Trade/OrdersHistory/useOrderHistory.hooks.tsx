import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Link, TTableData } from "trolly/common";
import { cancelOrder } from "store/actions/trade.actions";
// import {
//   accountPerformance,
//   accountSummary,
// } from "store/reducers/__mocks__/trade.mock";
import { appUtils } from "trolly/utils";
import { DiCTIONARIES } from "../Trade.config";
import { useApiInfo } from "trolly/hooks";
import { TRADE_GET_ACCOUNT_SUMMARY } from "store/store.types";

const useOrdersHistory = (
  filters: {
    [key: string]: any;
  },
  isLoading?: boolean
): {
  rowsData: any[];
  columnsData: any[];
  isLoading: boolean;
} => {
  const { accountSummary } = useSelector((state: IAppState) => state.trade);

  const { isLoading: isGettingSummary } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);

  const { formatDate, formatDecimal } = appUtils;

  const dispatch = useDispatch();

  const cancelOrderHandler = useCallback(
    (orderId: string) => () => {
      if (!isLoading) {
        dispatch(cancelOrder(orderId));
      }
    },
    [dispatch, isLoading]
  );

  // TODO check if we need to handle a condition for enabling the cancel button
  // const canCancel = (status: string, orderType: string) => {
  // const { orderStatusDic, orderTypeDic } = DiCTIONARIES;
  // return (
  //   [orderTypeDic["2"], orderTypeDic["3"]].indexOf(orderType) > -1 &&
  //   [orderStatusDic["0"], orderStatusDic["1"]].indexOf(status) > -1
  // );
  // };

  const getActions = useCallback(
    (orderID: string) => {
      return (
        <Link
          color="danger"
          fontSize="13px"
          onClick={cancelOrderHandler(orderID)}
        >
          Cancel
        </Link>
      );
    },
    [cancelOrderHandler]
  );

  const isFilterPassed = useCallback(
    (order: any) => {
      const {
        startDate,
        endDate,
        side: filterSide,
        orderType: filterOrderType,
        search,
        status,
      } = filters;
      const { symbol, orderNo, createdWhen, side, orderType, orderStatus } =
        order;
      let isPassed = true;
      if (search) {
        const formatedSearch = search.toLowerCase();
        const formatedSymbol = symbol.toLowerCase();
        const formatedOrderNo = orderNo.toLowerCase();
        if (
          formatedSymbol.indexOf(formatedSearch) < 0 &&
          formatedOrderNo.indexOf(formatedSearch) < 0
        )
          isPassed = false;
      } else if (filterSide && filterSide !== "all" && filterSide !== side) {
        isPassed = false;
      } else if (
        filterOrderType &&
        filterOrderType !== "all" &&
        orderType !== filterOrderType
      ) {
        isPassed = false;
      } else if (status && status !== "all" && orderStatus !== status) {
        isPassed = false;
      } else if (startDate && endDate && createdWhen) {
        const created = new Date(createdWhen);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (created < start || created > end) {
          isPassed = false;
        }
      }
      if (isPassed) {
        return order;
      }
    },
    [filters]
  );

  const rowsData = useMemo(() => {
    if (accountSummary) {
      const { orders } = accountSummary;
      const { orderSideDic, orderStatusDic, orderTypeDic } = DiCTIONARIES;
      if (orders && orders.length > 0) {
        return orders
          .filter((order) => isFilterPassed(order))
          .map((transation) => {
            const {
              orderID,
              createdWhen,
              orderType,
              symbol,
              side,
              orderQty,
              cumQty = 0,
              orderStatus,
              limitPrice,
              stopPrice,
            } = transation;
            const whenDate = formatDate(new Date(createdWhen).getTime(), {
              isFull: true,
              isLocal: true,
              withTime: true,
            });
            const type = orderTypeDic[orderType];
            const orderSide = orderSideDic[side];
            const status = orderStatusDic[orderStatus];
            const price =
              formatDecimal(limitPrice, 2) || formatDecimal(stopPrice, 2) || 0;
            const dataToReturn = [
              {
                id: "date",
                node: whenDate,
                value: whenDate,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "type",
                node: type,
                value: type,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "symbol",
                node: symbol,
                value: symbol,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "side",
                node: orderSide,
                value: orderSide,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "quantity",
                node: formatDecimal(orderQty, 8),
                value: orderQty,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "filledQuantity",
                node: formatDecimal(cumQty, 8),
                value: cumQty,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "price",
                node: `$${price}`,
                value: limitPrice || stopPrice || 0,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "status",
                node: status,
                value: status,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "action",
                node: getActions(orderID),
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
            ] as TTableData[];
            return dataToReturn;
          })
          .filter((value) => value);
      }
    }
    return [];
  }, [accountSummary, formatDate, isFilterPassed, getActions, formatDecimal]);

  const columnsData: TTableData[] = [
    {
      id: "date",
      node: "Date",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "type",
      node: "Type",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "symbol",
      node: "Symbol",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "side",
      node: "Side",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "quantity",
      node: "Quantity",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "filledQuantity",
      node: "Filled Quantity",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "price",
      node: "Price",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "status",
      node: "Status",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "action",
      node: "Action",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
  ];

  return {
    rowsData,
    columnsData,
    isLoading: isGettingSummary,
  };
};

export default useOrdersHistory;
