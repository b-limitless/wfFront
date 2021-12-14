import React, { FC } from "react";
import { ETheme } from "@wf-org/trolly.common";
import {
  Wrapper,
  useLinearProgressStyles,
  TextIdentifierWrapper,
  TextIdentifier,
} from "./ProgressIdentifier.styles";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";

export interface IProgressIdentifierProps extends LinearProgressProps {
  value: number;
  questionIndex: number;
  totalQuestions: number;
  theme?: ETheme;
  withNumbers?: boolean;
}
const ProgressIdentifier: FC<IProgressIdentifierProps> = ({
  value,
  questionIndex,
  totalQuestions,
  theme,
  withNumbers,
}) => {
  const classes = useLinearProgressStyles();
  return (
    <Wrapper>
      <LinearProgress
        classes={classes}
        color={theme}
        value={value}
        variant="determinate"
      />

      <TextIdentifierWrapper>
        {withNumbers && (
          <TextIdentifier>
            {questionIndex}/{totalQuestions}
          </TextIdentifier>
        )}
      </TextIdentifierWrapper>
    </Wrapper>
  );
};

ProgressIdentifier.defaultProps = {
  theme: "primary",
};
export default ProgressIdentifier;
