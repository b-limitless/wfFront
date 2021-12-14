import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Input, Select, Snackbar } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import SettingContainer from "../SettingContainer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import useUserInfo from "hooks/useUserIInfo";
import { PhoneInput, TPhoneOption } from "trolly/custom";
import { updateProfile } from "store/actions/general.actions";
import { setAnswers } from "trolly/modules";
import {
  GENERAL_UPDATE_USER_PROFILE,
  KYC_SET_ACCOUNT_OPENING,
} from "store/store.types";
import { apiActions } from "trolly/store";

const Profile: React.FC = () => {
  const [touched, setTouched] = useState(false);
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullPhone, setFullPhone] = useState("");
  const { theme } = useAppInfo();

  const dispatch = useDispatch();

  const onChangePhoneHandler = (
    phone?: string,
    code?: string,
    codeOption?: TPhoneOption,
    fullPhone?: string
  ) => {
    if (!touched) {
      setTouched(true);
    }
    if (phone) {
      setPhone(phone);
      dispatch(setAnswers(phone, ["dw", "BASIC_INFO", "phone"]));
    } else {
      dispatch(setAnswers("", ["dw", "BASIC_INFO", "phone"]));
      setPhone("");
    }
    if (code) {
      setCountry(code);
      dispatch(setAnswers(code, ["dw", "BASIC_INFO", "country"]));
    } else {
      dispatch(setAnswers("", ["dw", "BASIC_INFO", "country"]));
      setCountry("");
    }
    if (fullPhone) {
      setFullPhone(fullPhone);
    } else {
      setFullPhone("");
    }
  };

  const onChangeCompanyHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!touched) {
      setTouched(true);
    }
    const { name, value } = event.target;
    if (name === "status") {
      dispatch(setAnswers(value, ["dw", "EMPLOYMENT_INFO", "status"]));
    } else if (name === "position") {
      dispatch(setAnswers(value, ["dw", "EMPLOYMENT_INFO", "position"]));
    } else {
      dispatch(setAnswers(value, ["dw", "EMPLOYMENT_INFO", "company"]));
    }
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateProfile(fullPhone));
  };

  const { countries, config } = useSelector((state: IAppState) => ({
    ...state.general,
    ...state.onBoardingQuestions,
  }));

  const [positions = [], employment = []] = useMemo(() => {
    if (config) {
      const { options } = config;
      const { position, employment } = options || {};
      return [position, employment];
    }
    return [];
  }, [config]);

  const phoneOptions = useMemo(
    () => (countries ? countries.phoneCodeDwOptions : []),
    [countries]
  );

  const {
    countryCode = "",
    phoneNumber = "",
    fullPhoneNumber = "",
    first_name,
    last_name,
    email,
    addressCountry,
    addressCity,
    addressLine,
    employmentCompanyName = "",
    employmentPosition = "",
    employmentStatus = "",
  } = useUserInfo();

  useEffect(() => {
    if (!country) {
      setCountry(countryCode);
    }
    if (!phone) {
      setPhone(phoneNumber);
    }
    if (!fullPhone) {
      setFullPhone(fullPhoneNumber);
    }
  }, [country, phone, fullPhone, countryCode, phoneNumber, fullPhoneNumber]);

  const addressTextArr = useMemo(() => {
    const addressLines = [];
    if (addressCountry) {
      addressLines.push(addressCountry);
    }
    if (addressCity) {
      addressLines.push(addressCity);
    }
    if (addressLine) {
      addressLines.push(addressLine);
    }
    return addressLines;
  }, [addressCity, addressCountry, addressLine]);

  const {
    isLoading: profileLoading,
    error: profileError,
    isSuccess: profileSuccess,
  } = useApiInfo(GENERAL_UPDATE_USER_PROFILE);
  const {
    isLoading: accountOpeningLoading,
    error: accountOpeningError,
    isSuccess: accountOpeningSuccess,
  } = useApiInfo(KYC_SET_ACCOUNT_OPENING);

  const [isLoading, error, isSuccess] = useMemo(() => {
    return [
      profileLoading || accountOpeningLoading,
      profileError || accountOpeningError ? true : false,
      profileSuccess && accountOpeningSuccess,
    ];
  }, [
    profileError,
    profileLoading,
    profileSuccess,
    accountOpeningError,
    accountOpeningLoading,
    accountOpeningSuccess,
  ]);

  const onCloseMessage = () => {
    dispatch(apiActions.clearApi(GENERAL_UPDATE_USER_PROFILE));
    dispatch(apiActions.clearApi(KYC_SET_ACCOUNT_OPENING));
  };

  return (
    <SettingContainer header="Personal information">
      {isSuccess && (
        <Snackbar
          open={isSuccess}
          severity="success"
          horizontal="center"
          vertical="top"
          handleClose={onCloseMessage}
        >
          Your profile has been updated successfully
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={error}
          severity="error"
          horizontal="center"
          vertical="top"
          handleClose={onCloseMessage}
        >
          {accountOpeningError || profileError}
        </Snackbar>
      )}
      <form onSubmit={onSubmitHandler}>
        <Box padding="25px" display="block">
          <Box
            display="grid"
            gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
            gridGap="24px"
            mb={5}
          >
            <Input
              value={first_name}
              fontSize="14px"
              fontWeight={500}
              id="first-name"
              label="First Name"
              color={theme}
              disabled
            />

            <Input
              value={last_name}
              fontSize="14px"
              fontWeight={500}
              id="last-name"
              label="Last Name"
              color={theme}
              disabled
            />
          </Box>

          <Box mb={5}>
            <PhoneInput
              code={country}
              phone={phone}
              codeLabel="Code"
              phoneLabel="phone"
              color={theme}
              options={phoneOptions}
              withCountryFlagLabel={true}
              withCountryFlagList={true}
              onChange={onChangePhoneHandler}
              error={!fullPhone}
              errorMessage="Phone number is incorrect"
              fontSize="14px"
              disableCode
            />
          </Box>

          <Box display="block" mb={5}>
            <Input
              label="Email Address"
              value={email}
              fontSize="14px"
              fontWeight={500}
              fullWidth
              id="email"
              disabled
              color={theme}
            />
          </Box>

          <Box display="block" mb={5}>
            <Input
              label="Address"
              value={addressTextArr.join(" - ")}
              fontSize="14px"
              fontWeight={500}
              fullWidth
              id="address"
              disabled
              color={theme}
            />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
            gridGap="24px"
            mb={5}
          >
            <Select
              fontSize="14px"
              fontWeight={500}
              id="status"
              options={employment}
              variant="native"
              nativeValue={employmentStatus}
              label="Status"
              name="status"
              color={theme}
              onNativeChange={onChangeCompanyHandler}
            />
            <Input
              value={employmentCompanyName}
              fontSize="16px"
              fontWeight={500}
              id="company-name"
              name="companyName"
              label="Company name"
              color={theme}
              onChange={onChangeCompanyHandler}
            />
          </Box>

          <Box mb={5}>
            <Select
              nativeValue={employmentPosition}
              options={positions}
              variant="native"
              label="Position"
              fontSize="14px"
              fontWeight={500}
              fullWidth
              id="position"
              name="position"
              color={theme}
              onNativeChange={onChangeCompanyHandler}
            />
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              color={theme}
              variant="contained"
              round
              type="submit"
              disabled={!fullPhone || !touched}
              isLoading={isLoading}
            >
              Save changes
            </Button>
          </Box>
        </Box>
      </form>
    </SettingContainer>
  );
};

export default Profile;
