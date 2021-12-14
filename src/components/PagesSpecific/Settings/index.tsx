import React, { useEffect, useMemo, useState } from "react";
import { Box, Card, Link, Snackbar, Text } from "trolly/common";
import { useAppInfo } from "trolly/hooks";
import Profile from "./Profile";
import AccountInformation from "./AccountInformation";
import PrivacyAndSecurity from "./PrivacyAndSecurity";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import Loader from "./Settings.loader";
import {
  useInvestAccountInfo,
  useTradeAccountInfo,
} from "hooks/useAccountInfo";
import { useAccountOpeningPreparation } from "hooks/useOnboardingChecklist";
import { getAccountSummary } from "store/actions/trade.actions";
import { useApiInfo } from "@wf-org/trolly.hooks";
import {
  KYC_GET_ACCOUNT_OPENING,
  PROCESS_GET_DATA,
  TRADE_GET_ACCOUNT_SUMMARY,
} from "store/store.types";
import { apiActions } from "trolly/store";

const tabsOptions = [
  { label: "Profile", value: "PROFILE" },
  { label: "Account Information", value: "ACCOUNT_INFORMATION" },
  { label: "Privacy and Security", value: "PRIVACY_AND_SECURITY" },
];

const Settings: React.FC = () => {
  const { theme, appId } = useAppInfo();
  const [activeTab, setActiveTab] = useState<string>(tabsOptions[0].value);
  const dispatch = useDispatch();
  const { accountSummary } = useSelector((state: IAppState) => ({
    ...state.trade,
  }));

  // get the questions and the old answers for the company profile section
  useAccountOpeningPreparation({ start: true });

  // if account summary is not fetched go to dashboard
  useEffect(() => {
    if (appId === "C") {
      if (!accountSummary) {
        dispatch(getAccountSummary());
      }
    }
  }, [accountSummary, dispatch, appId]);

  const { accountNumber } = useTradeAccountInfo();
  const { drivewealth_account_no } = useInvestAccountInfo();

  const onClickHandler = (value: string) => () => {
    setActiveTab(value);
  };

  const component = useMemo(() => {
    switch (activeTab) {
      case "PRIVACY_AND_SECURITY":
        return <PrivacyAndSecurity />;
      case "ACCOUNT_INFORMATION":
        return (
          <AccountInformation
            accountNumber={
              appId === "A" ? drivewealth_account_no : accountNumber
            }
          />
        );
      default:
        return <Profile />;
    }
  }, [activeTab, accountNumber, drivewealth_account_no, appId]);

  const { isLoading: isProcessLoading, error: processError } =
    useApiInfo(PROCESS_GET_DATA);
  const { isLoading: isAccountOpeningLoading, error: accountOpeningError } =
    useApiInfo(KYC_GET_ACCOUNT_OPENING);
  const { isLoading: isSummaryLoading, error: summaryError } = useApiInfo(
    TRADE_GET_ACCOUNT_SUMMARY
  );

  const onCloseErrorHandler = () => {
    dispatch(apiActions.clearApi(PROCESS_GET_DATA));
    dispatch(apiActions.clearApi(KYC_GET_ACCOUNT_OPENING));
    dispatch(apiActions.clearApi(TRADE_GET_ACCOUNT_SUMMARY));
  };

  const isLoadingError = useMemo(() => {
    if (processError || accountOpeningError || summaryError) {
      return true;
    }
    return false;
  }, [processError, accountOpeningError, summaryError]);

  return (
    <div>
      {isLoadingError && (
        <Snackbar
          open={isLoadingError}
          severity="error"
          horizontal="center"
          vertical="top"
          handleClose={onCloseErrorHandler}
        >
          {processError || accountOpeningError || summaryError}
        </Snackbar>
      )}
      <Box display="block" marginBottom="30px">
        <Text fontSize="20px" fontWeight={600}>
          Settings
        </Text>
      </Box>

      <Box
        gridTemplateColumns={["1fr", "1fr", "3fr 9fr", "3fr 9fr"]}
        gridGap="25px"
      >
        <Card
          display="flex"
          flexDirection="column"
          justifyContent={["center", "center", "flex-start", "flex-start"]}
          alignItems={["center", "center", "flex-start", "flex-start"]}
          padding="25px 25px 0 25px"
          height="fit-content"
        >
          {tabsOptions.map((item) => (
            <Link
              variant="header"
              fontColor="#707070"
              color={theme}
              onClick={onClickHandler(item.value)}
              active={activeTab === item.value}
              marginBottom="25px"
            >
              {item.label}
            </Link>
          ))}
        </Card>

        {isProcessLoading || isAccountOpeningLoading || isSummaryLoading ? (
          <Loader />
        ) : (
          component
        )}
      </Box>
    </div>
  );
};

export default Settings;
