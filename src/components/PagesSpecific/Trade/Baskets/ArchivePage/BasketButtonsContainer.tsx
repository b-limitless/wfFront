import React from "react";
import { Box } from "trolly/common";

const BasketsButtonsContainer: React.FC<{}> = ({ children }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gridGap="40px 30px"
    >
      {children}
    </Box>
  );
};

export default BasketsButtonsContainer;
