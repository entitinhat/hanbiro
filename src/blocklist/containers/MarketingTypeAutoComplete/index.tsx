import AutoCompleteCustom from '@base/components/@hanbiro/AutocompleteCustom';
import Autocomplete from '@base/components/@hanbiro/Autocomplete';
import { LabelValue } from '@base/types/app';
import { KeyValue } from '@base/types/common';
import { MARKETING_TYPE_OPTIONS } from '@blocklist/config/constants';
import { SelectChangeEvent } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@base/assets/icons/svg-icons';

interface MarketingTypeProps {
  value?: string | number;
  onChange?: (val: KeyValue) => void;
}

function MarketingTypeAutoComplete(props: MarketingTypeProps) {
  const { value, onChange } = props;

  const handleChange = (value: any) => {
    const newValue: string = value?.value;
    const newSelected: KeyValue = {
      id: newValue,
      name: MARKETING_TYPE_OPTIONS?.find((v: LabelValue) => v.value === newValue)?.label
    };
    // setSelected(newValue);
    onChange && onChange(newSelected);
  };

  return <AutoCompleteCustom sx={{ width: '100%' }} defaultIconIndicator options={MARKETING_TYPE_OPTIONS} onChange={handleChange} />;
}

export default MarketingTypeAutoComplete;
