import { useEffect, useState } from 'react';
import _ from 'lodash';

//project
import { CountryType, FaxType } from '@base/types/common';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, PERSONAL_LABEL_OPTIONS } from '@base/config/constant';

//material
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
import { useGetAvailabelCountriesApi } from '@base/services/settingService';
import { Country } from '@base/types/setting';
import { useRecoilValue } from 'recoil';
import { countrySettingSelector } from '@base/store/selectors/app';

interface FaxInputProps {
  value: FaxType | FaxType[] | null;
  onChange: (val: FaxType | FaxType[] | null) => void;
  isMultiple?: boolean;
}

const FaxInput = (props: FaxInputProps) => {
  const { value, onChange, isMultiple = false } = props;
  const { t } = useTranslation();
  const phoneCodes: CountryType[] = []; //useRecoilValue(phonesAtom);

  //intial
  const defaultRow: FaxType = {
    label: {
      languageKey: t(`ncrm_common_label_primary`),
      label: LABEL_VALUE_PRIMARY
    },
    labelValue: '',
    country: '',
    faxNumber: ''
  };
  //state
  const [rows, setRows] = useState<FaxType[]>([defaultRow]);
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
        const newRows = rows.map((_ele: any) => ({ ..._ele, country: defaultPhone.phoneCode }));
        setRows(newRows);
        onChange && onChange(isMultiple ? newRows : newRows[0]); // fix customer view
      }
    }
  }, [countryPhones]);

  //add more email
  const handleAddMore = () => {
    const newDefaultRow = {
      ...defaultRow,
      label: {
        languageKey: t(`ncrm_common_label_custom`),
        label: LABEL_VALUE_CUSTOM
      }
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
        //reset to others to false
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
                <Grid item xs={12} lg={3}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'fax code select' }}
                    value={row.country || ''}
                    onChange={(e: SelectChangeEvent) => {
                      const selectedCode = e.target.value as string;
                      handleValueChange(idx, 'country', selectedCode);
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select fax code</em>
                    </MenuItem>
                    {countryPhones
                      ?.filter((v: any) => v.phoneCode !== '') // fix duplicate item key
                      .map((_option: any) => {
                        return (
                          <MenuItem key={_option.phoneCode} value={_option.phoneCode}>
                            {_option.phoneCode}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder={'fax number'}
                    value={row.faxNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'faxNumber', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'fax option select' }}
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
                      <em>Select...</em>
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
                  Delete
                </Button>
              )}
              {/* {isMultiple && idx != rows.length - 1 && (
                <Divider />
              )} */}
              {isMultiple && idx === rows.length - 1 && (
                <Button color="primary" size="small" startIcon={<AddCircleOutline />} onClick={handleAddMore}>
                  Add
                </Button>
              )}
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default FaxInput;
