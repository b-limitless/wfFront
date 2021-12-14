import { ProcessStartHeader, Section } from "components/common";
import { history } from "config";
import React, { FC, useMemo } from "react";
import { Box, Button, Card, Text } from "trolly/common";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import RiskChangeManagement from "./RiskChangeManagement";
import Charts from "./Charts";

const TradeKYCDashboard: FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { invest, data } = useSelector((state: IAppState) => ({
    ...state.general,
    ...state.auth,
  }));

  const description = useMemo(() => {
    if (invest && data && data.kycObj) {
      const { riskLevels } = invest;
      const {
        kycObj: { KYCPortfolio },
      } = data;
      return (
        riskLevels.filter((level) => level.id === (KYCPortfolio || {}).id)[0] ||
        {}
      ).description;
    }
  }, [data, invest]);
  const onRetakeSurvey = () => {
    history.push("/kyc/retake");
  };

  const onTradeOpenAccount = () => {
    history.push("/account/opening");
  };

  const onOpenAccount = () => {
    history.push("/account/opening");
  };

  return (
    <>
      <ProcessStartHeader color="secondary">
        <Text color="white" fontSize={["20px", "30px"]} fontWeight={700}>
          Step 2 - Set up your account
        </Text>
        <Text
          my="20px"
          color="white"
          fontSize={["16px", "18px"]}
          fontWeight={500}
        >
          In this step we’ll ask you for information that will help us set up
          your Wealthface account.
        </Text>
        <Button
          round
          fontSize="16px"
          customVariant="white"
          variant="contained"
          color="secondary"
          fontWeight={500}
          onClick={onOpenAccount}
        >
          Open an account
        </Button>
      </ProcessStartHeader>
      <Section>
        <Box
          width="100%"
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "5fr 7fr", "4fr 8fr"]}
          gridGap="50px"
        >
          <RiskChangeManagement />
          <Charts />
        </Box>
        <Card marginY="40px" padding="35px">
          {description && (
            <Text
              fontSize="16px"
              color="text.primary"
              fontWeight={500}
              marginBottom="25px"
            >
              {description}
            </Text>
          )}
          <Text
            marginBottom="25px"
            fontSize="16px"
            color="text.primary"
            fontWeight={500}
          >
            Based on your goals and investment preferences, we recommend
            starting with a moderate risk portfolio for returns above inflation.
            You can always make changes later.
          </Text>
          <Box
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
          >
            <Button
              round
              fontSize="16px"
              width="250px"
              variant="outlined"
              color="secondary"
              margin="0 15px 15px 0"
              onClick={onRetakeSurvey}
              fullWidth={isTablet}
            >
              Retake survey
            </Button>
            <Button
              round
              fontSize="16px"
              width="250px"
              variant="contained"
              color="secondary"
              onClick={onTradeOpenAccount}
              fullWidth={isTablet}
            >
              Open an account
            </Button>
          </Box>
        </Card>
      </Section>
    </>
  );
};

export default TradeKYCDashboard;
