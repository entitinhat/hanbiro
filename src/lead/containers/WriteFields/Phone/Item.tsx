import React, { useEffect, useMemo, useState } from 'react';
//import { useTranslation } from 'react-i18next';

//project
import { CountryType, PhoneType } from '@base/types/common';

//material
import { Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField, useTheme } from '@mui/material';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, PERSONAL_LABEL_OPTIONS } from '@base/config/constant';
import { useTranslation } from 'react-i18next';
import { NumericFormat, PatternFormat } from 'react-number-format';
import useDevice from '@base/hooks/useDevice';
//third-party

interface ItemProps {
  isMultiple?: boolean;
  phoneCodes?: CountryType[];
  value: PhoneType;
  onChange: (val: PhoneType | null) => void;
  showFullRow?: boolean;
}

const Item = (props: ItemProps) => {
  const { phoneCodes = [], isMultiple = false, value, onChange, showFullRow } = props;

  console.log('phoneCodes', phoneCodes);
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
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
  console.log('phoneValue', phoneValue);
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
    console.log('keyValue', keyValue);
    const newPhoneValue = { ...phoneValue };
    if (keyAttribute == 'phoneNumber') {
      const nKeyValue = keyValue.split('(').pop().replace(/\D+/g, '');

      console.log('nKeyVal', nKeyValue);
      if (nKeyValue.length > 10) {
        newPhoneValue[keyAttribute] = nKeyValue.substring(0, 10);
        newPhoneValue.extension = nKeyValue.substring(10);
      } else newPhoneValue[keyAttribute] = nKeyValue;
    } else newPhoneValue[keyAttribute] = keyValue;
    setPhoneValue(newPhoneValue);
    //callback
    onChange && onChange(newPhoneValue);
  };

  //render
  return (
    <Stack spacing={0.5}>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={isMobile ? 12 : isMultiple ? 2 : 4}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'phone code select' }}
              value={phoneValue.country}
              onChange={(e: SelectChangeEvent) => {
                const selectedCode2 = e.target.value as string;
                handleValueChange('country', selectedCode2);
              }}
            >
              <MenuItem value="" disabled>
                <em>{t('ncrm_common_select_phone_code')}</em>
              </MenuItem>
              {phoneCodes.map((_option: any, index: number) => {
                if (_option.phoneCode !== 'undefined' && _option.phoneCode !== undefined) {
                  return (
                    <MenuItem key={index} value={_option.phoneCode}>
                      {_option.phoneCode}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </Grid>
          <Grid item xs={isMobile ? 12 : isMultiple ? 6 : 8}>
            <Stack direction="row" spacing={0}>
              <TextField
                fullWidth
                type="tel"
                placeholder={t('ncrm_common_phone_number_placeholder') as string}
                value={phoneValue.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('phoneNumber', e.target.value)}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '5px 0px 0px 5px' } }}
              />
              {/* <TextField
                sx={{ width: '35%', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0px 5px 5px 0px', borderLeft: 'none' } }}
                InputProps={{
                  startAdornment: <SpanLang sx={{ color: theme.palette.secondary.main }} keyLang={'Ext:'} />
                }}
                value={phoneValue.extension}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('extension', e.target.value)}
              /> */}
            </Stack>
            {/* <PatternFormat
              format={`(${phoneValue.country}) ##-###-#### / ###`}
              allowEmptyFormatting
              valueIsNumericString
              mask="#"
              fullWidth
              customInput={TextField}
              defaultValue={value.phoneNumber + value.extension}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.stopPropagation();
                handleValueChange('phoneNumber', e.target.value);
              }}
            /> */}
          </Grid>
          {isMultiple && (
            <Grid item xs={isMobile ? 12 : 4}>
              
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
                {PERSONAL_LABEL_OPTIONS.map((_option: any) => {
                  return (
                    <MenuItem key={_option.value} value={_option.value}>
                      {t(_option.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Item;
