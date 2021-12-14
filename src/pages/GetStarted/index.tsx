import React, { useMemo } from "react";
import { Button, Box, Text } from "trolly/common";
import { useTheme } from "@material-ui/core";
import { useAppInfo } from "trolly/hooks";
import { history } from "config";
import Title from "portals/PageTitle";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { ProcessStartHeader, Section } from "components/common";
import { useOnboardingAvailability } from "hooks/useOnboardingChecklist";

const GetStarted = () => {
  const { theme } = useAppInfo();
  const { appId } = useSelector((state: IAppState) => state.auth);
  const defaultTheme = useTheme();

  const { isKYCCompleted } = useOnboardingAvailability();

  const onClickHandler = () => {
    if (isKYCCompleted) {
      history.push("/kyc/dashboard");
    } else {
      history.push("/kyc");
    }
  };

  const title = useMemo(() => {
    if (appId === "A") {
      return "You’re a few steps away from having your own account at the most powerful online investing tool.";
    }
    return "You’re a few steps away from having your own account at the most powerful online trading tool.";
  }, [appId]);

  return (
    <Box
      maxWidth="100%"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      bgcolor={defaultTheme.palette.common.white}
      justifyContent="flex-start"
    >
      <Title pageTitle="Get Started" siteTitle="Wealthface" />
      <ProcessStartHeader color={theme}>
        <Text fontSize="26px" fontWeight={600} color="#fff" marginBottom="15px">
          Hello
        </Text>
        <Text fontSize="18px" fontWeight={400} color="#fff">
          {title}
        </Text>
      </ProcessStartHeader>
      <Section>
        <Box
          display="flex"
          flexDirection="column"
          width={["100%", "100%", "60%", "50%"]}
        >
          <Text
            fontSize="26px"
            fontWeight={600}
            color={defaultTheme.palette.common.black}
            margin="100px 0px 0px"
          >
            Step 1 - Let’s get you set up
          </Text>
          <Text
            fontSize="18px"
            fontWeight={400}
            color={defaultTheme.palette.text.secondary}
            margin="0px 0px 30px"
          >
            We’ll ask you for some information so we can verify your identity
            and ensure your account is secure.
          </Text>
          <Button
            color={theme}
            onClick={onClickHandler}
            fontSize="18px"
            variant="contained"
            width="276px"
            round
          >
            Get Started
          </Button>
        </Box>
      </Section>
    </Box>
  );
};

export default GetStarted;
