import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import ActivityComponent from "components/PagesSpecific/General/Activities";

const Activities = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Wealthface" pageTitle="Account Activities" />
      <ActivityComponent />
    </Section>
  );
};

export default Activities;
