import React from "react";
import Title from "portals/PageTitle";
import { Section } from "components/common";
import Watchlists from "components/PagesSpecific/Trade/Watchlists";

const WatchlistsPage = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <Title siteTitle="Watchlists" pageTitle="Trade Watchlists" />

      <Watchlists />
    </Section>
  );
};

export default WatchlistsPage;
