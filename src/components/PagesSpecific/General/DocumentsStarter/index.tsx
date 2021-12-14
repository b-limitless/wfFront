import { ProcessStartHeader } from "components/common";
import { history } from "config";
import React, { FC } from "react";
import { Box, Button, Text } from "trolly/common";
import { useAppInfo, useBreakPoints } from "trolly/hooks";

const DocumentsStarter: FC = () => {
  const { xSmall } = useBreakPoints();
  const { theme } = useAppInfo();

  const goToDocumentsVerification = () => {
    history.push("/account/submit/documents");
  };

  return (
    <>
      <ProcessStartHeader color={theme}>
        <Text color="white" fontSize={["24px", "30px"]} fontWeight={700}>
          Thank you
        </Text>
        <Text
          my="20px"
          color="white"
          fontSize={["16px", "18px"]}
          fontWeight={500}
        >
          You’ve completed the second step in your journey
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
            Step 3 - Submit your documents
          </Text>
          <Text
            my="25px"
            fontWeight={500}
            fontSize={["16px", "18px"]}
            color="text.secondary"
          >
            In this step we’ll verify your documents to help us set up your
            wealthface account.
          </Text>
          <Box
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
          >
            <Button
              round
              fontSize="16px"
              width="250px"
              variant="contained"
              color={theme}
              onClick={goToDocumentsVerification}
              fullWidth={xSmall}
              margin="0 0 20px 0"
            >
              Submit your documents
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DocumentsStarter;
