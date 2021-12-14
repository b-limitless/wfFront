import React, { useMemo } from "react";
import { IStrategy } from "store/reducers/strategies.reducers";
import { Box, Text, Tooltip } from "trolly/common";
import { Indicator } from "trolly/custom";
import { Icon, TIconTypes } from "trolly/icons";
import ButtonItemBase from "components/common/ButtonItem/ButtonItemBase";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Divider from "@material-ui/core/Divider";
import { useStrategiesStyles } from "../Strategies.styles";

interface IProps {
  strategy: IStrategy;
  onSelect?: (strategy: IStrategy) => void;
}

const StrategyPerformanceValue: React.FC<{
  title: string;
  value: number;
  withUnit?: boolean;
  minWidth?: string;
  isDanger?: boolean;
  isDefault?: boolean;
}> = ({ title, value, withUnit, minWidth = "100px", isDanger, isDefault }) => {
  const valueComponent = useMemo(() => {
    if (isDanger) {
      return (
        <Text color="#4F4F4F" fontWeight={600}>
          {withUnit ? `${Math.abs(value)}%` : Math.abs(value)}
        </Text>
      );
    } else if (isDefault) {
      return (
        <Text color="text.secondary" fontWeight={600}>
          {withUnit ? `${Math.abs(value)}%` : Math.abs(value)}
        </Text>
      );
    }
    return (
      <Indicator
        value={value}
        withIndicator={false}
        withSign={true}
        fontWeight={600}
      >
        {withUnit ? `${Math.abs(value)}%` : Math.abs(value)}
      </Indicator>
    );
  }, [isDanger, value, withUnit, isDefault]);
  return (
    <Box display="flex" alignItems="center">
      <Text
        textAlign="left"
        color="#C6C6C6"
        fontSize="13px"
        minWidth={minWidth}
        marginRight="5px"
      >
        {title}
      </Text>
      {valueComponent}
    </Box>
  );
};

const StrategyCard: React.FC<IProps> = ({ onSelect, strategy }) => {
  const {
    Annualized_Volatility,
    Maximum_Drawdown,
    Sharpe_Ratio,
    description,
    filters,
    name,
    risk,
    strategy: strategyPath,
    YTD,
    ...rest
  } = strategy;
  const onButtonClick = () => {
    if (onSelect) {
      onSelect(strategy);
    }
  };

  const { divider, tooltipClass } = useStrategiesStyles();

  const numberOfTickersTitle = useMemo(() => {
    return `${filters.nstocks} ${`${
      filters.nstocks > 1 ? "Tickers" : "Ticker"
    }`} `;
  }, [filters]);

  const riskLevelIconName = useMemo(
    (): TIconTypes =>
      risk === "Extreme" ? "RiskLevelHigh" : `RiskLevel${risk}`,
    [risk]
  );

  return (
    <Box display="flex" flexDirection="column">
      <ButtonItemBase
        type="strategy"
        padding="15px"
        onClick={onButtonClick}
        tooltipDescription={description}
        title={name}
        iconColor="secondary"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mb="10px"
        >
          <Icon iconName="Strategy" color="secondary" />
          <Box display="flex" alignItems="center">
            <Text
              variant="subtitle1"
              color="#5D5D5D"
              marginRight="5px"
              fontSize={["13px", "14px"]}
            >
              {numberOfTickersTitle}
            </Text>
            <Text fontSize={["13px", "14px"]} color="#C6C6C6" marginRight="5px">
              Risk:{" "}
            </Text>
            <Icon
              iconName={riskLevelIconName}
              iconSize="CUSTOM"
              width="34px"
              height="27px"
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" mb="10px">
          <Text
            variant="subtitle1"
            fontSize={["13px", "16px"]}
            fontWeight={600}
            className={tooltipClass}
          >
            <span>{name}</span>{" "}
            <Tooltip arrow title={description}>
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Text>
          <Box display="flex">
            <Text fontSize={["13px", "14px"]} color="#5D5D5D" marginRight="4px">
              Rebalancing:{" "}
            </Text>
            <Text
              fontSize={["13px", "14px"]}
              fontWeight={700}
              color="secondary.main"
            >
              {filters.rebalancing}
            </Text>
          </Box>
          <Divider className={divider} />
        </Box>
        <Box gridTemplateColumns="1fr 1fr" gridGap={["3px", "10px"]}>
          <StrategyPerformanceValue
            title="1M"
            value={rest["1M"]}
            withUnit={true}
            minWidth="40px"
          />
          <StrategyPerformanceValue
            title="Volatility"
            value={Annualized_Volatility}
            withUnit={true}
            isDanger
          />
          <StrategyPerformanceValue
            title="3M"
            value={rest["3M"]}
            withUnit={true}
            minWidth="40px"
          />
          <StrategyPerformanceValue
            title="Sharpe Ratio"
            isDefault
            value={Sharpe_Ratio}
            isDanger
          />
          <StrategyPerformanceValue
            title="Y.T.D"
            value={YTD}
            minWidth="40px"
            withUnit
          />
          <StrategyPerformanceValue
            title="Max Dradown"
            value={Maximum_Drawdown}
            withUnit
            isDanger
          />
        </Box>
      </ButtonItemBase>
    </Box>
  );
};

export default StrategyCard;
