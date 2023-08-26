import { useEffect, useState } from 'react';
import _ from 'lodash';

//project
import { CountryType, MobileType } from '@base/types/common';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, PERSONAL_LABEL_OPTIONS, LABEL_VALUE_PERSONAL } from '@base/config/constant';

//material
import { AddCircleOutline, AddOutlined, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
import { Country } from '@base/types/setting';
import { useRecoilValue } from 'recoil';
import { countrySettingSelector } from '@base/store/selectors/app';

interface MobileInputProps {
  value: MobileType | MobileType[] | null;
  onChange: (val: MobileType | MobileType[] | null) => void;
  isMultiple?: boolean;
  isSmall?: boolean;
}

const MobileInput = (props: MobileInputProps) => {
  const { value, onChange, isMultiple = false, isSmall = false } = props;
  const { t } = useTranslation();
  const phoneCodes: CountryType[] = []; //useRecoilValue(phonesAtom);

  //intial
  const defaultRow: MobileType = {
    label: {
      languageKey: t(`ncrm_common_label_primary`),
      label: LABEL_VALUE_PRIMARY
    },
    labelValue: '',
    country: '', //phone code
    mobileNumber: ''
  };
  //state
  const [rows, setRows] = useState<MobileType[]>([defaultRow]);
  const [countryPhones, setCountryPhones] = useState<CountryType[]>(phoneCodes);

  // get Countries from recoil
  const countryData: Country[] = useRecoilValue(countrySettingSelector);

  //init rows
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(rows)) {
            setRows(value);
          }
        } else {
          setRows([_.cloneDeep(defaultRow)]);
        }
      } else {
        setRows([value]);
      }
    } else {
      setRows([_.cloneDeep(defaultRow)]);
    }
  }, [value]);

  //set countries list
  useEffect(() => {
    let newCountryPhones: CountryType[] = [];
    countryData?.map((country: Country) => {
      newCountryPhones.push({
        ...country,
        phoneCode: country?.phoneCode || ''
      } as CountryType);
    });
    setCountryPhones(newCountryPhones);
  }, [countryData]);

  //set default
  useEffect(() => {
    if (countryPhones.length > 0) {
      const defaultPhone = countryPhones.find((_ele: CountryType) => _ele.isDefault);
      if (defaultPhone) {
        // fix customer update view mobiles
        const newRows = rows.map((_ele: any) => ({ ..._ele, country: defaultPhone.phoneCode }));
        setRows(newRows);
        onChange && onChange(isMultiple ? newRows : newRows[0]);
      }
    }
  }, [countryPhones]);

  //add more email
  const handleAddMore = () => {
    const defaultPhone = countryPhones.find((_ele: CountryType) => _ele.isDefault);
    const newDefaultRow = {
      ...defaultRow,
      label: {
        languageKey: t(`ncrm_common_label_personal`),
        label: LABEL_VALUE_PERSONAL
      },
      country: defaultPhone ? defaultPhone.phoneCode : ''
    };
    let newRows = [...rows, newDefaultRow];
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //remove email
  const handleRemove = (i: number) => {
    let newRows = [...rows];
    newRows.splice(i, 1);
    let existPrimary = false;
    //reset primary
    newRows.map((_ele: any) => {
      if (_ele.label.label === LABEL_VALUE_PRIMARY) {
        existPrimary = true;
      }
    });
    if (!existPrimary) {
      newRows[0].label = { languageKey: t(`ncrm_common_label_primary`), label: LABEL_VALUE_PRIMARY };
      //newRows[0].primary = true;
    }
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //value change
  const handleValueChange = (index: number, keyAttribute: string, keyValue: any) => {
    const newRows = [...rows];
    newRows[index][keyAttribute] = keyValue;
    //set primary
    if (keyAttribute === 'label') {
      if (keyValue.label === LABEL_VALUE_PRIMARY) {
        //primary
        newRows[index].primary = true;
        //reset to other to false
        for (let i = 0; i < newRows.length; i++) {
          if (i !== index) {
            if (newRows[i].label.label === LABEL_VALUE_PRIMARY) {
              newRows[i].label = { languageKey: t(`ncrm_common_label_custom`), label: LABEL_VALUE_CUSTOM };
              //newRows[i].primary = false;
            }
          }
        }
      }
    }
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  return (
    <Box>
      {rows.map((row, idx) => {
        return (
          <Stack key={idx} spacing={0.5}>
            <Stack spacing={0.5}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={isSmall ? 2 : 3}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'Phone code select' }}
                    value={row.country || ''}
                    onChange={(e: SelectChangeEvent) => {
                      const selectedCode = e.target.value as string;
                      handleValueChange(idx, 'country', selectedCode);
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>{t('ncrm_common_select_phone_code')}</em>
                    </MenuItem>
                    {countryPhones
                      ?.filter((v: any) => v?.phoneCode !== '')
                      ?.map((_option: any, index: number) => {
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
                <>
                  <Grid item xs={12} lg={isSmall ? 7 : 5}>
                    <TextField
                      fullWidth
                      type="number"
                      placeholder={t('ncrm_common_mobile_number') as string}
                      value={row.mobileNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'mobileNumber', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={isSmall ? 3 : 4}>
                    <Select
                      fullWidth
                      displayEmpty
                      inputProps={{ 'aria-label': 'phone option select' }}
                      value={row.label ? PERSONAL_LABEL_OPTIONS.find((opt: any) => opt.value === row.label?.label)?.value || '' : ''}
                      onChange={(e: SelectChangeEvent) => {
                        const labelValue = e.target.value as string;
                        const newLabel = PERSONAL_LABEL_OPTIONS.find((opt: any) => opt.value === labelValue);
                        if (newLabel) {
                          handleValueChange(idx, 'label', { label: newLabel.value, languageKey: newLabel.label });
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
                </>
              </Grid>
            </Stack>
            {row.label?.label === LABEL_VALUE_CUSTOM && (
              <Stack sx={{ mt: 1 }}>
                <TextField
                  placeholder={t('label').toString()}
                  value={row.labelValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'labelValue', e.target.value)}
                />
              </Stack>
            )}
            <Stack direction="row">
              {isMultiple && idx !== 0 && (
                <Button size="small" color="error" startIcon={<CancelOutlined />} onClick={() => handleRemove(idx)}>
                  {t('ncrm_common_btn_delete')}
                </Button>
              )}
              {/* {isMultiple && idx != rows.length - 1 && (
                <Divider />
              )} */}
              {isMultiple && idx === rows.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                  startIcon={<AddOutlined />}
                  onClick={handleAddMore}
                >
                  {t('Add another line')}
                </Button>
              )}
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default MobileInput;
