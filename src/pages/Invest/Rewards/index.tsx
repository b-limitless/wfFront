import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Rewards from "components/PagesSpecific/Rewards";

const RewardsPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Rewards" pageTitle="Wealthface" />

      <Rewards prodType="A" />
    </Section>
  );
};

export default RewardsPage;
