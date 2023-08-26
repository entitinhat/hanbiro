import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
//import { SpanLang } from '@base/components/form';
//import { useRecoilValue } from 'recoil';
//import { defaultCountrySelector, countriesSelector } from '@base/recoil/selectors';

import Item from './Item';
import { AddressType } from '@base/types/common';

//material
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';

interface AddressInputProps {
  value: AddressType | AddressType[] | null;
  onChange: (val: AddressType | AddressType[] | null) => void;
  isMultiple?: boolean;
}

const AddressInput = (props: AddressInputProps) => {
  const { value, onChange, isMultiple = false } = props;
  const { t } = useTranslation();

  const defaultValue = {
    label: 'LABEL_PRIMARY',
    labelValue: '',
    country: null, //defaultCountry, //country, isoCode2
    zipcode: '',
    addrState: '',
    city: '',
    street: ''
  };
  //state
  const [addresses, setAddresses] = useState<any[]>([]);

  //init data
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(addresses)) {
            setAddresses(value);
          }
        } else {
          setAddresses([_.cloneDeep(defaultValue)]);
        }
      } else {
        //single
        setAddresses([value]);
      }
    } else {
      setAddresses([_.cloneDeep(defaultValue)]);
    }
  }, [value]);

  //new default address
  const handeAdd = () => {
    const newAddresses = [...addresses];
    newAddresses.push(_.cloneDeep(defaultValue));
    setAddresses(newAddresses);
    //callback
    onChange && onChange(isMultiple ? newAddresses : newAddresses[0]);
  };

  //remove new address
  const handleRemove = (index: number) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
    //callback
    onChange && onChange(isMultiple ? newAddresses : newAddresses[0]);
  };

  //value change
  const handleValueChange = (index: number, keyValue: any) => {
    const newAddresses = [...addresses];
    newAddresses[index] = keyValue;
    setAddresses(newAddresses);
    //callback
    onChange && onChange(isMultiple ? newAddresses : newAddresses[0]);
  };

  return (
    <Box>
      {addresses.map((address, idx) => {
        return (
          <Stack key={idx} spacing={0.5} sx={{ mb: 1 }}>
            <Item value={address} onChange={(newAddress: any): void => handleValueChange(idx, newAddress)} />
            <Stack direction="row">
              {isMultiple && idx !== 0 && (
                <Button size="small" color="error" startIcon={<CancelOutlined />} onClick={() => handleRemove(idx)}>
                  Delete
                </Button>
              )}
              {/* {isMultiple && idx != (addresses.length - 1) && (
                <Divider />
              )} */}
              {isMultiple && idx === addresses.length - 1 && (
                <Button size="small" color="primary" startIcon={<AddCircleOutline />} onClick={handeAdd}>
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

export default AddressInput;
