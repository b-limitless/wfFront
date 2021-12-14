import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import {
  REWARDS_ADD_REFERRAL,
  REWARDS_GET_REFERRAL_PLAN,
} from "store/store.types";
import {
  Text,
  Box,
  Card,
  Input,
  Button,
  Snackbar,
  ESeverity,
  Skeleton,
} from "trolly/common";
import {
  addReferral,
  getReferralLink,
  getReferralPlan,
} from "store/actions/rewards.actions";
import ImageCoin from "assets/Images/rewardCoin.png";
import { IRewardsProps } from "../index";

const Loader: React.FC = () => {
  return (
    <>
      <Card padding="30px 20px">
        <Skeleton width="200px" height="30px" />
        <Box margin="30px 0 15px">
          <Box marginBottom="5px">
            <Skeleton width="100%" height="10px" />
          </Box>
          <Box>
            <Skeleton width="100%" height="10px" />
          </Box>
          <Box margin="50px 0">
            <Skeleton width="350px" height="162px" />
          </Box>
          <Box marginBottom="5px">
            <Skeleton width="100%" height="10px" />
          </Box>
          <Box marginBottom="5px">
            <Skeleton width="100%" height="10px" />
          </Box>
          <Box marginBottom="5px">
            <Skeleton width="100%" height="10px" />
          </Box>
        </Box>
      </Card>
    </>
  );
};

type TSnackbar = {
  show: boolean;
  message: string | string[];
  severity: ESeverity;
};

const RewardDetail: React.FC<IRewardsProps> = ({ prodType }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const { referralPlan, referralLink } = useSelector(
    (state: IAppState) => state.rewards
  );
  const [invitesEmail, setInvitesEmail] = useState<string>("");
  const [snackbar, setSnackbar] = useState<TSnackbar>({
    show: false,
    message: "",
    severity: "info",
  });
  const {
    isLoading: isAddingReferral,
    error: errorAddingReferral,
    isSuccess: isSuccessAddingReferral,
  } = useApiInfo(REWARDS_ADD_REFERRAL);
  const {
    isLoading: isFetchingReferralPlan,
    error: errorFetchingReferralPlan,
  } = useApiInfo(REWARDS_GET_REFERRAL_PLAN);

  const handleChange = (e: any) => {
    setInvitesEmail(e.target.value);
    if (errorAddingReferral) {
      dispatch(apiActions.clearApi(REWARDS_ADD_REFERRAL));
    }
  };

  const handleSubmitInvites = (e: any) => {
    e.preventDefault();
    dispatch(addReferral({ to: invitesEmail, toName: "", prod: prodType }));
  };

  const onCloseSnackbar = () => {
    setSnackbar({ show: false, message: "", severity: "info" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setSnackbar({
      show: true,
      message: "Referral link copied to clipboard!",
      severity: "success",
    });
  };

  useEffect(() => {
    dispatch(getReferralPlan(prodType));
    dispatch(getReferralLink(prodType));
  }, [prodType, dispatch]);

  useEffect(() => {
    if (isSuccessAddingReferral) {
      setSnackbar({
        show: true,
        message: "Referral email sent!",
        severity: "success",
      });
      dispatch(apiActions.clearApi(REWARDS_ADD_REFERRAL));
      setInvitesEmail("");
    }
  }, [isSuccessAddingReferral, dispatch]);

  useEffect(() => {
    if (!!errorFetchingReferralPlan) {
      setSnackbar({
        show: true,
        message: errorFetchingReferralPlan,
        severity: "error",
      });
      dispatch(apiActions.clearApi(REWARDS_GET_REFERRAL_PLAN));
    }
    // if (!!errorAddingReferral) {
    //   setSnackbar({
    //     show: true,
    //     message: errorAddingReferral,
    //     severity: "error",
    //   });
    //   dispatch(apiActions.clearApi(REWARDS_ADD_REFERRAL));
    // }
  }, [errorFetchingReferralPlan, errorAddingReferral, dispatch]);

  useEffect(() => {
    return () => {
      if (errorAddingReferral) {
        dispatch(apiActions.clearApi(REWARDS_ADD_REFERRAL));
      }
    };
  }, [errorAddingReferral, dispatch]);

  if (isFetchingReferralPlan) return <Loader />;

  return (
    <div>
      <Card padding="0">
        <Text fontSize="20px" fontWeight={600} padding="30px 20px">
          Invite your friends
        </Text>

        {referralPlan && (
          <>
            <Box display="block" marginBottom="50px" padding="0 20px">
              <Text
                fontSize="16px"
                fontWeight={500}
                lineHeight="30px"
                color={palette.text.secondary}
                marginBottom="24px"
              >
                Invite a friend and receive {referralPlan?.reward.currency}{" "}
                {referralPlan?.reward.value} in your Wealthface account when he
                funds his account with at least $
                {referralPlan?.threshold.toFund}.
              </Text>

              <Box
                display="inline-flex"
                alignItems="center"
                borderRadius={10}
                padding="20px 10px 24px 30px"
                style={{ backgroundColor: palette[theme].main }}
              >
                <Box display="block" marginRight="15px" maxWidth={175}>
                  <Text
                    fontSize="24px"
                    fontWeight={600}
                    marginBottom="5px"
                    color="#fff"
                  >
                    {referralPlan?.reward.currency} {referralPlan?.reward.value}
                  </Text>
                  <Text
                    fontSize="16px"
                    fontWeight={500}
                    lineHeight="25px"
                    color="#fff"
                  >
                    The amount will be deposited to your Wealthface account
                  </Text>
                </Box>

                <img
                  src={ImageCoin}
                  alt="rewards"
                  style={{ display: "block", maxWidth: "100%", width: "130px" }}
                />
              </Box>
            </Box>

            <Box
              display="block"
              padding="40px 20px"
              borderBottom="1px solid #F1F1F1"
              borderTop="1px solid #F1F1F1"
            >
              <Text
                fontSize="16px"
                fontWeight={500}
                color="#000"
                marginBottom="24px"
              >
                Enter your friend's email address.
              </Text>

              <form onSubmit={handleSubmitInvites}>
                <Box
                  display="grid"
                  gridTemplateColumns={["1fr", "1fr", "350px 1fr"]}
                  gridGap="24px"
                  maxWidth="600px"
                >
                  <Box display="block">
                    <Input
                      placeholder="Your friend’s email addresses"
                      value={invitesEmail}
                      error={!!errorAddingReferral}
                      errorMessage={errorAddingReferral as string}
                      onChange={handleChange}
                      size="medium"
                    />
                  </Box>
                  <Button
                    variant="contained"
                    disabled={
                      !invitesEmail || isAddingReferral || !!errorAddingReferral
                    }
                    round
                    color={theme}
                    type="submit"
                    style={{ height: "50px", width: "150px" }}
                  >
                    Send invites
                  </Button>
                </Box>
              </form>
            </Box>

            {referralLink && (
              <Box display="block" padding="40px 20px">
                <Text
                  fontSize="16px"
                  fontWeight={500}
                  color="#000"
                  marginBottom="24px"
                >
                  Share your personalized referral link:
                </Text>

                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <Text
                    color={palette.text.secondary}
                    fontSize="12px"
                    fontWeight={500}
                    margin="10px 24px 10px 0px"
                  >
                    {referralLink}
                  </Text>
                  <Button
                    variant="outlined"
                    type="button"
                    round
                    color={theme}
                    onClick={handleCopyLink}
                    style={{ height: "50px" }}
                  >
                    Copy
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}

        <Snackbar
          severity={snackbar.severity}
          vertical="top"
          horizontal="center"
          open={snackbar.show}
          handleClose={onCloseSnackbar}
          onClose={onCloseSnackbar}
          autoHideDuration={5000}
          transitionDuration={{ enter: 250, exit: 0 }}
        >
          {snackbar.message}
        </Snackbar>
      </Card>
    </div>
  );
};

export default RewardDetail;
