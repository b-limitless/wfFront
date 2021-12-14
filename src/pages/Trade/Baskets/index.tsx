import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Baskets from "components/PagesSpecific/Trade/Baskets";

const BasketsPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Trade Basket" />

      <Baskets />
    </Section>
  );
};

export default BasketsPage;
