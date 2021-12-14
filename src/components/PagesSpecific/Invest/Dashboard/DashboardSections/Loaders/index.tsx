import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Box, Skeleton } from "trolly/common";

export const PortfolioHoldingsLoader: React.FC = () => {
  return (
    <Box gridGap="10px">
      <Skeleton height="30px" width="100%" />
      <Skeleton height="30px" width="100%" />
      <Skeleton height="30px" width="100%" />
      <Skeleton height="30px" width="100%" />
      <Skeleton height="30px" width="100%" />
    </Box>
  );
};

const useSkeletonStyle = makeStyles((theme: Theme) => ({
  root: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export const PortfolioPerformanceLoader: React.FC = () => {
  const { root } = useSkeletonStyle();
  return (
    <Box
      padding={["22px", "22px", "30px", "30px"]}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      height={["218px", "218px", "318px", "318px"]}
      flex={1}
    >
      <Skeleton height="100%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="60%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="70%" width="25px" />
      <Skeleton height="65%" width="25px" className={root} />
      <Skeleton height="55%" width="25px" />
      <Skeleton height="70%" width="25px" className={root} />
      <Skeleton height="80%" width="25px" />
      <Skeleton height="90%" width="25px" className={root} />
      <Skeleton height="50%" width="25px" />
    </Box>
  );
};
