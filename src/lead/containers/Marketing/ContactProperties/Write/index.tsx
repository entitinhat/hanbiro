import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material';

import * as baseComponents from '@base/config/write-field/components';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import PhoneInput from '@base/components/@hanbiro/PhoneInput';
import MobileInput from '@base/components/@hanbiro/MobileInput';
import EmailInput from '@base/components/@hanbiro/EmailInput';
import { WRITE_TYPE_BUYING } from '@settings/preferences/config/lead/constants';

import * as keyNames from '@lead/config/keyNames';
import LeadSettingSelect from '@lead/containers/SettingSelect';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';

import { finalizeParams } from './payload';

interface Props {
  value?: any;
  isOpen: boolean;
  onClose: any;
  id: string;
}

const WritePage = (props: Props) => {
  const { isOpen, onClose, value, id } = props;
  const [dataOnSubmit, setDataOnSubmit] = useState<any>()
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      jobPosition: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation
  const { mLeadCreateContact } = useLeadMutation();

  const onSubmit = useCallback(({ formData }: any) => {
    console.log('formDataContact', formData);

    const params: any = finalizeParams(formData);
    // console.log('formDataContactparams', {...params, phone: params?.phone?.length == 0 ? null : params?.phone});
    console.log('Finallparams', params);
    

    setDataOnSubmit(params)
    mLeadCreateContact.mutate({
      contact: {
        ...params, 
        phones: params?.phones?.length == 0 ? null : params?.phones, 
        mobiles: params?.mobiles?.length == 0 ? null : params?.mobiles, 
        emails: params?.phone?.emails == 0 ? null : params?.emails
      }, 
      id: id 
    });
  }, []);

  useEffect(() => {
    if (mLeadCreateContact.isSuccess) {
      onClose && onClose(dataOnSubmit);
    }
  }, [mLeadCreateContact.isSuccess]);

  const fields: any[] = [
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_NAME,
      columns: 1,
      Component: TextField,
      languageKey: 'identify_contact_field_basic_name',
      componentProps: {
        autoComplete: 'off',
        fullWidth: true
      },
      validate: {
        required: validators.required
      }
    },
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_BUYING_ROLE,
      columns: 1,
      Component: LeadSettingSelect,
      languageKey: 'identify_contact_field_basic_buyingrole',
      componentProps: {
        settingKey: WRITE_TYPE_BUYING
      }
    },
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_PHONE,
      columns: 1,
      Component: PhoneInput,
      languageKey: 'identify_contact_field_basic_phones',
      componentProps: {
        isMultiple: true,
        haveExtension: false
      }
    },
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_MOBILE,
      columns: 1,
      Component: MobileInput,
      languageKey: 'identify_contact_field_basic_mobiles',
      componentProps: {
        isMultiple: true
      }
    },
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_EMAIL,
      columns: 1,
      Component: EmailInput,
      languageKey: 'identify_contact_field_basic_emails',
      componentProps: {
        fullWidth: true,
        isMultiple: true
      }
    },
    {
      keyName: keyNames.KEY_LEAD_CONTACT_PROPERTIES_JOB_POSITION,
      languageKey: 'identify_contact_field_basic_job',
      Component: baseComponents.DataSourceSelect,
      componentProps: {
        sourceKey: 'job_position',
        sourceType: 'field',
        single: true
      },
      columns: 1,
      showFullRow: true,
      validate: {},
      defaultValue: null,
      }
  ];

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          // Group WriteFields

          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, errors, control]);

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
            </Button>
            <LoadingButton
              loading={false}
              variant="contained"
              loadingPosition="start"
              startIcon={<></>}
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }))();
              }}
              disabled={!isValid}
            >
              <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal
      title={<SpanLang keyLang={`Add Contact Properties`} />}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
      anchor={'right'}
    >
      <form>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
    </MiModal>
  );
};

export default WritePage;
