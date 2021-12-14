import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Box, Text } from "trolly/common";
import { IAppState } from "store/store.interface";
import { useAppInfo } from "trolly/hooks";
import {
  FUNDING_PAGE_HOME,
  FUNDING_PAGE_NAVIGATION_BACK,
  LOCAL_TRANSFER,
  FUNDING_SET_TRANSFER_STEPS,
} from "store/store.types";

import Bank from "./Bank";
import Amount from "./Amount";
import Stepper from "../Stepper";
import Navigation from "../Navigation";
import Transaction from "./Transaction";

function getSteps() {
  return ["Amount", "Bank", "Transaction"];
}

type Props = {
  transferType: string;
};

const TransferProcess: React.FC<Props> = ({ transferType }) => {
  const dispatch = useDispatch();
  const {
    render,
    component: { activeStep, steps },
  } = useSelector((state: IAppState) => ({ ...state.funding }));
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const color =
    theme === "secondary" ? palette.secondary.main : palette.primary.main;

  const renderComponent = () => {
    switch (steps[activeStep]) {
      case "Amount":
        return <Amount />;
      case "Bank":
        return <Bank />;
      case "Transaction":
        return <Transaction />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch({
      type: FUNDING_SET_TRANSFER_STEPS,
      payload: { transferType, steps: getSteps() },
    });
  }, [dispatch, transferType]);

  return (
    <div>
      <Navigation
        title={
          render === LOCAL_TRANSFER
            ? "Standard Local Transfer"
            : "Wire Transfer"
        }
        homeDispatchType={FUNDING_PAGE_HOME}
        navigateBackDispatchType={FUNDING_PAGE_NAVIGATION_BACK}
      />

      <Paper elevation={0}>
        <Box display="block" py={["20px", "50px"]} px={["20px", "60px"]}>
          {render === LOCAL_TRANSFER && (
            <Text fontSize={24} my={3} fontWeight={600} lineHeight={1.7}>
              Unlimited <span style={{ color }}>FREE</span> local AED transfer
            </Text>
          )}

          <Stepper getSteps={getSteps()} activeStep={activeStep} />

          {renderComponent()}
        </Box>
      </Paper>
    </div>
  );
};

export default TransferProcess;
