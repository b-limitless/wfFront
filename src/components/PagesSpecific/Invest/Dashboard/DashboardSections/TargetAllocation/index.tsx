import { useInvestAccountInfo } from "hooks/useAccountInfo";
import React from "react";
import { useDispatch } from "react-redux";
import { INVEST_GET_ALGO_COMB } from "store/store.types";
import { Alert, Box, Chip, Text } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";
import { PortfolioHoldingsLoader } from "../Loaders";

interface IReordProps {
  symbol: string;
  description: string;
  weight: number;
}
const Record: React.FC<IReordProps> = ({
  symbol,
  description,
  weight,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      borderBottom="1px solid #f2f2f2"
      pb="15px"
      mb="15px"
      alignItems="center"
      {...rest}
    >
      <Box display="flex" mr="15px" alignItems="center">
        <Chip label={symbol} width="75px" padding="10px 0px" color="primary" />
        <Text display="flex" fontSize="14px" fontWeight={500} ml="15px">
          {description}
        </Text>
      </Box>
      <Text fontSize="14px" fontWeight={500}>
        {weight}%
      </Text>
    </Box>
  );
};
const TargetAllocation: React.FC = () => {
  const { actual_members } = useInvestAccountInfo({ doNotFetchData: true });
  const { isLoading, error } = useApiInfo(INVEST_GET_ALGO_COMB);
  const dispatch = useDispatch();
  const onCloseError = () => {
    dispatch(apiActions.clearApi(INVEST_GET_ALGO_COMB));
  };
  if (isLoading) {
    return <PortfolioHoldingsLoader />;
  }
  return (
    <Box display="flex" flex={1} flexDirection="column">
      {error && (
        <Alert
          severity="error"
          type="standard"
          onClose={onCloseError}
          margin="0px 0px 15px 0px"
        >
          {error}
        </Alert>
      )}
      {actual_members.map(({ sym, weight, name }) => (
        <Record symbol={sym} weight={weight} description={name} key={sym} />
      ))}
    </Box>
  );
};

export default TargetAllocation;
