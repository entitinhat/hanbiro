import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { Button, Grid, Stack } from '@mui/material';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import WriteFields from '@analytic/report/containers/WriteFields';
import useReportMutation from '@analytic/report/hooks/useReportMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_ANALYTIC_REPORT } from '@base/config/menus';
import { finalizeParams } from './Payload';
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
  const { isOpen, onClose, menuApi, category, type, listType, onReload, defaultValues, fields, getParams, loading } = props;
  //state
  const [isReset, setIsReset] = useState(false);
  const { listQueryKey } = useListQueryKeys(MENU_ANALYTIC_REPORT);
  const { mAddReport } = useReportMutation(listQueryKey);

  //react-hook
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
  const { t } = useTranslation();

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
    const newParams: any = { report: { ...finalizeParams(configParams) } };
    mAddReport.mutate(newParams);
    onClose();
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
        }
        // disabled: isLoading || !isValid,
        // isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_common_btn_save_and_create_new'),
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        }
        // disabled: isLoading || !isValid,
        // isLoading: isLoading
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
  }, [
    // isLoading,
    isValid
  ]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`New Report`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="sm"
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
