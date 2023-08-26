import React, { useState, useEffect, useRef } from 'react';
import { useGetList } from '@settings/general/hooks/useGetList';
// import { Currency } from '@settings/general/types/interface';
import { queryKeys } from '@settings/general/config/queryKeys';
import { Currency, FilterInput } from '@base/types/common';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, CircularProgress, TextField, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CountryAutoCompleteProps {
  placeholder?: string;
  type?: string; // all, produced, purchase
  visible?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  excludes?: string[];
  label?: string;
  value: Currency | string;
  onChange: (params: Currency) => void;
}
/**
 *
 * @param {*} props
 * @returns
 */
const CurrencyAutoComplete = (props: CountryAutoCompleteProps) => {
  const {
    placeholder = 'Type or click to select a currency...',
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
  const [options, setOptions] = useState<readonly Currency[]>([]);
  const [selectedValue, setSelectedValue] = useState<Currency | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  // initial selected
  useEffect(() => {
    if (value) {
      //single object
      if (_.isString(value)) {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Currency) => _ele.code) : selectedValue?.code;
        if (value !== selectedId) {
          //find in options
          const fOption = options.find((_ele: Currency) => _ele.code === value);
          if (fOption) {
            setSelectedValue(fOption);
          }
        }
      } else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: Currency) => _ele.code) : selectedValue?.code;
        if (value?.code !== selectedId) {
          setSelectedValue(value);
        }
        //if value is not in options
        const fIndex = options.findIndex((_ele: Currency) => _ele.code === value?.code);
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

  let schemas: string[] = ['code', 'currencyName', 'currencySymbol'];
  let listQuerySchema = schemas.join('\n');
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
    data: currencyData,
    status: searchStatus,
    isFetching,
    isPreviousData,
    refetch
  } = useGetList<Currency[]>(queryKeys.settingAvailableCurrency, listQuerySchema, getSearchParams());
  // init states list
  useEffect(() => {
    if (currencyData?.data) {
      setOptions(currencyData.data);
    } else {
      setOptions([]);
    }
  }, [currencyData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Currency | null, reason: string) => {
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
        isOptionEqualToValue={(option, value) => option.code === value.code}
        getOptionLabel={(option) => option?.currencyName ?? ''}
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
          <Box component="li" {...props} key={option.code}>
            {option.currencyName == 'All' ? <Typography sx={{ fontWeight: 500 }}>All</Typography> : option.currencyName}
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

export default CurrencyAutoComplete;
