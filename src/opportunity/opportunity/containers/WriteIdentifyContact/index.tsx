import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Stack } from '@mui/material';

//project
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
//import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import WriteField from '@base/containers/WriteField';

//menu
import useOpportunityCreate from '@opportunity/hooks/useOpportunityCreate';
import * as keyNames from '@opportunity/containers/WriteIdentifyContact/keyNames';
import { finalizeParams } from './payload';
import useIdentifyContactCreate from '@opportunity/hooks/useOpportunityContact';

interface WriteFormProps {
  fullScreen?: boolean;
  isOpen: boolean;
  menuApi: string;
  opportunityId: string;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteForm = (props: WriteFormProps) => {
  const { isOpen, opportunityId, onClose, onReload } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: props.menuApi });

  //state
  const [isReset, setIsReset] = useState(false);

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

  //create mutation
  const mutationAdd = useIdentifyContactCreate(opportunityId);

  //check success
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      reset();
      if (!isReset) {
        onClose();
      }
      // refecth data
      onReload && onReload();
    }
  }, [mutationAdd.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    if (opportunityId) {
      const configParams = getParams(formData);
      const newContact = { ...configParams };
      mutationAdd.mutate({ id: opportunityId, identifyContact: newContact });
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    reset();
    onClose();
  };

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'Save',
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: mutationAdd.isLoading || !isValid,
        isLoading: mutationAdd.isLoading
      },
      {
        isMain: false,
        label: 'Save and Create New',
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: mutationAdd.isLoading || !isValid,
        isLoading: mutationAdd.isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mutationAdd.isLoading, isValid]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      fullScreen={false}
      title={<SpanLang keyLang={`New Identify Contact`} />}
      isOpen={isOpen}
      size="md"
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <React.Suspense fallback={<LoadingCircular loading={loading} />}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={2} alignItems="center">
                {fields.map((_item: any) => {
                  return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
                })}
              </Grid>
            </Box>
          </React.Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteForm;
