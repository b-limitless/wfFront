import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { apiActions } from "trolly/store";
import { IAppState } from "store/store.interface";
import {
  LOCAL_TRANSFER,
  FUNDING_PAGE_OTHER_OPTIONS,
  WIRE_TRANSFER,
  FUNDING_PAGE_HOME,
  FUNDING_PAGE_NAVIGATION_BACK,
  FUNDING_GET_PAYMENT_INITIALIZE,
} from "store/store.types";
import { Icon } from "trolly/icons";
import { CashFlowButton, IOptionsConfigObj } from "components/common";
import Navigation from "../Navigation";
import IconSEPA from "assets/Images/iconSepa.png";
import IconWesternUnion from "assets/Images/iconWesternUnion.png";
import IconTransferWise from "assets/Images/iconTransferwise.png";
import FundingIframe from "../FundingIframe";

type TOptionsConfig = {
  [key: string]: IOptionsConfigObj;
};

const optionsConfig: TOptionsConfig = {
  other_funding_methods: {
    icon: (
      <Icon
        iconName="IconOtherOptions"
        iconSize="CUSTOM"
        width="64px"
        height="64px"
      />
    ),
    title: "Other Funding Methods",
    subtitle: [
      "Deposits in: Vary by country",
      "Fee: Vary by amount and country",
    ],
    onClick: {
      type: "dispatch",
      dispatchType: FUNDING_PAGE_OTHER_OPTIONS,
      url: "",
    },
  },
  standard_local_transfer: {
    icon: (
      <Icon
        iconName="IconLocalTransfer"
        iconSize="CUSTOM"
        width="110px"
        height="58px"
      />
    ),
    title: "Standard Local Transfer",
    subtitle: ["Deposits in: 1-3 business days", "Fee: Local (UAE) Free"],
    onClick: {
      type: "dispatch",
      dispatchType: LOCAL_TRANSFER,
      url: "",
    },
  },
  wire_transfer: {
    icon: (
      <Icon
        iconName="IconWireTransfer"
        iconSize="CUSTOM"
        width="99px"
        height="60px"
      />
    ),
    title: "Wire Transfer",
    subtitle: ["Deposits in: 1-3 business days", "Fee: Vary by country"],
    onClick: {
      type: "dispatch",
      dispatchType: WIRE_TRANSFER,
      url: "",
    },
  },
  plaid: {
    icon: (
      <Icon
        iconName="IconDirectDeposit"
        iconSize="CUSTOM"
        width="60px"
        height="71px"
      />
    ),
    title: "Plaid",
    subtitle: ["Deposits in: Same day", "Fee: Free for local (USA) transfer"],
    onClick: {
      type: "api_call",
      dispatchType: "",
      url: "plaid",
    },
  },
  credit_card: {
    icon: (
      <Icon iconName="IconCards" iconSize="CUSTOM" width="65px" height="auto" />
    ),
    title: "Credit or Debit Cards",
    subtitle: ["Deposits in: 2 business days", "Fee: 2.19% - 3.94% Fee"],
    onClick: {
      type: "api_call",
      dispatchType: "",
      url: "card",
    },
  },
  transfer_wise: {
    icon: IconTransferWise,
    title: "Transfer Wise",
    subtitle: ["Deposits in: 1-4 business days", "Fee: Vary by country"],
    onClick: {
      type: "api_call",
      dispatchType: "",
      url: "transferwise",
    },
  },
  sepa: {
    icon: IconSEPA,
    title: "SEPA",
    subtitle: ["Deposits in: 1-3 business days", "Fee: 1.5%"],
    onClick: {
      type: "api_call",
      dispatchType: "",
      url: "sepa",
    },
  },
  western_union: {
    icon: IconWesternUnion,
    title: "Western Union",
    subtitle: ["Deposits in: 2 business days", "Fee: 2.19% - 3.94% Fee"],
    onClick: {
      type: "api_call",
      dispatchType: "",
      url: "westernunion",
    },
  },

  direct_deposit_dapi: {
    icon: (
      <Icon
        iconName="IconDirectDeposit"
        iconSize="CUSTOM"
        width="60px"
        height="71px"
      />
    ),
    title: "Connect your bank account",
    subtitle: ["Deposits in: Same day", "Fee: Free for local (UAE) transfer"],
    onClick: {
      type: "dispatch",
      dispatchType: "FUNDING_DIRECT_TRANSFER",
      url: "",
    },
  },
  international_wire_transfer: {
    icon: (
      <Icon
        iconName="IconWireTransfer"
        iconSize="CUSTOM"
        width="99px"
        height="60px"
      />
    ),
    title: "Wire Transfer",
    subtitle: ["Deposits in: 1-3 business days", "Fee: Vary by country"],
    onClick: {
      type: "dispatch",
      dispatchType: "FUNDING_WIRE_TRANSFER",
      url: "",
    },
  },
};

interface Props {
  otherOptions: boolean;
}

const Home: React.FC<Props> = ({ otherOptions }) => {
  const dispatch = useDispatch();
  const { data, iframeUrl } = useSelector((state: IAppState) => state.funding);

  const { fundingOptions, otherFundingMethods } = useMemo(() => data, [data]);
  const { error: errorPaymentInitialized } = useApiInfo(
    FUNDING_GET_PAYMENT_INITIALIZE
  );

  const onCloseError = () => {
    dispatch(apiActions.clearApi(FUNDING_GET_PAYMENT_INITIALIZE));
  };

  return (
    <div>
      {errorPaymentInitialized && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!errorPaymentInitialized}
          handleClose={onCloseError}
          message={errorPaymentInitialized}
        >
          {errorPaymentInitialized as any}
        </Snackbar>
      )}
      {iframeUrl && <FundingIframe />}
      {otherOptions ? (
        <>
          <Navigation
            title="Other Funding Methods"
            homeDispatchType={FUNDING_PAGE_HOME}
            navigateBackDispatchType={FUNDING_PAGE_NAVIGATION_BACK}
          />

          {otherFundingMethods
            .filter((option) => !!optionsConfig[option])
            .map((option) => (
              <CashFlowButton key={option} data={optionsConfig[option]} />
            ))}
        </>
      ) : (
        fundingOptions
          ?.filter((option) => !!optionsConfig[option])
          .map((option) => (
            <CashFlowButton key={option} data={optionsConfig[option]} />
          ))
      )}
    </div>
  );
};
export default Home;
