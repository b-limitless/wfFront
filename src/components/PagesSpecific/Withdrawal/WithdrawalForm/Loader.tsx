import React from "react";
import { Box, Card, Skeleton } from "trolly/common";

const WithdrawalLoader: React.FC = () => {
  return (
    <Card padding={["25px 15px", "25px"]}>
      <Box display="flex" flexDirection="column">
        <Skeleton variant="text" width="300px" />
        <Skeleton variant="text" width="200px" />
      </Box>
      <Skeleton height={150} width={500} />
      <Box gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap="15px" mt="30px">
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
        <Skeleton height={50} width="100%" />
      </Box>
    </Card>
  );
};

export default WithdrawalLoader;
