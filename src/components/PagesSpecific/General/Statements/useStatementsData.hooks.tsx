import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadInvestStatementFile } from "store/actions/invest.actions";
import { downloadTradeStatementFile } from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import {
  INVEST_GET_ACCOUNT_STATEMENT,
  INVEST_GET_STATEMENT_FILE,
  TRADE_GET_ACCOUNT_STATEMENTS,
  TRADE_GET_STATEMENT_FILE,
} from "store/store.types";
import { Box, Button, ETheme, Text, TTableData } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { apiActions, EApps } from "trolly/store";

export const useStatementsData = (theme: ETheme, appId?: EApps) => {
  const { investAccountStatements, tradeAccountStatements } = useSelector(
    (state: IAppState) => ({ ...state.trade, ...state.invest })
  );
  const [downloadId, setDownloadId] = useState("");

  const dispatch = useDispatch();

  const onClickHandler = useCallback(
    (id: string) => () => {
      if (!downloadId) {
        setDownloadId(id);
        if (appId === "A") {
          dispatch(downloadInvestStatementFile(id));
        } else if (appId === "C") {
          dispatch(downloadTradeStatementFile(id));
        }
      }
    },
    [dispatch, downloadId, appId]
  );

  const { isLoading: isTradeLoading, done: tradeDone } = useApiInfo(
    TRADE_GET_STATEMENT_FILE
  );
  const { isLoading: isInvestLoading, done: investDone } = useApiInfo(
    INVEST_GET_STATEMENT_FILE
  );

  useEffect(() => {
    if (investDone || tradeDone) {
      setDownloadId("");
      dispatch(apiActions.clearApi(INVEST_GET_STATEMENT_FILE));
      dispatch(apiActions.clearApi(TRADE_GET_STATEMENT_FILE));
    }
  }, [tradeDone, investDone, dispatch, appId]);

  const columnsData: TTableData[] = [
    {
      id: "date",
      align: "left",
      node: "Date",
      styles: {
        color: "#fff",
        fontSize: "16px",
        fontWeight: 600,
      },
    },
    {
      id: "download",
      align: "center",
      styles: {
        color: "#fff",
      },
    },
  ];

  const statements = useMemo(() => {
    const accountStatements =
      appId === "A" ? investAccountStatements : tradeAccountStatements;
    if (accountStatements && accountStatements.length > 0) {
      return accountStatements.reverse();
    }
    return null;
  }, [investAccountStatements, tradeAccountStatements, appId]);

  const rowsData = useMemo(() => {
    if (statements) {
      return statements
        .map((statement) => {
          const { displayName, _id, fileKey } = statement;
          const fileIdentifier = appId === "A" ? _id : fileKey;
          if (displayName && fileIdentifier) {
            return [
              {
                id: "date",
                node: (
                  <Text fontSize="14px" fontWeight={500} textAlign="left">
                    {displayName}
                  </Text>
                ),
                value: displayName,
              },
              {
                id: "download",
                node: (
                  <Box display="flex" justifyContent="flex-end" padding="12px">
                    <Button
                      round
                      variant="outlined"
                      color={theme}
                      onClick={onClickHandler(fileIdentifier)}
                      isLoading={
                        (isTradeLoading || isInvestLoading) &&
                        fileIdentifier === downloadId
                      }
                    >
                      Download
                    </Button>
                  </Box>
                ),
              },
            ] as TTableData[];
          }
          return [];
        })
        .filter((row) => row && row.length > 0);
    }
    return [];
  }, [
    statements,
    onClickHandler,
    isInvestLoading,
    isTradeLoading,
    downloadId,
    theme,
    appId,
  ]);

  return { columnsData, rowsData };
};

export const useStatementsLoading = (): {
  theme: ETheme;
  appId?: EApps;
  isLoading: boolean;
  error: string | string[];
  fileError: string | string[];
  onCloseError: () => void;
  onCloseStatementFileErr: () => void;
} => {
  const dispatch = useDispatch();
  const { theme, appId } = useAppInfo();
  const { isLoading: isTradeLoading, error: tradeError } = useApiInfo(
    TRADE_GET_ACCOUNT_STATEMENTS
  );
  const { error: statementTradeFileError } = useApiInfo(
    TRADE_GET_STATEMENT_FILE
  );
  const { isLoading: isInvestLoading, error: investError } = useApiInfo(
    INVEST_GET_ACCOUNT_STATEMENT
  );
  const { error: statementInvestFileError } = useApiInfo(
    INVEST_GET_STATEMENT_FILE
  );

  const onCloseError = () => {
    dispatch(
      apiActions.clearApi(
        appId === "A"
          ? INVEST_GET_ACCOUNT_STATEMENT
          : TRADE_GET_ACCOUNT_STATEMENTS
      )
    );
  };

  const onCloseStatementFileErr = () => {
    dispatch(
      apiActions.clearApi(
        appId === "A" ? INVEST_GET_STATEMENT_FILE : TRADE_GET_STATEMENT_FILE
      )
    );
  };

  return {
    theme,
    appId,
    isLoading: appId === "A" ? isInvestLoading : isTradeLoading,
    error: appId === "A" ? investError : tradeError,
    fileError:
      appId === "A" ? statementInvestFileError : statementTradeFileError,
    onCloseError,
    onCloseStatementFileErr,
  };
};
