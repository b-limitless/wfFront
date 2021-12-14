import React from "react";
import { Box, Skeleton } from "trolly/common";

const ItemLoader: React.FC = () => {
  return (
    <Box gridGap="10px" mb={["15px", "15px", "0px", "0px"]}>
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="60px" />
      <Skeleton variant="text" width="80px" />
    </Box>
  );
};
const AccountInfoLoader: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent={["center", "center", "space-between", "space-between"]}
      flexDirection={["column", "column", "row", "row"]}
      alignItems="center"
      width="100%"
    >
      <ItemLoader />
      <ItemLoader />
      <ItemLoader />
      <ItemLoader />
    </Box>
  );
};

export default AccountInfoLoader;
