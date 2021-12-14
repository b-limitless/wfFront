import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "../Box";

const Loader: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridColumnGap="15px">
      <Skeleton variant="text" animation="pulse" />
      <Skeleton variant="text" animation="pulse" />
      <Skeleton variant="text" animation="pulse" />
      <Skeleton variant="text" animation="pulse" />
    </Box>
  );
};

export default Loader;
