import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, Box, Button, Dialog, ETheme, Text } from "trolly/common";
import riskChangeImg from "assets/Images/riskChange.png";
import { useDispatch } from "react-redux";
import { changeRiskLevel } from "store/actions/onBoardingProcess.actions";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { KYC_CHANGE_RISK_LEVEL } from "store/store.types";
import { apiActions } from "trolly/store";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface IProps {
  open: boolean;
  onClose: () => void;
  newRiskId?: number;
  newRiskName?: string;
  noChange?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      color: ({ color }: { color: ETheme }) =>
        color === "primary"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
      marginLeft: "5px",
    },
  },
}));
const RiskChangeModal: React.FC<IProps> = ({
  open,
  onClose,
  newRiskId,
  newRiskName,
  noChange,
}) => {
  const dispatch = useDispatch();

  const { isLoading, error, isSuccess } = useApiInfo(KYC_CHANGE_RISK_LEVEL);

  const { theme } = useAppInfo();

  const { header } = useStyles({ color: theme });

  // close the modal when the risk is changed
  useEffect(() => {
    if (isSuccess) {
      dispatch(apiActions.clearApi(KYC_CHANGE_RISK_LEVEL));
      onClose();
    }
  }, [isSuccess, dispatch, onClose]);

  const onChangeRiskLevel = useCallback(() => {
    if (newRiskId && newRiskName) {
      const newRiskLevel = {
        id: newRiskId,
        name: newRiskName,
      };
      dispatch(changeRiskLevel(newRiskLevel));
    }
  }, [dispatch, newRiskId, newRiskName]);

  const content = useMemo(() => {
    if (noChange) {
      return (
        <Text fontSize="18px" color={`${theme}.main`} fontWeight={500}>
          No changes made
        </Text>
      );
    }
    return (
      <>
        <Text className={header}>
          You are changing your risk profile to <span>{newRiskName}</span>
        </Text>
        <Text
          padding="25px 40px"
          fontSize="16px"
          textAlign="center"
          color="text.secondary"
        >
          Wealthface has determined your risk profile based on your age, income,
          past experiences, investments, and your personal risk tolerance.
        </Text>
        <Text
          padding="25px 40px"
          fontSize="16px"
          textAlign="center"
          color="text.secondary"
        >
          Any additional changes to your risk level will be on your
          responsibility.
        </Text>
        <Button
          onClick={onChangeRiskLevel}
          isLoading={isLoading}
          variant="contained"
          color={theme}
          round
        >
          Okay, I agree!
        </Button>
      </>
    );
  }, [noChange, newRiskName, isLoading, onChangeRiskLevel, header, theme]);

  return (
    <Dialog
      withAnimation={true}
      animationVariant="zoom"
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
    >
      {error && (
        <Alert severity="error" onClose={onClose}>
          {error}
        </Alert>
      )}
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={["0px", "0px", "20px", "20px"]}
      >
        <Box display="flex" justifyContent="center">
          <img alt="something" src={riskChangeImg} />
        </Box>
        {content}
      </Box>
    </Dialog>
  );
};

export default RiskChangeModal;
