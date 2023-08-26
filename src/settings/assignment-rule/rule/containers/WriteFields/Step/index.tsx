import { useState, useMemo } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
import AnimateButton from '@base/components/@extended/AnimateButton';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import WriteField from '@base/containers/WriteField';
import { useTranslation } from 'react-i18next';

// step options
const steps = ['ncrm_generalsetting_assignment_rule_summary', 'ncrm_generalsetting_assignment_rule_rule_entries'];

// ==============================|| FORMS WIZARD - BASIC ||============================== //
interface WriteFieldsProps {
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  watch: UseFormWatch<any>; //hook-form
}

const StepUp = (props: WriteFieldsProps) => {
  const { fields, control, errors, watch } = props;
  const { t } = useTranslation();
  let assignMode = 'AR_ASSGIN_TO_MODE_USERS';
  let checkAvailable = true;
  const WatchForm = () => {
    const formData = watch();
    if (formData?.assignMode) {
      assignMode = formData.assignMode.value;
    }
    checkAvailable = formData.check_available;
  };
  WatchForm();
  function getStepContent(step: number, fields: any[], control: Control, errors: FieldErrorsImpl) {
    switch (step) {
      case 0:
        const fieldsFirst = fields.filter((field) => {
          return field.section === 1;
        });

        return (
          <>
            {fieldsFirst.map((_item, _index) => {
              return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
            })}
          </>
        );
      case 1:
        const fieldsSec = fields.filter((field) => {
          return field.section === 2;
        });

        return (
          <>
            {fieldsSec.map((_item, _index) => {
              let isHidden = false;
              if (assignMode === 'AR_ASSGIN_TO_MODE_USERS') {
                if (_item.keyName === 'assignGroup') {
                  isHidden = true;
                }
              } else {
                if (_item.keyName === 'assignUser') {
                  isHidden = true;
                }
              }
              if (_item.keyName === 'available_based_on' && checkAvailable === false) {
                isHidden = true;
              }
              return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} isHidden={isHidden} />;
            })}
          </>
        );

      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const MainFields = useMemo(() => {
    return (
      <Box>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(label)}</StepLabel>
            </Step>
          ))}
          <Step />
        </Stepper>
        <>
          <Grid container spacing={2} alignItems="center">
            {getStepContent(activeStep, fields, control, errors)}
          </Grid>
          <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
            {activeStep !== 0 && (
              <Button size="small" variant="contained" onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                {t('ncrm_common_btn_back')}
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <AnimateButton>
                <Button size="small" variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                  {t('ncrm_common_btn_next')}
                </Button>
              </AnimateButton>
            )}
          </Stack>
        </>
      </Box>
    );
  }, [activeStep, assignMode, checkAvailable]);
  return MainFields;
};

export default StepUp;
