import { KYCLoader } from "components/Loaders";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { useApiInfo, useAppInfo } from "trolly/hooks";
import { Snackbar } from "trolly/common";
import { OnboardingProcess, TQuestion } from "trolly/modules";
import { useUSADocumentsPreparation } from "hooks/useOnboardingChecklist";
import AccountOpeningServices from "services/AccountOpening";
import { setAccountOpeningObject } from "store/actions/onBoardingProcess.actions";
import { KYC_SET_ACCOUNT_OPENING } from "store/store.types";
import { apiActions } from "trolly/store";
import { appUtils } from "trolly/utils";

const Identity: React.FC = () => {
  const accountOpeningServices = new AccountOpeningServices();
  const { questions, config, answers, accountOpening, questionIndex } =
    useSelector((state: IAppState) => ({
      ...state.onBoardingAnswers,
      ...state.onBoardingQuestions,
      ...state.auth,
      ...state.general,
    }));

  const dispatch = useDispatch();

  const { theme, appId } = useAppInfo();

  const {
    isLoading: isSetLoading,
    error: setError,
    isSuccess,
  } = useApiInfo(KYC_SET_ACCOUNT_OPENING);

  const {
    isChecking: isLoading,
    error,
    onClearError: clearError,
  } = useUSADocumentsPreparation({
    startFromBegining: true,
  });

  const [questionBlock, options, oldIndex] = useMemo(() => {
    if (questions && questions.length > 0 && config) {
      const identityQuestion = questions.find(
        (question) => question.id === "identity"
      );
      const oldHeaderText =
        identityQuestion && identityQuestion.header
          ? identityQuestion.header.text
          : "";
      const oldTitleText =
        identityQuestion && identityQuestion.title
          ? identityQuestion.title.text
          : "";
      const updatedQuestion: TQuestion = {
        ...identityQuestion,
        skip: {},
        index: 1,
        header: {
          text: oldHeaderText,
          style: {
            fontSize: "20px",
          },
        },
        title: {
          text: oldTitleText,
          style: {
            fontSize: "14px",
          },
        },
      };
      // use to keep the old index when submitting the document to wf
      const pageIndex =
        accountOpening &&
        accountOpening.status &&
        accountOpening.status.pageIndex;
      return [[updatedQuestion], config.options, pageIndex];
    }
    return [];
  }, [questions, config, accountOpening]);

  const onSubmitDocuments = () => {
    const index = oldIndex || questionIndex;
    const dataToSend = accountOpeningServices.transformAppToWf({
      data: answers,
      questionIndex: index,
      appId,
      isSubmit: false,
    });
    dispatch(
      setAccountOpeningObject({ data: dataToSend, shouldNotRelead: true })
    );
  };

  const onClearSetAccountOpeningState = () => {
    dispatch(apiActions.clearApi(KYC_SET_ACCOUNT_OPENING));
  };

  if (isLoading || !questionBlock || !options || appUtils.isEmpty(answers)) {
    return <KYCLoader />;
  }
  return (
    <>
      {error && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!error}
          handleClose={clearError}
        >
          {error}
        </Snackbar>
      )}
      {setError && (
        <Snackbar
          severity="error"
          vertical="top"
          horizontal="center"
          open={!!setError}
          handleClose={onClearSetAccountOpeningState}
        >
          {setError}
        </Snackbar>
      )}
      {isSuccess && (
        <Snackbar
          severity="success"
          vertical="top"
          horizontal="center"
          open={isSuccess}
          handleClose={onClearSetAccountOpeningState}
        >
          Your documents has been set successfully
        </Snackbar>
      )}
      <OnboardingProcess
        questions={questionBlock}
        options={options}
        theme={theme}
        submitButtonProps={{ width: "250px", fullWidth: false }}
        onSubmit={onSubmitDocuments}
        isProcessing={isSetLoading}
      />
    </>
  );
};

export default Identity;
