import React, { useCallback, useState, useMemo } from "react";
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
  rowsData: any[];
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
    render: { selectedStrategy, rebalanceQuote },
    trade,
  } = useSelector((state: IAppState) => ({
    ...state.trade,
    ...state.baskets,
    ...state.general,
  }));

  // #region construct the commision object from app config
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

  // #region prepare the columns header
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
      selectedStrategy &&
      selectedStrategy.members.length > 0 &&
      instrumentsListAf &&
      instrumentsListAf.length > 0 &&
      accountSummary
    ) {
      const {
        equity: { equityPositions },
      } = accountSummary;

      const symbolEquityPositions = equityPositions.map((el) => el.symbol);
      const symbolSelectedBasket = selectedStrategy.members
        .map(
          (member) =>
            instrumentsListAf.find(
              (instrument) => instrument.ISIN === member.isin
            )?.symbol
        )
        .filter((item): item is string => !!item);
      const symbol = [...symbolEquityPositions, ...symbolSelectedBasket];
      const uniqueSymbol = symbol.filter(
        (item, index) => symbol.indexOf(item) === index
      );
      setLength(uniqueSymbol);
      dispatch(getRebalanceQuotes(uniqueSymbol.join()));
    }
  }, [accountSummary, instrumentsListAf, selectedStrategy, dispatch]);
  // #endregion

  // #region prepare the rows and the rebalance data
  const [rowsData, rebalance] = useMemo(() => {
    if (
      selectedStrategy &&
      instrumentsListAf &&
      accountSummary &&
      sellMin &&
      sellCps &&
      buyMin &&
      buyCps
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
          ISIN,
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
        const common = selectedStrategy.members.find(
          (member) =>
            equityPositions.find(
              (element) =>
                element.symbol.toLowerCase() === member.ticker.toLowerCase()
            ) && member.isin === ISIN
        );
        if (!!common) {
          targetAllocation = common.weight;
        } else {
          // set targetWeight/targetAllocation
          // For selectedBasket Tickers
          const tickerWeights = selectedStrategy.members.find(
            (member) => member.isin === ISIN
          );
          if (!!tickerWeights) {
            targetAllocation = tickerWeights.weight;
          }
        }
        /////////////////

        // Ticker Available in equityPositions
        const inEquity = equityPositions.filter(
          (el) => el.symbol.toLowerCase() === symbol.toLowerCase()
        );

        if (!!inEquity.length) {
          const { marketValue: mktValue, mktPrice, openQty } = inEquity[0];
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
                  withSign={false}
                  withIndicator={false}
                  value={changeAllocation}
                >{`${formatDecimal(changeAllocation, 2)}%`}</Indicator>
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
                  withIndicator={false}
                  withSign={false}
                  value={estimatedValue}
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
    selectedStrategy,
    buyCps,
    buyMin,
    sellCps,
    sellMin,
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
