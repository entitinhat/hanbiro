import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
//material
import { Button, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';

//project
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';

//menu
//import * as keyNames from '@campaign/config/keyNames';
//import { Campaign } from '@campaign/types/interface';
import useCampaignCreate from '@campaign/hooks/useCampaignCreate';
import WriteFields from '@campaign/containers/WriteFields';
import { CAMPAIGN_CATEGORY_EMAIL } from '@campaign/config/constants';
import LoadingButton from '@base/components/@extended/LoadingButton';

//local
import { finalizeParams } from './payload';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';

const EMAIL_STEPS = ['Campaign Information', 'Configuration', 'Customization'];
const SMS_STEPS = ['Campaign Information', 'Configuration'];

interface WriteModalProps {
  isOpen: boolean;
  fullScreen?: boolean;
  menuApi: string;
  category: string; //'email' | 'sms';
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, fullScreen, menuApi, category, onReload, onClose, onSuccess, onGoView } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: props.menuApi });
  const { t } = useTranslation();

  //state
  const [isNext, setIsNext] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [STEPS, setSTEPS] = useState<string[]>([]);
  const [STEP_MAX, setStepMax] = useState<number>(0);
  const [newId, setNewId] = useState('');
  const queryClient = useQueryClient();
  //const STEPS = category === CAMPAIGN_CATEGORY_EMAIL ? EMAIL_STEPS : SMS_STEPS;
  //const STEP_MAX = category === CAMPAIGN_CATEGORY_EMAIL ? EMAIL_STEPS.length - 1 : SMS_STEPS.length - 1;

  //init steps by category
  useEffect(() => {
    setSTEPS(category === CAMPAIGN_CATEGORY_EMAIL ? EMAIL_STEPS : SMS_STEPS);
    setStepMax(category === CAMPAIGN_CATEGORY_EMAIL ? EMAIL_STEPS.length - 1 : SMS_STEPS.length - 1);
  }, [category]);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //upload
  const { mUpload } = useAWSS3Mutation();

  //create mutation
  const mutationAdd: any = useCampaignCreate({ category });
  const mutationUpdate: any = useCampaignUpdate({ refreshList: onReload });

  //check success
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      if (formStep === 0) {
        setNewId(mutationAdd.data.id);
        if (isNext) {
          setFormStep((cur) => cur + 1);
        } else {
          handleClose();
        }
      }

      // reset();
      // if (isReset) {
      //   //re-set queries
      //   //queryClient.removeQueries(['setting_nextId']); //{ exact: false }
      // } else {
      //   onGoView && onGoView(mutationAdd.data.id, category);
      //   onClose();
      // }
      // //DON't refetch here, do it in create mutation
      // //onReload && onReload();

      // //callback after create
      // onSuccess && onSuccess({ id: mutationAdd.data.id, ...mutationAdd.variables.campaign });
    }
  }, [mutationAdd.isSuccess]);

  //update success
  useEffect(() => {
    if (mutationUpdate.isSuccess) {
      if (formStep < STEP_MAX) {
        setFormStep((cur) => cur + 1);
      }
      if (formStep === STEP_MAX) {
        handleClose();
      }
    }
  }, [mutationUpdate.isSuccess]);

  //upload success
  // useEffect(() => {
  //   if (mUpload.isSuccess) {
  //     //new customer
  //     const formData = getValues();
  //     const configParams = getParams(formData);
  //     //console.log('configParams', configParams);
  //     const newParams = finalizeParams(configParams, menuApi);
  //     newParams.photo = mUpload.data ? JSON.stringify(mUpload.data) : '';
  //     mutationAdd.mutate({ campaign: newParams });
  //   }
  // }, [mUpload.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    const configParams = getParams(formData);
    const newParams = finalizeParams(configParams, category, formStep);
    if (formStep === 0) {
      mutationAdd.mutate({ campaign: newParams });
    }
    if (formStep > 0) {
      newParams.id = newId;
      mutationUpdate.mutate({ campaign: newParams });
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    reset();
    setFormStep(0);
    onClose();
  };

  //save and continue later
  const handleSaveLater = () => {
    setIsNext(false);
    handleSubmit((data) => onSubmit(data), onError)();
  };

  //save then go next step
  const handleSaveNext = () => {
    setIsNext(true);
    handleSubmit((data) => onSubmit(data), onError)();
  };

  //finish write process
  const handleSaveFinish = () => {
    setIsNext(false);
    handleSubmit((data) => onSubmit(data), onError)();
  };

  //steps
  const FormStepRender = useMemo(() => {
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
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    );
  }, [STEPS, formStep]);

  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
            Skip
          </Button>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {formStep === 0 && (
              <LoadingButton
                variant="contained"
                color="secondary"
                disabled={!isValid || mutationAdd.isLoading}
                loading={!isNext && mutationAdd.isLoading}
                onClick={handleSaveLater}
              >
                Save and Continue later
              </LoadingButton>
            )}
            {formStep < STEP_MAX && (
              <LoadingButton
                variant="contained"
                color="primary"
                disabled={!isValid || mutationAdd.isLoading || mutationUpdate.isLoading}
                loading={(isNext && mutationAdd.isLoading) || mutationUpdate.isLoading}
                onClick={handleSaveNext}
              >
                Save and Next
              </LoadingButton>
            )}
            {formStep === STEP_MAX && (
              <LoadingButton
                variant="contained"
                disabled={!isValid || mutationUpdate.isLoading}
                loading={mutationUpdate.isLoading}
                color="success"
                onClick={handleSaveFinish}
              >
                Save and Finish
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, formStep, isNext, mutationUpdate.isLoading, mutationAdd.isLoading]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`New ${category === CAMPAIGN_CATEGORY_EMAIL ? 'Email' : 'SMS'} Campaign`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {FormStepRender}
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields
              category={category}
              activeStep={formStep}
              watch={watch}
              control={control}
              errors={errors}
              fields={fields}
              menuApi={menuApi}
            />
          </Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteModal;
