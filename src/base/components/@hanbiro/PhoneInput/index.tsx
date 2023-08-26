import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { CountryType, PhoneType } from '@base/types/common';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY, LABEL_VALUE_WORK } from '@base/config/constant';

//material
import { AddCircleOutline, AddOutlined, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';

//local
import Item from './Item';
import { Country } from '@base/types/setting';
import { useRecoilValue } from 'recoil';
import { countrySettingSelector } from '@base/store/selectors/app';

interface PhoneInputProps {
  value: PhoneType | PhoneType[] | null;
  onChange: (val: PhoneType | PhoneType[] | null) => void;
  isMultiple?: boolean;
  showFullRow?: boolean;
  haveExtension?: boolean;
}

const PhoneInput = (props: PhoneInputProps) => {
  const { value, onChange, isMultiple = false, showFullRow = false, haveExtension = true } = props;
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
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const phoneCodes: CountryType[] = []; //useRecoilValue(phonesAtom);
  const [countryPhones, setCountryPhones] = useState<CountryType[]>(phoneCodes);

  // get Countries from recoil
  const countryData: Country[] = useRecoilValue(countrySettingSelector);

  // init value
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(phones)) {
            setPhones(value);
          }
        } else {
          setPhones([_.cloneDeep(defaultValue)]);
        }
      } else {
        setPhones([value]);
      }
    } else {
      setPhones([_.cloneDeep(defaultValue)]);
    }
  }, [value]);

  // set countries list
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

  // set default
  useEffect(() => {
    if (countryPhones.length > 0) {
      const defaultPhone = countryPhones.find((_ele: CountryType) => _ele.isDefault);
      if (defaultPhone) {
        const newPhones = phones.map((_ele: any) => ({ ..._ele, country: defaultPhone.phoneCode }));
        setPhones(newPhones);
        //callback
        onChange && onChange(isMultiple ? newPhones : newPhones[0]); // fix init country value in customer view
      }
    }
  }, [countryPhones]);

  //add new
  const handleAdd = () => {
    const newPhones = [...phones];
    const defaultPhone = countryPhones.find((_ele: CountryType) => _ele.isDefault);
    const newDefaultValue = {
      ...defaultValue,
      label: {
        languageKey: t('ncrm_common_label_work'),
        label: LABEL_VALUE_WORK
      },
      country: defaultPhone ? defaultPhone.phoneCode : ''
    };
    newPhones.push(_.cloneDeep(newDefaultValue));
    setPhones(newPhones);
    //callback
    onChange && onChange(isMultiple ? newPhones : newPhones[0]);
  };

  //remove
  const handleRemove = (index: number) => {
    const newPhones = [...phones];
    newPhones.splice(index, 1);
    let existPrimary = false;
    newPhones.map((_ele: any) => {
      if (_ele.label.label === LABEL_VALUE_PRIMARY) {
        existPrimary = true;
      }
    });
    if (!existPrimary) {
      newPhones[0].label = { languageKey: t(`ncrm_common_label_primary`), label: LABEL_VALUE_PRIMARY };
      //newPhones[0].primary = true;
    }
    setPhones(newPhones);
    //callback
    onChange && onChange(isMultiple ? newPhones : newPhones[0]);
  };

  //value change
  const handleValueChange = (index: number, keyValue: any) => {
    const newPhones = [...phones];
    newPhones[index] = keyValue;
    //console.log('keyValue', keyValue);
    if (keyValue.label.label === LABEL_VALUE_PRIMARY) {
      //primary
      newPhones[index].primary = true;
      //reset to other to false
      for (let i = 0; i < newPhones.length; i++) {
        if (i !== index) {
          if (newPhones[i].label.label === LABEL_VALUE_PRIMARY) {
            newPhones[i].label = { languageKey: t(`ncrm_common_label_custom`), label: LABEL_VALUE_CUSTOM };
            //newPhones[i].primary = false;
          }
        }
      }
    }
    setPhones(newPhones);
    //callback
    onChange && onChange(isMultiple ? newPhones : newPhones[0]);
  };

  return (
    <Box>
      {phones.map((phone, idx) => {
        return (
          <Stack key={idx} spacing={0.5} sx={{ mb: 1 }}>
            <Item
              isMultiple={isMultiple}
              phoneCodes={countryPhones}
              value={phone}
              onChange={(newPhone: PhoneType | null) => handleValueChange(idx, newPhone)}
              showFullRow={showFullRow}
              haveExtension={haveExtension}
            />
            <Stack direction="row">
              {isMultiple && idx !== 0 && (
                <Button size="small" color="error" startIcon={<CancelOutlined />} onClick={() => handleRemove(idx)}>
                  {t('ncrm_common_btn_delete')}
                </Button>
              )}
              {/* {isMultiple && idx != (addresses.length - 1) && (
                <Divider />
              )} */}
              {isMultiple && idx === phones.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                  startIcon={<AddOutlined />}
                  onClick={handleAdd}
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

export default PhoneInput;
