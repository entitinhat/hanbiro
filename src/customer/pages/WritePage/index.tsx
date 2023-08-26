import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
//material
import { Button, Grid, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

//project
import WriteFields from '@customer/containers/WriteFields';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
//import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import { MENU_CUSTOMER_ACCOUNT } from '@base/config/menus';

//menu
import * as keyNames from '@customer/config/keyNames';
import useCustomerCreate from '@customer/hooks/useCustomerCreate';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { finalizeParams } from './payload';

interface WriteModalProps {
  isOpen: boolean;
  fullScreen?: boolean;
  //showCategory?: boolean;
  //showCanvas?: boolean;
  menuApi: string;
  category: string; //'account' | 'contact';
  type?: any; //customer type
  account?: any;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, fullScreen, menuApi, category, type, account, onReload, onClose, onSuccess, onGoView } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: props.menuApi });
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

  //set default value when create employee contact
  useEffect(() => {
    if (category === CUSTOMER_CATEGORY_CONTACT && account?.id) {
      setValue(keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE, {
        //id: '24127ff9-34f6-4ace-b705-c9ab033e6899',
        keyName: 'CONTACT_TYPE_EMPLOYEE'
        //languageKey: 'options_items__1_225f317c_6001_4468_b33f_a67a8959b370',
        //label: 'Employee',
        //value: 'CONTACT_TYPE_EMPLOYEE'
      });
      //console.log('account', account);
      setValue(keyNames.KEY_NAME_CUSTOMER_ACCOUNT, account);
    }
    if (type) {
      setValue(keyNames.KEY_NAME_CUSTOMER_TYPE, type);
    } else {
      setValue(keyNames.KEY_NAME_CUSTOMER_TYPE, null);
    }
  }, [JSON.stringify(account), type]);

  //category change, set code to empty
  useEffect(() => {
    setValue(keyNames.KEY_NAME_CUSTOMER_CODE, '');
  }, [category]);

  //upload
  const { mUpload } = useAWSS3Mutation();

  //create mutation
  const mutationAdd: any = useCustomerCreate({ category });

  //check success
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      reset();
      if (isReset) {
        //re-set queries
        queryClient.removeQueries(['setting_nextId', 'account']); //{ exact: false }
        queryClient.removeQueries(['setting_nextId', 'contact']); //{ exact: false }
      } else {
        onGoView && onGoView(mutationAdd.data.id, menuApi === MENU_CUSTOMER_ACCOUNT ? 'account' : 'contact');
        onClose();
      }
      //DON't refetch here, do it in create mutation
      //onReload && onReload();

      //callback after create
      onSuccess && onSuccess({ id: mutationAdd.data.id, ...mutationAdd.variables.customer });
    }
  }, [mutationAdd.isSuccess]);

  //upload success
  useEffect(() => {
    if (mUpload.isSuccess) {
      //new customer
      const formData = getValues();
      const configParams = getParams(formData);
      //// console.log('configParams', configParams);
      const newParams = finalizeParams(configParams, menuApi);
      newParams.photo = mUpload.data ? JSON.stringify(mUpload.data) : '';
      mutationAdd.mutate({ customer: newParams });
    }
  }, [mUpload.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    //upload image first if any
    if (formData[keyNames.KEY_NAME_CUSTOMER_PHOTO]?.length > 0) {
      //upload to file server
      mUpload.mutate(formData[keyNames.KEY_NAME_CUSTOMER_PHOTO][0]);
    } else {
      const configParams = getParams(formData);
      const newParams = finalizeParams(configParams, category);
      newParams.photo = '';
      mutationAdd.mutate({ customer: newParams });
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
        label: t('ncrm_common_btn_save'),
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
        label: t('ncrm_common_btn_save_and_create_new'),
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
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mutationAdd.isLoading, isValid]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`ncrm_customer_new_${category === CUSTOMER_CATEGORY_ALL ? CUSTOMER_CATEGORY_ACCOUNT : category}`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* {loading && <LoadingCircular loading={loading} />} */}
          <Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields watch={watch} control={control} errors={errors} fields={fields} menuApi={menuApi} type={type} account={account} />
          </Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteModal;
