import { useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
//material
import { Box, Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { ArrowBack, ArrowForward, Save } from '@mui/icons-material';

//third-party
import { useForm } from 'react-hook-form';

//project
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import WriteField from '@base/containers/WriteField';
import LoadingButton from '@base/components/@extended/LoadingButton';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';

//menu
import { useSurveyCreate } from '@settings/digital/survey/hooks/useSurveyMutations';
import * as keyNames from '@settings/digital/survey/config/keyNames';
import { SURVEY_TYPE_GENERAL } from '@settings/digital/survey/config/constants';

//local
import { finalizeParams } from './payload';

const STEPS = ['ncrm_generalsetting_survey_basic_info', 'ncrm_generalsetting_survey_design_questions'];
const STEP_KEYS = [
  [
    keyNames.KEY_SURVEY_NAME,
    keyNames.KEY_SURVEY_TITLE,
    keyNames.KEY_SURVEY_TYPE,
    keyNames.KEY_SURVEY_LANGUAGE,
    keyNames.KEY_SURVEY_DESCRIPTION
  ],
  [keyNames.KEY_SURVEY_CONTENT]
];

interface WriteModalProps {
  isOpen: boolean;
  menuApi: string;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteForm = (props: WriteModalProps) => {
  const { isOpen, menuApi, onReload, onClose, onSuccess, onGoView } = props;

  //state
  const [formStep, setFormStep] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  //hooks
  const mutationAdd = useSurveyCreate();
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...defaultValues
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //watching
  const surveyType = watch(keyNames.KEY_SURVEY_TYPE);

  //check success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      //onReload && onReload();
      //deleteStoreSurvey('survey_t2m'); //default id
      setFormStep(0);
      reset();
      onClose();
    }
  }, [mutationAdd.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    let configParams = getParams(formData);
    let newParams = finalizeParams(configParams);
    newParams.isTemplate = false;
    mutationAdd.mutate({ survey: newParams });
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //content scroll
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    //console.log('scrollTop', e.currentTarget.scrollTop);
    setScrollTop(e?.currentTarget?.scrollTop || 0);
  };

  //cancel create
  const handleClose = () => {
    setFormStep(0);
    reset();
    onClose();
  };

  //step tabs
  const renderFormSteps = () => {
    return (
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={formStep} sx={{ mt: 2 }}>
            {STEPS.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{t(label)}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    );
  };

  //form fields
  const renderFormFields = () => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          {fields.map((_item: any) => {
            const isBelongsTo = STEP_KEYS[formStep].includes(_item.keyName);
            if (isBelongsTo) {
              let newComponentProps = { ..._item?.componentProps };
              // custom field's props
              let newItem = { ..._item };
              if (_item.keyName === keyNames.KEY_SURVEY_CONTENT) {
                newItem.hideTitle = true;
                newComponentProps.scrollTop = scrollTop;
                newComponentProps.type = surveyType?.keyName || SURVEY_TYPE_GENERAL;
              }
              // if (_item.keyName === keyNames.KEY_SURVEY_TEMPLATE) {
              //   newItem.hideTitle = true;
              // }
              newItem.componentProps = newComponentProps;
              //isHidden={formStep != stepIdx}
              return <WriteField key={_item.keyName} item={newItem} control={control} errors={errors} />;
            }
          })}
        </Grid>
      </Box>
    );
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <>
        {/* <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button color="error" onClick={handleClose}>
            Skip
          </Button>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {formStep + 1 > 1 && (
              <Button variant="contained" color="warning" startIcon={<ArrowBack />} onClick={() => setFormStep((cur) => cur - 1)}>
                Previous
              </Button>
            )}
            {formStep + 1 < 2 && (
              <Button
                variant="contained"
                color="warning"
                disabled={!isValid}
                endIcon={<ArrowForward />}
                onClick={() => setFormStep((cur) => cur + 1)}
              >
                Next
              </Button>
            )}
            {formStep + 1 === 2 && (
              <LoadingButton
                variant="contained"
                color="success"
                onClick={() => {
                  handleSubmit((data) => onSubmit(data), onError)();
                }}
                disabled={mutationAdd.isLoading || !isValid}
                loading={mutationAdd.isLoading}
              >
                Save
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid> */}

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {formStep > 0 && (
              <Button size="small" color="secondary" onClick={() => setFormStep((cur) => cur - 1)}>
                {t('ncrm_common_btn_back')}
              </Button>
            )}
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
                {t('ncrm_common_btn_cancel')}
              </Button>
              <LoadingButton
                loading={mutationAdd.isLoading}
                variant="contained"
                loadingPosition="start"
                startIcon={<></>}
                onClick={
                  formStep >= 1
                    ? () => {
                        handleSubmit((data) => onSubmit(data), onError)();
                      }
                    : () => setFormStep((cur) => cur + 1)
                }
                disabled={mutationAdd.isLoading || !isValid}
              >
                {formStep >= 1 ? t('ncrm_common_btn_save') : t('ncrm_common_btn_next')}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  }, [formStep, mutationAdd.isLoading, isValid]);

  //console.log('form values', watch()); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout

  return (
    <MiModal
      title={<SpanLang keyLang={`New Survey`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      footer={Footer}
      onClose={handleClose}
      onScroll={handleScroll}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {loading && <LoadingCircular loading={loading} />}
          {renderFormSteps()}
          {renderFormFields()}
        </form>
      )}
    </MiModal>
  );
};

export default WriteForm;
