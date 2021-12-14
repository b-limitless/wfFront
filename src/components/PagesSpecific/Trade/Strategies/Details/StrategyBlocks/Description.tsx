import React, { useMemo } from "react";
import { Box, Button, Card, Text } from "trolly/common";
import AutoRenew from "@material-ui/icons/Autorenew";
import ShowChart from "@material-ui/icons/ShowChart";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { useBreakPoints } from "trolly/hooks";

interface IStrategyDescriptionProps {
  description?: string;
  lastRebalancing?: string;
  lastUpdate?: string;
  nextRebalancing?: string;
  nextUpdate?: string;
  addToBasketClickHandler?: () => void;
  isAddToBasketLoading?: boolean;
  isFetchingStrategies?: boolean;
  strategySlug?: string;
  onSubscribe?: () => void;
}

const DateDisplay: React.FC<{
  type: "rebalancing" | "update";
  date: string;
  marginRight?: number | string;
}> = ({ type, date, marginRight }) => {
  const IconComponent = useMemo(() => {
    if (type === "rebalancing") {
      return ShowChart;
    }
    return AutoRenew;
  }, [type]);

  return (
    <Box
      display="flex"
      alignItems={["flex-start", "center"]}
      mb="15px"
      flexDirection={["column", "row"]}
      marginRight={marginRight}
    >
      <Box display="flex" alignItems="center">
        <IconComponent />
        <Text
          mx="5px"
          fontWeight={500}
          fontSize={["11px", "13px"]}
          whiteSpace="nowrap"
        >
          {type === "rebalancing" ? "Rebalancing" : "Update"}
        </Text>
      </Box>
      <Text
        color="text.secondary"
        fontSize={["11px", "13px"]}
        whiteSpace="nowrap"
      >
        {date}
      </Text>
    </Box>
  );
};

const StrategyDescription: React.FC<IStrategyDescriptionProps> = ({
  description,
  lastRebalancing,
  lastUpdate,
  nextRebalancing,
  nextUpdate,
  addToBasketClickHandler,
  isAddToBasketLoading,
  strategySlug,
  onSubscribe,
}) => {
  const { xSmall } = useBreakPoints();
  const { userStrategies, subscribed } = useSelector(
    (state: IAppState) => state.strategies
  );
  const isStrategyCopied = useMemo(
    () =>
      userStrategies &&
      userStrategies.userPrebuiltStrategies &&
      !!userStrategies.userPrebuiltStrategies.length &&
      !!userStrategies.userPrebuiltStrategies.find(
        (strategy) => strategy.strategy === strategySlug
      ),
    [userStrategies, strategySlug]
  );

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        flexWrap="wrap"
      >
        <DateDisplay
          type="rebalancing"
          date={`last: ${lastRebalancing} - next: ${nextRebalancing}`}
          marginRight="20px"
        />
        <DateDisplay
          type="update"
          date={`last: ${lastUpdate} - next: ${nextUpdate}`}
        />
      </Box>
      <Card
        padding="20px"
        borderRadius="5px"
        flexBasis={["100%", "100%", "50%", "60%"]}
        bgcolor="#e5e5e580"
        boxShadow="none"
        mb="20px"
      >
        <Text fontSize="18px" fontWeight={600} mb="15px">
          Description
        </Text>
        <Text color="text.secondary" fontWeight={500}>
          {description}
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection={["column", "row"]}
          mt="20px"
        >
          <Button
            variant="contained"
            color="secondary"
            round
            width="190px"
            size="small"
            fullWidth={xSmall}
            margin={xSmall ? "0 0 15px 0" : "0 15px 0 0"}
            disabled={subscribed}
            onClick={onSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={addToBasketClickHandler}
            disabled={isStrategyCopied || !subscribed}
            round
            width="190px"
            fullWidth={xSmall}
            isLoading={isAddToBasketLoading}
          >
            {isStrategyCopied ? "Copied to basket" : "Copy to basket"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default StrategyDescription;
