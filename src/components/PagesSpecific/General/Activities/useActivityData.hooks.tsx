import { appUtils } from "trolly/utils";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { ETheme, Text, TTableData } from "trolly/common";
import { IAccountActivity } from "store/reducers/reducers.interface";
import { Indicator } from "trolly/custom";
import { apiActions, EApps } from "trolly/store";
import {
  INVEST_GET_ACCOUNT_ACTIVITY,
  TRADE_GET_ACCOUNT_ACTIVITY,
} from "store/store.types";
import { useApiInfo, useAppInfo } from "trolly/hooks";

export const useActivityData = (filter?: string[], appId?: EApps) => {
  const { investAccountActivity, tradeAccountActivity } = useSelector(
    (state: IAppState) => ({ ...state.trade, ...state.invest })
  );

  const columnsData: TTableData[] = [
    {
      id: "date",
      align: "left",
      node: "Date",
      styles: {
        color: "#fff",
      },
    },
    {
      id: "transactionAmount",
      align: "left",
      node: "Transaction amount",
      styles: {
        color: "#fff",
      },
    },
    {
      id: "accountBalance",
      align: "left",
      node: "Account balance",
      styles: {
        color: "#fff",
      },
    },
    {
      id: "comment",
      align: "left",
      node: "Comment",
      styles: {
        color: "#fff",
      },
    },
  ];

  const rowsData = useMemo(() => {
    const accountActivity =
      appId === "A" ? investAccountActivity : tradeAccountActivity;
    if (accountActivity && accountActivity.length > 0) {
      let filteredData = accountActivity;
      if (filter && !!filter.length) {
        filteredData = accountActivity.filter(
          (activity) => filter.indexOf(activity.finTranTypeID) > -1
        );
      }
      const sortedData = appUtils.ascendingSort(
        filteredData,
        "tranWhen",
        "date"
      ) as IAccountActivity[];

      return sortedData.map((activity) => {
        const { tranWhen, tranAmount, accountBalance, comment } = activity;
        const formatedDate = appUtils.formatDate(new Date(tranWhen), {
          isFull: true,
          isLocal: true,
          withTime: true,
        });
        return [
          {
            id: "date",
            value: tranWhen,
            node: formatedDate,
            align: "left",
            styles: {
              width: "25%",
            },
          },
          {
            id: "transactionAmount",
            value: tranAmount,
            node: (
              <Indicator
                value={tranAmount}
                withIndicator={false}
                withSign={true}
                textAlign="left"
              >
                {appUtils.formatNumberWithUnit(Math.abs(tranAmount), 4)}
              </Indicator>
            ),
            align: "left",
            styles: {
              width: "20%",
            },
          },
          {
            id: "accountBalance",
            value: accountBalance,
            node: (
              <Indicator
                value={accountBalance}
                withIndicator={false}
                withSign={true}
                textAlign="left"
              >
                {appUtils.formatNumberWithUnit(Math.abs(accountBalance), 4)}
              </Indicator>
            ),
            align: "left",
            styles: {
              width: "20%",
            },
          },
          {
            id: "comment",
            value: comment,
            node: (
              <Text fontSize="13px" fontWeight={500}>
                {comment}
              </Text>
            ),
            align: "left",
            styles: {
              width: "35%",
            },
          },
        ] as TTableData[];
      });
    }
  }, [investAccountActivity, tradeAccountActivity, filter, appId]);

  return { columnsData, rowsData };
};

export const useActivityLoading = (): {
  theme: ETheme;
  appId?: EApps;
  isLoading: boolean;
  error: string | string[];
  onCloseError: () => void;
} => {
  const { theme, appId } = useAppInfo();
  const dispatch = useDispatch();
  const { isLoading: isTradeLoading, error: tradeError } = useApiInfo(
    TRADE_GET_ACCOUNT_ACTIVITY
  );
  const { isLoading: isInvestLoading, error: investError } = useApiInfo(
    INVEST_GET_ACCOUNT_ACTIVITY
  );

  const onCloseError = () => {
    dispatch(
      apiActions.clearApi(
        appId === "A" ? INVEST_GET_ACCOUNT_ACTIVITY : TRADE_GET_ACCOUNT_ACTIVITY
      )
    );
  };

  return {
    theme,
    appId,
    isLoading: appId === "A" ? isInvestLoading : isTradeLoading,
    error: appId === "A" ? investError : tradeError,
    onCloseError,
  };
};
