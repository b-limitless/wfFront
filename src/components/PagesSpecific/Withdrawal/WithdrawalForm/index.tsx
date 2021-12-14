import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Card, Input, Snackbar, Text } from "trolly/common";
import { useAppInfo } from "@wf-org/trolly.hooks";
import { TWithdrawalComponent } from "../index";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { saveWithdrawalRequestAPI } from "../../../../store/actions/funding.actions";
import { IAppState } from "../../../../store/store.interface";
import { useApiInfo } from "../../../../trolly/hooks";
import { WITHDRAWAL_SAVE_REQUEST } from "../../../../store/store.types";
import { apiActions } from "../../../../trolly/store";
import {
  useInvestAccountInfo,
  useTradeAccountInfo,
} from "hooks/useAccountInfo";
import WithdrawalLoader from "./Loader";
import { appUtils } from "trolly/utils";

type TMethodsObj = {
  [key: string]: string;
};
type TMethods = {
  [key: string]: TMethodsObj[];
};
const methods: TMethods = {
  "Wire Transfer": [
    { name: "amount", title: "Withdraw Amount" },
    { name: "beneficiaryName", title: "Beneficiary Name" },
    {
      name: "beneficiaryAccountNumber",
      title: "Beneficiary Account IBAN Number",
    },
    { name: "beneficiaryAccountType", title: "Beneficiary Account Type" },
    { name: "beneficiarySwiftABA", title: "SWIFT (Intl) / ABA#(US)" },
    { name: "beneficiaryBankName", title: "Bank Name" },
    { name: "beneficiaryBankAddress", title: "Bank Address" },
    { name: "beneficiaryBankCity", title: "Bank City" },
    { name: "beneficiaryBankProvince", title: "Bank State/Province" },
    { name: "beneficiaryBankCountry", title: "Bank Country" },
    { name: "beneficiaryRoutingNumber", title: "Beneficiary Routing Number" },
  ],
  ACH: [
    { name: "amount", title: "Withdraw Amount" },
    { name: "beneficiaryName", title: "Beneficiary Name" },
    { name: "beneficiaryAccountNumber", title: "Beneficiary Account Number" },
    { name: "beneficiaryAccountType", title: "Beneficiary Account Type" },
    { name: "beneficiaryRoutingNumber", title: "Beneficiary Routing Number" },
  ],
  Check: [
    { name: "amount", title: "Withdraw Amount" },
    { name: "beneficiaryName", title: "Beneficiary Name" },
  ],
};

const initialForm: TFormValue = {
  amount: "",
  beneficiaryName: "",
  beneficiaryAccountNumber: "",
  beneficiaryAccountType: "",
  beneficiarySwiftABA: "",
  beneficiaryBankName: "",
  beneficiaryBankAddress: "",
  beneficiaryBankCity: "",
  beneficiaryBankProvince: "",
  beneficiaryBankCountry: "",
  beneficiaryRoutingNumber: "",
  note: "",
};
type TFormValue = {
  [key: string]: string;
};
type IForm = {
  values: TFormValue;
};

type Props = {
  component: TWithdrawalComponent;
  handleClickCancel: () => void;
};

const WithdrawalForm: React.FC<Props> = ({
  component: { header, subDescription },
  handleClickCancel,
}) => {
  const { cashAvailableForWithdrawal, isLoading: isTradeLoading } =
    useTradeAccountInfo();
  const {
    equityValue,
    cashValue,
    isLoading: isInvestLoading,
  } = useInvestAccountInfo();
  const { theme, appId } = useAppInfo();
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { formatDecimal } = appUtils;

  const isFetchingAccountInfo = useMemo(
    () => (appId === "A" ? isInvestLoading : isTradeLoading),
    [isInvestLoading, isTradeLoading, appId]
  );

  const { data, accountSummary } = useSelector((state: IAppState) => ({
    ...state.auth,
    ...state.trade,
  }));
  const [form, setForm] = useState<IForm>({ values: initialForm });
  const [isExceedingTheAmount, setIsExceddingTheAmount] = useState(false);
  const {
    isLoading: isSubmitting,
    error,
    isSuccess,
  } = useApiInfo(WITHDRAWAL_SAVE_REQUEST);

  const accountId = useMemo(() => {
    if (appId === "A") {
      const { drivewealth_account_id } = data.user;
      return drivewealth_account_id;
    } else {
      if (accountSummary) {
        const { accountID } = accountSummary;
        return accountID;
      }
    }
  }, [accountSummary, data, appId]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (header === "Wire Transfer") {
      dispatch(
        saveWithdrawalRequestAPI({
          accountID: accountId,
          amount: form.values.amount,
          currency: "USD",
          type: "WIRE",
          details: {
            beneficiaryName: form.values.beneficiaryName,
            beneficiaryAccountNumber: form.values.beneficiaryAccountNumber,
            beneficiaryAccountType: form.values.beneficiaryAccountType,
            beneficiaryRoutingNumber: form.values.beneficiaryRoutingNumber,
            beneficiarySwiftABA: form.values.beneficiarySwiftABA,
            beneficiaryBankName: form.values.beneficiaryBankName,
            beneficiaryBankAddress: form.values.beneficiaryBankAddress,
            beneficiaryBankCity: form.values.beneficiaryBankCity,
            beneficiaryBankProvince: form.values.beneficiaryBankProvince,
            beneficiaryBankZip: "",
            beneficiaryBankCountry: form.values.beneficiaryBankCountry,
          },
          note: form.values.note,
        })
      );
    } else if (header === "ACH") {
      dispatch(
        saveWithdrawalRequestAPI({
          accountID: accountId,
          amount: form.values.amount,
          currency: "USD",
          type: "ACH",
          details: {
            beneficiaryName: form.values.beneficiaryName,
            beneficiaryAccountNumber: form.values.beneficiaryAccountNumber,
            beneficiaryAccountType: form.values.beneficiaryAccountType,
            beneficiaryRoutingNumber: form.values.beneficiaryRoutingNumber,
          },
          note: form.values.note,
        })
      );
    } else if (header === "Check") {
      dispatch(
        saveWithdrawalRequestAPI({
          accountID: accountId,
          amount: form.values.amount,
          currency: "USD",
          type: "CHECK",
          details: {
            name: form.values.beneficiaryName,
          },
          note: form.values.note,
        })
      );
    }
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const { name, value } = event.target;

      if (name !== "amount") {
        setForm({
          values: {
            ...form.values,
            [name]: value,
          },
        });
      }

      if (name === "amount") {
        if (!isNaN(Number(value)) || !value) {
          setForm({
            values: {
              ...form.values,
              [name]: value,
            },
          });
          // set exceeding the amount based on the availavle cash
          // for both invest and trade
          if (appId === "C") {
            if (+value > cashAvailableForWithdrawal) {
              setIsExceddingTheAmount(true);
            } else {
              setIsExceddingTheAmount(false);
            }
          } else if (appId === "A") {
            const availableCash = cashValue + equityValue;
            if (+value > availableCash) {
              setIsExceddingTheAmount(true);
            } else {
              setIsExceddingTheAmount(false);
            }
          }
        }
      }
    },
    [appId, cashAvailableForWithdrawal, equityValue, cashValue, form]
  );

  const onCloseMessage = () => {
    dispatch(apiActions.clearApi(WITHDRAWAL_SAVE_REQUEST));
  };

  return (
    <div>
      {error && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!error}
          handleClose={onCloseMessage}
        >
          {error as any}
        </Snackbar>
      )}
      {isSuccess && (
        <Snackbar
          severity="success"
          vertical="top"
          horizontal="center"
          open={!!isSuccess}
          handleClose={onCloseMessage}
        >
          Your request was successfully submitted and will be processed shortly
          by our team
        </Snackbar>
      )}
      {isFetchingAccountInfo ? (
        <WithdrawalLoader />
      ) : (
        <Card display="block" padding={["25px 15px", "25px"]}>
          <Text fontSize={18} mt={1} mb={1} fontWeight={600} color="#000">
            {header}
          </Text>

          <Text fontSize={14} color="#6C6C6C" fontWeight={500}>
            {subDescription}
          </Text>

          <Box
            mt={3}
            mb="26px"
            px={4}
            py={3}
            bgcolor={palette[theme].main}
            borderRadius={10}
          >
            <Text fontSize={14} fontWeight={500} color="#fff" lineHeight="24px">
              It is important that all information you provide below is correct.
              Incorrect information can lead to delays in your funds being
              received and fees to process your withdrawal request again. Please
              note that we review all the withdrawal requests internally before
              sending them to our custodian.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gridTemplateColumns={["1fr", "2fr 2fr", "2fr 2fr"]}
              gridGap={20}
            >
              {methods[header].map(({ name, title }) => (
                <Box display="block" key={name}>
                  <Input
                    fontSize="14px"
                    fontWeight={500}
                    id={name}
                    label={title}
                    name={name}
                    value={form.values[name]}
                    onChange={handleChange}
                    color={theme}
                    inputStartPadding="20px"
                    unit={name === "amount" ? "USD" : ""}
                    unitPosition="end"
                    required
                    error={name === "amount" && isExceedingTheAmount}
                    errorMessage={`You can not withdraw more than your available cash ${
                      appId === "C"
                        ? formatDecimal(cashAvailableForWithdrawal, 2)
                        : formatDecimal(cashValue + equityValue, 2)
                    }`}
                  />
                </Box>
              ))}

              <Box display="block">
                <Input
                  fontSize="14px"
                  fontWeight={500}
                  id="leave-note"
                  label="Leave a note"
                  name="note"
                  value={form.values.note}
                  onChange={handleChange}
                  color={theme}
                />
              </Box>
            </Box>

            <Box display="block" maxWidth="320px" margin="40px auto 8px">
              <Button
                variant="contained"
                color={theme}
                round
                type="submit"
                height="50px"
                disabled={isSubmitting || isExceedingTheAmount}
                fullWidth
              >
                Withdraw
              </Button>
            </Box>

            <Box display="flex" justifyContent="center" textAlign="center">
              <Button
                onClick={handleClickCancel}
                round
                disabled={isSubmitting}
                type="button"
                variant="text"
                color={theme}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Card>
      )}
    </div>
  );
};
export default WithdrawalForm;
