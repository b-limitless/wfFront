import React, { useMemo, useState } from "react";
import { OnboardingProcess, resetAnswers, setOldAnswers } from "trolly/modules";
import {
  UAEQuestions,
  options,
  KYCConfig,
  USAQuestions,
  taxResidency,
  preStoredData,
  KYCQuestions,
  riskLevels,
  KYCQuestionCategories,
} from "./questions";
import { Box, Button, Select, Skeleton } from "trolly/common";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import AccountOpeningTransformer from "services/AccountOpening";
import KYCPortfolio from "services/Portfolio";
import { IAppState } from "store/store.interface";

const questionsOptions = [
  { label: "UAE Regulation", value: "uae" },
  { label: "USA Regulation", value: "usa" },
  { label: "Tax Residency", value: "taxResidency" },
  { label: "KYC", value: "kyc" },
];
const OnboardingProcessComponent: React.FC<{ color?: any }> = ({ color }) => {
  const accountOpeningTransformer = new AccountOpeningTransformer();
  const portfolioManager = new KYCPortfolio();
  const { answers, questionIndex } = useSelector(
    (state: IAppState) => state.onBoardingAnswers
  );
  const { palette } = useTheme();
  const [regulation, setRegulation] = useState("uae");
  const dispatch = useDispatch();
  const onChangeRegulationHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(resetAnswers());
    setRegulation(event.target.value);
  };
  const onChange = (options: any, keys: any) =>
    console.log(options, keys, "from onChange");

  const questions = useMemo(() => {
    switch (regulation) {
      case "uae":
        return UAEQuestions;
      case "usa":
        return USAQuestions;
      case "taxResidency":
        return taxResidency;
      case "kyc":
        return KYCQuestions;
      default:
        return [];
    }
  }, [regulation]);

  const onClickLoadData = () => {
    dispatch(
      setOldAnswers(
        accountOpeningTransformer.transformWFToApp(preStoredData).answers
      )
    );
  };

  const onSubmitHandler = () => {
    let dataToTransfer;
    if (regulation === "kyc") {
      dataToTransfer = portfolioManager.getPortfolioRiskLevel(
        answers["KYCAnswersNew"],
        riskLevels,
        KYCConfig,
        KYCQuestionCategories
      );
    } else {
      dataToTransfer = accountOpeningTransformer.transformAppToWf({
        data: answers,
        questionIndex,
        appId: color === "primary" ? "A" : "C",
        isSubmit: true,
      });
    }
    console.log(dataToTransfer, "data to be transfered to wf");
    console.log(
      JSON.stringify(dataToTransfer),
      "data to be transfered to wf stringify"
    );
    window.alert(
      "Please check the console to know how the object will be sent to WF services"
    );
  };
  return (
    <Box padding={2} bgcolor={palette.background.default} gridGap="20px">
      <Select
        options={questionsOptions}
        variant="native"
        inputVariant="filled"
        disableUnderline={false}
        nativeValue={regulation}
        onNativeChange={onChangeRegulationHandler}
        color={color}
      />
      <Button round variant="contained" color={color} onClick={onClickLoadData}>
        Load Pre Stored Data
      </Button>
      <OnboardingProcess
        questions={questions}
        options={regulation === "kyc" ? KYCConfig : options}
        onChange={onChange}
        theme={color}
        onSubmit={onSubmitHandler}
        loaderComponent={<Skeleton height={200} />}
      />
    </Box>
  );
};

export default OnboardingProcessComponent;
