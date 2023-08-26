import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//material
import {
    Autocomplete,
    TextField,
    Box
  } from '@mui/material';

import { LabelValue } from '@base/types/app';
import { KeyValue } from '@base/types/common';
import { LEAD_TYPE_OPTIONS } from '@lead/config/constants';

interface TypeAutoCompleteProps {
  value?: LabelValue ;
  onChange?: (val: KeyValue) => void;
  placeholder?: string;
}

function TypeAutoComplete(props: TypeAutoCompleteProps) {
  const { value, onChange, placeholder='Type or click to select a type' } = props;
  const { t } = useTranslation()

  const handleChange = (value: any) => {
    console.log('value on change',value);
    
    const newValue: string = value?.value;
    const newSelected: KeyValue = {
      id: newValue,
      name: value?.label
    };
    // setSelected(newValue);
    onChange && onChange(value);
  };

  return <Autocomplete
  id="collection-autocomplete"
  multiple={false}
  isOptionEqualToValue={(option, value) => option == value}
  getOptionLabel={(option) => option.label ?? ''}
  options={LEAD_TYPE_OPTIONS}
  filterSelectedOptions
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder={t(placeholder) as string}
      InputProps={{
        ...params.InputProps,
        endAdornment: <>{params.InputProps.endAdornment}</>
      }}
    />
  )}
  renderOption={(props, option, { selected }) => (
    <Box component="li" {...props} key={option.value}>
      {option.label}
    </Box>
  )}
  value={value}
  onChange={(event, value) => {
    handleChange(value);
  }}
/>
}

export default TypeAutoComplete;