import React, { useMemo } from "react";
import clsx from "clsx";
import { Step, Stepper, StepLabel } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import useStyles, {
  QontoConnectorSecondary,
  QontoConnectorPrimary,
  useQontoStepIconStyles,
} from "./Stepper.style";
import { IQontoStepIconProps, IStepperProps } from "./Stepper.interface";
import { useAppInfo } from "@wf-org/trolly.hooks";
import { useTheme } from "@material-ui/core/styles";

const QontoStepIcon: React.FC<IQontoStepIconProps> = ({
  active,
  completed,
}) => {
  const { theme } = useAppInfo();
  const classes = useQontoStepIconStyles({ color: theme });

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <FiberManualRecordIcon className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
};

const CustomizedSteppers: React.FC<IStepperProps> = ({
  getSteps,
  activeStep,
}) => {
  const steps = getSteps;
  const { theme, appId } = useAppInfo();
  const { palette } = useTheme();
  const color: string =
    theme === "secondary" ? palette.secondary.main : palette.primary.main;
  const classes = useStyles({ color });

  const connector = useMemo(() => {
    if (appId === "A") {
      return <QontoConnectorPrimary />;
    }
    return <QontoConnectorSecondary />;
  }, [appId]);

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={activeStep}
        connector={connector}
      >
        {steps.map((label) => (
          <Step key={label} className={classes.step}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              className={classes.stepLabel}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CustomizedSteppers;
