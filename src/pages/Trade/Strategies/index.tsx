import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Strategies from "components/PagesSpecific/Trade/Strategies";

const StrategiesPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Trade Strategies" />

      <Strategies />
    </Section>
  );
};

export default StrategiesPage;
