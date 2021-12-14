import React from "react";
import { Box } from "trolly/common";
import { Header } from "trolly/custom";
import { createHashHistory } from "history";

const HeaderComp: React.FC = () => {
  const history = createHashHistory();
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Header
        history={history}
        isInvestCreated={false}
        isTradeCreated={false}
        menuLabel="Account Details"
        disableMenu
      />
      <Header
        history={history}
        isInvestCreated={false}
        isTradeCreated={false}
        menuLabel="Account Details"
        logoVariant="general"
      />
    </Box>
  );
};

export default HeaderComp;
