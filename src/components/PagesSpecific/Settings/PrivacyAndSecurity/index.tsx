import React, { useMemo, useState } from "react";
import { Box, Button, Snackbar, Text } from "trolly/common";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import SettingContainer from "../SettingContainer";
import { PasswordInput } from "trolly/custom";
import PasswordCheckList from "../PasswordCheckList";
import { validators } from "trolly/utils";
import { useDispatch } from "react-redux";
import { apiActions, authActions, STORE_TYPES } from "trolly/store";

const PrivacyAndSecurity: React.FC = () => {
  // set the checklist of the password
  const [checkList, setCheckList] = useState<{ [key: string]: boolean }>(
    validators.getPasswordCheckList() || {
      hasNumber: false,
      hasUpperCase: false,
    }
  );
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const { theme } = useAppInfo();
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>("");
  const [newPasswordErr, setNewPasswordErr] = useState<string>("");
  const [currentPasswordErr, setCurrentPasswordErr] = useState<string>("");

  const dispatch = useDispatch();

  const onChangeHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordErr("");
    setNewPasswordErr("");
    setCurrentPasswordErr("");
    validate(name, value);
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  };

  const validate = (name: string, value: string) => {
    if (name === "newPassword") {
      if (!value) {
        setNewPasswordErr("This field cannot be empty");
      }
      setCheckList(validators.getPasswordCheckList(value));
    }
    if (name === "currentPassword" && !value) {
      setCurrentPasswordErr("This field cannot be empty");
    }
    if (name === "confirmPassword") {
      if (values["newPassword"] && values["newPassword"] !== value) {
        setConfirmPasswordErr("Confirm and new password is not matching");
      } else if (!value) {
        setConfirmPasswordErr("This field cannot be empty");
      }
    }
  };

  const { isLoading, error, isSuccess } = useApiInfo(
    STORE_TYPES.AUTH_CHANGE_PASSWORD
  );

  const onPasswordChange = (event: any) => {
    event.preventDefault();
    const { newPassword, currentPassword } = values;
    dispatch(authActions.changePassword(currentPassword, newPassword));
  };

  const onClearMessage = () => {
    dispatch(apiActions.clearApi(STORE_TYPES.AUTH_CHANGE_PASSWORD));
  };

  const canSubmit = useMemo(() => {
    return (
      !confirmPasswordErr &&
      !newPasswordErr &&
      !currentPasswordErr &&
      values["currentPassword"] &&
      values["confirmPassword"] &&
      values["newPassword"] &&
      values["newPassword"].length >= 8 &&
      Object.keys(checkList).filter((single) => !checkList[single]).length === 0
    );
  }, [
    checkList,
    newPasswordErr,
    values,
    confirmPasswordErr,
    currentPasswordErr,
  ]);

  return (
    <SettingContainer header="Privacy and security">
      {error && (
        <Snackbar
          open={!!error}
          severity="error"
          horizontal="center"
          vertical="top"
          handleClose={onClearMessage}
        >
          {error}
        </Snackbar>
      )}
      {isSuccess && (
        <Snackbar
          open={isSuccess}
          severity="success"
          vertical="top"
          horizontal="center"
          handleClose={onClearMessage}
        >
          Your password has been changed successfully
        </Snackbar>
      )}
      <form onSubmit={onPasswordChange}>
        <Box padding="25px" display="block">
          <Box display="block" mb={5}>
            <Box display="block" mb={2}>
              <Text fontSize="14px" fontWeight={500} lineHeight={1.5}>
                Change Password
              </Text>
            </Box>

            <Box display="block" maxWidth="450px">
              <PasswordInput
                label="Current password"
                id="current-password"
                fontSize="14px"
                name="currentPassword"
                fontWeight={500}
                onChange={onChangeHandler}
                error={!!currentPasswordErr}
                errorMessage={currentPasswordErr}
                color={theme}
              />
            </Box>

            <Box display="block" my={3}>
              <PasswordCheckList
                checkList={checkList}
                password={values["newPassword"]}
              />
            </Box>

            <Box display="block" mb={4} maxWidth="450px">
              <PasswordInput
                label="New password"
                id="new-password"
                fontSize="14px"
                name="newPassword"
                fontWeight={500}
                onChange={onChangeHandler}
                error={!!newPasswordErr}
                errorMessage={newPasswordErr}
                color={theme}
              />
            </Box>

            <Box display="block" mb={4} maxWidth="450px">
              <PasswordInput
                label="Confirm password"
                id="confirm-password"
                name="confirmPassword"
                fontSize="14px"
                fontWeight={500}
                onChange={onChangeHandler}
                error={!!confirmPasswordErr}
                errorMessage={confirmPasswordErr}
                color={theme}
              />
            </Box>
          </Box>
          <Box display="flex">
            <Button
              variant="contained"
              color={theme}
              round
              disabled={!canSubmit}
              type="submit"
              isLoading={isLoading}
              fullWidth={false}
              fontSize="14px"
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </form>
    </SettingContainer>
  );
};

export default PrivacyAndSecurity;
