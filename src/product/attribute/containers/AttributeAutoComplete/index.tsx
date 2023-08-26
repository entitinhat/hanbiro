import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { Attribute } from '@product/attribute/types/attribute';

// material-ui
import { Autocomplete, CircularProgress, TextField, useTheme } from '@mui/material';
import { useAttributes } from '@product/attribute/hooks/useAttributes';

interface AttributeAutoCompleteProps {
  single?: boolean;
  value?: Attribute | Attribute[] | string | undefined; // string in case the value on setValue return id, (ex: filter )
  onChange?: (val: Attribute | Attribute[] | null) => void;
  options?: Attribute[];
  ignoredOption?: Attribute[];
  isDisabled?: boolean;
}

const AttributeAutoComplete = (props: AttributeAutoCompleteProps) => {
  const { single = true, value, onChange, options: initOptions, ignoredOption = [], isDisabled } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  // state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly Attribute[]>([]);
  const [selectedValue, setSelectedValue] = useState<Attribute | Attribute[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  // hook
  const { data: postData, refetch, isLoading } = useAttributes({ keyword: '', options: { enabled: !initOptions } });

  const getLoading = (): boolean => {
    return isLoading && !initOptions;
  };

  // init options
  useEffect(() => {
    if (ignoredOption && postData?.data) {
      const ignoredIds = ignoredOption.map((_a: Attribute) => {
        return _a?.id;
      });
      const newOptions = postData.data.filter((_a: Attribute) => {
        return !ignoredIds.includes(_a.id);
      });

      setOptions([...newOptions]);
    } else {
      setOptions([]);
    }
  }, [postData, JSON.stringify(ignoredOption)]);

  useEffect(() => {
    if (initOptions) {
      setOptions(initOptions);
    }
  }, [initOptions]);

  // init selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          setSelectedValue(value);
        }
      } 
      else if( typeof(value) == 'string'){ // in case the value on setValue return id, (ex: filter )
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
        if (value !== selectedId) {
          const newVal = options.find((_ele: Attribute) => _ele?.id ==  value) || []
          setSelectedValue(single ? newVal : []);
        }
      } 
      else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
        if (value?.id !== selectedId) {
          setSelectedValue(single ? value : [value]);
        }
      }
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value]);

  //ignore options

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  // value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Attribute | Attribute[] | null, reason: string) => {
    let newItem = selected;
    setSelectedValue(newItem);
    // callback
    onChange && onChange(newItem);
  };

  //render
  return (
    <Autocomplete
      id="asynchronous-attribute"
      sx={{
        ...(isDisabled && {
          background: theme.palette.secondary.lighter,
          color: theme.palette.secondary.main
        })
      }}
      multiple={!single}
      // limitTags={3}
      // sx={{ minWidth: 300 }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      disabled={isDisabled}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option?.name ?? ''}
      options={options || []}
      loading={getLoading()}
      filterSelectedOptions={!single}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={isDisabled}
          placeholder={'Type or click to select a attribute'}
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

export default AttributeAutoComplete;
