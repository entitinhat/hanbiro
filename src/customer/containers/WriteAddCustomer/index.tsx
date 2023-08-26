import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';

//project
import WriteFields from '@customer/containers/WriteFields';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';

//import withWriteForm from '@base/hooks/hocs/withWriteForm';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import { MENU_CUSTOMER, MENU_CUSTOMER_ACCOUNT, MENU_CUSTOMER_CONTACT } from '@base/config/menus';

//menu
import * as keyNames from '@customer/config/keyNames';
import { Customer } from '@customer/types/interface';
import useCustomerCreate, { UseCustomerCreateProps } from '@customer/hooks/useCustomerCreate';

//material
import { Box, Button, Grid, Stack, Tab, Tabs } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

//local
import { finalizeParams } from '../../pages/WritePage/payload';
import { IconType } from '@base/types/app';
import withLoading from '@base/hooks/hocs/withLoading';

interface WriteModalProps {
  isOpen: boolean;
  fullScreen?: boolean;
  type?: any; //customer type
  account?: Customer;
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}
//Tab interface
interface Tab {
  value: string;
  title: string;
  description: string;
  icon: string;
  iconType: IconType;
}
//Tab properties
const TABS: Tab[] = [
  { value: 'account', title: 'Account', description: 'New Customer Account', icon: 'm_customer_account', iconType: 'icon' },
  { value: 'contact', title: 'Contact', description: 'New Customer Contact', icon: 'contacts', iconType: 'icon' }
];

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, type, account, onReload, onClose, onSuccess, onGoView } = props;
  //States
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const [menuApi, setMenuApi] = useState<string>(`${MENU_CUSTOMER}_${activeTab.value}`);
  // initalize menuApi based on Tab

  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: menuApi });

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
    if (menuApi === MENU_CUSTOMER_CONTACT && account?.id) {
      setValue(keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE, {
        keyName: 'CONTACT_TYPE_EMPLOYEE',
        languageKey: 'options_items__1_225f317c_6001_4468_b33f_a67a8959b370',
        label: 'Employee',
        value: 'CONTACT_TYPE_EMPLOYEE'
      });
      //console.log('account', account);
      setValue(keyNames.KEY_NAME_CUSTOMER_ACCOUNT, account);
    }
    if (type) {
      setValue(keyNames.KEY_NAME_CUSTOMER_TYPE, type);
    } else {
      setValue(keyNames.KEY_NAME_CUSTOMER_TYPE, null);
    }
  }, []);

  //category change, set code to empty
  useEffect(() => {
    setValue(keyNames.KEY_NAME_CUSTOMER_CODE, '');
  }, [activeTab]);

  //upload
  const { mUpload } = useAWSS3Mutation();

  //create mutation
  const mutationAdd: any = useCustomerCreate({ category: activeTab.value });

  //check success
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      if (isReset) {
        //re-set queries
        queryClient.removeQueries(['setting_nextId', 'account']); //{ exact: false }
        queryClient.removeQueries(['setting_nextId', 'contact']); //{ exact: false }
        reset();
      } else {
        onGoView && onGoView(mutationAdd.data.id, menuApi === MENU_CUSTOMER_ACCOUNT ? 'account' : 'contact');
        onClose();
      }
      //DON't refetch here, do it in create mutation
      //onReload && onReload();
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
      newParams.photo = mUpload.data.url;
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
      const newParams = finalizeParams(configParams, menuApi);
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
  console.log('form errors', errors); //get form values when inputing
  console.log('form isValid', isValid); //get form values when inputing
  console.log('form fields', fields); //All fields from pagelayout
  console.log('setActiveTab', activeTab);
  console.log('setMenuApi', menuApi);
  //======================== End Debug ========================//

  //Handlers
  const handleChange = (event: React.SyntheticEvent, newValue: Tab) => {
    setActiveTab(newValue);
    setMenuApi(`${MENU_CUSTOMER}_${newValue.value}`);
  };

  return (
    <MiModal
      title={<SpanLang keyLang={`crm_new_${activeTab.value === 'all' ? 'account' : activeTab.value}`} />}
      isOpen={isOpen}
      size="sm"
      fullScreen={false}
      onClose={handleClose}
      footer={Footer}
    >
      <Box>
        <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
          {TABS.map((tab, index) => (
            <Tab key={index} icon={<FormIcon icon={tab.icon} iconType={tab.iconType} />} label={tab.title} value={tab} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ pt: 1, height: '700px' }} className="scroll-box">
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {loading && <LoadingCircular loading={loading} />}
            <Suspense fallback={<LoadingCircular loading={loading} />}>
              <WriteFields
                watch={watch}
                control={control}
                errors={errors}
                fields={fields}
                menuApi={menuApi}
                type={type}
                account={account}
              />
            </Suspense>
          </form>
        )}
      </Box>
    </MiModal>
  );
};

export default withLoading(WriteModal);
