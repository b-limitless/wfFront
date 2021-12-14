import React from "react";
import { Box, Card, Text } from "trolly/common";

interface IChartCardProps {
  title: string;
}
const ChartCard: React.FC<IChartCardProps> = ({ title, children }) => {
  return (
    <Card
      padding="0px"
      display="flex"
      flexDirection="column"
      borderRadius="5px"
      height="fit-content"
    >
      <Box borderBottom="1px solid #BDBDBD" padding="10px 15px">
        <Text fontSize="16px" fontWeight={600}>
          {title}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" padding="10px">
        {children}
      </Box>
    </Card>
  );
};

export default ChartCard;
