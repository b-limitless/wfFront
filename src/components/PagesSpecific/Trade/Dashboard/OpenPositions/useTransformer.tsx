import { Symbol } from "components/common";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { TRADE_GET_ACCOUNT_SUMMARY } from "store/store.types";
import { TTableData } from "trolly/common";
import { Indicator } from "trolly/custom";
import { useApiInfo } from "trolly/hooks";
// import {
//   accountPerformance,
//   accountSummary,
// } from "store/reducers/__mocks__/trade.mock";
import { appUtils } from "trolly/utils";

const useTransformer = (
  instrumentId?: string
): {
  rowsData: any[];
  columnsData: any[];
  isLoading: boolean;
} => {
  const { accountSummary, instrumentsListAf = [] } = useSelector(
    (state: IAppState) => state.trade
  );

  const { isLoading: isSummaryLoading } = useApiInfo(TRADE_GET_ACCOUNT_SUMMARY);

  const { formatDecimal } = appUtils;
  const rowsData = useMemo(() => {
    let portfolioValue = 0;
    if (accountSummary && accountSummary.equity) {
      const {
        equity: { equityPositions, equityValue },
        cash,
      } = accountSummary;
      const { cashBalance } = cash || {};
      portfolioValue = equityValue + cashBalance;
      if (equityPositions && equityPositions.length > 0) {
        return equityPositions
          .map((position) => {
            const {
              symbol,
              mktPrice,
              openQty,
              marketValue,
              unrealizedPL,
              costBasis,
              avgPrice,
              priorClose,
            } = position;
            const { name, image, id_ } =
              instrumentsListAf.find(
                (instrument) => instrument.symbol === symbol
              ) || {};
            const allocation = (marketValue / portfolioValue) * 100;

            const change = mktPrice - priorClose;
            const changePerc = (change / priorClose) * 100;
            const unrelizedPLPerc = isNaN(unrealizedPL / costBasis)
              ? "---"
              : unrealizedPL / costBasis;
            // when the instrumentId is available and equal to instrument id that we pass to hooks
            // which is used in ticker details , or when the instrument id is not passed , then list every thing
            if ((instrumentId && id_ === instrumentId) || !instrumentId) {
              const dataToReturn = [
                {
                  id: "lastPrice",
                  value: mktPrice,
                  node: `$${formatDecimal(mktPrice, 2)}`,
                  align: "center",
                },
                {
                  id: "change",
                  value: change,
                  node: (
                    <Indicator
                      withIndicator={true}
                      withSign={false}
                      fill="full"
                      value={change}
                    >
                      {"$"}
                      {formatDecimal(Math.abs(change), 2)}(
                      {formatDecimal(Math.abs(changePerc), 2)}
                      %)
                    </Indicator>
                  ),
                  align: "center",
                },
                // open position should not be rounded
                // as it has to respect the rounding rules from dw
                {
                  id: "position",
                  value: openQty,
                  node: openQty,
                  align: "center",
                },
                {
                  id: "allocation",
                  value: allocation,
                  node: `${formatDecimal(allocation, 2)}%`,
                  align: "center",
                },
                {
                  id: "unrealizedPl",
                  value: unrealizedPL,
                  node: (
                    <Indicator
                      withIndicator={true}
                      withSign={false}
                      fill="full"
                      value={unrealizedPL}
                    >
                      {"$"}
                      {formatDecimal(Math.abs(unrealizedPL), 2)}(
                      {unrelizedPLPerc === "---"
                        ? unrelizedPLPerc
                        : formatDecimal(Math.abs(100 * unrelizedPLPerc), 2)}
                      %)
                    </Indicator>
                  ),
                  align: "center",
                },
                {
                  id: "averagePrice",
                  value: avgPrice,
                  node: `$${formatDecimal(avgPrice, 2)}`,
                  align: "center",
                },
                {
                  id: "marketValue",
                  value: marketValue,
                  node: `$${formatDecimal(marketValue, 2)}`,
                  align: "center",
                },
              ] as TTableData[];
              if (!instrumentId) {
                dataToReturn.unshift({
                  id: "symbol",
                  node: (
                    <Symbol
                      id={id_}
                      name={name}
                      symbol={symbol}
                      image={image}
                    />
                  ),
                  align: "center",
                });
              }
              return dataToReturn;
            }
            return null;
          })
          .filter((value) => value);
      }
    }
    return [];
  }, [accountSummary, instrumentId, formatDecimal, instrumentsListAf]);

  const columnsData: TTableData[] = [
    {
      id: "symbol",
      align: "left",
    },
    {
      id: "lastPrice",
      node: "Last Price",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "change",
      node: "Change",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "position",
      node: "Position",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "allocation",
      node: "Allocation(%)",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "unrealizedPl",
      node: "Unrealized P&L",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "averagePrice",
      node: "Average Price",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "marketValue",
      node: "Market Value",
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
    columnsData: instrumentId
      ? columnsData.filter((option) => option.id !== "symbol")
      : columnsData,
    isLoading: isSummaryLoading,
  };
};

export default useTransformer;
