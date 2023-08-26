import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';

//project
import WriteFields from '@marketing-list/containers/WriteFields';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
//import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import { MENU_CUSTOMER_ACCOUNT, MENU_CUSTOMER_CONTACT } from '@base/config/menus';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import useMarketingCreate from '@marketing-list/hooks/useMarketingCreate';

//material
import { Button, Grid, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

//local
import { useTranslation } from 'react-i18next';

interface WriteModalProps {
  isOpen: boolean;
  fullScreen?: boolean;
  //showCategory?: boolean;
  //showCanvas?: boolean;
  menuApi: string;
  category: string; //'account' | 'contact';
  type?: any; //customer type
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, fullScreen, menuApi, category, type, onReload, onClose, onSuccess } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });
  const { t } = useTranslation();

  //state
  const [isReset, setIsReset] = useState(false);
  const queryClient = useQueryClient();

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
  const mCreate: any = useMarketingCreate({ category });

  //check success

  //submit form
  const onSubmit = (formData: any) => {
    const newParams = {
      ...formData,
      [keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE]: formData[keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE].keyName,
      [keyNames.KEY_NAME_CUSTOMER_OWNER]: {
        user: { id: '22779486-f43a-4530-b77f-31a932dd0a23', name: 'Hanbiro Test' }
      }
    };
    mCreate.mutate(
      { marketingList: newParams },
      {
        onSuccess: () => {
          handleClose();
        }
      }
    );
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
        label: t('ncrm_common_btn_save'),
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: mCreate.isLoading || !isValid,
        isLoading: mCreate.isLoading
      },
      {
        isMain: false,
        label: t('ncrm_common_btn_save_and_create_new'),
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: mCreate.isLoading || !isValid,
        isLoading: mCreate.isLoading
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
  }, [mCreate.isLoading, isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`Create Marketing List`} />}
      isOpen={isOpen}
      size="sm"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {loading && <LoadingCircular loading={loading} />}
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields watch={watch} control={control} errors={errors} fields={fields} menuApi={menuApi} type={type} />
          </Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteModal;
