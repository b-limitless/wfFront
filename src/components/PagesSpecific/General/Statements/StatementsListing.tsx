import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import TableIcon from "@material-ui/icons/ViewList";
import {
  Box,
  Card,
  Skeleton,
  Snackbar,
  Table,
  Text,
  TTableData,
} from "trolly/common";
import { useStatementsLoading } from "./useStatementsData.hooks";

const LoaderItem = () => {
  return (
    <>
      <Skeleton width="100%" height="10px" />
      <Skeleton width="100%" height="10px" />
    </>
  );
};
const Loader = () => {
  return (
    <Card
      display="grid"
      gridTemplateColumns={[
        "1fr",
        "1fr 1fr",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
      ]}
      gridGap="15px"
      padding="40px"
    >
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </Card>
  );
};

const StatementsListing: React.FC<{
  columnsData: TTableData[];
  rowsData?: TTableData[][] | undefined;
}> = ({ columnsData, rowsData }) => {
  const {
    palette: { secondary, primary },
  } = useTheme();

  const {
    error,
    fileError,
    isLoading,
    onCloseError,
    onCloseStatementFileErr,
    theme,
    appId,
  } = useStatementsLoading();

  if (isLoading || !rowsData) {
    return (
      <Box height="100%">
        {error && (
          <Snackbar
            severity="error"
            horizontal="center"
            vertical="top"
            open={!!error}
            onClose={onCloseError}
          >
            {error}
          </Snackbar>
        )}
        <Loader />
      </Box>
    );
  } else if (rowsData.length === 0) {
    return (
      <Card
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="40px"
      >
        <TableIcon color={theme} style={{ fontSize: "150px" }} />
        <Text
          fontSize="16px"
          textAlign="center"
          fontWeight={600}
          color="text.secondary"
          maxWidth="400px"
        >
          No statements to show
        </Text>
      </Card>
    );
  }
  return (
    <Box>
      {fileError && (
        <Snackbar
          severity="error"
          horizontal="center"
          vertical="top"
          open={!!fileError}
          onClose={onCloseStatementFileErr}
        >
          {fileError}
        </Snackbar>
      )}
      <Table
        rows={rowsData}
        columns={columnsData}
        containerWidth="100%"
        maxHeight="600px"
        borderRadius="10px"
        withPagination={true}
        withSorting={true}
        rowsPerPage={15}
        paginationAlignment="center"
        paginationSpacing="20px"
        paginationPlacement="outside"
        headerBgColor={appId === "A" ? primary.main : secondary.main}
        color={theme}
        stickyHeader
      />
    </Box>
  );
};

export default StatementsListing;
