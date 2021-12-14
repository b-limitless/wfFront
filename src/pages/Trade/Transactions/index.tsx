import React, { FC } from "react";
import Transactions from "components/PagesSpecific/Trade/Transactions";
import { Section } from "components/common";
import PageTitle from "portals/PageTitle";
import { useOnboardingActions } from "hooks/useOnboardingChecklist";

const TransactionsPage: FC = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <PageTitle siteTitle="Wealthface" pageTitle="Transactions" />
      <Transactions />
    </Section>
  );
};

export default TransactionsPage;
