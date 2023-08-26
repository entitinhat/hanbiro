import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

//config

import WriteFields from '@desk/ticket/containers/WriteFields';
import useTicketWrite from '@desk/ticket/hooks/useTicketWrite';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Button, Grid, Stack } from '@mui/material';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { finalizeParams } from './payload';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import * as keyNames from '@desk/ticket/config/keyNames';
import * as baseComponents from '@base/config/write-field/components';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  category: string;
  type: string;
  onReload?: () => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, menuApi, category, type, listType, onReload } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });
  console.log('tlog 23', fields);
  const [isReset, setIsReset] = useState(false);
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation
  const { mutationAdd, isLoading } = useTicketWrite({ reset, onClose, isReset, listType, onReload });

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
    const configParams = getParams(formData); //generate api params by fields
    // console.log('configParams', configParams);
    const newParams: any = finalizeParams(configParams);
    mutationAdd(newParams);
  }, []);

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'ncrm_common_btn_save', //Save
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
        label: 'ncrm_common_btn_save_and_create_new', //Save and Create New
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
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              <SpanLang keyLang={`ncrm_common_btn_cancle`} />
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
  // console.log('menuApi', menuApi); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_desk_ticket`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="lg"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <WriteFields watch={watch} control={control} errors={errors} fields={fields} setValue={setValue} menuApi={menuApi} />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default withWriteForm(WriteModal);
