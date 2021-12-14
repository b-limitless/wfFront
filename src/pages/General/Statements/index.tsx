import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import StatementsComp from "components/PagesSpecific/General/Statements";

const Statements = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Statements" />
      <StatementsComp />
    </Section>
  );
};

export default Statements;
