import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box, Text, TTableData } from "trolly/common";
import { Indicator } from "trolly/custom";

const useMembersData = () => {
  const { members, subscribed } = useSelector(
    (state: IAppState) => state.strategies
  );

  const getTextOrDefault = useCallback((value: number) => {
    let textValue = value;
    if (!isNaN(value)) {
      textValue = Math.abs(value);
    }
    return textValue;
  }, []);

  const { columns, rows } = useMemo(() => {
    const columns: TTableData[] = [
      {
        id: "ticker",
        value: "ticker",
        node: "Ticker",
        align: "left",
        styles: { fontWeight: 600, padding: "16px 12px", whiteSpace: "noWrap" },
      },
      {
        id: "sector",
        value: "sector",
        node: "Sector",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "industry",
        value: "industry",
        node: "Industry",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "firmSize",
        value: "firmSize",
        node: "Firm size",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "value",
        value: "value",
        node: "Value",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "size",
        value: "size",
        node: "Size",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "volatility",
        value: "volatility",
        node: "Volatility",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "momentum",
        value: "momentum",
        node: "Momentum",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "profitability",
        value: "profitability",
        node: "Profitability",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "investment",
        value: "investment",
        node: "Investment",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
      {
        id: "weight",
        value: "weight",
        node: "Weight",
        align: "center",
        styles: { fontWeight: 600, padding: "16px 8px", whiteSpace: "noWrap" },
      },
    ];
    let rows: TTableData[][] = [];
    if (members && members.length > 0) {
      rows = members.map((member) => {
        const {
          companyname,
          firm_size,
          industry,
          investment,
          momentum,
          profitability,
          sector,
          size,
          ticker,
          value,
          volatility,
          weight,
        } = member;
        const row: TTableData[] = [
          {
            id: "ticker",
            node: (
              <Box display="flex" flexDirection="column">
                <Text fontWeight={600} fontSize="13px" mb="4px">
                  {ticker}
                </Text>
                <Text color="text.secondary">{companyname}</Text>
              </Box>
            ),
            value: ticker,
            align: "left",
            styles: { padding: "16px 12px" },
          },
          {
            id: "sector",
            node: <Text color="text.secondary">{sector}</Text>,
            value: sector,
            align: "center",
            styles: { padding: "16px 8px" },
          },
          {
            id: "industry",
            node: <Text color="text.secondary">{industry}</Text>,
            value: industry,
            align: "center",
            styles: { padding: "16px 8px" },
          },
          {
            id: "firmSize",
            node: <Text color="text.secondary">{firm_size}</Text>,
            value: firm_size,
            align: "center",
            styles: { padding: "16px 8px" },
          },
          {
            id: "value",
            node: (
              <Indicator
                flexAlignment="center"
                withIndicator={false}
                withSign={true}
                value={value}
              >
                {getTextOrDefault(value)}
              </Indicator>
            ),
            value: value,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "size",
            node: (
              <Indicator
                flexAlignment="center"
                withIndicator={false}
                withSign={true}
                value={size}
              >
                {getTextOrDefault(size)}
              </Indicator>
            ),
            value: size,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "volatility",
            node: (
              <Indicator
                withIndicator={false}
                withSign={true}
                value={volatility}
                flexAlignment="center"
              >
                {getTextOrDefault(volatility)}
              </Indicator>
            ),
            value: volatility,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "momentum",
            node: (
              <Indicator
                flexAlignment="center"
                withIndicator={false}
                withSign={true}
                value={momentum}
              >
                {getTextOrDefault(momentum)}
              </Indicator>
            ),
            value: momentum,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "profitability",
            node: (
              <Indicator
                withIndicator={false}
                withSign={true}
                value={profitability}
                flexAlignment="center"
              >
                {getTextOrDefault(profitability)}
              </Indicator>
            ),
            value: profitability,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "investment",
            node: (
              <Indicator
                withIndicator={false}
                withSign={true}
                value={investment}
                flexAlignment="center"
              >
                {getTextOrDefault(investment)}
              </Indicator>
            ),
            value: investment,
            align: "left",
            styles: { padding: "16px 8px" },
          },
          {
            id: "weight",
            node: <Text color="text.secondary">{`${weight}%`}</Text>,
            value: investment,
            align: "left",
            styles: { padding: "16px 8px" },
          },
        ];
        return row;
      });
    }
    return { columns, rows };
  }, [members, getTextOrDefault]);

  return { columns, rows, subscribed };
};

export default useMembersData;
