import SpanLang from '@base/components/@hanbiro/SpanLang';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

interface SKUAutocompleteAttributeProps {
  type: string;
  value?: any;
  single?: boolean;
  options?: any;
  onChange?: (type: string, nData: any) => void;
  sx?: any;
}

const SKUAutocompleteAttribute = (props: SKUAutocompleteAttributeProps) => {
  const { type, value, single = true, options, onChange, sx } = props;

  const [valueSelected, setValueSelected] = useState<any>(value);

  const handleSelectAttribute = (valueSelect: any) => {
    setValueSelected(valueSelect);
    onChange && onChange(type, valueSelect);
  };

  return (
    <FormControl sx={{ minWidth: 120, ...sx }} fullWidth>
      <Select
        value={valueSelected?.value}
        onChange={(event: SelectChangeEvent) => {
          const selectedValue = event.target.value as string;
          const newOption = options?.find((_ele: any) => _ele.value === selectedValue);
          if (newOption !== undefined) {
            handleSelectAttribute(newOption);
          }
        }}
        displayEmpty
        inputProps={{ 'aria-label': 'Select a option' }}
      >
        <MenuItem value="">
          <em>
            <SpanLang keyLang="ncrm_common_select_option_placeholder" />
          </em>
        </MenuItem>
        {options?.map((option: any, index: number) => (
          <MenuItem key={index} value={option?.value}>
            <SpanLang keyLang={option?.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SKUAutocompleteAttribute;
