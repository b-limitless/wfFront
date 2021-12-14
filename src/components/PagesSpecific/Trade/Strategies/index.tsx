import React, { useMemo, useState } from "react";
import { Box, Select, Text } from "trolly/common";
import { IStrategy } from "store/reducers/strategies.reducers";
import { HelperMessage } from "components/common";
import {
  StrategiesListLoader,
  StrategyDetailsLoader,
} from "./StrategiesLoaders";

const StrategiesListing = React.lazy(() => import("./Listing"));
const StrategyDetails = React.lazy(() => import("./Details"));

const riskOptions = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Low",
    value: "Low",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "High",
    value: "High",
  },
  {
    label: "Extreme",
    value: "Extreme",
  },
];

const numberOfStocksOptions = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "20",
    value: "20",
  },
];
const Strategies: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<IStrategy>();
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [numberOfStocks, setNumberOfStocks] = useState<string>("20");

  const { strategy, name } = useMemo(() => {
    if (selectedStrategy) {
      return selectedStrategy;
    }
    return {} as IStrategy;
  }, [selectedStrategy]);

  const onChangeRiskFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRiskFilter(event.target.value);
  };

  const onChangeNumberOfStocksFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfStocks(event.target.value);
  };

  const onSelectStrategy = (strategy: IStrategy) => {
    setSelectedStrategy(strategy);
  };

  const onClearSelectedStrategy = () => {
    setSelectedStrategy(undefined);
  };

  const selectedComponent = useMemo(() => {
    if (selectedStrategy) {
      return (
        <React.Suspense fallback={<StrategyDetailsLoader />}>
          <StrategyDetails
            strategy={selectedStrategy}
            nStock={+numberOfStocks}
            onBack={onClearSelectedStrategy}
          />
        </React.Suspense>
      );
    }
    return (
      <React.Suspense fallback={<StrategiesListLoader />}>
        <StrategiesListing
          risk={riskFilter}
          nStocks={+numberOfStocks}
          onSelect={onSelectStrategy}
        />
      </React.Suspense>
    );
  }, [numberOfStocks, riskFilter, selectedStrategy]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={["flex-start", "center"]}
        flexDirection={["column", "row"]}
      >
        <Text
          fontSize="20px"
          marginBottom="24px"
          color="text.primary"
          fontWeight={600}
        >
          {`${name ? name : "Strategies"}`}
        </Text>
        {!strategy && (
          <Box
            gridTemplateColumns={["1fr", "1fr 1fr"]}
            gridGap="10px"
            marginBottom="20px"
          >
            <Box minWidth="200px">
              <Select
                options={riskOptions}
                variant="native"
                onNativeChange={onChangeRiskFilter}
                nativeValue={riskFilter}
                color="secondary"
                label="Risk"
                inputVariant="outlined"
                size="small"
                fontSize="13px"
              />
            </Box>
            <Box minWidth="200px">
              <Select
                options={numberOfStocksOptions}
                variant="native"
                onNativeChange={onChangeNumberOfStocksFilter}
                nativeValue={numberOfStocks}
                color="secondary"
                label="Number of stocks"
                inputVariant="outlined"
                size="small"
                fontSize="13px"
              />
            </Box>
          </Box>
        )}
      </Box>
      {!selectedStrategy && (
        <HelperMessage
          title="What’s Strategies?"
          description="These strategies are personalized just for you!"
        />
      )}
      {selectedComponent}
    </Box>
  );
};

export default Strategies;
