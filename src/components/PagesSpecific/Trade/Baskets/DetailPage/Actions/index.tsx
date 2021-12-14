import React from "react";
import { Box, Button } from "trolly/common";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import useStyles from "../../baskets.style";
import { useAppInfo, useBreakPoints } from "trolly/hooks";

interface IBasketActionsProps {
  onForward?: () => void;
  onBack?: () => void;
  forwardDisabled?: boolean;
  backDisabled?: boolean;
  backTitle?: string;
  forwardTitle?: string;
  isCancel?: boolean;
}
const BasketActions: React.FC<IBasketActionsProps> = ({
  backDisabled,
  forwardDisabled,
  onBack,
  onForward,
  backTitle,
  forwardTitle,
  isCancel,
}) => {
  const { navigate } = useStyles();
  const { theme } = useAppInfo();
  const { xSmall } = useBreakPoints();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding={xSmall ? "0px" : "0 16px"}
      marginTop="24px"
    >
      <Button
        onClick={onBack}
        disabled={backDisabled}
        variant="outlined"
        round
        height="50px"
        width={xSmall ? "auto" : "160px"}
        className={navigate}
      >
        <ArrowBackIcon /> {backTitle}
      </Button>
      <Button
        onClick={onForward}
        disabled={forwardDisabled}
        variant={isCancel ? "text" : "contained"}
        round
        color={theme}
        height="50px"
        width={xSmall ? "auto" : "160px"}
        className={navigate}
      >
        {forwardTitle}
      </Button>
    </Box>
  );
};

export default BasketActions;
