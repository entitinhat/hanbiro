import React, { useState, useEffect, useRef, useMemo } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField, Typography, Button } from '@mui/material';
import { useGetList } from '@settings/general/hooks/useGetList';
import { Country } from '@base/types/setting';
import { queryKeys } from '@settings/general/config/queryKeys';
import { FilterInput } from '@base/types/common';

interface CountryAutoCompleteProps {
  placeholder?: string;
  type?: string; // all, produced, purchase
  visible?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  excludes?: string[];
  label?: string;
  value: Country | string;
  onChange: (params: Country) => void;
}
/**
 *
 * @param {*} props
 * @returns
 */
const CountryAutoComplete = (props: CountryAutoCompleteProps) => {
  const {
    placeholder = 'Type or click to select a country...',
    type = '', //all, produced, purchase
    visible = false, //hide or display selected items
    showAllOption = false,
    isDisabled = false,
    excludes = [],
    value, //[], initial value
    onChange,
    label
    //addLabel,
    //onAdd,
  } = props;

  const { t } = useTranslation();

  // state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly Country[]>([]);
  const [selectedValue, setSelectedValue] = useState<Country | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  // initial selected
  useEffect(() => {
    if (value) {
      //single object
      if (_.isString(value)) {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Country) => _ele.isoCode2) : selectedValue?.isoCode2;
        if (value !== selectedId) {
          //find in options
          const fOption = options.find((_ele: Country) => _ele.isoCode2 === value);
          if (fOption) {
            setSelectedValue(fOption);
          }
        }
      } else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Country) => _ele.isoCode2) : selectedValue?.isoCode2;
        if (value?.isoCode2 !== selectedId) {
          setSelectedValue(value);
        }
        //if value is not in options
        const fIndex = options.findIndex((_ele: Country) => _ele.isoCode2 === value?.isoCode2);
        if (fIndex === -1) {
          const newOptions = [...options];
          newOptions.unshift(value);
          setOptions(newOptions);
        }
      }
    } else {
      setSelectedValue(null);
    }
  }, [value, options]);
  //build params
  const getSearchParams = () => {
    let params: FilterInput = {
      keyword: searchText,
      paging: {
        page: 1,
        size: 999
      }
    };
    return params;
  };

  const schemas: string[] = ['isoCode2', 'isoCode3', 'country'];
  const listQuerySchema = schemas.join('\n');
  const {
    data: countryData,
    status: searchStatus
    //refetch,
  } = useGetList<Country[]>(queryKeys.settingAvailableCountry, listQuerySchema, getSearchParams());

  // init states list
  useEffect(() => {
    if (countryData?.data) {
      setOptions(countryData.data);
    } else {
      setOptions([]);
    }
  }, [countryData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Country | null, reason: string) => {
    let newItem = selected;
    if (visible) {
      setSelectedValue(newItem);
    } else {
      setSearchText('');
      setSearchTextDebounced('');
    }

    //callback
    if (newItem) {
      onChange && onChange(newItem);
    }
  };

  let placeholderCond = placeholder;
  if (label) {
    placeholderCond = '';
  }

  //===DEBUG
  // console.log('countries options', options);
  //render
  // const toggleOpen = () => {
  //   !isOpenCountry ? setIsOpenCountry(true) : setIsOpenCountry(false);
  // };
  return (
    <>
      <Autocomplete
        id="asynchronous-Country"
        multiple={false}
        sx={{ padding: '5px 0px' }}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.isoCode2 === value.isoCode2}
        getOptionLabel={(option) => option?.country ?? ''}
        options={options}
        loading={searchStatus === 'loading'}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholderCond}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {searchStatus === 'loading' ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <Box component="li" {...props} key={option.isoCode3}>
            {option.country == 'All' ? <Typography sx={{ fontWeight: 500 }}>All</Typography> : option.country}
          </Box>
        )}
        inputValue={searchText}
        onInputChange={handleInputChange}
        value={selectedValue}
        onChange={handleValueChange}
      />
    </>
  );
};

export default CountryAutoComplete;
