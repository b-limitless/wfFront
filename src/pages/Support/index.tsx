import { Box, Link, Text, Alert, Button } from "trolly/common";
import Title from "portals/PageTitle";
import React, { useEffect, useMemo } from "react";
import { useAppInfo } from "trolly/hooks";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { history } from "config";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles";
import { Section } from "components/common";
import { useOnboardingAvailability } from "hooks/useOnboardingChecklist";

const useStyles = makeStyles((theme: Theme) => ({
  alertContainer: {
    width: "60%",
    margin: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
const Support = () => {
  const { alertContainer } = useStyles();
  const { theme, title } = useAppInfo();
  const { isAuthenticated, appId } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.general,
  }));

  const { investError, tradeError } = useOnboardingAvailability();

  const error = useMemo(
    () => (appId === "A" ? investError : tradeError),
    [appId, investError, tradeError]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const onRetryAccountOpening = () => {
    history.push("/account/opening/retry");
  };

  return (
    <Section
      display="flex"
      flexDirection="column"
      height="100%"
      theme={theme}
      withGradient={true}
      gradientStop={25}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        height="100%"
        alignItems="center"
        mt="-50px"
        px={["10px", "10px", "0px", "0px"]}
      >
        <Title siteTitle="Wealthface" pageTitle="Account Problem" />
        {error && (
          <Alert
            severity="error"
            variant="outlined"
            type="standard"
            className={alertContainer}
          >
            {error}
          </Alert>
        )}
        <Text
          fontSize={["16px", "20px"]}
          fontWeight={600}
          color="text.secondary"
          mt="20px"
        >
          Seems there is a problem in your {title.toLowerCase()} account
        </Text>
        <Text
          fontSize={["14px", "18px"]}
          fontWeight={500}
          marginTop="10px"
          color="text.secondary"
        >
          please contact our{" "}
          <Link fontSize="inherit" color={theme} href="/contact-us">
            support center
          </Link>{" "}
          to investigate the issue
        </Text>
        <Button
          variant="contained"
          color={theme}
          margin="15px 0px"
          round
          onClick={onRetryAccountOpening}
        >
          Retry your account opening
        </Button>
      </Box>
    </Section>
  );
};

export default Support;
