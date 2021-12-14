import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box, Link, Text } from "trolly/common";
import { useAppInfo } from "trolly/hooks";
import SettingContainer from "../SettingContainer";

const AccountInformation: React.FC<{ accountNumber?: string }> = ({
  accountNumber,
}) => {
  const { palette } = useTheme();
  const { theme } = useAppInfo();

  return (
    <SettingContainer header="Account Information">
      <Box
        padding="25px"
        display="block"
        borderBottom={`1px solid ${palette.grey[100]}`}
      >
        <Box display="block">
          <Text fontSize={14} fontWeight={500} lineHeight={1.5} mt={1} mb={2}>
            Investor Account Credentials
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
            px={4}
            borderRadius={4}
            bgcolor={palette.background.default}
          >
            <Text fontSize={14} fontWeight={500} lineHeight={1.5}>
              Account Number
            </Text>
            <Text fontSize={14} fontWeight={500} lineHeight={1.5}>
              {accountNumber}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box padding="35px 25px" display="block">
        <Box display="block" mt={4} mb={3}>
          <Text fontSize="14px" fontWeight={500} lineHeight={1.5}>
            Please{" "}
            <Link to="/trade/withdrawal" fontSize={14} color={theme}>
              Withdraw
            </Link>{" "}
            all remaining funds. Once complete please contact{" "}
            <Link
              fontSize={14}
              color={theme}
              href="mailto:support@wealthface.com"
            >
              support@wealthface.com
            </Link>
          </Text>
        </Box>

        <Text
          fontSize={14}
          fontWeight={500}
          lineHeight={1.5}
          color={theme === "primary" ? "primary.main" : "secondary.main"}
        >
          Note, we suggest keeping accounts open to ensure final monthly and
          annual statements can be delivered to you.
        </Text>
      </Box>
    </SettingContainer>
  );
};

export default AccountInformation;
