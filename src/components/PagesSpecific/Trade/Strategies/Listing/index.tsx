import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStrategiesList } from "store/actions/strategies.actions";
import { IStrategy } from "store/reducers/strategies.reducers";
import { IAppState } from "store/store.interface";
import { STRATEGIES_GET_STRATEGIES_LIST } from "store/store.types";
import { Box, Snackbar, Text } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { Icon } from "trolly/icons";
import { apiActions } from "trolly/store";
import { StrategiesListLoader } from "../StrategiesLoaders";
import StrategyCard from "./StrategyCard";

interface IProps {
  risk?: string;
  nStocks?: number;
  onSelect?: (strategy: IStrategy) => void;
}
const StrategiesListing: React.FC<IProps> = ({
  risk,
  nStocks = 20,
  onSelect,
}) => {
  const { isSuccess, error } = useApiInfo(STRATEGIES_GET_STRATEGIES_LIST);
  const { strategiesList } = useSelector(
    (state: IAppState) => state.strategies
  );
  const dispatch = useDispatch();

  const onCloseError = () => {
    dispatch(apiActions.clearApi(STRATEGIES_GET_STRATEGIES_LIST));
  };

  useEffect(() => {
    dispatch(getStrategiesList("usa"));
  }, [dispatch]);

  const filteredStrategies = useMemo(() => {
    if (strategiesList) {
      const { strategies } = strategiesList;
      if (risk && risk !== "All") {
        return strategies.filter((strategy) => {
          const { risk: strategyRisk, filters } = strategy;
          const { nstocks: strategyNStocks } = filters || {};
          return risk === strategyRisk && nStocks === strategyNStocks;
        });
      }
      return strategies.filter((strategy) => {
        const { filters } = strategy;
        const { nstocks: strategyNStocks } = filters || {};
        return nStocks === strategyNStocks;
      });
    }
  }, [strategiesList, risk, nStocks]);

  if (isSuccess && filteredStrategies && filteredStrategies.length > 0) {
    return (
      <Box
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "repeat(3, 1fr)"]}
        gridGap="30px"
      >
        {filteredStrategies.map((strategy) => (
          <StrategyCard
            strategy={strategy}
            onSelect={onSelect}
            key={strategy.strategy}
          />
        ))}
      </Box>
    );
  }
  if (filteredStrategies && filteredStrategies.length === 0) {
    return (
      <Box
        my={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Icon
          iconName="StrategyOff"
          color="secondary"
          iconSize="CUSTOM"
          width={120}
          height={120}
        />
        <Text mt="25px" variant="h1" color="text.secondary">
          No Strategies
        </Text>
      </Box>
    );
  }
  return (
    <>
      {!!error && (
        <Snackbar
          vertical="top"
          horizontal="center"
          open={!!error}
          severity="error"
          handleClose={onCloseError}
        >
          {error}
        </Snackbar>
      )}
      <StrategiesListLoader />
    </>
  );
};

export default StrategiesListing;
