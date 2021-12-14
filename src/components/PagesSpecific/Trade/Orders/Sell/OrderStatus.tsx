import React, { useMemo } from "react";
import RejectIcon from "@material-ui/icons/HighlightOff";
import SuccessIcon from "@material-ui/icons/CheckCircleOutline";
import { Box, Button, Text } from "trolly/common";
import { history } from "config";
import { useDispatch } from "react-redux";
import { apiActions } from "trolly/store";
import { TRADE_POST_ORDER } from "store/store.types";

const OrderStatus: React.FC<{
  isSuccess: boolean;
  error: string | string[];
  onModifyOrder: () => void;
  priceType?: string;
}> = ({ isSuccess, error, onModifyOrder, priceType }) => {
  const dispatch = useDispatch();

  const onGoToDashboard = () => {
    dispatch(apiActions.clearApi(TRADE_POST_ORDER));
    history.push("/trade/dashboard");
  };

  const onGoToOrderStatus = () => {
    dispatch(apiActions.clearApi(TRADE_POST_ORDER));
    if (priceType && priceType.toLowerCase() === "market") {
      history.push("/trade/activities");
    } else {
      history.push("/trade/orders");
    }
  };

  const goToActivityButtonText = useMemo(() => {
    if (priceType && priceType.toLowerCase() === "market") {
      return "Activity";
    } else {
      return "Order Status";
    }
  }, [priceType]);

  if (isSuccess) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth={["100%", "400px", "400px", "400px"]}
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" marginBottom="30px">
          <SuccessIcon color="secondary" style={{ fontSize: "150px" }} />
        </Box>
        <Text fontSize="20px" fontWeight={600} marginBottom="30px">
          Order placed successfully
        </Text>
        <Box gridTemplateColumns="1fr 1fr" gridGap="15px" width="100%">
          <Button
            variant="contained"
            round
            onClick={onGoToOrderStatus}
            color="secondary"
            fullWidth
          >
            {goToActivityButtonText}
          </Button>
          <Button
            variant="contained"
            round
            onClick={onGoToDashboard}
            color="secondary"
            width="100%"
            fullWidth
          >
            Dashboard
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      minWidth={["100%", "300px", "300px", "300px"]}
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" marginBottom="30px">
        <RejectIcon color="error" style={{ fontSize: "100px" }} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        marginBottom="30px"
        alignItems="center"
      >
        <Text fontSize="20px" fontWeight={600} color="error.main">
          Order rejected
        </Text>
        {error && (
          <Text
            fontSize="13px"
            fontWeight={500}
            color="error.main"
            marginTop="12px"
            textAlign="center"
          >
            {error}
          </Text>
        )}
      </Box>
      <Button
        color="secondary"
        variant="contained"
        round
        onClick={onModifyOrder}
      >
        Modify order
      </Button>
    </Box>
  );
};

export default OrderStatus;
