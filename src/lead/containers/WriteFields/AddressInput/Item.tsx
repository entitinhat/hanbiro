import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

//project
//import { useRecoilValue } from 'recoil';
//import { countriesSelector, defaultCountrySelector } from '@base/recoil/selectors';
import { AddressType, StateType, CityType } from '@base/types/common';
import { useGetAvailabelCountriesApi, useRegionCities, useRegionStates } from '@base/services/settingService';

//material
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import CountryAutoComplete from '@settings/general/containers/FormatSetting/CountryAutoComplete';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
interface ItemProps {
  value: AddressType;
  onChange: (val: AddressType | null) => void;
}

const Item = (props: ItemProps) => {
  const { value, onChange } = props;

  const recoilCountries: any[] = []; //useRecoilValue(countriesSelector);
  const defaultCountry = null; //useRecoilValue(defaultCountrySelector);

  //default
  const defaultValue: any = {
    country: null, //defaultCountry, //country, isoCode2
    zipcode: '',
    addrState: '',
    city: '',
    street: ''
  };
  //state
  const { t } = useTranslation();
  const theme = useTheme();
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
  const { data: citiesData, isLoading: isCityLoading } = useRegionCities(addressValue.addrState || '');

  //set countries list
  useEffect(() => {
    if (recoilCountries.length === 0 && countryData?.results) {
      setCountries(countryData.results);
    }
  }, [countryData]);

  //init states list
  useEffect(() => {
    // console.log('statesData', statesData);
    if (statesData?.results) {
      let _rows: any = [];
      statesData.results.map((_item: any) => {
        if (_item?.subdivision != '') {
          _rows.push(_item?.subdivision);
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
          _rows.push(_item?.city);
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
      newAddressValue.addrState = '';
      newAddressValue.city = '';
    }
    if (keyAttribute === 'addrState') {
      newAddressValue.city = '';
    }
    setAddressValue(newAddressValue);
    //callback
    onChange && onChange(newAddressValue);
  };

  //render
  const titleSx = { fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary };
  return (
    <Stack spacing={0.5} sx={{ mt: '5px' }}>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={titleSx} keyLang={'Country'} />
              </InputLabel>
            </Stack>
              <CountryAutoComplete
                value={addressValue.country || ''}
                onChange={(country) => {
                  console.log('selected country', country);
                  if (country) {
                    handleValueChange('country', country);
                  }
                }}
                placeholder={t('ncrm_generalsetting_general_country_auto_placeholder') as string}
              />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: '5px' }}>
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={titleSx} keyLang={'State'} />
              </InputLabel>
            </Stack>
            <Autocomplete
              id="asynchronous-States"
              multiple={false}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option ?? ''}
              options={states}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('Type or click to select a state...	') as string}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>
                  }}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <Box component="li" {...props} key={option.isoCode2}>
                  {option}
                </Box>
              )}
              value={addressValue.addrState === '' ? null : addressValue.addrState}
              onChange={(event: React.SyntheticEvent, stateValue) => {
                console.log('selected State: ', stateValue);
                handleValueChange('addrState', stateValue);
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Grid container spacing={0.5}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: '5px' }}>
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={titleSx} keyLang={'City'} />
              </InputLabel>
            </Stack>
            <Autocomplete
              id="asynchronous-City"
              multiple={false}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option ?? ''}
              options={cities}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('Type or click to select a city...	') as string}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>
                  }}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <Box component="li" {...props} key={option.key}>
                  {option}
                </Box>
              )}
              value={addressValue.city === '' ? null : addressValue.city}
              onChange={(event: React.SyntheticEvent, cityValue) => {
                console.log('selected cityValue: ', cityValue);
                handleValueChange('city', cityValue);
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={titleSx} keyLang={'Zip Code'} />
              </InputLabel>
            </Stack>
            <TextField
              sx={{ m: '5px 0px' }}
              fullWidth
              placeholder="Zip code"
              value={addressValue.zipcode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('zipcode', e.target.value)}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Stack spacing={1} direction="row" alignItems="center" sx={{ mt: '10px', mb: '5px' }}>
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <SpanLang sx={titleSx} keyLang={'Address'} />
              </InputLabel>
            </Stack>
            <TextField
              fullWidth
              placeholder="Street"
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
