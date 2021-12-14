import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appUtils } from "trolly/utils";
import { Indicator } from "trolly/custom";
import { IAppState } from "store/store.interface";
import { TInstrumentAFType } from "store/reducers/trade.reducers";
import {
  Link,
  Box,
  Card,
  Image,
  Text,
  TTableData,
  Checkbox,
} from "trolly/common";
import { history } from "config";
import useStyles from "../watchlists.style";
import {
  deleteTicker,
  getQuotesDefault,
} from "store/actions/watchlist.actions";
import { useApiInfo } from "trolly/hooks";
import { WATCHLIST_DELETE_TICKER } from "store/store.types";

const useTransformer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rowsData, setRowsData] = useState<any>([]);
  const {
    instrumentsListAf = [],
    watchlists,
    render: { selectedWatchlist, symbolQuote },
  } = useSelector((state: IAppState) => ({
    ...state.trade,
    ...state.watchlist,
  }));

  const [selectedTickers, setSelectedTickers] = useState<TInstrumentAFType[]>(
    []
  );

  const { formatDecimal } = appUtils;

  const onSymbolCLick = (id: string | undefined) => () => {
    if (id) {
      history.push(`/trade/ticker/${id}`);
    }
  };

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

  const { isSuccess } = useApiInfo(WATCHLIST_DELETE_TICKER);

  useEffect(() => {
    if (isSuccess) {
      setSelectedTickers([]);
    }
  }, [isSuccess]);

  const handleDeletion = useCallback(() => {
    const updatedWatchlistState = watchlists?.map((w) => {
      if (w._id === selectedWatchlist?._id) {
        const tickers = w.tickers.filter(
          (t) => !selectedTickers.find((ticker) => ticker.id_ === t)
        );
        return {
          ...w,
          tickers,
        };
      }

      return w;
    });
    const updatedSelectedWatchlist = updatedWatchlistState?.filter(
      (w) => w._id === selectedWatchlist?._id
    )[0];
    dispatch(deleteTicker(updatedSelectedWatchlist, updatedWatchlistState));
  }, [watchlists, selectedWatchlist, dispatch, selectedTickers]);

  const matchedTickers = useMemo(() => {
    const matched = symbolQuote.map(
      (s) =>
        instrumentsListAf?.filter(
          (i) => i.symbol.toLowerCase() === s.symbol.toLowerCase()
        )[0]
    );
    return matched;
  }, [instrumentsListAf, symbolQuote]);

  const canDelete = useMemo(() => {
    return selectedTickers.length > 0;
  }, [selectedTickers]);

  useEffect(() => {
    if (
      selectedWatchlist &&
      selectedWatchlist.tickers.length > 0 &&
      instrumentsListAf &&
      instrumentsListAf.length > 0
    ) {
      const matched = selectedWatchlist.tickers.map((t) => {
        return instrumentsListAf.filter((i) => i.id_ === t);
      });
      if (matched.length >= 0) {
        const symbol = matched.map((m) => (m[0] ? m[0].symbol : ""));
        dispatch(getQuotesDefault(symbol.join()));
      }
    }
  }, [selectedWatchlist, instrumentsListAf, dispatch]);

  // #region colums data
  const columnsData: TTableData[] = [
    {
      id: "check",
      align: "center",
    },
    {
      id: "symbol",
      align: "center",
      styles: {
        width: 170,
        fontSize: "14px",
        fontWeight: 600,
      },
      node: "Symbol",
    },
    {
      id: "price",
      node: "Price",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
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
      },
    },
    {
      id: "low",
      node: "Low",
      align: "center",
      styles: {
        fontSize: "14px",
        fontWeight: 600,
        whiteSpace: "nowrap",
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
      },
    },
  ];

  // #endregion

  // #region update the rows data
  useEffect(() => {
    if (symbolQuote.length === 0) {
      setRowsData([]);
      return;
    }

    if (symbolQuote.length > 0) {
      const newRows = matchedTickers.map((row) => {
        const { symbol, name } = row || {};
        const { image } =
          (instrumentsListAf || []).find(
            (instrument) => instrument.symbol === symbol
          ) || {};
        const quote = symbolQuote.filter(
          (s) => s.symbol.toLowerCase() === symbol?.toLowerCase()
        )[0];
        const { lastTrade, priorClose, change } = quote;

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
              <Link
                fontWeight={700}
                color="secondary"
                onClick={onSymbolCLick(row?.id_)}
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
          },
          {
            id: "price",
            value: "$756",
            node: <p>${lastTrade}</p>,
            align: "center",
          },
          {
            id: "change",
            value: "40",
            node:
              change === undefined || priorClose === undefined ? (
                "-"
              ) : change === 0 || priorClose === 0 ? (
                0
              ) : (
                <Box display="flex" justifyContent="center" width="100%">
                  <Indicator
                    withIndicator={true}
                    fill="full"
                    value={change}
                    withSign={false}
                  >
                    ${Math.abs(change)} (
                    {formatDecimal(Math.abs(100 * (change / priorClose)), 2)}%)
                  </Indicator>
                </Box>
              ),
            align: "center",
          },
          {
            id: "high",
            value: "high",
            node: <p>${quote.high}</p>,
            align: "center",
          },
          {
            id: "low",
            value: "low",
            node: <p>${quote.low}</p>,
            align: "center",
          },
          {
            id: "volume",
            value: "20",
            node: <p>{quote.volume}</p>,
            align: "center",
          },
        ];
      });

      setRowsData(newRows);
    }
  }, [
    formatDecimal,
    symbolQuote,
    instrumentsListAf,
    classes,
    onTickerSelect,
    selectedTickers,
    matchedTickers,
  ]);
  // #endregion

  return {
    columnsData,
    rowsData,
    handleDeletion,
    canDelete,
  };
};

export default useTransformer;
