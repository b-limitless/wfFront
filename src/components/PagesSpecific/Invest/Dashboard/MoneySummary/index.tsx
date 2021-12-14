import { makeStyles, Theme } from "@material-ui/core";
import { appUtils } from "@wf-org/trolly.utils";
import { history } from "config";
import React from "react";
import { Box, Button, Card, Skeleton, Text } from "trolly/common";
import useAccountApproval from "hooks/useAccountApproval";

const Loader: React.FC = () => {
  return (
    <>
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="100px" />
    </>
  );
};

const useDetailBlockStyle = makeStyles((theme: Theme) => ({
  container: {
    borderRight: ({ withBorder }: { withBorder?: boolean }) =>
      withBorder ? "1px solid #c3c3c3" : "none",
    borderLeft: ({ withBorder }) => (withBorder ? "1px solid #c3c3c3" : "none"),
    flexBasis: ({ withBorder }) => (withBorder ? "40%" : "unset"),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: ({ withBorder }) => (withBorder ? "10px 0px" : "0px"),
      margin: ({ withBorder }) => (withBorder ? "10px 0px" : "0px"),
      borderLeft: "none !important",
      borderRight: "none !important",
      borderTop: ({ withBorder }) =>
        withBorder ? "1px solid #c3c3c3" : "none",
      borderBottom: ({ withBorder }) =>
        withBorder ? "1px solid #c3c3c3" : "none",
      flexBasis: "unset",
    },
  },
}));
const DetailBlock: React.FC<{
  text: string;
  value: number;
  withBorder?: boolean;
}> = ({ text, value, withBorder }) => {
  const { container } = useDetailBlockStyle({ withBorder });
  return (
    <Box display="flex" justifyContent="center" className={container}>
      <Text fontSize="16px" fontWeight={600} display="flex">
        {text}
        <Text fontSize="16px" fontWeight={600} color="text.secondary" ml="5px">
          $ {appUtils.formatDecimal(value, 2)}
        </Text>
      </Text>
    </Box>
  );
};
const MoneySummary: React.FC<{
  isLoading: boolean;
  withdrawals: number;
  deposits: number;
  investmentAmount: number;
}> = ({ isLoading, withdrawals, deposits, investmentAmount }) => {
  const goToDeposite = () => {
    history.push("/invest/funding");
  };
  const [isFundingAllowed] = useAccountApproval();
  return (
    <Card
      paddingY={["20px", "20px", "25px", "25px"]}
      paddingX={["20px", "20px", "40px", "40px"]}
      display="flex"
      flexDirection="column"
      height=" fit-content"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        mb="35px"
        mt="10px"
        flexDirection={["column", "row", "row", "row"]}
      >
        <Text
          fontSize="20px"
          fontWeight={700}
          mb={["10px", "0px", "0px", "0px"]}
        >
          Fund your account
        </Text>
        <Button
          color="primary"
          variant="contained"
          round
          onClick={goToDeposite}
          disabled={!isFundingAllowed}
        >
          Make a deposit
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={["column", "column", "row", "row"]}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DetailBlock text="Deposits" value={deposits} />
            <DetailBlock text="Withdrawals" value={withdrawals} withBorder />
            <DetailBlock text="Investment" value={investmentAmount} />
          </>
        )}
      </Box>
    </Card>
  );
};

export default MoneySummary;
