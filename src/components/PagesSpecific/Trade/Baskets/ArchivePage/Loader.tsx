import React from "react";
import { Box, Skeleton } from "trolly/common";

const BasketsLoader: React.FC = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
      gridGap="40px 30px"
    >
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
      <Box borderRadius="10px" overflow="hidden">
        <Skeleton width="100%" height="160px" />
      </Box>
    </Box>
  );
};

export default BasketsLoader;
