import React from "react";
import { Box, Skeleton } from "trolly/common";

const RouteLoader = () => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="15px">
      <Skeleton variant="rect" height={40} width="100%" />
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="20px">
        <Skeleton variant="rect" height={50} width="100%" />
        <Skeleton variant="rect" height={50} width="100%" />
      </Box>
      <Skeleton height={400} variant="rect" />
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="15px">
        <Skeleton height={80} width="100%" />
        <Skeleton height={80} width="100%" />
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="15px">
        <Skeleton height={80} width="100%" />
        <Skeleton height={80} width="100%" />
      </Box>
      <Box>
        <Skeleton height={200} variant="rect" />
      </Box>
    </Box>
  );
};

export default RouteLoader;
