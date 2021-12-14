import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Card, Text } from "trolly/common";
import ArrowRight from "@material-ui/icons/ArrowRight";
import { IAppState } from "store/store.interface";
import { useAppInfo } from "trolly/hooks";

const Agreements: React.FC = () => {
  const { data } = useSelector((state: IAppState) => state.auth);
  const { theme } = useAppInfo();

  const regulation = useMemo(() => {
    if (data && data.user) {
      return data.user.regulation;
    }
  }, [data]);

  const onViewWfAgreement = () => {
    if (regulation) {
      if (regulation === "USA") {
        window.open(
          "https://wealthface.com/clientAgreements/wf.USA.pdf",
          "_blank"
        );
      } else {
        window.open(
          "https://wealthface.com/clientAgreements/wf.UAE.pdf",
          "_blank"
        );
      }
    }
  };

  const onViewDWAgreement = () => {
    window.open("https://wealthface.com/clientAgreements/dw.pdf", "_blank");
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom="30px">
        <Text fontSize="20px" fontWeight={600}>
          Agreements
        </Text>
      </Box>
      <Card padding="30px" marginBottom="30px">
        <Text
          color={`${theme}.main`}
          fontSize="20px"
          fontWeight={600}
          marginBottom="20px"
        >
          Wealthface client agreements
        </Text>
        <Text
          color="text.secondary"
          fontSize="14px"
          fontWeight={500}
          marginBottom="30px"
        >
          By using Wealthface's services you consent to Wealthface's terms and
          conditions detailed in the client agreement.
        </Text>
        <Button
          round
          color={theme}
          variant="contained"
          fontSize="16px"
          onClick={onViewWfAgreement}
        >
          View Wealthface Agreement <ArrowRight color={theme} />
        </Button>
      </Card>
      <Card padding="30px">
        <Text
          color={`${theme}.main`}
          fontSize="20px"
          fontWeight={600}
          marginBottom="20px"
        >
          DriveWealth client agreements
        </Text>
        <Text
          color="text.secondary"
          fontSize="14px"
          fontWeight={500}
          marginBottom="30px"
        >
          Wealthface is able to provide you its services by working with our
          pereferred global custodian, DriveWealth LLC. By using Wealthface's
          services you consent to DriveWealth's terms and conditions detailed in
          their client agreements.
        </Text>
        <Button
          round
          color={theme}
          variant="contained"
          fontSize="16px"
          onClick={onViewDWAgreement}
        >
          View DriveWealth Agreement <ArrowRight color={theme} />
        </Button>
      </Card>
    </Box>
  );
};

export default Agreements;
