import React from "react";
import { Box, Skeleton } from "trolly/common";
import SettingContainer from "./SettingContainer";

const SkeletonLoader: React.FC = () => {
  return <Skeleton height={60} width="100%" />;
};
const Loader: React.FC = () => {
  return (
    <SettingContainer header="Personal information">
      <Box padding="25px" display="block">
        <Box
          display="grid"
          gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
          gridGap="24px"
          mb={5}
        >
          <SkeletonLoader />
          <SkeletonLoader />
        </Box>

        <Box mb={5}>
          <SkeletonLoader />
        </Box>

        <Box display="block" mb={5}>
          <SkeletonLoader />
        </Box>

        <Box display="block" mb={5}>
          <SkeletonLoader />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
          gridGap="24px"
          mb={5}
        >
          <SkeletonLoader />
          <SkeletonLoader />
        </Box>

        <Box mb={5}>
          <SkeletonLoader />
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Skeleton height={60} width={200} />
        </Box>
      </Box>
    </SettingContainer>
  );
};

export default Loader;
