import React, { useEffect } from "react";
import { Text, Button, Snackbar } from "trolly/common";
import Title from "portals/PageTitle";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { useDispatch } from "react-redux";
import { activateProduct } from "store/actions/general.actions";
import { GENERAL_ACTIVATE_PRODUCT } from "store/store.types";
import { apiActions } from "trolly/store";
import SettingsIcon from "@material-ui/icons/SupervisorAccount";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Section } from "components/common";

const useStyles = makeStyles({
  icon: {
    width: "150px",
    height: "150px",
    marginBottom: "30px",
  },
});
const Activate = () => {
  const { icon } = useStyles();

  const { theme, title, appId } = useAppInfo();

  const {
    isLoading,
    error: accountOpeningError,
    done,
  } = useApiInfo(GENERAL_ACTIVATE_PRODUCT);

  const dispatch = useDispatch();

  const onCloseError = () => {
    apiActions.clearApi(GENERAL_ACTIVATE_PRODUCT);
  };

  const activateProductHandler = () => {
    if (appId === "A") {
      dispatch(activateProduct("INVEST"));
    } else if (appId === "C") {
      dispatch(activateProduct("TRADE"));
    }
  };

  useEffect(() => {
    if (!isLoading && done && window && window.top) {
      window.top.location.reload();
    }
  }, [isLoading, done]);

  return (
    <>
      {!!accountOpeningError && (
        <Snackbar
          vertical="top"
          horizontal="center"
          severity="error"
          open={!!accountOpeningError}
          handleClose={onCloseError}
        >
          {accountOpeningError ||
            "Oops! something went wrong, please contact our support center"}
        </Snackbar>
      )}
      <Section
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        height="100%"
        alignItems="center"
        withGradient={true}
        theme={theme}
        gradientStop={25}
      >
        <SettingsIcon color={theme} className={icon} />
        <Title siteTitle="Wealthface" pageTitle="Activate Account" />
        <Text
          fontSize="20px"
          fontWeight={600}
          color="text.secondary"
          mb="30px"
          textAlign="center"
          maxWidth="550px"
        >
          Your {title.toLowerCase()} account is not activated yet, do you want
          to proceed for activation
        </Text>
        <Button
          color={theme}
          round
          onClick={activateProductHandler}
          variant="contained"
          isLoading={isLoading}
          width="220px"
        >
          Activate
        </Button>
      </Section>
    </>
  );
};

export default Activate;
