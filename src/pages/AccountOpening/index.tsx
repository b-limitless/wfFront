import { Box, Snackbar } from "trolly/common";
import { useAccountOpeningPreparation } from "hooks/useOnboardingChecklist";
import Title from "portals/PageTitle";
import React, { useMemo } from "react";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { OnboardingProcess } from "trolly/modules";
import { KYCLoader } from "components/Loaders";
import AccountOpeningTransformer from "services/AccountOpening";
import { setAccountOpeningObject } from "store/actions/onBoardingProcess.actions";
import { KYC_SET_ACCOUNT_OPENING } from "store/store.types";
import { apiActions } from "trolly/store";

const AccountOpening: React.FC<{ retry?: boolean }> = ({ retry }) => {
  const accountOpeningTransformer = new AccountOpeningTransformer();
  const { questions, config, countries, answers, questionIndex, appId } =
    useSelector((state: IAppState) => ({
      ...state.onBoardingQuestions,
      ...state.onBoardingAnswers,
      ...state.general,
      ...state.auth,
    }));
  const { theme } = useAppInfo();
  const dispatch = useDispatch();

  const {
    isProcessing,
    clearError,
    error: accountOpeningPreparationError,
  } = useAccountOpeningPreparation({
    start: true,
    startFromBegining: retry,
  });
  const { isLoading, error } = useApiInfo(KYC_SET_ACCOUNT_OPENING);

  const formatedOptions = useMemo(() => {
    if (countries && config) {
      const { options } = config;
      const {
        allCountriesOptions,
        dwSupportedCountriesOptions,
        phoneCodeOptions,
        phoneCodeDwOptions,
      } = countries;
      return {
        ...options,
        countries: allCountriesOptions,
        supportedDwCountries: dwSupportedCountriesOptions,
        phoneCodes: phoneCodeOptions,
        phoneCodesDw: phoneCodeDwOptions,
      };
    }
  }, [config, countries]);

  const onClearError = () => {
    dispatch(apiActions.clearApi(KYC_SET_ACCOUNT_OPENING));
  };

  const onNextHandler = () => {
    const newQuestionIndex = questionIndex + 1;
    const dataToSend = accountOpeningTransformer.transformAppToWf({
      data: answers,
      questionIndex: newQuestionIndex,
      appId,
      isSubmit: false,
      isAccountOpeningCompleted: false,
    });
    // set the account opening object at every level
    dispatch(setAccountOpeningObject({ data: dataToSend, shouldGoNext: true }));
  };

  const onSubmit = (answers: any) => {
    const dataToSend = accountOpeningTransformer.transformAppToWf({
      data: answers,
      questionIndex,
      appId,
      isSubmit: false,
      isAccountOpeningCompleted: true,
    });
    // set the account opening object at submit with the proper submit attribute based on the appId
    dispatch(
      // we don't pass should Go Next or Should not reload as this is an if else condition
      // shouldGoToDocuments is being handled first
      setAccountOpeningObject({ data: dataToSend, shouldGoToDocuments: true })
    );
  };

  if (!questions || !formatedOptions || isProcessing) {
    return <KYCLoader />;
  }
  return (
    <Box width="100%" maxWidth="100%">
      <Title pageTitle="Account Opening" siteTitle="Wealthface" />
      {accountOpeningPreparationError && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!error}
          handleClose={clearError}
        >
          {accountOpeningPreparationError}
        </Snackbar>
      )}
      <OnboardingProcess
        theme={theme}
        questions={questions}
        options={formatedOptions}
        loaderComponent={<KYCLoader />}
        onSubmit={onSubmit}
        onNext={onNextHandler}
        isProcessing={isLoading}
        processingError={error as string}
        onClearProcessingError={onClearError}
      />
    </Box>
  );
};

export default AccountOpening;
