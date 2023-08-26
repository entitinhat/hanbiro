import React, { useState } from 'react';

import _ from 'lodash';

import { Autocomplete, Box, TextField } from '@mui/material';
import { LabelValue } from '@base/types/app';

interface TagsProps {
  options?: LabelValue[];
  outSide?: boolean;
  value: { id: string; name: string }[];
  onChange: (params: any) => void;
  fieldValue?: string;
  fieldLabel?: string;
  fetchList?: (params: any) => {};
}

const TagsAutoComplete: React.FC<TagsProps> = (props) => {
  const { value, onChange, options, fieldValue = 'value', fieldLabel = 'label', fetchList, outSide = false } = props;

  const [keyword, setKeyword] = useState('');
  const [selectedValue, setSelectedValue] = useState(value);
  const { data, isLoading }: any = options ? { data: { results: options }, isLoading: false } : fetchList && fetchList(keyword);
  const placeholder = 'Select...';
  const onInputChange = (event: any, newValue: string) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setKeyword(newValue);
    }
  };
  const handleValueChange = (event: any, value: any) => {
    setSelectedValue(value);
    onChange && onChange(value);
  };
  //render
  return (
    <>
      <Autocomplete
        onChange={handleValueChange}
        multiple
        placeholder={placeholder}
        options={data?.results ?? data?.data ?? []}
        getOptionLabel={(option: any) => option?.name ?? ''}
        renderOption={(props, option, { selected }) => (
          <Box component="li" {...props} key={option.id}>
            {option.name}
          </Box>
        )}
        renderInput={({ inputProps, ...rest }) => (
          <TextField
            placeholder={placeholder}
            {...rest}
            sx={{
              label: { fontSize: '14px' }
            }}
            inputProps={{
              ...inputProps
            }}
          />
        )}
        value={selectedValue ?? []}
        onInputChange={onInputChange}
      />
    </>
  );
};

export default TagsAutoComplete;
