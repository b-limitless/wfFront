import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Box, Text } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";

interface IRecordProps {
  symbol: string;
  name: string;
  change: number;
  changePerc: number;
  lastTrade: number;
  withBorder?: boolean;
}
const Record: React.FC<IRecordProps> = ({
  symbol,
  change,
  changePerc,
  lastTrade,
  name,
  withBorder,
}) => {
  const formatedChangeText = useMemo(() => {
    const formatedChange = appUtils.formatDecimal(Math.abs(change), 2);
    const formatedChangePerc = !changePerc
      ? "---"
      : appUtils.formatDecimal(Math.abs(changePerc), 2) + "%";
    return `$${formatedChange}(${formatedChangePerc})`;
  }, [change, changePerc]);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      alignContent="center"
      flex={1}
      borderBottom={withBorder ? "1px solid #EDEDED" : "none"}
      mb={withBorder ? "15px" : "0px"}
      width="100%"
      pb="10px"
      height="100%"
    >
      <Box display="flex" flexDirection="column" mr="5px">
        <Text fontSize="14px" fontWeight={700}>
          {symbol}
        </Text>
        <Text
          fontSize="12px"
          fontWeight={500}
          color="text.secondary"
          maxWidth="180px"
          overflow="hidden"
          whiteSpace="wrap"
        >
          {name}
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        // minWidth={["auto", "auto", "55px", "55px"]}
        ml="5px"
      >
        <Text
          fontSize="14px"
          fontWeight={700}
          textAlign="right"
          mr="15px"
        >{`$${lastTrade}`}</Text>
        <Indicator value={change} withSign={false} withIndicator={true}>
          {formatedChangeText}
        </Indicator>
      </Box>
    </Box>
  );
};

const useWatchlistDataTransform = (numOfItems: number) => {
  const { watchlistDashboard = [], trade } = useSelector(
    (state: IAppState) => ({ ...state.trade, ...state.general })
  );

  const recordsArray = useMemo(() => {
    if (
      watchlistDashboard &&
      watchlistDashboard.length > 0 &&
      trade &&
      trade.watchlistSymbols
    ) {
      const { watchlistSymbols } = trade;
      const components = watchlistDashboard.map((item, index) => {
        const { symbol, lastTrade, change = 0, priorClose } = item;
        const name = (
          watchlistSymbols.find((item) => item.symbol === symbol) || {}
        ).name;
        const changePerc = appUtils.formatDecimal(
          (change / priorClose) * 100,
          2
        );
        return (
          <Record
            symbol={symbol}
            lastTrade={lastTrade}
            change={change}
            changePerc={changePerc as number}
            name={name || ""}
            withBorder={(index + 1) % numOfItems !== 0}
            key={symbol}
          />
        );
      });
      return Array.from(
        new Array(Math.floor(components.length / numOfItems))
      ).map((num) => {
        return (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mx="5px"
            key={`${num}-box`}
          >
            {components.splice(0, numOfItems).map((item) => (
              <>{item}</>
            ))}
          </Box>
        );
      });
    }
    return [];
  }, [trade, watchlistDashboard, numOfItems]);
  return recordsArray;
};

export default useWatchlistDataTransform;
