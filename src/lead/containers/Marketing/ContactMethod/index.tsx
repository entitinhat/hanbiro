import _ from 'lodash';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import useDevice from '@base/hooks/useDevice';
import { Box, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import validators from '@base/utils/validation/fieldValidator';
import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';
import ContactMethodViewField from '@lead/containers/ViewFields/ContactMethodViewField';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';
import * as keyNames from '@lead/config/keyNames';

interface ContactMethodProps {
  value: any;
  menuSourceId: string;
}
const ContactMethod = (props: ContactMethodProps) => {
  const { value, menuSourceId } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [data, setData] = useState<any>('');
  const { mUpdateLead } = useLeadMutation();

  const contactMethodValue = [
    {
      id: 'STATUS_ALLOW', 
      name: 'Allow' 
    },
    {
      id: 'STATUS_DENY', 
      name: 'Deny' 
    }
  ]
  
  const defaultValue = {
    preferrer: {
      label: 'ncrm_sales_lead_contact_method_preferred',
      value: null
    },
    email: {
      label: 'ncrm_sales_lead_contact_method_email',
      value: {
        id: 'STATUS_DENY', 
        name: 'Deny' 
      }
    },
    bulkEmail: {
      label: 'ncrm_sales_lead_contact_method_bulk_email',
      value: {
        id: 'STATUS_DENY', 
        name: 'Deny' 
      }
    },
    phone: {
      label: 'ncrm_sales_lead_contact_method_phone',
      value: {
        id: 'STATUS_DENY', 
        name: 'Deny' 
      }
    },
    sms: {
      label: 'ncrm_sales_lead_contact_method_sms',
      value: {
        id: 'STATUS_DENY', 
        name: 'Deny' 
      }
    }
  }
  
  useEffect(() => {
    if (value) {
      const newVal = {
        preferrer: {
          label: 'ncrm_sales_lead_contact_method_preferred',
          value: {
            id: value?.preferrer?.id,
            name: value?.preferrer?.name
          }
        },
        email: {
          label: 'ncrm_sales_lead_contact_method_email',
          value: contactMethodValue.find((item: any) => item.id == value?.email)
        },
        bulkEmail: {
          label: 'ncrm_sales_lead_contact_method_bulk_email',
          value: contactMethodValue.find((item: any) => item.id == value?.bulkEmail)
        },
        phone: {
          label: 'ncrm_sales_lead_contact_method_phone',
          value: contactMethodValue.find((item: any) => item.id == value?.phone)
        },
        sms: {
          label: 'ncrm_sales_lead_contact_method_sms',
          value: contactMethodValue.find((item: any) => item.id == value?.sms)
        }
      }
      setData(newVal)
    }
    else{
      setData(defaultValue)
    }
  }, [value]);
  const getViewFieldProps = useMemo(
    () => (keyName: string, value: any) => {
      // console.log('viewfield propsoptions', emails);
      const viewFieldProps: CommonViewFieldProps = {
        keyName: keyName,
        value: value,
        // onChange: onChange, // for hook form
        userPermission: { isEdit: true, isShow: true },
        config: {
          showFullRow: true,
          component: ContactMethodViewField,
          componentProps: { isPreferred: keyName === 'preferrer' ? true : false },
          viewProps: { isPreferred: keyName === 'preferrer' ? true : false },
          validate: {
            required: validators.required
          }
        },
        onSave: (keyName, isSuccess, value) => handleSave(value, keyName),
        onClose: () => {},
        menuSource: '',
        menuSourceId: '',
        isIAMComponent: true
      };

      return viewFieldProps;
    },
    [data]
  );

  //handlers
  const handleSave = (value: any, keyName: string) => {
    let nVal = _.cloneDeep(data);
    nVal[keyName].value = value[keyName];
    let params: any[] = []
    params.push(nVal)
    const newParams =  params.map((item: any) => {
      return {
        preferrer: {
          id: item?.preferrer?.value?.id,
          name: item?.preferrer?.value?.name
        },
        email: item?.email?.value?.id,
        bulkEmail: item?.bulkEmail?.value?.id,
        phone: item?.phone?.value?.id,
        sms: item?.sms?.value?.id
      }
    })[0]
    if(value?.[keyName]?.id != data?.[keyName]?.value?.id){
      mUpdateLead.mutate({ lead: { [keyNames.KEY_LEAD_CONTACT_METHOD]: { ...newParams } , id: menuSourceId } });
      setData(nVal);
    }
  };

  const renderMethod = (key: string) => {
    return (
      <Stack spacing={1}>
        <InputLabel color="secondary" sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightRegular }} keyLang={data[key].label} />
        </InputLabel>
        <ViewField {...getViewFieldProps(key, data[key].value)} />
      </Stack>
    );
  };

  return (
    <MainCard 
      contentSX={{ p: 0, pb: '0px !important' }} 
      headerSX={{ p: '8px 16px', height: '50px' }} 
      title={<SpanLang keyLang={'ncrm_common_contact_method'} textOnly />} 
      border={false}
      >
      <Grid container alignItems="flex-start" sx={{ width: '100%', p: isMobile ? 1 : 2, pl: 1 }} spacing={3}>
        {Object.keys(data).map((key: string, indx: number) => {
          return (
            <React.Fragment key={indx}>
              <Grid item xs={6}>
                {renderMethod(key)}
              </Grid>
              {indx === 0 && <Grid item xs={6} />}
            </React.Fragment>
          );
        })}
      </Grid>
    </MainCard>
  );
};
export default ContactMethod;
