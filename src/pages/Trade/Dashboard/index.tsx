import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import TradeDashboard from "components/PagesSpecific/Trade/Dashboard";

const Dashboard: React.FC = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
      withGradient={true}
      gradientStop={25}
    >
      <Title siteTitle="Wealthface" pageTitle="Trade Dashboard" />
      <TradeDashboard />
    </Section>
  );
};

export default Dashboard;
