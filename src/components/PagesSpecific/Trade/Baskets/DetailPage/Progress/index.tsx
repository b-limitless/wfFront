import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useAppInfo } from 'trolly/hooks';
import { Box, Text } from 'trolly/common';
import useStyles from '../../baskets.style';

const Progress: React.FC<{ steps: string[]; activeStep: number }> = ({
  steps,
  activeStep
}) => {
  const classes = useStyles();
  const { theme } = useAppInfo();
  const { palette } = useTheme();

  return (
    <div>
      <LinearProgress
        value={(activeStep / steps.length) * 100}
        valueBuffer={100}
        variant="buffer"
        color={theme}
        className={classes.progress}
      />
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${steps.length}, 1fr)`}
        textAlign="center"
        marginBottom="24px"
      >
        {steps.map((step, index) => {
          const color =
            activeStep > index ? palette[theme].main : palette.text.secondary;
          return (
            <Text
              key={step}
              fontSize="14px"
              fontWeight={500}
              margin="10px"
              color={color}
            >
              {step}
            </Text>
          );
        })}
      </Box>
    </div>
  );
};

export default Progress;
