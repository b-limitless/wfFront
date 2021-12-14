import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { TTableData } from "trolly/common";
// import {
//   accountPerformance,
//   accountSummary,
// } from "store/reducers/__mocks__/trade.mock";
import { appUtils } from "trolly/utils";
import { DiCTIONARIES, defaultValue } from "../Trade.config";

const useTransformer = (filters: {
  [key: string]: any;
}): {
  rowsData: any[];
  columnsData: any[];
  isLoading: boolean;
} => {
  const { accountSummary } = useSelector((state: IAppState) => state.trade);

  const { formatDate, formatDecimal } = appUtils;

  const isFilterPassed = useCallback(
    (transaction: any) => {
      const {
        startDate,
        endDate,
        side: filterSide,
        orderType: filterOrderType,
        search,
        status,
      } = filters;
      const { symbol, orderNo, createdWhen, side, orderType, orderStatus } =
        transaction;
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
      } else if (status && status !== "all" && status !== orderStatus) {
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
        return transaction;
      }
    },
    [filters]
  );

  const rowsData = useMemo(() => {
    if (accountSummary) {
      const { transactions } = accountSummary;
      const { orderStatusDic, orderTypeDic, orderSideDic } = DiCTIONARIES;
      if (transactions && transactions.length > 0) {
        return transactions
          .filter((transaction) => isFilterPassed(transaction))
          .map((transation) => {
            const {
              orderNo,
              createdWhen,
              executedWhen,
              orderType,
              symbol,
              side,
              orderQty,
              executedPrice,
              commission,
              orderStatus,
              cumQty,
            } = transation;
            const whenDate = formatDate(new Date(createdWhen).getTime(), {
              isFull: true,
            });
            const executedDate = executedWhen
              ? formatDate(new Date(createdWhen).getTime(), {
                  isFull: true,
                  isLocal: true,
                })
              : defaultValue;
            const type = orderTypeDic[orderType];
            const orderSide = orderSideDic[side];
            const status = orderStatusDic[orderStatus];
            // calculate the total based on side
            const totalAmount =
              side === "B"
                ? formatDecimal(orderQty * (executedPrice || 0) + commission, 4)
                : formatDecimal(
                    orderQty * (executedPrice || 0) - commission,
                    4
                  );
            const dataToReturn = [
              {
                id: "orderNumber",
                node: orderNo,
                value: orderNo,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "transactionDate",
                node: whenDate,
                value: whenDate,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "settelmentDate",
                node: executedDate,
                value: executedDate,
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
                node: formatDecimal(orderQty, 4),
                value: orderQty,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "filledQuantity",
                node: formatDecimal(cumQty, 4),
                value: cumQty,
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
                id: "executedPrice",
                node: `$${formatDecimal(executedPrice, 4) || 0}`,
                value: executedPrice || 0,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "commission",
                node: `$${formatDecimal(commission, 4)}`,
                value: commission,
                align: "center",
                styles: {
                  fontWeight: 500,
                },
              },
              {
                id: "totalAmount",
                node: `$${formatDecimal(totalAmount, 4)}`,
                value: totalAmount,
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
  }, [accountSummary, formatDate, isFilterPassed, formatDecimal]);

  const headerItemStyles = {
    fontSize: "13px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };
  const columnsData: TTableData[] = [
    {
      id: "orderNumber",
      node: "Order Number",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "transactionDate",
      node: "Transaction Date",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "settelmentDate",
      node: "Settelment Date",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "type",
      node: "Type",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "symbol",
      node: "Symbol",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "side",
      node: "Side",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "quantity",
      node: "Quantity",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "filledQuantity",
      node: "Filled Quantity",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "status",
      node: "Status",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "executedPrice",
      node: "Executed Price",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "commission",
      node: "Commission",
      align: "center",
      styles: headerItemStyles,
    },
    {
      id: "totalAmount",
      node: "Total Amount",
      align: "center",
      styles: headerItemStyles,
    },
  ];

  return {
    rowsData,
    columnsData,
    isLoading: !accountSummary,
  };
};

export default useTransformer;
