import React from "react";
import { Text } from "trolly/common";
import { CorrectIcon, InCorrectIcon, CheckListWrapper } from "./Settings.style";
import { useAppInfo } from "trolly/hooks";

const PasswordCheckList: React.FC<{
  password: string;
  checkList: { [key: string]: boolean };
}> = ({ password = "", checkList }) => {
  const { theme } = useAppInfo();
  return (
    // render check list for the password
    <>
      <CheckListWrapper>
        {password.length >= 8 ? (
          <CorrectIcon color={theme} />
        ) : (
          <InCorrectIcon />
        )}
        <Text
          fontSize={14}
          color={password.length >= 8 ? `${theme}.main` : "text.secondary"}
          ml={1}
        >
          8 Characters minimum
        </Text>
      </CheckListWrapper>
      <CheckListWrapper>
        {checkList.hasUpperCase ? (
          <CorrectIcon color={theme} />
        ) : (
          <InCorrectIcon />
        )}
        <Text
          fontSize={14}
          color={password.length >= 8 ? `${theme}.main` : "text.secondary"}
          ml={1}
        >
          One upper case letter at least
        </Text>
      </CheckListWrapper>
      <CheckListWrapper>
        {checkList.hasNumber ? (
          <CorrectIcon color={theme} />
        ) : (
          <InCorrectIcon />
        )}
        <Text
          fontSize={14}
          color={password.length >= 8 ? `${theme}.main` : "text.secondary"}
          ml={1}
        >
          One number at least
        </Text>
      </CheckListWrapper>
    </>
  );
};

export default PasswordCheckList;
