import React, { FC } from "react";
import { Skeleton, SkeletonProps } from "@material-ui/lab";

const CustomSkeleton: FC<SkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};

CustomSkeleton.defaultProps = {
  animation: "pulse",
  variant: "rect",
};

export default CustomSkeleton;
