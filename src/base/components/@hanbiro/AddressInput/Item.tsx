import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

//project
//import { useRecoilValue } from 'recoil';
//import { countriesSelector, defaultCountrySelector } from '@base/recoil/selectors';
import { AddressType, StateType, CityType } from '@base/types/common';
import { useGetAvailabelCountriesApi, useRegionCities, useRegionStates } from '@base/services/settingService';

//material
import { Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

interface ItemProps {
  value: AddressType;
  onChange: (val: AddressType | null) => void;
}

const Item = (props: ItemProps) => {
  const { value, onChange } = props;

  const recoilCountries: any[] = []; //useRecoilValue(countriesSelector);
  const defaultCountry = null; //useRecoilValue(defaultCountrySelector);

  //default
  const defaultValue: AddressType = {
    country: null, //defaultCountry, //country, isoCode2
    zipcode: '',
    state: '',
    city: '',
    street: ''
  };
  //state
  const { t } = useTranslation();
  const [countries, setCountries] = useState<any[]>(recoilCountries);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [addressValue, setAddressValue] = useState<any>(defaultValue);

  //init value
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(addressValue)) {
        setAddressValue(value);
      }
    } else {
      setAddressValue(defaultValue);
    }
  }, [value]);

  //get countries
  const { data: countryData, isLoading: isCountryLoading } = useGetAvailabelCountriesApi(recoilCountries.length === 0);
  const { data: statesData, isLoading: isStateLoading } = useRegionStates(addressValue.country?.isoCode2 || '');
  const { data: citiesData, isLoading: isCityLoading } = useRegionCities(addressValue.state || '');

  //set countries list
  useEffect(() => {
    if (recoilCountries.length === 0 && countryData?.results) {
      setCountries(countryData.results);
    }
  }, [countryData]);

  //init states list
  useEffect(() => {
    if (statesData?.results) {
      let _rows: any = [];
      statesData.results.map((_item: any) => {
        if (_item?.subdivision != '') {
          _rows.push({ value: _item?.subdivision, label: _item?.subdivision });
        }
      });
      setStates(_rows);
    }
  }, [statesData]);

  //init cities list
  useEffect(() => {
    if (citiesData?.results) {
      let _rows: any = [];
      citiesData.results?.map((_item: any) => {
        if (_item?.city != '') {
          _rows.push({ value: _item?.city, label: _item?.city });
        }
      });
      setCities(_rows);
    }
  }, [citiesData]);

  //value change
  const handleValueChange = (keyAttribute: string, keyValue: any) => {
    const newAddressValue = { ...addressValue };
    newAddressValue[keyAttribute] = keyValue;
    if (keyAttribute === 'country') {
      newAddressValue.state = '';
      newAddressValue.city = '';
    }
    if (keyAttribute === 'state') {
      newAddressValue.city = '';
    }
    setAddressValue(newAddressValue);
    //callback
    onChange && onChange(newAddressValue);
  };

  //render
  return (
    <Stack spacing={0.5}>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={12} lg={6}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'address country select' }}
              value={addressValue.country?.isoCode2 || ''}
              onChange={(e: SelectChangeEvent) => {
                const selectedCode2 = e.target.value as string;
                const selectedCountry = countries.find((_ele: any) => _ele.isoCode2 === selectedCode2);
                if (selectedCountry) {
                  handleValueChange('country', selectedCountry);
                }
              }}
            >
              <MenuItem value="" disabled>
                <em>{t('ncrm_common_address_select_country')}</em>
              </MenuItem>
              {countries.map((_option: any, index: number) => (
                <MenuItem key={index} value={_option.isoCode2}>
                  {_option.country}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'address state select' }}
              value={addressValue.state}
              onChange={(e: SelectChangeEvent) => {
                const stateValue = e.target.value as string;
                handleValueChange('state', stateValue);
              }}
            >
              <MenuItem value="" disabled>
                <em>{t('ncrm_common_address_select_state')}</em>
              </MenuItem>
              {states.map((_option: any, index: number) => (
                <MenuItem key={index} value={_option.value}>
                  {_option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={12} lg={6}>
            <Select
              fullWidth
              displayEmpty
              inputProps={{ 'aria-label': 'address city select' }}
              value={addressValue.city}
              onChange={(e: SelectChangeEvent) => {
                const cityValue = e.target.value as string;
                handleValueChange('city', cityValue);
              }}
            >
              <MenuItem value="" disabled>
                <em>{t('ncrm_common_address_select_city')}</em>
              </MenuItem>
              {cities.map((_option: any, index: number) => (
                <MenuItem key={index} value={_option.value}>
                  {_option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              placeholder={t('ncrm_common_address_zip_code') as string}
              value={addressValue.zipcode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('zipcode', e.target.value)}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <TextField
              fullWidth
              placeholder={t('ncrm_common_address_street') as string}
              value={addressValue.street}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('street', e.target.value)}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Item;
