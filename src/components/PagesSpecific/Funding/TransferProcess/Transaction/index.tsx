import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { useApiInfo } from "trolly/hooks";
import { Alert, Box, Button, Text } from "trolly/common";
import { IAppState } from "store/store.interface";
import { submitFundingTransferProcess } from "store/actions/funding.actions";
import {
  LOCAL_TRANSFER,
  FUNDING_PAGE_RESET,
  FUNDING_PAGE_TRANSACTION_SUBMITTING,
  FUNDING_GET_BANK_ACCOUNT,
  FUNDING_PAGE_TRANSACTION_SUBMITTED,
} from "store/store.types";
import DetailList from "../components/DetailList/DetailList";
import { useAppInfo } from "@wf-org/trolly.hooks";
import { apiActions } from "../../../../../trolly/store";

const Transaction: React.FC = () => {
  const {
    funding: {
      render,
      component: {
        amountEnter,
        currencySelected,
        selectedBankString,
        selectedBank,
        accountInfo,
        convertedAmount
      },
    },
    data: {
      user: { drivewealth_account_no },
    },
    appId,
    trade: { accountSummary },
  } = useSelector((state: IAppState) => ({ ...state.auth, ...state }));
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const dispatch = useDispatch();
  const { isLoading: fetchingBankAccount, error: errorFetchingBankAccount } =
    useApiInfo(FUNDING_GET_BANK_ACCOUNT);
  const {
    isLoading: isSubmitting,
    error: errorSubmittingTransaction,
    isSuccess,
  } = useApiInfo(FUNDING_PAGE_TRANSACTION_SUBMITTING);
  const { isLoading: isSubmitted } = useApiInfo(
    FUNDING_PAGE_TRANSACTION_SUBMITTED
  );
  const accountNumber =
    appId === "C" ? accountSummary?.accountNo : drivewealth_account_no;

  const handleCancel = () => {
    dispatch({ type: FUNDING_PAGE_RESET })
  }

  const handleSubmit = () => {
    dispatch(
      submitFundingTransferProcess({
        dwAccountNo: accountNumber,
        paymentAmount: amountEnter,
        currency: currencySelected,
        destination: render === LOCAL_TRANSFER ? "WF" : "DW",
        bankName:
          render === LOCAL_TRANSFER
            ? selectedBank.fullName
            : selectedBankString,
        paymentAmountUSD: render === LOCAL_TRANSFER ? convertedAmount : amountEnter
      })
    )
  }

  useEffect(() => {
    return () => {
      dispatch(apiActions.clearApi(FUNDING_PAGE_TRANSACTION_SUBMITTING));
    };
  }, [dispatch]);

  if (errorFetchingBankAccount || errorSubmittingTransaction)
    return (
      <Alert margin="70px 0" severity="error" icon={false}>
        Sorry we're unable to process right not.
      </Alert>
    );

  return (
    <div>
      <Box
        mt={2}
        mb={5}
        py={3}
        px={["25px", "45px"]}
        bgcolor={palette[theme].main}
        borderRadius={10}
      >
        <Text
          fontSize={16}
          fontWeight={600}
          color="#fff"
          lineHeight="26px"
          mb="10px"
        >
          Important notice
        </Text>
        <Text fontSize={14} fontWeight={500} color="#111" lineHeight="24px">
          Make sure you fund the account using a bank account under your name
          and that you enter the account reference (
          <b style={{ color: "#fff" }}>{accountNumber}</b>) in the reference,
          payment details or similar field available based on your bank.
        </Text>
      </Box>

      <Text fontSize={[20, 24]} lineHeight="40px" fontWeight={600} color="#000">
        Transaction Summary
      </Text>

      <Box display="block" mt={2} mb={4}>
        <DetailList
          content={{
            "You are sending": `${amountEnter} ${currencySelected}`,
            From:
              render === LOCAL_TRANSFER
                ? selectedBank.fullName
                : selectedBankString,
            To: accountInfo.accountInfo.beneficiary_name,
          }}
        />
      </Box>

      <Text fontSize={24} lineHeight="40px" fontWeight={600} color="#000">
        Beneficiary Details
      </Text>

      <Box display="block" mt={2} mb={7}>
        <DetailList
          content={{
            "Beneficiary Name": accountInfo.accountInfo.beneficiary_name,
            "Bank Name": accountInfo.accountInfo.bank_name,
            "Account No.": accountInfo.accountInfo.beneficiary_account_number,
            IBAN: accountInfo.accountInfo.iban,
            "SWIFT code": accountInfo.accountInfo.swift_code,
            "Bank Address": accountInfo.accountInfo.bank_address,
          }}
        />
      </Box>

      <Box display="block" textAlign="center">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={theme}
          round
          disabled={isSubmitting || isSuccess || fetchingBankAccount}
          isLoading={fetchingBankAccount || isSubmitted}
          loaderVariant="circular"
          type="button"
          fullWidth
          height="56px"
          fontSize="18px"
        >
          Confirm Transaction
        </Button>
      </Box>

      {!isSubmitted && (
        <Box mt={2} textAlign="center" display="flex" justifyContent="center">
          <Button
            onClick={handleCancel}
            disabled={isSubmitting || isSuccess}
            variant="text"
            color={theme}
            round
            type="button"
            height="56px"
            fontSize="18px"
          >
            Cancel
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Transaction;
