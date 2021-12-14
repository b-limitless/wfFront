import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import AccountsComp from "components/PagesSpecific/General/Accounts";
import { useAppInfo } from "trolly/hooks";

const Accounts = () => {
  const { theme, title } = useAppInfo();
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme={theme}
      withGradient={true}
      gradientStop={25}
    >
      <Title siteTitle="Wealthface" pageTitle={`${title} Accounts`} />
      <AccountsComp />
    </Section>
  );
};

export default Accounts;
