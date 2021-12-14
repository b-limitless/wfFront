import { Box, Snackbar } from "trolly/common";
import { useUSADocumentsPreparation } from "hooks/useOnboardingChecklist";
import Title from "portals/PageTitle";
import React, { useMemo, useState } from "react";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { OnboardingProcess } from "trolly/modules";
import { KYCLoader } from "components/Loaders";
import AccountOpeningTransformer from "services/AccountOpening";
import { setAccountOpeningObject } from "store/actions/onBoardingProcess.actions";
import { KYC_SET_ACCOUNT_OPENING } from "store/store.types";

const DocumentsSubmit: React.FC = () => {
  const accountOpeningTransformer = new AccountOpeningTransformer();
  const { questions, config, countries, questionIndex, appId, accountOpening } =
    useSelector((state: IAppState) => ({
      ...state.onBoardingQuestions,
      ...state.onBoardingAnswers,
      ...state.general,
      ...state.auth,
    }));
  const { theme } = useAppInfo();
  const dispatch = useDispatch();

  const [isSkipLoading, setIsSkipLoading] = useState(false);
  const {
    isChecking: isProcessing,
    onClearError,
    error: accountOpeningPreparationError,
  } = useUSADocumentsPreparation({ startFromBegining: true });
  const { isLoading, error } = useApiInfo(KYC_SET_ACCOUNT_OPENING);

  // TODO: enhance this part , as documents doesn't need countries options to be available
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

  const onSubmit = (answers: any) => {
    const dataToSend = accountOpeningTransformer.transformAppToWf({
      data: answers,
      questionIndex,
      appId,
      isAccountOpeningCompleted: true,
      isSubmit: true,
    });
    // set the account opening object at submit with the proper submit attribute based on the appId
    dispatch(
      setAccountOpeningObject({ data: dataToSend, shouldGoNext: false })
    );
  };

  const onSkip = () => {
    const dataToSend = accountOpeningTransformer.transformAppToWf({
      data: accountOpening,
      questionIndex,
      appId,
      isAccountOpeningCompleted: true,
      isSubmit: true,
    });
    setIsSkipLoading(true);
    // set the account opening object at submit with the proper submit attribute based on the appId
    dispatch(
      setAccountOpeningObject({ data: dataToSend, shouldGoNext: false })
    );
  };

  if (!questions || !formatedOptions || isProcessing) {
    return <KYCLoader />;
  }
  return (
    <Box width="100%" maxWidth="100%" mt="20px">
      <Title pageTitle="Documents Submit" siteTitle="Wealthface" />
      {accountOpeningPreparationError && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!error}
          handleClose={onClearError}
        >
          {accountOpeningPreparationError}
        </Snackbar>
      )}
      {/* we removed the onNext Handler as the documents hold one question only */}
      <OnboardingProcess
        theme={theme}
        questions={questions}
        options={formatedOptions}
        loaderComponent={<KYCLoader />}
        onSubmit={onSubmit}
        onSkip={onSkip}
        isProcessing={isLoading && !isSkipLoading}
        isSkipLoading={isSkipLoading}
        processingError={error as string}
        onClearProcessingError={onClearError}
      />
    </Box>
  );
};

export default DocumentsSubmit;
