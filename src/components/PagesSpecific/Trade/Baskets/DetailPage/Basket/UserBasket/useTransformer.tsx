import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { appUtils } from "trolly/utils";
import { Indicator } from "trolly/custom";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IBasketTicker } from "store/reducers/baskets.reducers";
import { TInstrumentAFType } from "store/reducers/trade.reducers";
import { Box, Button, Text, TTableData, Checkbox } from "trolly/common";
import {
  deleteTicker,
  editTickers,
  getBasketQuotes,
} from "store/actions/baskets.actions";
import {
  BASKETS_CREATE_BASKET,
  BASKETS_DELETE_TICKER,
  BASKETS_GET_BASKET_QUOTES,
  BASKETS_SET_TICKERS_EDIT_MODE,
  BASKETS_SET_TOTAL_WEIGHT,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import OperatorInput from "../../OperatorInput";
import { Symbol } from "components/common";

export const arraySum = (arr: IBasketTicker[] | undefined) => {
  return arr?.map((a) => a.weight).reduce((a, b) => a + b, 0);
};

const ColumnErrorSpace: React.FC<{ mode: boolean }> = ({ mode, children }) => {
  return (
    <>
      {mode && <Box minHeight="30px" />}
      <div>{children}</div>
    </>
  );
};

const ColumnText: React.FC<{ color: string }> = ({ color }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <InfoOutlinedIcon style={{ width: 18 }} color="error" />
      <Text fontSize="12px" fontWeight={600} marginLeft="2px" color={color}>
        The sum must be a 100%
      </Text>
    </Box>
  );
};

interface IEditState {
  tickers: IBasketTicker[];
  weight?: number;
}

const useTransformer = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const { formatDecimal } = appUtils;
  const [columnEditMode, setColumnEditMode] = useState<boolean>(false);
  const [checkWeight, setCheckWeight] = useState<boolean>(false);
  const [editState, setEditState] = useState<IEditState>({
    tickers: [],
    weight: 0,
  });
  const {
    instrumentsListAf,
    baskets,
    render: { selectedBasket, basketQuote, weight: weightState },
  } = useSelector((state: IAppState) => ({ ...state.trade, ...state.baskets }));

  // #region handle the selection checkbox for delete
  const [selectedTickers, setSelectedTickers] = useState<TInstrumentAFType[]>(
    []
  );

  const onTickerSelect = useCallback(
    (row: TInstrumentAFType) =>
      (event: React.ChangeEvent<HTMLInputElement>, checkStatus: boolean) => {
        if (checkStatus) {
          setSelectedTickers([...selectedTickers, row]);
        } else {
          setSelectedTickers(
            selectedTickers.filter((currentRow) => currentRow.id_ !== row.id_)
          );
        }
      },
    [selectedTickers]
  );

  const { isSuccess } = useApiInfo(BASKETS_DELETE_TICKER);

  const canDelete = useMemo(() => !!selectedTickers.length, [selectedTickers]);

  useEffect(() => {
    if (isSuccess) {
      setSelectedTickers([]);
    }
  }, [isSuccess]);

  const handleDeletion = useCallback(() => {
    if (baskets) {
      const state = baskets.map((b) => {
        if (b._id === selectedBasket?._id) {
          const tickers = b.tickers.filter(
            (t) => !selectedTickers.find((ticker) => ticker.id_ === t.inst)
          );
          return {
            ...b,
            tickers,
          };
        }
        return b;
      });
      const requestPayload = state.filter(
        (w) => w._id === selectedBasket?._id
      )[0];
      dispatch(deleteTicker(requestPayload, state));
    }
  }, [baskets, selectedBasket, dispatch, selectedTickers]);
  // #endregion

  const { isLoading: isFetchingQuotes, isSuccess: isSuccessFetchingQuotes } =
    useApiInfo(BASKETS_GET_BASKET_QUOTES);
  const { isLoading: isFetchingAccountSummary } = useApiInfo(
    TRADE_GET_ACCOUNT_SUMMARY
  );
  const { isLoading: isCreatingBasket } = useApiInfo(BASKETS_CREATE_BASKET);

  const handleSaveEditMode = () => {
    setColumnEditMode(false);
    dispatch(editTickers({ ...selectedBasket, tickers: editState.tickers }));
  };

  const handleCancelEditMode = () => {
    setColumnEditMode(false);
    if (selectedBasket) {
      setEditState({ tickers: selectedBasket?.tickers, weight: weightState });
    } else {
      setEditState({ tickers: [], weight: 0 });
    }
  };

  const handleEdit = () => {
    dispatch({
      type: BASKETS_SET_TICKERS_EDIT_MODE,
      payload: {
        tickers: selectedBasket?.tickers,
        totalWeight: arraySum(selectedBasket?.tickers),
      },
    });
    setColumnEditMode(true);
  };

  const matchedTickers = useMemo(() => {
    if (instrumentsListAf && instrumentsListAf.length > 0) {
      return basketQuote
        .map((tickerQuote) =>
          instrumentsListAf.find(
            (istrument) =>
              istrument.symbol.toLowerCase() ===
              tickerQuote.symbol.toLowerCase()
          )
        )
        .filter((item): item is TInstrumentAFType => !!item);
    }
  }, [basketQuote, instrumentsListAf]);

  // #region handle change event of the weight input
  const handleChange = useCallback(
    (
        row: TInstrumentAFType,
        change: "increment" | "decrement" | "inputChange"
      ) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (columnEditMode && editState) {
          const rowWeight = editState.tickers.find(
            (ticker) => ticker.inst === row.id_
          );

          let weight = rowWeight?.weight || 0;

          if (change === "inputChange") {
            const value = event.target.value;
            if (event.target.value === "") {
              weight = 0;
            } else if (!isNaN(Number(value))) {
              weight = Math.abs(parseInt(value));
            }
          }

          if (change === "increment") {
            weight = weight + 5;
          }

          if (change === "decrement") {
            weight = weight <= 5 ? 0 : weight - 5;
          }

          const tickers = editState.tickers.map((ticker) => {
            if (ticker.inst === row.id_) {
              return {
                ...ticker,
                weight,
              };
            }
            return ticker;
          });
          setEditState({ tickers, weight: arraySum(tickers) });
        }
      },
    [editState, columnEditMode]
  );
  // #endregion

  // #region prepare the rows data for the basket step
  const rowsData: TTableData[][] = useMemo(() => {
    if (
      basketQuote.length > 0 &&
      editState.tickers.length > 0 &&
      matchedTickers
    ) {
      return matchedTickers.map((row) => {
        // symbol to match with tickets quotes
        const { symbol, name, image } = row || {};
        const quote = basketQuote.find(
          (s) => s.symbol.toLowerCase() === symbol?.toLowerCase()
        );
        if (quote) {
          const { lastTrade, priorClose, change } = quote || {};
          const rowWeight = selectedBasket?.tickers.find(
            (t) => t.inst === row?.id_
          )?.weight;
          const editedWeight =
            editState.tickers?.find((t) => t.inst === row?.id_)?.weight || 0;

          return [
            {
              id: "check",
              align: "center",
              node: (
                <Checkbox
                  onChange={onTickerSelect(row as TInstrumentAFType)}
                  checked={
                    !!selectedTickers.find((ticker) => ticker.id_ === row?.id_)
                  }
                  customColor="danger"
                />
              ),
            },
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
              node: <p>{lastTrade}</p>,
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
              node: columnEditMode ? (
                <OperatorInput
                  id={row && row?.id_}
                  value={editedWeight}
                  onChange={handleChange(row, "inputChange")}
                  onDecrement={handleChange(row, "decrement")}
                  onIncrement={handleChange(row, "increment")}
                />
              ) : (
                `${rowWeight}%`
              ),
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
  }, [
    basketQuote,
    columnEditMode,
    editState,
    formatDecimal,
    handleChange,
    selectedBasket,
    matchedTickers,
    onTickerSelect,
    selectedTickers,
  ]);
  // #endregion

  // #region prepare the columns headers
  const columnsData: TTableData[] = [
    {
      id: "check",
    },
    {
      id: "symbol",
      align: "center",
      styles: {
        fontSize: "14px",
        width: 170,
        verticalAlign: "top",
        fontWeight: 600,
      },
    },
    {
      id: "price",
      node: <ColumnErrorSpace mode={checkWeight}>Price</ColumnErrorSpace>,
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
      node: <ColumnErrorSpace mode={checkWeight}>Change</ColumnErrorSpace>,
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
      node: <ColumnErrorSpace mode={checkWeight}>High</ColumnErrorSpace>,
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
      node: <ColumnErrorSpace mode={checkWeight}>low</ColumnErrorSpace>,
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
      node: <ColumnErrorSpace mode={checkWeight}>Volume</ColumnErrorSpace>,
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
      node: (
        <>
          {checkWeight && (
            <Box minHeight="30px">
              <ColumnText color={palette.error.main} />
            </Box>
          )}
          <div>Target Allocation</div>
          {columnEditMode ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop="10px"
            >
              <Button
                onClick={handleSaveEditMode}
                color={theme}
                round
                disabled={editState.weight !== 100}
                fontSize="12px"
                padding="2px 8px"
              >
                Save
              </Button>
              <Box
                width="1px"
                height="16px"
                style={{
                  backgroundColor: palette[theme].main,
                  margin: "0 2px",
                }}
              />
              <Button
                onClick={handleCancelEditMode}
                color={theme}
                round
                fontSize="12px"
                padding="2px 8px"
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop="10px"
            >
              <Button
                onClick={handleEdit}
                color={theme}
                round
                disabled={
                  isFetchingQuotes || isCreatingBasket || rowsData.length === 0
                }
                fontSize="12px"
                padding="2px 8px"
              >
                Edit
              </Button>
            </Box>
          )}
        </>
      ),
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

  // #region matching the basket tickers ids with the instruments list ids
  useEffect(() => {
    if (
      selectedBasket &&
      selectedBasket.tickers.length > 0 &&
      instrumentsListAf &&
      instrumentsListAf.length > 0
    ) {
      // the selected basket from wf is handling the inst (id) and weight in tickers array
      // we need to get the symbol name by matching the id from the list of instruments
      const matched = selectedBasket.tickers
        .map((t) => instrumentsListAf.find((i) => i.id_ === t.inst))
        .filter((item) => item);
      const symbol = matched.map((m) => m?.symbol);
      dispatch(getBasketQuotes(symbol.join()));
    }
  }, [dispatch, selectedBasket, instrumentsListAf]);
  // #endregion

  useEffect(() => {
    if (columnEditMode) {
      if (editState.weight !== 100) {
        setCheckWeight(true);
      } else {
        setCheckWeight(false);
      }
      return;
    } else {
      if (
        weightState !== 100 &&
        !isFetchingQuotes &&
        !isFetchingAccountSummary
      ) {
        setCheckWeight(true);
      } else {
        setCheckWeight(false);
      }
    }
  }, [
    columnEditMode,
    editState,
    weightState,
    isFetchingQuotes,
    isFetchingAccountSummary,
  ]);

  useEffect(() => {
    if (isSuccessFetchingQuotes && selectedBasket) {
      setEditState({
        tickers: selectedBasket?.tickers,
        weight: arraySum(selectedBasket?.tickers),
      });
      dispatch({
        type: BASKETS_SET_TOTAL_WEIGHT,
        payload: arraySum(selectedBasket?.tickers),
      });
      dispatch(apiActions.clearApi(BASKETS_GET_BASKET_QUOTES));
    }
  }, [selectedBasket, isSuccessFetchingQuotes, dispatch]);

  return {
    columnsData,
    rowsData,
    isEditing: columnEditMode,
    handleDeletion,
    canDelete,
  };
};

export default useTransformer;
