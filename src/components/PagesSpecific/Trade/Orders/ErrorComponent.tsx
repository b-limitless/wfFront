import React from "react";
import NotPossibleIcon from "@material-ui/icons/CancelPresentation";
import { Box, Text, Button } from "trolly/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { EOrderType } from "./Orders.interface";

const useStyles = makeStyles({
  icon: {
    width: "130px",
    height: "130px",
  },
});
const ErrorComponent: React.FC<{
  type?: EOrderType;
  onCancel?: () => void;
  onTryAgain?: () => void;
}> = ({ type, onCancel, onTryAgain }) => {
  const { icon } = useStyles();
  return (
    <Box
      padding="20px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <NotPossibleIcon className={icon} color="error" />
      <Text
        mt="15px"
        fontSize="16px"
        color="text.secondary"
        textAlign="center"
      >{`We cannot procceed with your ${
        type === "BUY" ? "buy" : "sell"
      } order currently, please try again later`}</Text>
      <Box
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
        gridGap="20px"
        mt="15px"
        width="100%"
      >
        <Button
          round
          color="secondary"
          variant="contained"
          width="100%"
          onClick={onTryAgain}
        >
          Try Again
        </Button>
        <Button
          round
          color="secondary"
          variant="text"
          width="100%"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorComponent;
