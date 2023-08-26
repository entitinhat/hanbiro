import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

//config
import WriteFields from '@settings/assignment-rule/rule/containers/WriteFields';
import useAssignRuleWrite from '@settings/assignment-rule/rule/hooks/useAssignRuleWrite';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Button, Grid, Stack } from '@mui/material';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { parseFieldsWrite } from '../MainPage/Helper';
import { finalizeParams } from './payload';
import { useTranslation } from 'react-i18next';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  category: string;
  type: string;
  onReload?: () => void;
  defaultValues: any; //with write form
  fields: any[]; //with write form
  getParams: any; //with write form
  loading?: boolean; //with write form
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, menuApi, category, type, listType, onReload, defaultValues, getParams, loading } = props;
  let { fields } = props;
  const { t } = useTranslation();
  if (fields.length > 0) {
    fields = parseFieldsWrite(fields, menuApi);
  }
  console.log('WriteModal >>>>>>>>>', fields);

  //state
  const [isReset, setIsReset] = useState(false);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //create mutation
  const { mutationAdd, isLoading } = useAssignRuleWrite({ reset, onClose, isReset, onReload });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback((formData: any) => {
    //upload files
    //console.log('uploadFiles', uploadedFiles);
    console.log('formData => ', formData);

    //let configParams: any = getParams(formData);
    const configParams: any = finalizeParams(formData);
    console.log('configParams => ', configParams);
    mutationAdd(configParams);
  }, []);

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: t('ncrm_common_btn_save'),
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_common_btn_save_and_create_new'),
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isLoading, isValid]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  console.log('>>>>>>>>>>>>>>. fields', fields);
  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_generalsetting_${type}_new_title`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="sm"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <WriteFields
              watch={watch}
              control={control}
              errors={errors}
              fields={fields}
              //setValue={setValue}
              menuApi={menuApi}
              activeStep={0}
            />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
