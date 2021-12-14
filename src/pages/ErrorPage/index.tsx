import React from "react";
import Title from "portals/PageTitle";
import { Box } from "trolly/common";
import { ErrorPageComponent } from "trolly/custom";
import { useAppInfo } from "trolly/hooks";

const ErrorPage: React.FC = () => {
  const { appId } = useAppInfo();
  return (
    <Box width="100%" maxWidth="100%" margin="auto">
      <Title siteTitle="Wealthface" pageTitle="Page Not Found" />
      <ErrorPageComponent
        extraLinks={[
          {
            link: `/app/#/${appId === "A" ? "invest" : "trade"}/dashboard`,
            label: "Dashboard",
          },
        ]}
      />
    </Box>
  );
};

export default ErrorPage;
