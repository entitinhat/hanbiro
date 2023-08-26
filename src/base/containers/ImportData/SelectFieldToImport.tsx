import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OptionValue } from '@base/types/common';
import { MenuItem, Select, SelectChangeEvent, SxProps } from '@mui/material';

interface SelectFieldToImportProps {
  value: any;
  options: any[];
  onChange: (val: any) => void;
  size?: 'small' | 'medium' | undefined;
  sx?: SxProps;
  useLang?: boolean;
  disablePortal?: boolean;
  row?: any;
}

const SelectFieldToImport = (props: SelectFieldToImportProps) => {
  const { value, onChange, options, size, sx, row, disablePortal = false, useLang = true } = props;
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(value?.keyName ?? '');

  useEffect(() => {
    if (value) {
      if (value.keyName !== selectedValue) {
        setSelectedValue(value.keyName);
      }
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      if (value.label === row.label || value.label === row.labelTo) {
        onChange && onChange(value);
      }
    }
  }, [value]);

  // value change
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    // callback
    const foundItem = options.find((v) => v.keyName == newValue) as OptionValue;
    onChange && onChange(foundItem);
  };

  return (
    <Select
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'select' }}
      size={size}
      sx={sx}
      value={selectedValue}
      MenuProps={{ disablePortal: disablePortal }} // If you use ClickAwayListener and don't have this option(true), It will run event of onClickAway
      onChange={(e: SelectChangeEvent) => {
        const selected = e.target.value as string;
        handleValueChange(selected);
      }}
    >
      {options.map((option: any) => {
        return (
          <MenuItem key={option.keyName} value={option.keyName}>
            {useLang ? t(option.label) : option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectFieldToImport;
