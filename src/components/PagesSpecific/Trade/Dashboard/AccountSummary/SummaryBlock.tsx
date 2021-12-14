import React from "react";
import { Box, Text } from "trolly/common";

const SummaryBlock: React.FC<{ header: string; withMargin?: boolean }> = ({
  header,
  children,
  withMargin = true,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={withMargin ? ["15px", "15px", "0px", "0px"] : "0px"}
    >
      <Text
        fontSize="13px"
        color="text.primary"
        fontWeight={600}
        marginBottom="15px"
      >
        {header}
      </Text>
      {children}
    </Box>
  );
};

export default SummaryBlock;
