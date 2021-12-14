import React, { FC } from "react";
import { useStyles } from "./PageLoader.style";
import { CircularProgressProps } from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { Loader } from "@wf-org/trolly.common";

const PageLoader: FC<CircularProgressProps & { withLogo?: boolean }> = ({
  color,
  withLogo,
}) => {
  const { backdrop } = useStyles();
  return (
    <Backdrop open={true} className={backdrop}>
      <Loader color={color} withLogo={withLogo} />
    </Backdrop>
  );
};

export default PageLoader;
