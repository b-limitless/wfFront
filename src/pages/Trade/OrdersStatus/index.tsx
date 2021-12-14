import React, { FC } from "react";
import Orders from "components/PagesSpecific/Trade/OrdersHistory";
import { Section } from "components/common";
import PageTitle from "portals/PageTitle";

const OrdersStatus: FC = () => {
  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme="secondary"
    >
      <PageTitle siteTitle="Wealthface" pageTitle="Orders Status" />
      <Orders />
    </Section>
  );
};

export default OrdersStatus;
