import { RiskLevelsSubText } from "config";
import React from "react";
import { Box, Card, Text } from "trolly/common";
import { Equity } from "components/common";

interface IPortfolioSummaryProps {
  portfolioName?: string;
  portfolioId?: number;
}
const PortfolioSummary: React.FC<IPortfolioSummaryProps> = ({
  portfolioId,
  portfolioName,
}) => {
  return (
    <Card padding="30px" height="fit-content">
      <Box
        display="flex"
        justifyContent="space-between"
        borderBottom="1px solid #ececec"
        mb="35px"
        alignItems="center"
        flexDirection={["column", "row"]}
      >
        <Box display="flex" flexDirection="column">
          <Text fontSize="16px" fontWeight={600}>
            Your risk profile is
          </Text>
          <Text fontSize="34px" fontWeight={700}>
            {portfolioName}
          </Text>
          <Text fontSize="14px" fontWeight={500} color="primary.main">
            {portfolioId ? RiskLevelsSubText[portfolioId] : ""}
          </Text>
        </Box>
        <Text fontSize="100px" fontWeight={600} color="primary.main">
          {portfolioId}
        </Text>
      </Box>
      <Equity />
    </Card>
  );
};

export default PortfolioSummary;
