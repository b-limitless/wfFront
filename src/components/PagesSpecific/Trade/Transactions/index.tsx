import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAccountSummary } from "store/actions/trade.actions";
import TableIcon from "@material-ui/icons/ViewList";
import {
  Box,
  Button,
  Card,
  Dialog,
  Skeleton,
  Table,
  Text,
} from "trolly/common";
import useTransformer from "./useTransactions.hooks";
import { Filters } from "components/common";
import { appUtils } from "@wf-org/trolly.utils";
import IconButton from "@material-ui/core/IconButton";
import FilterIcon from "@material-ui/icons/FilterList";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { filterOptions } from "../Trade.config";

const Loader: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="20px" marginTop="40px">
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
      <Skeleton width="100%" height={20} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    height: "fit-content",
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
}));

const Transactions: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { icon } = useStyles();
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [openFilters, setOpenFilters] = useState(false);

  // use transformer for getting table data
  const { rowsData, columnsData, isLoading } = useTransformer(filters);

  useEffect(() => {
    dispatch(getAccountSummary());
  }, [dispatch]);

  const onChangeFilters = (filters: { [key: string]: any }) => {
    if (openFilters) {
      setOpenFilters(false);
    }
    setFilters(filters);
  };

  const onClearFilters = () => {
    setFilters({});
  };

  const onOpenFilters = () => {
    setOpenFilters(true);
  };

  const onCloseFilters = () => {
    setOpenFilters(false);
  };

  if (isLoading) {
    return <Loader />;
  } else if (rowsData.length === 0) {
    return (
      <Card
        padding="30px"
        minHeight="400px"
        display="flex"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <TableIcon color="secondary" style={{ fontSize: "200px" }} />
          <Text
            fontSize="18px"
            textAlign="center"
            fontWeight={600}
            color="text.secondary"
            maxWidth="400px"
          >
            You don't have any transactions to display
          </Text>
          {!appUtils.isEmpty(filters) && (
            <Button
              variant="contained"
              color="secondary"
              round
              onClick={onClearFilters}
              margin="20px 0 0 0"
            >
              Clear Filters
            </Button>
          )}
        </Box>
      </Card>
    );
  }
  return (
    <>
      <Dialog
        padding="20px"
        open={openFilters && isMobile}
        onClose={onCloseFilters}
      >
        <Filters
          options={filterOptions}
          onChange={onChangeFilters}
          initialFilters={filters}
        />
      </Dialog>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text
            fontSize="20px"
            fontWeight={600}
            marginBottom="15px"
            marginTop="15px"
          >
            Transactions History
          </Text>
          <IconButton className={icon} onClick={onOpenFilters}>
            <FilterIcon color="secondary" fontSize="large" />
          </IconButton>
        </Box>
        <Box marginY="20px" display={["none", "none", "grid", "grid"]}>
          <Filters
            options={filterOptions}
            onChange={onChangeFilters}
            initialFilters={filters}
          />
        </Box>
        <Table
          rows={rowsData}
          columns={columnsData}
          containerWidth="100%"
          maxHeight="800px"
          rowsPerPage={10}
          borderRadius="10px"
          headerBgColor="#B0B0B0"
          headerColor="#fff"
          withBorder={true}
          borderColor="#E1E1E1"
          withPagination={true}
          withSorting={true}
          paginationAlignment="center"
          paginationSpacing="25px"
          paginationPlacement="outside"
          color="secondary"
        />
      </Box>
    </>
  );
};

export default Transactions;
