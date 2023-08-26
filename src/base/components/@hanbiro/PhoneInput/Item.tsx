import React, { useEffect, useMemo, useState } from 'react';
//import { useTranslation } from 'react-i18next';

//project
import { CountryType, PhoneType } from '@base/types/common';

//material
import { Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, PERSONAL_LABEL_OPTIONS } from '@base/config/constant';
import { useTranslation } from 'react-i18next';

interface ItemProps {
  isMultiple?: boolean;
  phoneCodes?: CountryType[];
  value: PhoneType;
  onChange: (val: PhoneType | null) => void;
  showFullRow?: boolean;
  haveExtension?: boolean;
}

const Item = (props: ItemProps) => {
  const { phoneCodes = [], isMultiple = false, value, onChange, showFullRow, haveExtension = true } = props;
  const { t } = useTranslation();

  const defaultValue: PhoneType = {
    label: {
      languageKey: t(`ncrm_common_label_primary`),
      label: LABEL_VALUE_PRIMARY
    },
    labelValue: '',
    country: '', //phone code
    phoneNumber: '',
    extension: ''
  };
  //state
  const [phoneValue, setPhoneValue] = useState<PhoneType>(defaultValue);

  //init data
  useEffect(() => {
    // console.log('phone init value', value);
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(phoneValue)) {
        setPhoneValue(value);
      }
    } else {
      setPhoneValue(defaultValue);
    }
  }, [value]);

  //value change
  const handleValueChange = (keyAttribute: string, keyValue: any) => {
    const newPhoneValue = { ...phoneValue };
    newPhoneValue[keyAttribute] = keyValue;
    setPhoneValue(newPhoneValue);
    //callback
    onChange && onChange(newPhoneValue);
  };

  //render
  return (
    <Stack spacing={0.5}>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={12} lg={showFullRow ? 12 : 3}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'phone code select' }}
              value={phoneValue.country || ''}
              onChange={(e: SelectChangeEvent) => {
                const selectedCode2 = e.target.value as string;
                handleValueChange('country', selectedCode2);
              }}
            >
              <MenuItem value="" disabled>
                <em>{t('ncrm_common_select_phone_code')}</em>
              </MenuItem>
              {phoneCodes
                ?.filter((v: any) => v?.phoneCode !== '')
                .map((_option: any, i: number) => {
                  // fix same key index
                  if (_option.phoneCode !== 'undefined' && _option.phoneCode !== undefined) {
                    return (
                      <MenuItem key={i} value={_option.phoneCode}>
                        {_option.phoneCode}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </Grid>
          <Grid item xs={12} lg={isMultiple ? (showFullRow ? 12 : 5) : showFullRow ? 12 : 9}>
            <TextField
              fullWidth
              type="number"
              placeholder={t('ncrm_common_phone_number_placeholder') as string}
              value={phoneValue.phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('phoneNumber', e.target.value)}
            />
          </Grid>
          {isMultiple && (
            <Grid item xs={12} lg={showFullRow ? 12 : 4}>
              <Select
                fullWidth
                displayEmpty
                inputProps={{ 'aria-label': 'phone option select' }}
                value={
                  phoneValue.label ? PERSONAL_LABEL_OPTIONS.find((opt: any) => opt.value === phoneValue.label?.label)?.value || '' : ''
                }
                onChange={(e: SelectChangeEvent) => {
                  const labelValue = e.target.value as string;
                  const newLabel = PERSONAL_LABEL_OPTIONS.find((opt: any) => opt.value === labelValue);
                  if (newLabel) {
                    handleValueChange('label', { label: newLabel.value, languageKey: newLabel.label });
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>{t('ncrm_common_select_placeholder')}</em>
                </MenuItem>
                {PERSONAL_LABEL_OPTIONS.map((_option: any, index: number) => {
                  return (
                    <MenuItem key={index} value={_option.value}>
                      {t(_option.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          )}
        </Grid>
      </Stack>
      <Stack>
        <Grid container spacing={0.5}>
          {/* {haveExtension && (
            <Grid item xs={12} lg={showFullRow ? 12 : 6}>
              <TextField
                fullWidth
                type="number"
                placeholder={t('ncrm_common_phone_extension_placeholder') as string}
                value={phoneValue.extension || ''} // fix customer uncontrolled value
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('extension', e.target.value)}
                />
            </Grid>
          )} */}
          <Grid item xs={12} lg={6}>
            {Boolean(phoneValue?.label?.label === LABEL_VALUE_CUSTOM && isMultiple) && (
              <TextField
                fullWidth
                placeholder={t('ncrm_common_label_placeholder') as string}
                value={phoneValue.labelValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('labelValue', e.target.value)}
              />
            )}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Item;
