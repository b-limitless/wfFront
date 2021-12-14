import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { IAppState } from "store/store.interface";
import { Text, Select, Box, Button, Dialog, Input, Alert } from "trolly/common";
import {
  getFundingBankAccount,
  getFundingBankList,
} from "store/actions/funding.actions";
import {
  FUNDING_GET_BANK_ACCOUNT,
  FUNDING_GET_BANK_LIST,
  LOCAL_TRANSFER,
  WIRE_TRANSFER,
} from "store/store.types";
import Loader from "../components/Loader";

const Bank: React.FC = () => {
  const {
    funding: {
      render,
      component: {
        isSubmitting,
        selectedBank: selectedBankState,
        selectedBankString: selectedBankStringState,
        selectedBankTransformed: selectedBankTransformedState,
        currencySelected,
        bankList: bankListState,
      },
    },
    data: {
      user: { drivewealth_account_no },
    },
    appId,
    trade: { accountSummary },
  } = useSelector((state: IAppState) => ({ ...state.auth, ...state }));
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const color =
    theme === "secondary" ? palette.secondary.main : palette.primary.main;
  const [selectedBank, setSelectedBank] = useState(selectedBankState);
  const [selectedBankTransformed, setSelectedBankTransformed] = useState(
    selectedBankTransformedState
  );
  const [selectedBankString, setSelectedBankString] = useState(
    selectedBankStringState
  );
  const [bankList, setBankList] = useState(bankListState);
  const [open, setOpen] = useState(false);
  const [openBankPage, setOpenBankPage] = useState(false);
  const { isLoading: fetchingBankList, error: errorFetchingBankList } =
    useApiInfo(FUNDING_GET_BANK_LIST);
  const {
    isLoading: fetchingBankAccount,
    isSuccess: successFetchingBankAccount,
    error: errorFetchingBankAccountInfo,
  } = useApiInfo(FUNDING_GET_BANK_ACCOUNT);

  const accountNumber =
    appId === "C" ? accountSummary?.accountNo : drivewealth_account_no;

  const handleClickContinue = () => {
    if (render === LOCAL_TRANSFER) {
      dispatch(
        getFundingBankAccount(
          currencySelected,
          "wf",
          selectedBank,
          selectedBankTransformed,
          selectedBankString
        )
      );
      setOpenBankPage(true);
    } else {
      dispatch(
        getFundingBankAccount(
          currencySelected,
          "dw",
          selectedBank,
          selectedBankTransformed,
          selectedBankString
        )
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const isButtonDisabled = () => {
    if (open || isSubmitting) {
      return true;
    }
    if (
      render === LOCAL_TRANSFER &&
      selectedBankTransformed &&
      selectedBankTransformed.iso2 === ""
    ) {
      return true;
    }
    return render === WIRE_TRANSFER && selectedBankString === "";
  };

  useEffect(() => {
    if (render === LOCAL_TRANSFER && bankListState.length === 0) {
      dispatch(getFundingBankList());
    }
  }, [bankListState.length, render, dispatch]);

  useEffect(() => {
    setBankList(bankListState);
  }, [bankListState]);

  useEffect(() => {
    if (!!selectedBankTransformed?.iso2) {
      const bank = bankList.filter(
        (bank) =>
          bank.name.toLowerCase() ===
          selectedBankTransformed.iso2?.toLowerCase()
      );
      setSelectedBank(bank[0]);
    }
  }, [selectedBankTransformed, bankList]);

  useEffect(() => {
    if (successFetchingBankAccount) {
      setOpen(false);
      if (openBankPage && selectedBank.link !== "not available") {
        const win = window.open(selectedBank.link, "_blank");
        win?.focus();
        setOpenBankPage(false);
      }
    }
  }, [successFetchingBankAccount, openBankPage, selectedBank]);

  if (errorFetchingBankList || errorFetchingBankAccountInfo)
    return (
      <Alert margin="70px 0" severity="error" icon={false}>
        Sorry we're unable to process right not.
      </Alert>
    );

  if (fetchingBankList) return <Loader />;

  return (
    <div>
      <Dialog open={open} animationVariant="fade" withAnimation={true}>
        <Box
          display="block"
          textAlign="center"
          maxWidth={470}
          px={3}
          pb="25px"
          pt="5px"
        >
          <WarningRoundedIcon
            style={{
              width: 56,
              height: 56,
              margin: "0 auto",
              color: palette[theme].main,
            }}
          />

          <Text
            fontSize={20}
            lineHeight="26px"
            mt="18px"
            mb="10px"
            fontWeight={600}
            color={palette[theme].main}
          >
            Important notice
          </Text>

          <Text
            fontSize={14}
            lineHeight="26px"
            m={0}
            mb={3}
            fontWeight={500}
            color="#636363"
            maxWidth={380}
          >
            Make sure you fund the account using a bank account under your name
            and that you enter your account number (
            <b style={{ color }}>{accountNumber}</b>) in the reference, payment
            details or similar field available based on your bank.
          </Text>

          <Button
            variant="contained"
            color={theme}
            round
            type="button"
            fullWidth={false}
            height="48px"
            fontSize="18px"
            minWidth="170px"
            onClick={handleClickContinue}
            loaderVariant="circular"
            isLoading={fetchingBankAccount}
          >
            Continue
          </Button>
        </Box>
      </Dialog>

      <Text fontSize={20} mt={3} mb={3} fontWeight={500} color="#000">
        Select your bank
      </Text>
      <Text
        fontSize={16}
        mb="10px"
        fontWeight={500}
        color={palette.grey["300"]}
      >
        {render === WIRE_TRANSFER
          ? "Enter your bank name"
          : "Enter your local (UAE) bank account"}
      </Text>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        {render === WIRE_TRANSFER ? (
          <Box mt="12px">
            <Input
              label="Bank Name"
              fullWidth={true}
              variant="outlined"
              color={theme}
              value={selectedBankString}
              onChange={(e) => setSelectedBankString(e.target.value)}
            />
          </Box>
        ) : (
          <>
            <Select
              placeholder="Search for your bank"
              variant="search"
              searchIconPosition="start"
              searchIconSpacing="10px"
              fullWidth={true}
              inputVariant="outlined"
              color={theme}
              onChange={(event, value: any) =>
                setSelectedBankTransformed(value)
              }
              customRenderOption={(option: any) => option.value}
              options={bankList.map((bank) => ({
                label: bank.fullName,
                value: bank.fullName,
                iso2: bank.name,
              }))}
              value={selectedBankTransformed}
            />
          </>
        )}

        <Box mt={5}>
          <Button
            variant="contained"
            color={theme}
            round
            disabled={isButtonDisabled()}
            type="submit"
            fullWidth
            height="56px"
            fontSize="18px"
          >
            Next
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Bank;
