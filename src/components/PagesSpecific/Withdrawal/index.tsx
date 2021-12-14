import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "trolly/common";
import { Icon } from "trolly/icons";
import { IAppState } from "store/store.interface";
import { CashFlowButton } from "components/common";
import useStyles from "./Withdrawal.style";
import WithdrawalForm from "./WithdrawalForm";
import Status from "./Status";
import { useApiInfo, useAppInfo } from "../../../trolly/hooks";
import { WITHDRAWAL_SAVE_REQUEST_COMPLETED } from "../../../store/store.types";
import { getAccountSummary } from "store/actions/trade.actions";

type TWithdrawalChanel = {
  [key: string]: string[];
};
const withdrawalChannels: TWithdrawalChanel = {
  usa: ["WIRE", "ACH", "CHECK"],
  rest: ["WIRE"],
};
export type TWithdrawalComponent = {
  header: string;
  description: string;
  subDescription: string;
  icon?: ReactNode;
};
const initialWithdrawalComponent = {
  header: "",
  description: "",
  subDescription: "",
};
type TWithdrawalMethods = {
  [key: string]: TWithdrawalComponent;
};
const withdrawalMethodsDescription: TWithdrawalMethods = {
  ACH: {
    header: "ACH",
    description: "Transfers in: 1-3 business days",
    subDescription: "Fee: 0.25%",
    icon: (
      <Icon
        iconName="IconWireTransfer"
        iconSize="CUSTOM"
        width="99px"
        height="60px"
      />
    ),
  },
  CHECK: {
    header: "Check",
    description: "Transfers in: 5-7 business days",
    subDescription: "Fee: 3.00$",
    icon: (
      <Icon
        iconName="IconWireTransfer"
        iconSize="CUSTOM"
        width="99px"
        height="60px"
      />
    ),
  },
  WIRE: {
    header: "Wire Transfer",
    description: "Transfers in: 1–4 Business Days",
    subDescription:
      "Fee: $25 outgoing domestic wire fee / $35 outgoing international wire fee",
    icon: (
      <Icon
        iconName="IconWireTransfer"
        iconSize="CUSTOM"
        width="99px"
        height="60px"
      />
    ),
  },
};

const Withdrawal: React.FC = () => {
  const classes = useStyles();
  const { address_country, accountSummary } = useSelector(
    (state: IAppState) => ({ ...state.auth.data.user, ...state.trade })
  );
  const [withdrawChanel, setWithdrawChanel] = useState([""]);
  const [component, setComponent] = useState<TWithdrawalComponent>(
    initialWithdrawalComponent
  );
  const { isSuccess } = useApiInfo(WITHDRAWAL_SAVE_REQUEST_COMPLETED);
  const { appId } = useAppInfo();
  const dispatch = useDispatch();

  const handleButtonClick = (option: TWithdrawalComponent) => () => {
    setComponent(option);
  };

  const handleReset = () => {
    setComponent(initialWithdrawalComponent);
  };

  useEffect(() => {
    if (address_country) {
      if (address_country.toLowerCase() === "united states") {
        setWithdrawChanel(withdrawalChannels.usa);
      } else {
        setWithdrawChanel(withdrawalChannels.rest);
      }
    }
  }, [address_country]);

  useEffect(() => {
    if (appId === "C" && !accountSummary) {
      dispatch(getAccountSummary());
    }
  }, [appId, dispatch, accountSummary]);

  if (isSuccess) return <Status handleDone={handleReset} />;

  return (
    <div className={classes.Withdrawal}>
      <Text fontSize="20px" mb={3} fontWeight={600}>
        Withdrawal
      </Text>

      {component.header === "" ? (
        !!withdrawChanel[0] &&
        withdrawChanel.map((option) => {
          const data = withdrawalMethodsDescription[option];
          const { description, header, subDescription, icon } = data;
          const subtitle = [description, subDescription];
          return (
            <CashFlowButton
              key={option}
              data={{
                title: header,
                subtitle,
                icon: icon as ReactElement,
                onClick: { clickAction: handleButtonClick(data) },
              }}
            />
          );
        })
      ) : (
        <>
          <WithdrawalForm
            component={component}
            handleClickCancel={handleReset}
          />
        </>
      )}
    </div>
  );
};
export default Withdrawal;
