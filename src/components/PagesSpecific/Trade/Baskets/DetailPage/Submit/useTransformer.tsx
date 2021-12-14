import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core";
import { history } from "config";
import { appUtils } from "trolly/utils";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { placeBasketOrder } from "store/actions/baskets.actions";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Image,
  Link,
  Text,
  TTableData,
} from "trolly/common";
import {
  BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE,
  BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
  BASKETS_POST_ORDER,
  TRADE_GET_ACCOUNT_CASH_SUMMARY,
} from "store/store.types";
import { IRebalanceRowsData } from "store/reducers/baskets.reducers";
import { getAccountCashSummary } from "store/actions/trade.actions";

const CheckType: React.FC<{ value: number }> = ({ value }) => {
  const { palette } = useTheme();
  return (
    <>
      {Math.sign(value) === 1 && <Text color={palette.success.main}>Buy</Text>}
      {Math.sign(value) === -1 && <Text color={palette.error.main}>Sell</Text>}
    </>
  );
};

const allTrue = (obj: IRebalanceRowsData[]) => {
  for (let o in obj) {
    if (!obj[o].isSubmitted) {
      return false;
    }
  }
  return true;
};

const notNumber = (number: number) => {
  return number === Infinity || isNaN(number);
};

const useTransformer = (): {
  rowsData: any[];
  columnsData: any[];
  allSubmitted: boolean;
  handleDelete: () => void;
  canDelete: boolean;
} => {
  const dispatch = useDispatch();
  const { theme } = useAppInfo();
  const { formatDecimal } = appUtils;
  const [allSubmitted, setAllSubmitted] = useState<boolean>(false);
  const [symbolState, setSymbolState] = useState<string>("");
  const [selectedTickersIds, setSelectedTickersIds] = useState<string[]>([]);
  const { submitRowsData, accountCashSummary } = useSelector(
    (state: IAppState) => ({ ...state.baskets.render, ...state.trade })
  );
  const { isLoading: isSubmittingOrder, isSuccess: successSubmittingOrder } =
    useApiInfo(BASKETS_POST_ORDER);

  // #region getting cash summary and loading , error and success state

  const updateCashSummary = useCallback(() => {
    dispatch(getAccountCashSummary());
  }, [dispatch]);

  // get the account cash summary at the render time to check each buy order if he is able to
  // send buy order or not
  useEffect(() => {
    updateCashSummary();
    // eslint-disable-next-line
  }, []);

  const { isLoading: isGettingCashSummary } = useApiInfo(
    TRADE_GET_ACCOUNT_CASH_SUMMARY
  );

  // #endregion

  const onTickerSelect = useCallback(
    (id: string) =>
      (event: React.ChangeEvent<HTMLInputElement>, checkStatus: boolean) => {
        if (checkStatus) {
          setSelectedTickersIds([...selectedTickersIds, id]);
        } else {
          setSelectedTickersIds(
            selectedTickersIds.filter((currentId) => currentId !== id)
          );
        }
      },
    [selectedTickersIds]
  );

  const canDelete = useMemo(
    () => !!selectedTickersIds.length,
    [selectedTickersIds]
  );

  const columnsData: TTableData[] = [
    {
      id: "check",
    },
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
      id: "bid",
      node: "Bid",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "ask",
      node: "Ask",
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
      id: "estAmount",
      node: (
        <>
          <div>Estimated</div>
          <div>Value</div>
        </>
      ),
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "estShares",
      node: (
        <>
          <div>Estimated</div>
          <div>Shares</div>
        </>
      ),
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "estCommission",
      node: (
        <>
          <div>Estimated</div>
          <div>Commission</div>
        </>
      ),
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "estTotal",
      node: (
        <>
          <div>Estimated</div>
          <div>Total</div>
        </>
      ),
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "actionSubmit",
      node: "",
    },
  ];

  const onSymbolCLick = (id: string) => () => {
    history.push(`/trade/ticker/${id}`);
  };

  const handleDelete = useCallback(() => {
    const filteredRow = submitRowsData.filter(
      (row) => !selectedTickersIds.find((existingId) => existingId === row.id)
    );
    dispatch({
      type: BASKETS_DELETE_TICKER_REBALANCE_QUOTES_STATE,
      payload: filteredRow,
    });
  }, [submitRowsData, dispatch, selectedTickersIds]);

  const handleSubmit = useCallback(
    (requestPayload: any) => () => {
      const updatedState = submitRowsData.map((el) => {
        if (el.symbol.toLowerCase() === requestPayload.symbol.toLowerCase()) {
          setSymbolState(el.symbol);
          return {
            ...el,
            isSubmitting: true,
            isSubmitted: false,
          };
        }
        return el;
      });

      dispatch({
        type: BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
        payload: updatedState,
      });
      dispatch(placeBasketOrder(requestPayload));
    },
    [submitRowsData, dispatch]
  );

  useEffect(() => {
    if (successSubmittingOrder) {
      const updatedState = submitRowsData.map((el) => {
        if (el.symbol.toLowerCase() === symbolState.toLowerCase()) {
          setSymbolState(el.symbol);
          return {
            ...el,
            isSubmitting: false,
            isSubmitted: true,
          };
        }
        return el;
      });

      updateCashSummary();
      dispatch({
        type: BASKETS_UPDATE_ORDER_SUBMIT_STATUS,
        payload: updatedState,
      });
      dispatch(apiActions.clearApi(BASKETS_POST_ORDER));
    }
  }, [
    successSubmittingOrder,
    submitRowsData,
    symbolState,
    dispatch,
    updateCashSummary,
  ]);

  const rowsData = useMemo(() => {
    if (submitRowsData && submitRowsData.length) {
      const sell = submitRowsData.filter(
        ({ type }) => type.toLowerCase() === "sell"
      );
      const rest = submitRowsData.filter(
        ({ type }) => type.toLowerCase() !== "sell"
      );
      const sorted = [...sell, ...rest];

      return sorted.map((row) => {
        const {
          id,
          symbol,
          image,
          name,
          price,
          bid,
          ask,
          amount,
          shares,
          commission,
          total,
          estimatedValue,
          type,
          accountNo,
          isSubmitting,
          isSubmitted,
        } = row;

        // Skip row if estimatedValue is 0
        if (
          Math.sign(estimatedValue) === 0 ||
          Math.sign(estimatedValue) === -0
        ) {
          return [];
        }

        let requestPayload = {};
        let canSendBuyOrder = true;
        if (type === "BUY") {
          const number = formatDecimal(amount, 2);
          if (number) {
            requestPayload = {
              accountNo,
              symbol,
              orderType: "MARKET",
              side: "BUY",
              amountCash: +number,
            };
          }
          // check if buy order can be sent , must the amount be less or equal to buysing order
          const { cash } = accountCashSummary || {};
          if (cash) {
            const { cashAvailableForTrade } = cash;
            if (amount > cashAvailableForTrade) {
              canSendBuyOrder = false;
            }
          }
        }
        if (type === "SELL") {
          const number = formatDecimal(shares, 8);
          if (number) {
            requestPayload = {
              accountNo,
              symbol,
              orderType: "MARKET",
              side: "SELL",
              quantity: +number,
              commission: +commission,
            };
          }
        }

        return [
          {
            id: "check",
            align: "center",
            node: (
              <Checkbox
                onChange={onTickerSelect(id)}
                checked={
                  !!selectedTickersIds.find((currentId) => currentId === id)
                }
                customColor="danger"
              />
            ),
          },
          {
            id: "symbol",
            node: (
              <Link
                fontWeight={700}
                color="secondary"
                onClick={onSymbolCLick(id)}
                fontColor="#000"
                variant="header"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignContent="center"
                  alignItems="center"
                >
                  <Card padding="6px" mr="5px" borderRadius="12px">
                    <Image
                      width="45px"
                      height="45px"
                      src={image}
                      color="secondary"
                      style={{ display: "block" }}
                    />
                  </Card>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    overflow="hidden"
                  >
                    <Text fontSize="14px" fontWeight={700} mb="3px">
                      {symbol}
                    </Text>
                    <Text
                      fontSize="12px"
                      fontWeight={500}
                      color="text.secondary"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      maxWidth="100px"
                      whiteSpace="nowrap"
                    >
                      {name}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ),
            align: "center",
          },
          {
            id: "price",
            value: price,
            node: formatDecimal(price, 2, { ignoreForceDecimal: true }),
            align: "center",
          },
          {
            id: "bid",
            value: bid,
            node: bid,
            align: "center",
          },
          {
            id: "ask",
            value: ask,
            node: ask,
            align: "center",
          },
          {
            id: "type",
            value: estimatedValue,
            node: "Market",
            align: "center",
          },
          {
            id: "side",
            value: estimatedValue,
            node: <CheckType value={estimatedValue} />,
            align: "center",
          },
          {
            id: "estAmount",
            value: amount,
            node: notNumber(amount) ? "---" : `$${formatDecimal(amount, 2)}`,
            align: "center",
          },
          {
            id: "estShares",
            value: shares,
            node: notNumber(shares) ? "---" : formatDecimal(shares, 8),
            align: "center",
          },
          {
            id: "estCommission",
            value: commission,
            node: notNumber(commission)
              ? "---"
              : `$${formatDecimal(commission, 2)}`,
            align: "center",
          },
          {
            id: "estTotal",
            value: total,
            node: notNumber(total) ? "---" : `$${formatDecimal(total, 2)}`,
            align: "center",
          },
          {
            id: "actionSubmit",
            node: (
              <div>
                <Button
                  variant="contained"
                  color={theme}
                  width="143px"
                  round
                  size="small"
                  fontSize="14px"
                  disabled={
                    isSubmittingOrder ||
                    isGettingCashSummary ||
                    isSubmitted ||
                    bid === 0 ||
                    ask === 0 ||
                    notNumber(total) ||
                    !canSendBuyOrder
                  }
                  isLoading={isSubmitting}
                  onClick={handleSubmit(requestPayload)}
                >
                  {isSubmitted ? "Order placed" : "Place order"}
                </Button>
              </div>
            ),
            align: "center",
          },
        ] as TTableData[];
      });
    }
    return [];
  }, [
    isSubmittingOrder,
    handleSubmit,
    submitRowsData,
    formatDecimal,
    theme,
    onTickerSelect,
    selectedTickersIds,
    isGettingCashSummary,
    accountCashSummary,
  ]);

  useEffect(() => {
    if (allTrue(submitRowsData)) {
      setAllSubmitted(true);
    }
  }, [submitRowsData]);

  return {
    rowsData,
    columnsData,
    allSubmitted,
    handleDelete,
    canDelete,
  };
};

export default useTransformer;
