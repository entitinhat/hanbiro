import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { AttributeValue } from '@product/attribute/types/attribute';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, fabClasses, TextField } from '@mui/material';
import { IdName, PaginateInput } from '@base/types/common';
import { useAttributeValues } from '@product/attribute/hooks/useAttributeValues';
interface AttributeValueAutoCompleteProps {
  single?: boolean;
  value?: AttributeValue | AttributeValue[] | undefined;
  onChange?: (val: AttributeValue | AttributeValue[] | null) => void;
  attr?: IdName;
  options?: AttributeValue[];
  disabled?: boolean;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AttributeValueAutoComplete = (props: AttributeValueAutoCompleteProps) => {
  const {
    single = true,
    value, //[], initial value
    onChange,
    options: initOptions,
    attr,
    disabled = false
  } = props;

  const { t } = useTranslation();

  // state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly AttributeValue[]>([]);
  const [selectedValue, setSelectedValue] = useState<AttributeValue | AttributeValue[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  // hook
  const {
    data: postData,
    refetch,
    isLoading
  } = useAttributeValues({
    keyword: searchText,
    paging: {
      page: 1,
      size: 9999
    } as PaginateInput,
    attr: attr,
    opts: { enabled: !initOptions }
  });

  // init options props
  useEffect(() => {
    if (initOptions) {
      setOptions(initOptions);
    }
  }, [initOptions]);

  // init options api
  useEffect(() => {
    if (postData?.data) {
      setOptions(postData.data);
    } else {
      setOptions([]);
    }
  }, [postData]);

  // init selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          const newValue: AttributeValue[] = [];
          value.map((_item: AttributeValue, _index: number) => {
            const fOption = options.find((_ele: AttributeValue) => _ele.id === _item.id);
            if (fOption) {
              newValue.push(fOption);
            }
          });
          setSelectedValue(newValue);
        }
      } else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
        if (value?.id !== selectedId) {
          setSelectedValue(single ? value : [value]);
        }
      }
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  // value change
  const handleValueChange = (event: React.SyntheticEvent, selected: AttributeValue | AttributeValue[] | null, reason: string) => {
    let newItem = selected;
    setSelectedValue(newItem);
    // callback
    onChange && onChange(newItem);
  };

  const getLoading = (): boolean => {
    return !initOptions && isLoading;
  };

  //render
  return (
    <Autocomplete
      id="asynchronous-attribute-value"
      multiple={!single}
      disabled={disabled}
      // limitTags={3}
      // sx={{ minWidth: 300 }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option: AttributeValue) => (option?.attr ? [option?.attr.name, option?.name].join(' > ') : option?.name ?? '')}
      options={options}
      loading={getLoading()}
      filterSelectedOptions={!single}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={disabled}
          placeholder={'Type or click to select'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {getLoading() ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      inputValue={searchText}
      onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
};

export default AttributeValueAutoComplete;
