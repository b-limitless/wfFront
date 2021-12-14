import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Withdrawal from "components/PagesSpecific/Withdrawal";

const WithdrawalPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Withdrawal" pageTitle="Trade Withdrawal" />

      <Withdrawal />
    </Section>
  );
};

export default WithdrawalPage;
