import { LabelValue } from '@base/types/app';
import { KeyValue } from '@base/types/common';
import { MARKETING_STATUS_OPTIONS } from '@marketing-list/config/constants';
import { Autocomplete, CircularProgress, SelectChangeEvent, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@base/assets/icons/svg-icons';
import AutoCompleteCustom from '@base/components/@hanbiro/AutocompleteCustom';

interface ActiveAutoCompleteProps {
  value?: boolean;
  onChange?: (val: KeyValue) => void;
  placeholder?: string;
}

function ActiveAutoComplete(props: ActiveAutoCompleteProps) {
  const { value, onChange, placeholder = 'Type or click to select a status' } = props;
  const { t } = useTranslation();

  const handleChange = (value: any) => {
    onChange && onChange(value.value);
  };

  return (
    <AutoCompleteCustom
      sx={{ width: '100%' }}
      options={MARKETING_STATUS_OPTIONS}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      iconIndicator={Icon('down')}
      defaultIconIndicator
    />
  );
}

export default ActiveAutoComplete;
