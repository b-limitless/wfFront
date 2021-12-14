import React from "react";
import { Section } from "components/common";
import Title from "portals/PageTitle";
import IdentityComponent from "components/PagesSpecific/General/Identity";

const Identity: React.FC = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Account Activities" />
      <IdentityComponent />
    </Section>
  );
};

export default Identity;
