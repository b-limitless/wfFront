import React from "react";
import { Box, Skeleton } from "trolly/common";

const BuyOrderLoader: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        minWidth="400px"
        borderBottom="1px solid #EDEDED"
        paddingBottom="15px"
      >
        <Box gridGap="10px" gridTemplateColumns="1fr 1fr">
          <Skeleton width="40px" height="40px" />
          <Box>
            <Skeleton variant="text" width="50px" />
            <Skeleton variant="text" width="40px" />
          </Box>
        </Box>
        <Box>
          <Skeleton variant="text" width="50px" />
          <Skeleton variant="text" width="40px" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" paddingTop="15px">
        <Skeleton variant="text" width="70px" />
        <Skeleton variant="text" width="70px" />
        <Skeleton variant="text" width="70px" />
      </Box>
      <Box display="flex" justifyContent="space-between" paddingTop="15px">
        <Skeleton height="35px" width="100px" />
        <Skeleton height="35px" width="100px" />
      </Box>
      <Box gridTemplateColumns="1fr 1fr" gridGap="10px" marginTop="15px">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Box>
    </Box>
  );
};

export default BuyOrderLoader;
