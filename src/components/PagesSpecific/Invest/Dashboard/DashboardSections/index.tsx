import React from "react";
import { Box, Card, Link } from "trolly/common";
import { PortfolioHoldingsLoader, PortfolioPerformanceLoader } from "./Loaders";

const LoaderComponent: { [key: string]: React.FC<{}> } = {
  portfolioHoldings: PortfolioHoldingsLoader,
  targetAllocation: PortfolioHoldingsLoader,
  performance: PortfolioPerformanceLoader,
  portfolioEvolution: PortfolioPerformanceLoader,
};

const Component: { [key: string]: React.LazyExoticComponent<React.FC<{}>> } = {
  portfolioHoldings: React.lazy(() => import("./PortfolioHoldings")),
  targetAllocation: React.lazy(() => import("./TargetAllocation")),
  performance: React.lazy(() => import("./PortfolioPerformance")),
  portfolioEvolution: React.lazy(() => import("./PortfolioEolution")),
};

interface IDashboardSectionsProps {
  tabsOptions: any[];
  onChangeTabHandler: (value: any) => () => void;
  selectedTab: string;
}
const DashboardSections: React.FC<IDashboardSectionsProps> = ({
  tabsOptions,
  onChangeTabHandler,
  selectedTab,
}) => {
  const SelectedTabComponent = Component[selectedTab];

  return (
    <Card padding={["20px", "40px"]} display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        justifyContent="space-between"
      >
        {tabsOptions.map((item) => (
          <Link
            variant="header"
            fontColor="#707070"
            color="primary"
            onClick={onChangeTabHandler(item.value)}
            active={selectedTab === item.value}
            marginBottom="20px"
            key={item.value}
            marginRight="5px"
          >
            {item.label}
          </Link>
        ))}
      </Box>
      <Box mt="20px" display="flex" width="100%">
        <React.Suspense fallback={LoaderComponent[selectedTab]}>
          <SelectedTabComponent />
        </React.Suspense>
      </Box>
    </Card>
  );
};

export default DashboardSections;
