import React, { FC } from "react";
import { Section } from "components/common";
import PageTitle from "portals/PageTitle";
import Settings from "components/PagesSpecific/Settings";

const AccountSettings: FC = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <PageTitle siteTitle="Wealthface" pageTitle="Transactions" />
      <Settings />
    </Section>
  );
};

export default AccountSettings;
