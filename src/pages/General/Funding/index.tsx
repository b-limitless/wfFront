import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Funding from "components/PagesSpecific/Funding";

const FundingPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Funding" />

      <Funding />
    </Section>
  );
};

export default FundingPage;
