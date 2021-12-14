import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NextButtonWrapper,
  CardWrapper,
  BackIcon,
  StyledIconButton,
  ButtonContentWrapper,
  useElementsStyle,
} from "./OnboardingProcess.style";
import FieldRenderer from "./FieldRenderer";
import { validators, appUtils } from "@wf-org/trolly.utils";
import ProgressIdentifier from "./PrgoressIdentifier";
import { useDispatch, useSelector } from "react-redux";
import { setAnswers, setFullAnswers } from "./redux/actions";
import Slide from "@material-ui/core/Slide";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {
  Button,
  Box,
  Card,
  Text,
  Link,
  TSelectOption,
  Snackbar,
} from "@wf-org/trolly.common";
import useQuestion from "./hooks/useQuestion";
import {
  IOnboardingProps,
  IOnboardingState,
  TField,
  TQuestion,
  TQuestionBoxContent,
  TTextType,
} from "./OnboardingProcess.interface";
import useStateValue from "./hooks/useStateValue";
import useValidationErrors from "./hooks/useValidationErrors";
import { useBreakPoints } from "@wf-org/trolly.hooks";

const OnboardingProcess: React.FC<IOnboardingProps> = ({
  questions = [],
  options,
  theme = "primary",
  onNext,
  onBack,
  onChange,
  onSubmit,
  isProcessing,
  isSkipLoading,
  processingError,
  onClearProcessingError,
  loaderComponent,
  submitButtonProps,
  onSkip,
}) => {
  /**
   * media queries matchers
   */

  const { xSmall, small } = useBreakPoints();

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});

  /**
   * get value for each field from redux store
   * TODO later we gonna make this work on other state management
   */
  const { getValue } = useStateValue();

  const { answers } = useSelector(
    (state: IOnboardingState) => state.onBoardingAnswers
  );

  const dispatch = useDispatch();

  // to handle any card error in future if we need to show an error during the process
  const [cardError, setCardError] = useState("");
  // to handle any
  const [lastAction = "next", setLastAction] = useState<
    "next" | "back" | undefined
  >();
  const [, validateFields, setRegisteredFields, registeredFields] =
    useValidationErrors(validationErrors, setValidationErrors);

  /**
   * reset the validation errors on unmount
   */
  useEffect(() => {
    setValidationErrors({});
    setRegisteredFields([]);
  }, [questions, setRegisteredFields]);

  /**
   * hook to have the basic onboarding process handlers and data
   */
  const [
    question,
    questionIndex,
    totalQuestions,
    onNextHandler,
    onBackHandler,
    onSkipHandler,
    setOtherValues,
    validateConditions,
    clearRelevantData,
    isDefaultSet,
  ] = useQuestion(
    questions,
    options,
    registeredFields,
    setRegisteredFields,
    setLastAction,
    onSkip
  );

  /**
   * conditions
   */
  const [isLastQuestion, isFirstQuestion] = useMemo(() => {
    return [questionIndex === totalQuestions, questionIndex === 1];
  }, [questionIndex, totalQuestions]);

  /**
   * get the current progress of the progress bar
   */
  const currentProgress = useMemo(() => {
    if (
      validators.isNumber(totalQuestions) &&
      validators.isNumber(questionIndex)
    ) {
      return (questionIndex / totalQuestions) * 100;
    }
    return 0;
  }, [questionIndex, totalQuestions]);

  /**
   * can go next or back
   */
  const canGoNext = useMemo(() => {
    return validateFields() && !isSkipLoading;
  }, [validateFields, isSkipLoading]);

  const canGoBack = useMemo(() => !isFirstQuestion, [isFirstQuestion]);

  /**
   * validate if can go to next page
   */
  const validateAndGoNext = useCallback(
    (e) => {
      e.preventDefault();
      if (validateFields(true)) {
        if (isLastQuestion && onSubmit) {
          /**
           * if reached last step and no errors , trigger onLastStep function
           */
          const currentAnswers = { ...answers };
          const cleanedAnswers = appUtils.cleanObject(currentAnswers);
          dispatch(setFullAnswers(cleanedAnswers));
          onSubmit(cleanedAnswers);
        } else {
          /**
           * go to the next step
           */
          if (onNext) {
            onNext(answers);
            setLastAction("next");
          } else {
            onNextHandler();
          }
        }
      }
    },
    [
      isLastQuestion,
      onNext,
      onNextHandler,
      onSubmit,
      validateFields,
      dispatch,
      answers,
    ]
  );

  /**
   * unregistered all fields on back
   */
  const onPreviousHandler = useCallback(() => {
    if (onBackHandler && canGoBack) {
      setRegisteredFields([]);
      onBackHandler();
      if (onBack) {
        onBack();
      }
    }
  }, [canGoBack, onBack, onBackHandler, setRegisteredFields]);

  /**
   * extract the header and the title of the page
   */
  const { header, title, hint, skip } = useMemo(
    () => (question || {}) as TQuestion,
    [question]
  );

  /**
   * extract the hint details and check if hint is exist
   */
  const [
    hintHeaderText,
    hintHeaderStyle,
    hintTitleText,
    hintTitleStyle,
    withHint,
    withHintAnimation,
  ] = useMemo(() => {
    const { title = {}, header = {}, withAnimation = false } = hint || {};
    const { text: titleText = "", style: titleStyle = {} } = (title ||
      {}) as TTextType;
    const { text: headerText = "", style: headerStyle = {} } = (header ||
      {}) as TTextType;
    return [
      headerText,
      headerStyle,
      titleText,
      titleStyle,
      (headerText || titleText) && !small ? true : false,
      withAnimation,
    ];
  }, [hint, small]);

  /**
   * @description get the skip data - if available the question could be skipped
   */
  const {
    text: skipText = "Skip it now, I'll do it later",
    style: skipStyle = {},
    couldSkip,
  } = useMemo(() => {
    if (skip) {
      const { style } = skip;
      const { color } = style || {};
      if (color !== "danger" && color !== "footer") {
        return {
          ...skip,
          style: {
            ...(skip ? skip.style : {}),
            color: theme,
          },
        };
      }
      return skip;
    }
    return {};
  }, [skip, theme]);

  /**
   * responsible for setting the default value
   * register field
   * unregister field if the dependency is not exist
   * add more logic here ..
   */
  const fieldManager = useCallback(
    (field: TField) => {
      const {
        keys,
        conditions,
        shouldNotClearOnConditions,
        id,
        checkedValue,
        unCheckedValue,
      } = field;
      /**
       * responsible to check the existence
       */
      const shouldRender = validateConditions(conditions);

      /**
       * register the field if not registered
       */
      const isFieldExist = registeredFields.find(
        (registeredField) => registeredField.id === id
      );
      if (shouldRender) {
        if (!isFieldExist) {
          setRegisteredFields((oldFields) => [...oldFields, field]);
        }
      } else {
        /**
         * or clear the answer of the field and unregister the field
         */
        if (isFieldExist) {
          setRegisteredFields((oldFields) =>
            oldFields.filter((registeredField) => registeredField.id !== id)
          );
        }
        if (!shouldNotClearOnConditions) {
          // if the field is checkbox and its values is object
          if (checkedValue && unCheckedValue) {
            if (!appUtils.isObjectAndEmpty(checkedValue)) {
              Object.keys(checkedValue).forEach((attr) => {
                dispatch(setAnswers("", [...(keys || []), attr]));
              });
            }
          } else {
            dispatch(setAnswers("", keys));
          }
        }
      }
      return shouldRender;
    },
    [registeredFields, dispatch, validateConditions, setRegisteredFields]
  );

  const onCloseError = () => {
    setCardError("");
    if (onClearProcessingError) {
      onClearProcessingError();
    }
  };

  const renderCardElements = useCallback(
    (card: TQuestionBoxContent[]) => {
      return card.map((box, boxIndex) => {
        const { style = {}, fields = [] } = box;
        return (
          <Box gridGap="15px" {...style} key={`${boxIndex + 1}_group`}>
            {fields.map((field, fieldIndex) => {
              /**
               * register field , check any default value or dependencies , clear values if not being rendered and unregister fields
               */
              const shouldRender = fieldManager(field);
              const { style: fieldStyle = {}, optionsFilterOut } = field;
              // responsible to filter out an options from the options list based on conditions
              let filteredOptions = (options[field.optionsKey || ""] ||
                []) as TSelectOption[];
              if (optionsFilterOut) {
                const {
                  values: filterOutValues,
                  conditions: filterOutConditions = [],
                } = optionsFilterOut;
                const passed =
                  filterOutConditions.length > 0
                    ? validateConditions(filterOutConditions)
                    : true;
                if (passed) {
                  filteredOptions = filteredOptions.filter(
                    (option: TSelectOption) =>
                      filterOutValues.indexOf(option.value) < 0
                  );
                }
              }
              if (shouldRender) {
                return (
                  <Box {...fieldStyle} key={field.id}>
                    <FieldRenderer
                      field={field}
                      animationIndex={boxIndex + fieldIndex + 1}
                      value={getValue(field)}
                      phoneValue={getValue({
                        keys: field.phoneNumberKeys || [],
                      })}
                      codeValue={getValue({
                        keys: field.phoneCodeKeys || [],
                      })}
                      options={filteredOptions}
                      theme={theme}
                      onChange={onChange}
                      errors={validationErrors}
                      setErrors={setValidationErrors}
                      setOtherValues={setOtherValues}
                    />
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        );
      });
    },
    [
      getValue,
      validationErrors,
      options,
      theme,
      fieldManager,
      onChange,
      validateConditions,
      setOtherValues,
    ]
  );

  const renderCards = useCallback((): ReactNode => {
    if (question) {
      const {
        data: questionData = [],
        conditions: questionConditions,
        index,
      } = question;
      const shouldRenderQuestion = validateConditions(questionConditions);
      // should render the page or remove all the relevant values
      if (shouldRenderQuestion) {
        if (!isDefaultSet) {
          return loaderComponent;
        }
        return questionData.map((cardData, cardIndex) => {
          const {
            content,
            style = {},
            conditions: cardConditions,
            isBlock,
          } = cardData;
          const shouldRenderCard = validateConditions(cardConditions);
          if (shouldRenderCard) {
            // if block then it should not contained by a card
            if (!isBlock) {
              return (
                <Card padding="30px" {...style} key={`${cardIndex}-${index}`}>
                  {renderCardElements(content)}
                </Card>
              );
            }
            return renderCardElements(content);
          } else {
            clearRelevantData(cardData);
            return null;
          }
        });
      } else {
        /**
         * clear Relevant data
         */
        clearRelevantData(questionData);
        // go next or based on the available action without validaiton
        if (lastAction === "next" && questionIndex + 1 <= totalQuestions) {
          /**
           * go to the next step
           */
          onNextHandler();
        } else if (lastAction === "back" && questionIndex - 1 >= 1) {
          onPreviousHandler();
        }
      }
    }
    return null;
  }, [
    question,
    renderCardElements,
    clearRelevantData,
    validateConditions,
    onNextHandler,
    onPreviousHandler,
    lastAction,
    questionIndex,
    isDefaultSet,
    loaderComponent,
    totalQuestions,
  ]);
  // grid layout based on total questions
  const { container, formCentered, formRightAligned } = useElementsStyle({
    withHint,
    totalQuestions,
  });

  const skipComponent = useMemo(() => {
    if (couldSkip && skipText) {
      if (isSkipLoading || isProcessing) {
        return (
          <Text {...skipStyle} color="text.disabled" textAlign="center">
            {skipText}
          </Text>
        );
      }
      return (
        <Link {...skipStyle} onClick={onSkipHandler}>
          {skipText}
        </Link>
      );
    }
  }, [
    couldSkip,
    isSkipLoading,
    skipText,
    onSkipHandler,
    skipStyle,
    isProcessing,
  ]);

  return (
    <>
      {totalQuestions > 1 && (
        <ProgressIdentifier
          value={currentProgress}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          theme={theme}
        />
      )}
      <Box
        className={container}
        gridColumnGap="10px"
        width={["95%", "95%", "85%", "85%"]}
        margin="auto auto 25px"
      >
        {totalQuestions > 1 && !xSmall && (
          <Box display="block" marginBottom={["20px", "20px", "0px", "0px"]}>
            {canGoBack && (
              <StyledIconButton onClick={onPreviousHandler}>
                <BackIcon />
              </StyledIconButton>
            )}
          </Box>
        )}
        <CardWrapper
          className={
            !withHint && totalQuestions > 1 ? formCentered : formRightAligned
          }
          component="form"
          onSubmit={validateAndGoNext}
        >
          {header && (
            <Text
              color="text.primary"
              fontSize={["26px", "28px", "30px"]}
              fontWeight={700}
              {...header.style}
            >
              {header.text}
            </Text>
          )}
          {title && (
            <Text
              color="text.secondary"
              fontSize={["16px", "18px"]}
              fontWeight={500}
              {...title.style}
            >
              {title.text}
            </Text>
          )}
          {(cardError || processingError) && (
            <Snackbar
              vertical="top"
              horizontal="center"
              severity="error"
              handleClose={onCloseError}
              open={!!cardError || !!processingError}
            >
              {cardError || processingError}
            </Snackbar>
          )}
          <Box display="grid" gridGap="35px" marginTop="25px">
            {renderCards()}
          </Box>
          <NextButtonWrapper>
            <Button
              color={theme}
              fontSize="16px"
              disabled={!canGoNext}
              isLoading={isProcessing}
              loaderVariant="linear"
              variant="contained"
              round
              fullWidth={xSmall}
              width="250px"
              height="50px"
              type="submit"
              {...submitButtonProps}
            >
              {isLastQuestion ? (
                "Submit"
              ) : (
                <ButtonContentWrapper>
                  <span>Next</span> <ArrowForward />
                </ButtonContentWrapper>
              )}
            </Button>
            {xSmall && totalQuestions > 1 && canGoBack && (
              <Button
                color={theme}
                fullWidth={true}
                fontSize="16px"
                loaderVariant="linear"
                variant="outlined"
                round
                width="250px"
                height="50px"
                margin="15px 0 0 0"
                onClick={onPreviousHandler}
              >
                <ButtonContentWrapper>
                  <ArrowBack /> <span>Back</span>
                </ButtonContentWrapper>
              </Button>
            )}
          </NextButtonWrapper>
          {skipComponent}
        </CardWrapper>
        {withHint && (
          <Slide
            direction="left"
            in={withHint}
            mountOnEnter
            unmountOnExit
            timeout={withHintAnimation ? 500 : 0}
          >
            <Box alignSelf="center" marginRight="20px">
              {hintHeaderText && (
                <Text
                  color="text.hint"
                  fontSize="18px"
                  fontWeight={700}
                  marginBottom="10px"
                  {...hintHeaderStyle}
                >
                  {hintHeaderText}
                </Text>
              )}
              {hintTitleText && (
                <Text
                  color="text.hint"
                  fontStyle="16px"
                  fontWeight={500}
                  {...hintTitleStyle}
                >
                  {hintTitleText}
                </Text>
              )}
            </Box>
          </Slide>
        )}
      </Box>
    </>
  );
};

OnboardingProcess.defaultProps = {
  loaderComponent: null,
  submitButtonProps: {},
};

export default OnboardingProcess;
