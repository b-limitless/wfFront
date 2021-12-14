import React, { useMemo, useState } from "react";
import { Box, Tabs, TSelectOption, Snackbar, ESeverity } from "trolly/common";
import StrategyDescription from "./StrategyBlocks/Description";
import SectorsChart from "./StrategyBlocks/SectorsChart";
import FirmSizeChart from "./StrategyBlocks/FirmSizeChart";
import FactorIntensityChart from "./StrategyBlocks/FactorIntensityChart";
import { useStrategyDataHooks } from "./useStrategyChartData.hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  saveStrategy,
  subscribeToMembers,
} from "store/actions/strategies.actions";
import { useApiInfo } from "trolly/hooks";
import {
  STRATEGIES_GET_USER_STRATEGIES,
  STRATEGIES_SAVE_STRATEGY,
} from "store/store.types";
import { apiActions } from "trolly/store";
import { IStrategy } from "store/reducers/strategies.reducers";
import {
  useCustomizedTabsClasses,
  TabsBorderBottom,
} from "../Strategies.styles";
import { MembersLoader, StrategyPerformanceLoader } from "../StrategiesLoaders";
import { useBaskets } from "../../Baskets/ArchivePage/useBaskets.hooks";
import { history } from "config";
import { IAppState } from "store/store.interface";

const PerformanceBlocks = React.lazy(
  () => import("./StrategyBlocks/PerformanceBlocks")
);
const MembersBlocks = React.lazy(
  () => import("./StrategyBlocks/MembersBlocks")
);

interface IStrategyDetailsProps {
  strategy: IStrategy;
  nStock: number;
  country: string;
}

const tabsOptions: TSelectOption[] = [
  {
    label: "Performance",
    value: "performance",
  },
  {
    label: "Members",
    value: "members",
  },
];
const StrategyBlocks: React.FC<IStrategyDetailsProps> = ({
  strategy,
  nStock,
  country,
}) => {
  const {
    factorIntensityData,
    firmSizeChartData,
    sectorsChartData,
    historicalPerformanceData,
    annualReturnData,
    drawdownData,
    returnTableColumns,
    returnTableRows,
    metricTableColumns,
    metricTableRows,
    riskTableColumns,
    riskTableRows,
    ...rest
  } = useStrategyDataHooks(strategy.name);

  const { userStrategies } = useSelector(
    (state: IAppState) => state.strategies
  );

  const [tabValue, setTabValue] = useState("performance");

  // styles classes
  const tabsClasses = useCustomizedTabsClasses();
  /////////////////

  const dispatch = useDispatch();

  const onChangeTabHandler = (value: string) => {
    setTabValue(value);
  };

  const {
    isLoading: isSavingStrategy,
    error: saveStrategyError,
    isSuccess: isSaveStrategySuccess,
    message: saveStrategyMessage,
  } = useApiInfo(STRATEGIES_SAVE_STRATEGY);

  const {
    isLoading: isfetchingStrategies,
    error: fetchingStrategiesError,
    isSuccess: isFetchingStrategiesSuccess,
  } = useApiInfo(STRATEGIES_GET_USER_STRATEGIES);

  const addToBasketClickHandler = () => {
    dispatch(saveStrategy({ country, nStock, strategy }));
  };

  // #region responsible to handover the user to basket for rebalancing and close the message
  const { handleClick } = useBaskets();

  const handleSnackbarClose = () => {
    dispatch(apiActions.clearApi(STRATEGIES_SAVE_STRATEGY));
    if (userStrategies) {
      const copiedStrategy = userStrategies.userPrebuiltStrategies.find(
        (userStrategy) => userStrategy.strategy === strategy.strategy
      );
      if (copiedStrategy) {
        handleClick(copiedStrategy, "wealthface")();
        history.push("/trade/baskets");
      }
    }
  };
  // #endregion

  const onSubscribe = () => {
    dispatch(subscribeToMembers());
  };

  const [snackbarMessage, severity] = useMemo(() => {
    if (!!saveStrategyError) {
      return [saveStrategyError, "error"];
    } else if (!!fetchingStrategiesError) {
      return [fetchingStrategiesError, "error"];
    } else if (isSaveStrategySuccess && isFetchingStrategiesSuccess) {
      if (saveStrategyMessage) {
        return [saveStrategyMessage, "success"];
      }
      return [
        `${strategy.name} has been copied to basket successfuly`,
        "success",
      ];
    }
    return [];
  }, [
    saveStrategyError,
    saveStrategyMessage,
    strategy,
    fetchingStrategiesError,
    isSaveStrategySuccess,
    isFetchingStrategiesSuccess,
  ]);

  //============================================================================//

  return (
    <Box gridGap="30px">
      {!!snackbarMessage && (
        <Snackbar
          handleClose={handleSnackbarClose}
          open={true}
          severity={severity as ESeverity}
          horizontal="center"
          vertical="top"
        >
          {snackbarMessage}
        </Snackbar>
      )}
      <Box
        display="flex"
        flexDirection={["column-reverse", "column-reverse", "row"]}
      >
        <StrategyDescription
          {...rest}
          addToBasketClickHandler={addToBasketClickHandler}
          isAddToBasketLoading={isSavingStrategy || isfetchingStrategies}
          strategySlug={strategy.strategy}
          onSubscribe={onSubscribe}
        />
      </Box>
      <Box
        gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gridGap="20px"
      >
        <SectorsChart sectorsChartData={sectorsChartData} />
        <FirmSizeChart firmSizeChartData={firmSizeChartData} />
        <FactorIntensityChart factorIntensityData={factorIntensityData} />
      </Box>
      <Box width="100%" display="flex" flexDirection="column" bgcolor="#FBFBFB">
        <Tabs
          tabsVariant="default"
          options={tabsOptions}
          handleTabClick={onChangeTabHandler}
          value={tabValue}
          repeat={2}
          centered={true}
          wrapperAlignment="center"
          wrapperDisplay="flex"
          fontSize="14px"
          fontWeight={600}
          padding="8px 15px"
          tabProps={{ classes: tabsClasses, disableRipple: true }}
        />
        <TabsBorderBottom />
        <Box padding="20px">
          {tabValue === "performance" ? (
            <React.Suspense fallback={<StrategyPerformanceLoader />}>
              <PerformanceBlocks
                performanceData={{
                  historical: historicalPerformanceData,
                  annualReturn: annualReturnData,
                  drawDown: drawdownData,
                  returnTableColumns: returnTableColumns,
                  returnTableRows: returnTableRows,
                  metricsTableColumns: metricTableColumns,
                  metricsTableRows: metricTableRows,
                  riskTableColumns: riskTableColumns,
                  riskTableRows: riskTableRows,
                }}
              />
            </React.Suspense>
          ) : (
            <React.Suspense fallback={<MembersLoader />}>
              <MembersBlocks
                onSubscribe={onSubscribe}
                strategySlug={strategy.strategy}
                nStock={nStock}
              />
            </React.Suspense>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StrategyBlocks;
