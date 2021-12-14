import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { IRebalanceRowsData } from "store/reducers/baskets.reducers";
import { getRebalanceQuotes } from "store/actions/baskets.actions";
import { Box, TTableData } from "trolly/common";
import { appUtils } from "trolly/utils";
import { Indicator } from "trolly/custom";
import { Symbol } from "components/common";

const useTransformer = (
  cashInput: number
): {
  rebalance: IRebalanceRowsData[];
  rowsData: TTableData[][];
  columnsData: TTableData[];
  updateRebalanceQuotes: () => void;
  tickersLength: string[];
} => {
  const { formatDecimal } = appUtils;
  const [length, setLength] = useState<string[]>([]);
  const dispatch = useDispatch();
  const {
    accountSummary,
    instrumentsListAf = [],
    render: { selectedBasket, rebalanceQuote },
    trade,
  } = useSelector((state: IAppState) => ({
    ...state.trade,
    ...state.baskets,
    ...state.general,
  }));

  // #region destructing the commesion object from the app config
  const { buyCps, buyMin, sellCps, sellMin } = useMemo(() => {
    if (trade) {
      const { commission } = trade;
      if (commission) {
        const {
          buy: { cps: buyCps, min: buyMin },
          sell: { cps: sellCps, min: sellMin },
        } = commission;
        return { buyCps, buyMin, sellCps, sellMin };
      }
    }
    return {};
  }, [trade]);
  // #endregion

  // #region prepare columns Data
  const columnsData: TTableData[] = [
    {
      id: "symbol",
      align: "left",
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
      id: "marketValue",
      node: "Market Value",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "actualAllocation",
      node: "Actual Allocation",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "targetAllocation",
      node: "Target Allocation",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "changeAllocation",
      node: "Change Allocation",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "estimatedValue",
      node: "Estimated Value",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
  ];
  // #endregion

  // #region update rebalance quptes , made separated from getBasketQuotes for a reason to be checked
  const updateRebalanceQuotes = useCallback(() => {
    if (
      selectedBasket &&
      selectedBasket.tickers.length > 0 &&
      instrumentsListAf &&
      instrumentsListAf.length > 0 &&
      accountSummary
    ) {
      const {
        equity: { equityPositions },
      } = accountSummary;

      const symbolEquityPositions = equityPositions.map((el) => el.symbol);
      const symbolSelectedBasket = selectedBasket.tickers
        .map((t) => instrumentsListAf.find((i) => i.id_ === t.inst)?.symbol)
        .filter((item): item is string => !!item);
      const symbol = [...symbolEquityPositions, ...symbolSelectedBasket];
      const uniqueSymbol = symbol.filter(
        (item, index) => symbol.indexOf(item) === index
      );
      setLength(uniqueSymbol);
      dispatch(getRebalanceQuotes(uniqueSymbol.join()));
    }
  }, [accountSummary, instrumentsListAf, selectedBasket, dispatch]);
  // #endregion

  // #region setting the data for the rebalancing and the rows data in the table
  const [rowsData, rebalance] = useMemo(() => {
    if (
      selectedBasket &&
      instrumentsListAf &&
      accountSummary &&
      sellCps &&
      sellMin &&
      buyCps &&
      buyMin
    ) {
      const {
        equity: { equityPositions, equityValue },
        // cash: {cashBalance},
        accountNo,
      } = accountSummary;
      // const portfolioValue = equityValue + cashBalance;

      const rebalanceD: IRebalanceRowsData[] = rebalanceQuote.map((quote) => {
        const { symbol, lastTrade, bid, ask, open } = quote;
        const {
          name = "",
          id_: id = "",
          image = "",
        } = instrumentsListAf.find(
          (instrument) =>
            instrument.symbol.toLowerCase() === symbol.toLowerCase()
        ) || {};

        let price = lastTrade;
        let allocation = 0;
        let targetAllocation = 0;
        let shares = 0;
        let total = 0;
        let commission = 0;
        let positionOpen = open;
        let marketValue = 0;
        let type = "";

        // if the ticker is exist in equity position then take it's weight

        // set targetWeight/targetAllocation
        // Ticker Available in both equityPositions && selectedBasket
        const common = selectedBasket.tickers.find(
          (ticker) =>
            equityPositions.find((e) => e.instrumentID === ticker.inst) &&
            ticker.inst === id
        );
        if (!!common) {
          targetAllocation = common.weight;
        } else {
          // set targetWeight/targetAllocation
          // For selectedBasket Tickers
          const tickerWeights = selectedBasket.tickers.find(
            (el) => el.inst === id
          );
          if (!!tickerWeights) {
            targetAllocation = tickerWeights.weight;
          }
        }
        /////////////////

        // Ticker Available in equityPositions
        const inEquity = equityPositions.find(
          (el) => el.symbol.toLowerCase() === symbol.toLowerCase()
        );

        if (inEquity) {
          const { marketValue: mktValue, mktPrice, openQty } = inEquity;
          marketValue = mktValue;
          allocation = (mktValue / equityValue) * 100;
          price = mktPrice;
          positionOpen = openQty;
        }

        const changeAllocation = targetAllocation - allocation;
        // const estimatedValue = equityValue * changeAllocation * 0.01;
        const estimatedValue =
          (equityValue * changeAllocation + cashInput * targetAllocation) *
          0.01;

        let amount = Math.abs(estimatedValue);

        // Buy
        if (Math.sign(estimatedValue) === 1) {
          type = "BUY";
          shares = amount / ask;
          commission = Math.max(buyMin, shares * buyCps);
          total = amount + commission;
        }
        // Sell
        if (Math.sign(estimatedValue) === -1) {
          if (targetAllocation === 0) {
            shares = positionOpen;
          } else {
            shares = Math.min(positionOpen, amount / bid);
          }
          type = "SELL";
          commission = Math.max(sellMin, shares * sellCps);
          total = amount - commission;
        }

        // estimatedValue is 0
        // set row to submitted to handle all submitted condition on next step (submit)
        // as row containing estimatedValue is 0 will not show in next step
        let isSubmitted = false;
        if (
          Math.sign(estimatedValue) === 0 ||
          Math.sign(estimatedValue) === -0
        ) {
          isSubmitted = true;
        }

        return {
          id,
          symbol,
          name,
          image,
          price,
          positionOpen,
          marketValue,
          allocation,
          targetAllocation,
          changeAllocation,
          estimatedValue,
          bid,
          ask,
          type,
          amount,
          shares,
          commission,
          total,
          accountNo,
          isSubmitting: false,
          isSubmitted,
        };
      });

      const rowsToReturn: TTableData[][] = rebalanceD.map((row) => {
        const {
          id,
          image,
          symbol,
          name,
          price,
          positionOpen,
          allocation,
          marketValue,
          targetAllocation,
          changeAllocation,
          estimatedValue,
        } = row;

        return [
          {
            id: "symbol",
            node: <Symbol id={id} image={image} name={name} symbol={symbol} />,
            align: "center",
          },
          {
            id: "price",
            value: price,
            node: `$${formatDecimal(price, 2)}`,
            align: "center",
          },
          {
            id: "position",
            value: positionOpen,
            node: formatDecimal(positionOpen, 2),
            align: "center",
          },
          {
            id: "marketValue",
            value: marketValue,
            node: `$${formatDecimal(marketValue, 2)}`,
            align: "center",
          },
          {
            id: "allocation",
            value: allocation,
            node: `${formatDecimal(allocation, 2)}%`,
            align: "center",
          },
          {
            id: "targetAllocation",
            value: targetAllocation,
            node: `${formatDecimal(targetAllocation, 2)}%`,
            align: "center",
          },
          {
            id: "changeAllocation",
            value: changeAllocation,
            node: (
              <Box display="flex" justifyContent="center" width="100%">
                <Indicator
                  value={changeAllocation}
                  withSign={false}
                  withIndicator={false}
                >
                  {`${formatDecimal(changeAllocation, 2)}%`}
                </Indicator>
              </Box>
            ),
            align: "center",
          },
          {
            id: "estimatedValue",
            value: estimatedValue,
            node: (
              <Box display="flex" justifyContent="center" width="100%">
                <Indicator
                  value={estimatedValue}
                  withSign={false}
                  withIndicator={false}
                >
                  {`$${formatDecimal(estimatedValue, 2)}`}
                </Indicator>
              </Box>
            ),
            align: "center",
          },
        ];
      });
      return [rowsToReturn, rebalanceD];
    }
    return [[], []];
  }, [
    formatDecimal,
    cashInput,
    rebalanceQuote,
    accountSummary,
    instrumentsListAf,
    selectedBasket,
    buyCps,
    buyMin,
    sellMin,
    sellCps,
  ]);
  // #endregion

  return {
    rowsData,
    columnsData,
    rebalance,
    updateRebalanceQuotes,
    tickersLength: length,
  };
};

export default useTransformer;
