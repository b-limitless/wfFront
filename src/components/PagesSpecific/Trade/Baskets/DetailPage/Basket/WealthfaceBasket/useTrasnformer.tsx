import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appUtils } from "trolly/utils";
import { Indicator } from "trolly/custom";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo } from "trolly/hooks";
import { TMember } from "store/reducers/strategies.reducers";
import { Box, TTableData } from "trolly/common";
import { getBasketQuotes } from "store/actions/baskets.actions";
import {
  BASKETS_GET_BASKET_QUOTES,
  BASKETS_SET_TOTAL_WEIGHT,
} from "store/store.types";
import { Symbol } from "components/common";

export const arraySum = (arr: TMember[] | undefined) => {
  return arr?.map((a) => a.weight).reduce((a, b) => a + b, 0);
};

const useTransformer = () => {
  const dispatch = useDispatch();
  const { formatDecimal } = appUtils;
  const {
    instrumentsListAf,
    render: { selectedStrategy, basketQuote },
  } = useSelector((state: IAppState) => ({ ...state.trade, ...state.baskets }));

  const { isSuccess: isSuccessFetchingQuotes } = useApiInfo(
    BASKETS_GET_BASKET_QUOTES
  );

  // #region prepare the columns headers
  const columnsData: TTableData[] = [
    {
      id: "symbol",
      align: "left",
      styles: {
        width: 170,
        verticalAlign: "top",
      },
    },
    {
      id: "price",
      node: "Price",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
      },
    },
    {
      id: "change",
      node: "Change",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
      },
    },
    {
      id: "high",
      node: "High",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
      },
    },
    {
      id: "low",
      node: "low",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
      },
    },
    {
      id: "volume",
      node: "Volume",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
      },
    },
    {
      id: "targetAllocation",
      node: "Target Allocation",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        verticalAlign: "top",
        paddingLeft: 0,
        paddingRight: 0,
        width: 175,
      },
    },
  ];
  // #endregion

  // #region prepare the rows data
  const rowsData: TTableData[][] = useMemo(() => {
    if (basketQuote.length > 0) {
      const matched = basketQuote.map(
        (s) =>
          instrumentsListAf?.filter(
            (i) => i.symbol.toLowerCase() === s.symbol.toLowerCase()
          )[0]
      );
      return matched.map((row) => {
        const { symbol, name, image } = row || {};
        const quote = basketQuote.find(
          (basketTickerQuote) =>
            basketTickerQuote.symbol.toLowerCase() === symbol?.toLowerCase()
        );
        if (quote) {
          const { lastTrade, priorClose, change } = quote;
          const rowWeight = (
            selectedStrategy?.members.find((t) => t.isin === row?.ISIN) || {}
          ).weight;

          return [
            {
              id: "symbol",
              value: symbol,
              node: (
                <Symbol
                  id={row?.id_}
                  image={image}
                  name={name}
                  symbol={symbol}
                />
              ),
            },
            {
              id: "price",
              value: lastTrade,
              node: (
                <p>
                  {"$"}
                  {lastTrade}
                </p>
              ),
              align: "center",
            },
            {
              id: "change",
              value: change ? change : 0,
              node:
                change === undefined || priorClose === undefined ? (
                  "-"
                ) : change === 0 || priorClose === 0 ? (
                  0
                ) : (
                  <Box display="flex" justifyContent="center" width="100%">
                    <Indicator
                      withIndicator={true}
                      withSign={false}
                      fill="full"
                      value={change}
                    >
                      {"$"}
                      {Math.abs(change)} (
                      {formatDecimal(Math.abs(100 * (change / priorClose)), 2)}
                      %)
                    </Indicator>
                  </Box>
                ),
              align: "center",
            },
            {
              id: "high",
              value: quote.high,
              node: (
                <p>
                  {"$"}
                  {quote.high}
                </p>
              ),
              align: "center",
            },
            {
              id: "low",
              value: quote.low,
              node: (
                <p>
                  {"$"}
                  {quote.low}
                </p>
              ),
              align: "center",
            },
            {
              id: "volume",
              value: quote.volume,
              node: <p>{quote.volume}</p>,
              align: "center",
            },
            {
              id: "weight",
              value: rowWeight,
              node: <div>{rowWeight}%</div>,
              align: "center",
              styles: {
                paddingLeft: 5,
                paddingRight: 5,
              },
            },
          ];
        }
        return [];
      });
    }
    return [];
  }, [instrumentsListAf, basketQuote, formatDecimal, selectedStrategy]);
  // #endregion

  // #region get the selected strategy tickers quote ,
  // by matching with the instruments list to get the right symbol
  useEffect(() => {
    if (
      selectedStrategy &&
      selectedStrategy.members.length > 0 &&
      instrumentsListAf &&
      instrumentsListAf.length > 0
    ) {
      const matched = selectedStrategy.members
        .map((member) => {
          return instrumentsListAf.find(
            (ticker) => ticker.ISIN === member.isin
          );
        })
        .filter((item) => item);

      const symbol = matched.map((m) => m?.symbol);
      dispatch(getBasketQuotes(symbol.join()));
    }
  }, [selectedStrategy, dispatch, instrumentsListAf]);
  // #endregion

  useEffect(() => {
    if (isSuccessFetchingQuotes && selectedStrategy) {
      dispatch({
        type: BASKETS_SET_TOTAL_WEIGHT,
        payload: arraySum(selectedStrategy?.members),
      });
      dispatch(apiActions.clearApi(BASKETS_GET_BASKET_QUOTES));
    }
  }, [selectedStrategy, isSuccessFetchingQuotes, dispatch]);

  return {
    columnsData,
    rowsData,
  };
};

export default useTransformer;
