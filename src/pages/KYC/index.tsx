import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKYCObj } from "store/actions/onBoardingProcess.actions";
import { IAppState } from "store/store.interface";
import { OnboardingProcess } from "trolly/modules";
import Portfolio from "services/Portfolio";
import Title from "portals/PageTitle";
import { Box, Snackbar } from "trolly/common";
import { KYCLoader } from "components/Loaders";
import { apiActions, WF_APPID } from "trolly/store";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { useKYCPreparation } from "hooks/useOnboardingChecklist";
import { KYC_SET_OBJ } from "store/store.types";
import { appUtils } from "trolly/utils";

const OnboardingKyc: React.FC<{ retakeKYC?: boolean }> = ({
  retakeKYC = false,
}) => {
  const portfolio = new Portfolio();

  const { theme } = useAppInfo();
  const dispatch = useDispatch();
  const { isLoading, error } = useApiInfo(KYC_SET_OBJ);
  const { questions, config, data, answers, questionIndex, invest } =
    useSelector((state: IAppState) => ({
      ...state.onBoardingQuestions,
      ...state.onBoardingAnswers,
      ...state.auth,
      ...state.general,
    }));
  const [processError, setProcessError] = useState("");

  // const { isProcessing } = useOnboardingActions({ retakeKYC });
  // preparing the kyc questions or decide what action need to be taken
  const {
    isChecking,
    error: error_KYC_PREPARE,
    onClearError,
  } = useKYCPreparation({ retakeKYC, start: true });

  const onNextHandler = () => {
    const dataToSend = {
      ...answers,
      KYCNextQuestion: questionIndex + 1,
      KYCPortfolio: {},
      KYCdw: {},
      app: WF_APPID === "A" ? "invest" : "trade",
    };
    // onboarding has on next but we need to process it after we set the
    // data in wealthface kyb object
    dispatch(setKYCObj(dataToSend, true));
  };

  const onSubmit = () => {
    const { user } = data;
    const { email = "" } = user;
    const answerKey = Object.keys(answers)[0];
    if (answers[answerKey] && config && invest) {
      const { riskLevels = [], KYCQuestionCategories = [] } = invest;
      const KYCPortfolio = portfolio.getPortfolioRiskLevel(
        answers[answerKey],
        riskLevels,
        config.options,
        KYCQuestionCategories
      );
      const dataToSend = {
        ...answers,
        KYCNextQuestion: questionIndex + 1,
        KYCPortfolio,
        KYCdw: portfolio.resolveDWData(answers[answerKey], email),
        app: WF_APPID === "A" ? "invest" : "trade",
      };
      dispatch(setKYCObj(dataToSend));
    } else {
      setProcessError(
        "There might be an issue during the process, please check all your answers then try again later"
      );
    }
  };

  const onClearErrorOnboarding = () => {
    dispatch(apiActions.clearApi(KYC_SET_OBJ));
    setProcessError("");
  };

  if (!questions || !config || !config.options || isChecking) {
    return (
      <>
        <Snackbar
          open={!appUtils.isEmpty(error_KYC_PREPARE)}
          handleClose={onClearError}
          severity="error"
          vertical="top"
          horizontal="center"
        >
          {error_KYC_PREPARE}
        </Snackbar>
        <KYCLoader />
      </>
    );
  }
  return (
    <Box width="100%" maxWidth="100%">
      <Title pageTitle="Kyc" siteTitle="Wealthface" />
      <OnboardingProcess
        theme={theme}
        questions={questions}
        options={config.options}
        onSubmit={onSubmit}
        onNext={onNextHandler}
        loaderComponent={<KYCLoader />}
        isProcessing={isLoading}
        processingError={(error || processError) as string}
        onClearProcessingError={onClearErrorOnboarding}
      />
    </Box>
  );
};

export default OnboardingKyc;
