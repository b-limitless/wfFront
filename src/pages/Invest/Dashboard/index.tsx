import React from "react";
import { Section } from "components/common";
import Title from "portals/PageTitle";
import DashboardComponent from "components/PagesSpecific/Invest/Dashboard";

const InvestDashboard = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="primary"
      withGradient={true}
      gradientStop={25}
    >
      <Title siteTitle="Wealthface" pageTitle="Invest Dashboard" />
      <DashboardComponent />
    </Section>
  );
};

export default InvestDashboard;
