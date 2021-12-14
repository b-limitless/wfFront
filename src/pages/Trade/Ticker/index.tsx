import React, { FC, useMemo } from "react";
import TickerComponent from "components/PagesSpecific/Trade/Ticker";
import { Section } from "components/common";
import PageTitle from "portals/PageTitle";

const TickerPage: FC<any> = (props) => {
  const instrumentId = useMemo(() => {
    const { match } = props;
    if (match) {
      const {
        params: { id },
      } = match;
      return id;
    }
  }, [props]);
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <PageTitle siteTitle="Wealthface" pageTitle="Ticker Details" />
      <TickerComponent instrumentId={instrumentId} />
    </Section>
  );
};

export default TickerPage;
