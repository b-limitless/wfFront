import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStrategiesWithMembers } from "store/actions/strategies.actions";
import { STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS } from "store/store.types";
import { Box, Button, Snackbar, Table, Text } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";
import { MembersLoader } from "../../../StrategiesLoaders";
import useMembersData from "./useMembersData.hooks";

interface IMembersBlocksProps {
  strategySlug: string;
  nStock: number;
  onSubscribe: () => void;
}
const MembersBlocks: React.FC<IMembersBlocksProps> = ({
  strategySlug,
  nStock,
  onSubscribe,
}) => {
  const dispatch = useDispatch();

  const { columns, rows, subscribed } = useMembersData();

  useEffect(() => {
    if (subscribed) {
      dispatch(getStrategiesWithMembers(strategySlug, nStock, "usa"));
    }
  }, [dispatch, strategySlug, nStock, subscribed]);

  const { isLoading, error } = useApiInfo(
    STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS
  );

  const onCloseError = () => {
    dispatch(apiActions.clearApi(STRATEGIES_GET_STRATEGY_DETAILS_WITH_MEMBERS));
  };

  if (isLoading || !!error) {
    return (
      <>
        {!!error && (
          <Snackbar
            open={!!error}
            handleClose={onCloseError}
            severity="error"
            vertical="top"
            horizontal="center"
          >
            {error}
          </Snackbar>
        )}
        <MembersLoader />
      </>
    );
  }
  if (!subscribed) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        flexDirection="column"
        height="300px"
      >
        <Text variant="subtitle1" fontWeight={600} color="common.black">
          Please Subscribe to
        </Text>
        <Text
          variant="subtitle1"
          fontWeight={600}
          color="common.black"
          mb="15px"
        >
          access this information
        </Text>
        <Button
          round
          variant="contained"
          color="secondary"
          width="207px"
          onClick={onSubscribe}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </Box>
    );
  }
  return (
    <Table
      stickyHeader
      rows={rows}
      columns={columns}
      withSorting={true}
      withPagination={false}
      paginationAlignment="center"
      paginationSpacing="20px"
      color="secondary"
      withBorder={true}
      borderLayout="horizontal"
      borderColor="#DBDBDB"
      maxHeight="600px"
      headerBgColor="#fff"
      borderRadius="5px"
      hoverColor="secondary"
      stickyFirstColumn
    />
  );
};

export default MembersBlocks;
