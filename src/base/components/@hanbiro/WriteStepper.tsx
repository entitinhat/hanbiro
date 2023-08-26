import React, { useEffect, useState } from 'react';

import SwitchInput from '@mui/material/Switch';
import { Avatar, Button, IconButton, Step, StepIconProps, StepLabel, Stepper, useTheme } from '@mui/material';
import SpanLang from './SpanLang';
import { green } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
interface StepperProps {
  steps: string[];
  activeStep: number;
  middleStyle?: boolean;
}

function WriteStepIcon(props: StepIconProps) {
  const theme = useTheme();
  const { active, completed, className, icon } = props;

  return (
    <>
      {/* Active */}
      {active && <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32, fontSize: '0.875rem' }}>{icon}</Avatar>}
      {/* Inactive */}
      {!active && !completed && (
        <Avatar
          sx={{
            bgcolor: 'transparent',
            color: theme.palette.secondary.light,
            border: `1px solid ${theme.palette.secondary.light}`,
            width: 32,
            height: 32,
            fontSize: '0.875rem'
          }}
        >
          {icon}
        </Avatar>
      )}
      {/* Complete  */}
      {!active && completed && (
        <Avatar
          sx={{
            bgcolor: 'transparent',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            width: 32,
            height: 32,
            fontSize: '0.875rem'
          }}
        >
          <DoneIcon sx={{ fontSize: '0.875rem' }} />
        </Avatar>
      )}
    </>
  );
}

const WriteStepper = (props: StepperProps) => {
  const { steps, activeStep, middleStyle = false } = props;
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        p: 2
      }}
      // alternativeLabel
    >
      {steps?.map((label: string, index: number) => (
        <Step key={label} completed={activeStep > index}>
          <StepLabel StepIconComponent={WriteStepIcon}>
            <SpanLang keyLang={label} textOnly />
          </StepLabel>
        </Step>
      ))}
      {middleStyle && <Step />}
    </Stepper>
  );
};

export default WriteStepper;
