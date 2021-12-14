import React, { useMemo } from "react";
import TableIcon from "@material-ui/icons/ViewList";
import useTransformer from "./useTransformer";
import { Box, Skeleton, Table, Text } from "trolly/common";
import DashboardSection from "../DashboardSection";

const Loader: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="20px">
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
    </Box>
  );
};

const OpenPositions: React.FC = () => {
  const { rowsData, columnsData, isLoading } = useTransformer();

  const tableComponent = useMemo(() => {
    if (rowsData.length > 0) {
      return (
        <Table
          rows={rowsData}
          columns={columnsData}
          containerWidth="100%"
          maxHeight="400px"
          borderRadius="10px"
          withPagination={false}
          withSorting={true}
          paginationAlignment="center"
          paginationSpacing="10px"
          paginationPlacement="outside"
        />
      );
    }
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TableIcon color="secondary" style={{ fontSize: "150px" }} />
        <Text
          fontSize="16px"
          textAlign="center"
          fontWeight={600}
          color="text.secondary"
          maxWidth="400px"
        >
          You don't have any open positions
        </Text>
      </Box>
    );
  }, [columnsData, rowsData]);

  return (
    <DashboardSection
      withCard={isLoading || rowsData.length === 0}
      header="Open Positions"
    >
      {isLoading ? <Loader /> : tableComponent}
    </DashboardSection>
  );
};

export default OpenPositions;
