import React from "react";
import {
  Box,
  Button,
  Card,
  Link,
  Skeleton,
  Snackbar,
  Text,
} from "trolly/common";
import { Icon } from "trolly/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useGeneralAccountInfo from "./Accounts.hooks";
import { appUtils } from "trolly/utils";
import { history } from "config";
import { makeStyles } from "@material-ui/core/styles";
import useFundingApproval from "hooks/useAccountApproval";

const useStyles = makeStyles({
  icon: {
    width: "40px",
    height: "40px",
  },
});

const Accounts: React.FC = () => {
  const { isLoading, error, onCloseHandler, portfolioValue, theme, appId } =
    useGeneralAccountInfo();
  const { icon } = useStyles();
  const [isAccountApproved] = useFundingApproval();

  const onMakeDeposit = () => {
    history.push(`/${appId === "A" ? "invest" : "trade"}/funding`);
  };

  return (
    <>
      {error && (
        <Snackbar
          severity="error"
          horizontal="center"
          vertical="top"
          handleClose={onCloseHandler}
        >
          {error}
        </Snackbar>
      )}
      <Box
        marginTop="35px"
        width={["100%", "100%", "85%", "80%"]}
        maxWidth="1440px"
        margin="0 auto"
      >
        <Card
          padding="15px 25px"
          display="flex"
          flexDirection={["column-reverse", "row", "row", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" maxWidth="450px">
            {isAccountApproved ? (
              <Link
                fontSize={["18px", "18px", "20px", "20px"]}
                fontWeight={600}
                marginBottom="20px"
                onClick={onMakeDeposit}
                color={theme}
                textAlign="left"
              >
                Fund your account
              </Link>
            ) : (
              <Text
                fontSize={["18px", "18px", "20px", "20px"]}
                fontWeight={600}
                marginBottom="20px"
                color={theme === "primary" ? "primary.main" : "secondary.main"}
                textAlign="left"
              >
                Fund your account
              </Text>
            )}
            <Text
              fontSize={["13px", "13px", "14px", "14px"]}
              fontWeight={500}
              color="text.secondary"
              marginBottom="20px"
            >
              Set up a regular contributin or one-time deposit into your account
              to start investing
            </Text>
          </Box>
          <Box paddingRight={["0px", "40px", "40px", "40px"]}>
            <Icon
              iconName="WealthfaceCoin"
              iconSize="CUSTOM"
              width="150px"
              height="150px"
            />
          </Box>
        </Card>
        <Text
          fontSize="20px"
          fontWeight={600}
          marginTop="40px"
          marginBottom="20px"
        >
          Your accounts
        </Text>
        <Card padding={["25px", "25px 35px"]}>
          <Box
            flexDirection={["column", "row", "row", "row"]}
            display="flex"
            justifyContent="space-between"
            alignItems={["flex-start", "center", "center", "center"]}
          >
            <Box display="flex" mb="15px">
              <AccountCircle color={theme} className={icon} />
              <Box display="flex" flexDirection="column" marginLeft="15px">
                <Link
                  variant="default"
                  color={theme}
                  to={appId === "A" ? "/invest/portfolio" : "/trade/portfolio"}
                  fontSize="16px"
                >
                  Personal account
                </Link>
                <Text fontSize="14px" color="text.secondary" fontWeight={500}>
                  {appId === "A" ? "Investment" : "Trading"}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              mb="15px"
              flexDirection={["column", "row", "row", "row"]}
            >
              <Box
                display="flex"
                flexDirection="column"
                marginRight="15px"
                mb={["10px", "0px", "0px", "0px"]}
              >
                <Text fontSize="16px" fontWeight={600}>
                  Portfolio value
                </Text>
                {isLoading ? (
                  <Skeleton variant="text" width="70px" />
                ) : (
                  <Text fontSize="14px" color="text.secondary" fontWeight={500}>
                    {portfolioValue
                      ? `$${appUtils.formatDecimal(portfolioValue, 2)}`
                      : "---"}
                  </Text>
                )}
              </Box>
              <Button
                variant="contained"
                round
                color={theme}
                onClick={onMakeDeposit}
                disabled={!isAccountApproved}
              >
                Make a deposit
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Accounts;
