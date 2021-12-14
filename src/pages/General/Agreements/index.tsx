import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import AgreementsComp from "components/PagesSpecific/General/Agreements";

const Agreements = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Agreements" />
      <AgreementsComp />
    </Section>
  );
};

export default Agreements;
