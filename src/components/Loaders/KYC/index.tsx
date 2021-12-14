import React from "react";
import { Box, Skeleton } from "trolly/common";
import { useListingStyles } from "../Loaders.style";

const KYCLoader = () => {
  const { root } = useListingStyles({ width: "70%" });
  return (
    <Box className={root}>
      <Skeleton variant="text" width="100%" />
      <Box gridGap="5px">
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="65%" />
        <Skeleton variant="text" width="75%" />
      </Box>
      <Box gridGap="15px" gridTemplateColumns="7fr 3fr">
        <Skeleton height={40} width="100%" variant="rect" />
        <Skeleton height={40} width="100%" variant="rect" />
      </Box>
      <Box gridGap="15px" gridTemplateColumns="6fr 4fr">
        <Skeleton height={40} width="100%" variant="rect" />
        <Skeleton height={40} width="100%" variant="rect" />
      </Box>
      <Box gridGap="15px" gridTemplateColumns="3fr 7fr">
        <Skeleton height={40} width="100%" variant="rect" />
        <Skeleton height={40} width="100%" variant="rect" />
      </Box>
      <Box gridGap="15px" gridTemplateColumns="6fr 4fr">
        <Skeleton height={40} width="100%" variant="rect" />
        <Skeleton height={40} width="100%" variant="rect" />
      </Box>
      <Box gridGap="15px" gridTemplateColumns="7fr 3fr">
        <Skeleton height={40} width="100%" variant="rect" />
        <Skeleton height={40} width="100%" variant="rect" />
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        <Skeleton height={40} width="30%" />
      </Box>
    </Box>
  );
};

export default KYCLoader;
