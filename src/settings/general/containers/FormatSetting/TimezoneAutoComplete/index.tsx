import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useGetList } from '@settings/general/hooks/useGetList';
import { Timezone } from '@settings/general/types/interface';
import { queryKeys } from '@settings/general/config/queryKeys';
import { FilterInput } from '@base/types/common';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface TimezoneAutoCompleteProps {
  placeholder?: string;
  type?: string; // all, produced, purchase
  visible?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  excludes?: string[];
  label?: string;
  value: Timezone | string;
  onChange: (params: Timezone) => void;
}
/**
 *
 * @param {*} props
 * @returns
 */
const TimezoneAutoComplete = (props: TimezoneAutoCompleteProps) => {
  const {
    placeholder = 'Type or click to select a timezone...',
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
  const [options, setOptions] = useState<readonly Timezone[]>([]);
  const [selectedValue, setSelectedValue] = useState<Timezone | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTimeZone, setIsOpenTimeZone] = useState<boolean>(false);

  // initial selected
  useEffect(() => {
    if (value) {
      //single object
      if (_.isString(value)) {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Timezone) => _ele.tzone) : selectedValue?.tzone;
        if (value !== selectedId) {
          //find in options
          const fOption = options.find((_ele: Timezone) => _ele.tzone === value);
          if (fOption) {
            setSelectedValue(fOption);
          }
        }
      } else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Timezone) => _ele.tzone) : selectedValue?.tzone;
        if (value?.tzone !== selectedId) {
          setSelectedValue(value);
        }
        //if value is not in options
        const fIndex = options.findIndex((_ele: Timezone) => _ele.tzone === value?.tzone);
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

  let schemas: string[] = ['nationEn', 'tzone', 'sdtime', 'sdutc'];
  let listQuerySchema = schemas.join('\n');
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
  const {
    isLoading,
    data: TimezoneData,
    status: searchStatus,
    isFetching,
    isPreviousData,
    refetch
  } = useGetList<Timezone[]>(queryKeys.settingAvailableTimezone, listQuerySchema, getSearchParams());

  // init states list
  useEffect(() => {
    if (TimezoneData?.data) {
      setOptions(TimezoneData.data);
    } else {
      setOptions([]);
    }
  }, [TimezoneData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Timezone | null, reason: string) => {
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
  // console.log('options:', options);
  // console.log('searchText:', searchText);
  // console.log('selectedValue:', selectedValue);
  // console.log('TimezoneData:', TimezoneData);

  //render
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
        isOptionEqualToValue={(option, value) => option.tzone === value.tzone}
        getOptionLabel={(option) => option?.nationEn ?? ''}
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
          <Box component="li" {...props} key={option.tzone}>
            {option.nationEn == 'All' ? <Typography sx={{ fontWeight: 500 }}>All</Typography> : option.nationEn}
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

export default TimezoneAutoComplete;
