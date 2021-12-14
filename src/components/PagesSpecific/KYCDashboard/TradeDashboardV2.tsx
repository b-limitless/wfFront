import { ProcessStartHeader } from "components/common";
import { history } from "config";
import React, { FC } from "react";
import { Box, Button, Text } from "trolly/common";
import { useBreakPoints } from "trolly/hooks";

const TradeKYCDashboard: FC = () => {
  const { xSmall } = useBreakPoints();
  const onRetakeSurvey = () => {
    history.push("/kyc/retake");
  };

  const onTradeOpenAccount = () => {
    history.push("/account/opening");
  };

  return (
    <>
      <ProcessStartHeader color="secondary">
        <Text color="white" fontSize={["24px", "30px"]} fontWeight={700}>
          Thank you
        </Text>
        <Text
          my="20px"
          color="white"
          fontSize={["16px", "18px"]}
          fontWeight={500}
        >
          You’ve completed the first step in your journey
        </Text>
      </ProcessStartHeader>
      <Box
        mt="60px"
        width={["95%", "95%", "85%", "85%"]}
        display="flex"
        margin="0 auto"
      >
        <Box
          width={["100%", "100%", "60%", "50%"]}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Text fontWeight={600} fontSize={["24px", "30px"]}>
            Step 2 - Open an account
          </Text>
          <Text
            my="25px"
            fontWeight={500}
            fontSize={["16px", "18px"]}
            color="text.secondary"
          >
            In this step we’ll ask you for information that will help us set up
            your wealthface account.
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
              fullWidth={xSmall}
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
              fullWidth={xSmall}
            >
              Open an account
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TradeKYCDashboard;
