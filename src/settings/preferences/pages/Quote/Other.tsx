import { useEffect, useState } from 'react';

//third-party
import _ from 'lodash';

//project
import MainCard from '@base/components/App/MainCard';
import DataSourceSelect from '@base/containers/DataSourceSelect';
import { MENU_QUOTE } from '@base/config/menus';

//material
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

//related menu
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

//menu
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { KEY_QUOTE_OTHER_SETTING } from '../Quote';
import { useTranslation } from 'react-i18next';

interface OtherSettingProps {
  defaultOption: any;
}

const OtherSetting = (props: OtherSettingProps) => {
  const { defaultOption } = props;
  const { t } = useTranslation();

  //state
  const [otherValue, setOtherValue] = useState<any>(defaultOption);
  //hook
  const mSettingUpdate = useMenuSettingUpdate();

  //init default value
  useEffect(() => {
    if (!_.isEqual(otherValue, defaultOption)) {
      setOtherValue(defaultOption);
    }
  }, [defaultOption]);

  //save item
  const handleSave = (newData: any) => {
    const params: any = {
      menu: MENU_QUOTE,
      key: KEY_QUOTE_OTHER_SETTING,
      value: JSON.stringify(newData)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };

  //value change
  const handleValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...otherValue };
    newValue[keyName] = keyValue;
    setOtherValue(newValue);
    //save
    handleSave(newValue);
  };

  //console.log('other settings', otherValue);
  //console.log('defaultOption', defaultOption);
  return (
    <MainCard title={t('ncrm_generalsetting_preferences_quote_other_settings')}>
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.siteConfirm || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('siteConfirm', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_site_in_confirm_orders_of_quotes')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.shareLink || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('shareLink', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_share_quotes_link')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.template || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('template', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_quote_templates')}
        />
        {otherValue?.template && (
          <Box sx={{ mb: 1 }}>
            <DataSourceSelect
              single={true}
              sourceKey={'quote_template'}
              sourceType={'template'}
              value={otherValue?.templateItem}
              onChange={(val: any) => {
                handleValueChange('templateItem', val);
              }}
            />
          </Box>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.proformaInvoice || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('proformaInvoice', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_proforma_invoice')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.confirmEmail || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('confirmEmail', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_confirm_email')}
        />
        {otherValue?.confirmEmail && (
          <Box sx={{ mb: 1 }}>
            <UserAutoComplete single={true} value={otherValue?.userEmail} onChange={(val: any) => handleValueChange('userEmail', val)} />
          </Box>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.autoEmailSend || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('autoEmailSend', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_automatic_email_sent_after_the_customer_has_signed_or_paid_online')}
        />
        <Typography variant="h6">
          {t('ncrm_generalsetting_preferences_quote_automatically_convert_an_accepted_quote_to_invoice')}
        </Typography>
        <RadioGroup
          aria-label={'quote-setting-auto-convert'}
          name={'quote-setting-auto-convert'}
          sx={{ ml: 1 }}
          //row={false}
          value={otherValue?.autoConvert || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.currentTarget.value;
            handleValueChange('autoConvert', newValue);
          }}
        >
          <FormControlLabel value={'no'} control={<Radio />} label={t('ncrm_generalsetting_preferences_quote_no')} />
          <FormControlLabel
            value={'draft'}
            control={<Radio />}
            label={t('ncrm_generalsetting_preferences_quote_yes_create_invoice_as_draft')}
          />
          <FormControlLabel
            value={'yes'}
            control={<Radio />}
            label={t('ncrm_generalsetting_preferences_quote_yes_create_and_send_invoice')}
          />
        </RadioGroup>
        <Typography variant="h6">
          {t(
            `ncrm_generalsetting_preferences_quote_select_the_fields_in_a_quite_that_you'd_like_to_retain_when_you_concert_it_into_a_sales_order_or_invoice`
          )}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.customerNote || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('customerNote', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_customer_notes')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.termCondition || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('termCondition', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_terms_and_conditions')}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={otherValue?.address || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                handleValueChange('address', checked);
              }}
            />
          }
          label={t('ncrm_generalsetting_preferences_quote_address')}
        />
      </FormControl>
    </MainCard>
  );
};

export default OtherSetting;
