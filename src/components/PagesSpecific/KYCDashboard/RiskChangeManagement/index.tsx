import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { Card, Text, Skeleton, Box, Button } from "trolly/common";
import { appUtils } from "trolly/utils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import RiskChangeModal from "./RiskChangeModal";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { STORE_TYPES } from "trolly/store";

export const Loader = () => {
  return <Skeleton width="400px" height="600px" />;
};

const useStyles = makeStyles({
  fab: {
    color: "#797878",
    backgroundColor: "#fff",
    width: "45px",
    height: "45px",
    border: "2px solid rgb(195, 195, 195)",
    borderRadius: "50px",
    boxShadow: "none",
  },
});

const RiskChangeManagement = () => {
  const { fab } = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [riskLevel, setRiskLevel] = useState<number>();
  const [currentLevel, setCurrentLevel] = useState<number>();
  const { data, invest } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.general,
  }));
  const { theme } = useAppInfo();

  const { isLoading } = useApiInfo(STORE_TYPES.AUTH_VERIFY);

  useEffect(() => {
    const { kycObj } = data || {};
    const { KYCPortfolio } = kycObj || {};
    const { riskLevels } = invest || {};
    if (
      KYCPortfolio &&
      !appUtils.isObjectAndEmpty(KYCPortfolio) &&
      riskLevels
    ) {
      const { id } = KYCPortfolio;
      setRiskLevel(id);
      setCurrentLevel(id);
    }
  }, [data, invest]);

  const [riskLevelId, riskLevelName, oldRiskLevelId] = useMemo(() => {
    const { riskLevels } = invest || {};
    if (riskLevel && riskLevels) {
      const riskName = riskLevels.filter((level) => level.id === riskLevel)[0];
      return [riskLevel, riskName.name, currentLevel];
    }
    return [];
  }, [riskLevel, currentLevel, invest]);

  const onRiskIncrement = () => {
    setRiskLevel((oldState) => {
      if (oldState && oldState < 7) {
        return oldState + 1;
      }
      return oldState;
    });
  };

  const onRiskDecrement = () => {
    setRiskLevel((oldState) => {
      if (oldState && oldState > 1) {
        return oldState - 1;
      }
      return oldState;
    });
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const onClickApplyRiskChange = () => {
    setOpenDialog(true);
  };

  if (riskLevelId && riskLevelName && !isLoading) {
    return (
      <Card
        padding="30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <RiskChangeModal
          open={openDialog}
          onClose={onCloseDialog}
          newRiskName={riskLevelName}
          newRiskId={riskLevelId}
          noChange={riskLevelId === oldRiskLevelId}
        />
        <Text fontSize="20px" fontWeight={600}>
          Your risk profile is
        </Text>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY="50px"
        >
          <Fab className={fab} onClick={onRiskIncrement}>
            <AddIcon />
          </Fab>
          <Text mx="30px" fontSize="200px" color={`${theme}.main`}>
            {riskLevelId}
          </Text>
          <Fab className={fab} onClick={onRiskDecrement}>
            <RemoveIcon />
          </Fab>
        </Box>
        <Text fontSize="20px" fontWeight={600} my="30px">
          {riskLevelName}
        </Text>
        <Button
          variant="contained"
          color={theme}
          round
          fontSize="16px"
          onClick={onClickApplyRiskChange}
          minWidth="250px"
        >
          Apply change risk
        </Button>
      </Card>
    );
  }
  return <Loader />;
};

export default RiskChangeManagement;
