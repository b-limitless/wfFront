import { useInvestAccountInfo } from "hooks/useAccountInfo";
import { useMemo } from "react";
import { TTableData, Chip } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";

const useTransformer = (): {
  rowsData: any[];
  columnsData: any[];
} => {
  const { equityPositions } = useInvestAccountInfo({ doNotFetchData: true });

  const { formatDecimal } = appUtils;
  const rowsData = useMemo(() => {
    if (equityPositions && equityPositions.length > 0) {
      return equityPositions
        .map((position) => {
          const {
            symbol,
            marketValue,
            unrealizedDayPL,
            unrealizedDayPLPercent,
            openQty,
            valuePercetage,
          } = position;
          return [
            {
              id: "symbol",
              value: symbol,
              node: (
                <Chip
                  padding="10px 0px"
                  fontSize="13px"
                  color="primary"
                  label={symbol}
                  width="75px"
                />
              ),
              align: "center",
            },
            {
              id: "quantity",
              value: openQty,
              node: formatDecimal(openQty, 2),
              align: "center",
            },
            {
              id: "allocation",
              value: valuePercetage,
              node: `${formatDecimal(valuePercetage, 2)}%`,
              align: "center",
            },
            {
              id: "dayPl",
              value: unrealizedDayPL,
              node: (
                <Indicator
                  withIndicator
                  fill="full"
                  value={unrealizedDayPL}
                  flexAlignment="center"
                  withSign
                >
                  {`$${formatDecimal(
                    Math.abs(unrealizedDayPL),
                    2
                  )}(${formatDecimal(Math.abs(unrealizedDayPLPercent), 2)}%)`}
                </Indicator>
              ),
            },
            {
              id: "marketValue",
              value: marketValue,
              node: `$${formatDecimal(marketValue, 2)}`,
              align: "center",
            },
          ] as TTableData[];
        })
        .filter((value) => value);
    }
    return [];
  }, [equityPositions, formatDecimal]);

  const columnsData: TTableData[] = [
    {
      id: "symbol",
      align: "center",
      node: "Symbol",
    },
    {
      id: "quantity",
      node: "Quantity",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "allocation",
      node: "Allocation",
      align: "center",
      styles: {
        fontSize: "13px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      },
    },
    {
      id: "dayPl",
      node: "Daily P&L",
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
    columnsData: columnsData,
  };
};

export default useTransformer;
