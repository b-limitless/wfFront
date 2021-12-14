import { makeStyles, Theme } from "@material-ui/core";
import { useInvestAccountInfo } from "hooks/useAccountInfo";
import React from "react";
import { Box, Card, Text } from "trolly/common";
import { Indicator } from "trolly/custom";
import { appUtils } from "trolly/utils";
import AccountInfoLoader from "./Loader";

interface ISummaryBlockProps {
  header: string;
  value?: number;
  topDetailTitle?: string;
  bottomDetailTitle?: string;
  topDetailValue?: number;
  bottomDetailValue?: number;
  withIndicator?: boolean;
  isIndicator?: boolean;
  title?: string;
}
const SummaryBlock: React.FC<ISummaryBlockProps> = ({
  header,
  bottomDetailTitle,
  bottomDetailValue,
  topDetailTitle,
  topDetailValue,
  value,
  withIndicator,
  isIndicator,
  title,
}) => {
  const getRoundedValue = (anyValue: any) => {
    return appUtils.formatDecimal(anyValue, 2);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={["center", "center", "flex-start", "flex-start"]}
      mt={["20px", "20px", "0px", "0px"]}
    >
      <Text fontSize="20px" mb="10px" fontWeight={600}>
        {header}
      </Text>
      {title ? (
        <Text fontSize="16px" color="text.secondary" fontWeight={600}>
          {title}
        </Text>
      ) : (
        <Box display="flex" alignItems="center">
          <Text
            color="text.secondary"
            fontSize="16px"
            mr="8px"
            fontWeight={600}
          >
            {getRoundedValue(value)}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            borderLeft="1px solid #6c6c6c"
            pl="8px"
          >
            <Text
              variant="body2"
              color="text.secondary"
              display="flex"
              fontWeight={500}
            >
              {topDetailTitle}
              {isIndicator ? (
                <Indicator
                  withIndicator={withIndicator}
                  withSign={false}
                  ml="5px"
                  value={topDetailValue}
                >
                  {getRoundedValue(topDetailValue)}
                </Indicator>
              ) : (
                <Text
                  variant="body2"
                  ml="5px"
                  color="text.primary"
                  mr="8px"
                  fontWeight={500}
                >
                  {getRoundedValue(topDetailValue)}
                </Text>
              )}
            </Text>
            <Text
              color="text.secondary"
              display="flex"
              fontWeight={500}
              variant="body2"
            >
              {bottomDetailTitle}
              {isIndicator ? (
                <Indicator
                  withIndicator={withIndicator}
                  withSign={false}
                  ml="5px"
                  value={bottomDetailValue}
                >
                  {getRoundedValue(bottomDetailValue)}
                </Indicator>
              ) : (
                <Text
                  ml="5px"
                  color="text.primary"
                  mr="8px"
                  fontWeight={500}
                  variant="body2"
                >
                  {getRoundedValue(bottomDetailValue)}
                </Text>
              )}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: "40px",
    padding: "40px 50px 40px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
    },
  },
}));

const AccountSummary: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { root } = useStyles();
  const {
    equityValue,
    cashValue,
    totalEarnings,
    dailyEarning,
    totalReturn,
    dailyReturn,
    portfolioValue,
  } = useInvestAccountInfo({ doNotFetchData: true });

  if (isLoading) {
    return (
      <Card padding="20px" mt="40px" width="100%" display="flex">
        <AccountInfoLoader />
      </Card>
    );
  }
  return (
    <Card className={root}>
      <SummaryBlock header="Account Name" title="Investment" />
      <SummaryBlock
        header="Portfolio Value ($)"
        value={portfolioValue}
        topDetailTitle="Equity Value"
        topDetailValue={equityValue}
        bottomDetailTitle="Cash Value"
        bottomDetailValue={cashValue}
      />
      <SummaryBlock
        header="Earnings($)"
        value={totalEarnings}
        topDetailTitle="Daily"
        topDetailValue={dailyEarning}
        bottomDetailTitle="Total"
        bottomDetailValue={totalEarnings}
        withIndicator={true}
        isIndicator={true}
      />
      <SummaryBlock
        header="Return(%)"
        value={totalReturn}
        topDetailTitle="Daily"
        topDetailValue={dailyReturn}
        bottomDetailTitle="Total"
        bottomDetailValue={totalReturn}
        withIndicator={true}
        isIndicator={true}
      />
    </Card>
  );
};

export default AccountSummary;
