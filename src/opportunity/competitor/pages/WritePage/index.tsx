import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';
import { Button, Grid, Stack } from '@mui/material';

//project
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
//import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';

//menu
import useCompetitorCreate, { useOpportunityCompetitorCreate } from '@competitor/hooks/useCompetitorCreate';
import WriteFields from '@competitor/containers/WriteFields';
import { finalizeParams } from './payload';

interface WriteFormProps {
  fullScreen?: boolean;
  isOpen: boolean;
  menuApi: string;
  opportunityId?: string;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteForm = (props: WriteFormProps) => {
  const { fullScreen, isOpen, menuApi, onReload, onClose, opportunityId, onSuccess, onGoView } = props;
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
  const mutationAdd = useCompetitorCreate();
  const mutationOppAdd = useOpportunityCompetitorCreate();

  //check success - only competitor
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      reset();
      if (!isReset) {
        //onGoView && onGoView(mutationAdd.data.id, menuApi === MENU_CUSTOMER_ACCOUNT ? 'account' : 'contact');
        onClose();
      }
      //refecth data
      //onReload && onReload();
    }
  }, [mutationAdd.isSuccess]);

  //check success - create competitor for opportunity
  useEffect(() => {
    if (mutationOppAdd.isSuccess) {
      reset();
      if (!isReset) {
        onClose();
      }
      //refecth data
      onReload && onReload();
    }
  }, [mutationOppAdd.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    const configParams = getParams(formData);
    if (opportunityId) {
      //create with opportunity
      mutationOppAdd.mutate({ id: opportunityId, competitors: [configParams] });
    } else {
      //create without opportunity
      mutationAdd.mutate({ competitor: configParams });
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
      title={<SpanLang keyLang={`New Competitor`} />}
      isOpen={isOpen}
      size="md"
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <React.Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields watch={watch} control={control} errors={errors} fields={fields} menuApi={menuApi} />
          </React.Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteForm;
