import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { UnitValue } from '@product/unit/types/unit';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, fabClasses, TextField } from '@mui/material';
import { useUnitValues } from '@product/unit/hooks/useUnitValues';
import { IdName, PaginateInput } from '@base/types/common';

interface UnitValueAutoCompleteProps {
  single?: boolean;
  value?: UnitValue | UnitValue[] | undefined;
  onChange?: (val: UnitValue | UnitValue[] | null) => void;
  unit?: IdName;
  options?: UnitValue[];
}

/**
 *
 * @param {*} props
 * @returns
 */
const UnitValueAutoComplete = (props: UnitValueAutoCompleteProps) => {
  const {
    single = true,
    value, //[], initial value
    onChange,
    unit,
    options: initOptions
  } = props;

  const { t } = useTranslation();

  // state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly UnitValue[]>([]);
  const [selectedValue, setSelectedValue] = useState<UnitValue | UnitValue[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  // hook
  const {
    data: postData,
    refetch,
    isLoading
  } = useUnitValues({
    keyword: searchText,
    paging: {
      page: 1,
      size: 9999
    } as PaginateInput,
    unit: unit,
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

  const getLoading = (): boolean => {
    return isLoading && !initOptions;
  };

  // init selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          const newValue: UnitValue[] = [];
          value.map((_item: UnitValue, _index: number) => {
            const fOption = options.find((_ele: UnitValue) => _ele.id === _item.id);
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
  const handleValueChange = (event: React.SyntheticEvent, selected: UnitValue | UnitValue[] | null, reason: string) => {
    let newItem = selected;
    setSelectedValue(newItem);
    // callback
    onChange && onChange(newItem);
  };

  //render
  return (
    <Autocomplete
      id="asynchronous-unit-value"
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
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option: UnitValue) => (option?.unit ? [option?.unit?.name, option?.name].join(' > ') : option?.name ?? '')}
      options={options}
      loading={getLoading()}
      filterSelectedOptions={!single}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('ncrm_product_place_holder_unit_auto') as string}
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

export default UnitValueAutoComplete;
