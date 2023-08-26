import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Grid, Stack } from '@mui/material';

import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

import WriteFields from '@lead/containers/WriteFields';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';

import { finalizeParams } from './payload';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  onReload?: () => void;
  defaultValues: any; //with write form
  fields: any[]; //with write form
  getParams: any; //with write form
  loading?: boolean; //with write form
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, menuApi, listType, onReload, defaultValues, fields, getParams, loading } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    defaultValues: {
      title: '',
      collectionMethod: null,
      contactName: '',
      contactEmails: [],
      contactMobiles: [],
      contactPhones: [],
      companyName: '',
      companyWebsite: null,
      companyIndustry: null,
      companyShipTo: '',
      companyBillTo: '',
      description: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //lang
  const { t } = useTranslation();
  //create mutation - waiting for API
  const { mCreateLead } = useLeadMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback(({ formData, isPublish }: any) => {
    //waiting for API
    setIsLoading(true);
    const params: any = finalizeParams(formData);
    mCreateLead.mutate({ lead: params });
  }, []);

  useEffect(() => {
    if (mCreateLead.isSuccess) {
      setIsLoading(false);
      handleClose();
      onReload && onReload();
      if(isReset){
        reset && reset();
      }
    }
  }, [mCreateLead.isSuccess, isReset]);

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'ncrm_common_btn_save',
        color: 'primary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit({ formData: data, isPublish: true }), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: 'ncrm_common_btn_save_and_create_new',
        color: 'secondary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit({ formData: data, isPublish: false }), onError)();
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
  //console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_sales_lead_create_lead`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="lg"
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
            />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
