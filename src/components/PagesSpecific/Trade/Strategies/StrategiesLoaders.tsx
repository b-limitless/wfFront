import React from "react";
import { Box, Card, Skeleton } from "trolly/common";
import ButtonItemBase from "components/common/ButtonItem/ButtonItemBase";

const ChartLoader: React.FC<{ shape: "circle" | "rect" }> = ({ shape }) => {
  return (
    <Card display="grid" gridGap="15px">
      <Skeleton variant="text" width="40px" />
      {shape === "circle" ? (
        <Box display="flex" justifyContent="center" alignContent="center">
          <Skeleton variant="circle" height="200px" width="200px" />
        </Box>
      ) : (
        <Skeleton width="100%" height="200px" />
      )}
    </Card>
  );
};
export const StrategyDetailsLoader: React.FC = () => {
  return (
    <Box gridGap="20px">
      <Box gridTemplateColumns={["1fr", "6fr 4fr"]} gridGap="20px">
        <Box gridGap="10px">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </Box>
        <Box>
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton width="100%" height="150px" />
        </Box>
      </Box>
      <Box
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        gridGap="20px"
      >
        <ChartLoader shape="circle" />
        <ChartLoader shape="circle" />
        <ChartLoader shape="rect" />
      </Box>
      <Box display="flex" justifyContent="center">
        <Skeleton width="30%" height="50px" />
      </Box>
      <Box
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        gridGap="20px"
      >
        <ChartLoader shape="rect" />
        <ChartLoader shape="rect" />
        <ChartLoader shape="rect" />
      </Box>
    </Box>
  );
};

export const StrategyPerformanceLoader: React.FC = () => {
  return (
    <Box gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} gridGap="20px">
      <ChartLoader shape="rect" />
      <ChartLoader shape="rect" />
      <ChartLoader shape="rect" />
    </Box>
  );
};

const LineLoader: React.FC = () => {
  return (
    <Box
      gridTemplateColumns={[
        "1fr",
        "repeat(4, 1fr)",
        "repeat(6, 1fr)",
        "repeat(8, 1fr)",
      ]}
      gridGap="10px"
    >
      <Box>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box display={["none", "grid", "grid", "grid"]}>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box display={["none", "none", "grid", "grid"]}>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box display={["none", "none", "grid", "grid"]}>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box display={["none", "none", "none", "grid"]}>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box display={["none", "none", "none", "grid"]}>
        <Skeleton variant="text" width="100%" />
      </Box>
    </Box>
  );
};
export const MembersLoader: React.FC = () => {
  return (
    <Card gridGap="25px">
      <LineLoader />
      <LineLoader />
      <LineLoader />
      <LineLoader />
      <LineLoader />
      <LineLoader />
      <LineLoader />
      <LineLoader />
    </Card>
  );
};

const SkelectonBLock: React.FC = () => {
  return (
    <ButtonItemBase isHoverable={false} padding="10px">
      <Box display="flex" justifyContent="space-between">
        <Skeleton variant="circle" width="40px" height="40px" />
        <Skeleton variant="text" width="100px" />
      </Box>
      <Box gridGap="10px" my="10px">
        <Skeleton width="80%" height="20px" />
        <Skeleton width="50%" height="10px" />
      </Box>
      <Box gridTemplateColumns="1fr 1fr" gridGap="20px">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Box>
    </ButtonItemBase>
  );
};
export const StrategiesListLoader: React.FC = () => {
  return (
    <Box
      gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
      gridGap="20px"
    >
      {Array.from(Array(6).keys()).map((block) => (
        <SkelectonBLock key={`${block}`} />
      ))}
    </Box>
  );
};
