import React from "react";
import { Box, Chip } from "trolly/common";

const BadgeComp: React.FC<{ color: any }> = ({ color }) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Chip
        label="chip 16px fontSize with padding"
        size="medium"
        color={color}
        fontSize="16px"
        padding="20px"
        borderRadius="5px"
      />
      <Chip
        label="chip 14px fontSize and no padding"
        size="small"
        color={color}
        fontSize="16px"
        borderRadius="5px"
      />
      <Chip
        label="chip small with red background"
        size="small"
        color={color}
        fontSize="16px"
        padding="10px"
        borderRadius="5px"
        backgroundColor="red"
      />
    </Box>
  );
};

export default BadgeComp;
