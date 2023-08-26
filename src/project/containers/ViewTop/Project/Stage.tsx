import { Box, Stack, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const steps = ['ncrm_project_planning', 'ncrm_project_development', 'ncrm_project_qa', 'ncrm_project_completed'];

interface StageProps {}

function Stage({}: StageProps) {
  const { t } = useTranslation();
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Stepper activeStep={1}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel color="inherit">
              <Stack spacing={0.5} sx={{ mt: 3 }}>
                <Typography>{t(label)}</Typography>
                <Typography sx={{ color: 'warning.main' }}>2022-12-21</Typography>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Stage;
