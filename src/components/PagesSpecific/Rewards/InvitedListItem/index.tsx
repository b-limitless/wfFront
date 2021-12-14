import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Text, Box } from "trolly/common";
import { useAppInfo } from "trolly/hooks";
import { IAppState } from "store/store.interface";
import { IListReferredClients } from "store/reducers/rewards.reducers";

const percentage = (value: number, totalValues = 5) => {
  return (value / totalValues) * 100;
};

const InvitedListItem: React.FC<IListReferredClients> = ({
  email,
  stars,
  isAccountFunded2000,
  isAccountOpened,
}) => {
  const { theme } = useAppInfo();
  const { palette } = useTheme();
  const textColor = palette.text.secondary;
  const { referralPlan } = useSelector((state: IAppState) => state.rewards);

  const { currency, toFund } = useMemo((): any => {
    if (referralPlan && referralPlan.threshold) {
      return { ...(referralPlan.threshold || {}) };
    }
    return {};
  }, [referralPlan]);

  return (
    <Box padding="20px 20px 16px" borderBottom="1px solid #F1F1F1">
      <Text
        fontSize={16}
        fontWeight={500}
        color={textColor}
        marginBottom="15px"
      >
        {email}
      </Text>

      <LinearProgress
        value={percentage(stars)}
        variant="determinate"
        style={{ backgroundColor: "#C4C4C4" }}
        color={theme}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginTop="5px"
      >
        <Box display="flex" alignItems="center">
          <CheckCircleOutlineIcon
            color={isAccountOpened ? theme : "inherit"}
            fontSize="small"
          />
          <Text
            fontSize={12}
            fontWeight={500}
            color={textColor}
            marginLeft="3px"
          >
            Account opened
          </Text>
        </Box>

        <Box display="flex" alignItems="center" color={textColor}>
          <CheckCircleOutlineIcon
            color={isAccountFunded2000 ? theme : "inherit"}
            fontSize="small"
          />
          <Text
            fontSize={12}
            fontWeight={500}
            color={textColor}
            marginLeft="3px"
          >
            Funded {currency === "USD" ? `$${toFund}` : toFund}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default InvitedListItem;
