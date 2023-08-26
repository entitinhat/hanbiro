import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OptionValue } from '@base/types/common';
import { IconButton, MenuItem, Select, SelectChangeEvent, SxProps, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';
import SpanLang from '../SpanLang';

interface SelectBoxProps {
  value: OptionValue | undefined;
  options: OptionValue[];
  onChange: (val: OptionValue) => void;
  size?: 'small' | 'medium' | undefined;
  sx?: SxProps;
  useLang?: boolean;
  disablePortal?: boolean;
  useClear?: boolean;
  placeholder?: string;
}

const SelectBox = (props: SelectBoxProps) => {
  const {
    value,
    onChange,
    options,
    size,
    sx,
    disablePortal = false,
    useLang = true,
    useClear = false,
    placeholder = 'ncrm_common_select_option_placeholder'
  } = props;
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(value?.keyName ?? '');

  useEffect(() => {
    if (value) {
      if (value.keyName !== selectedValue) {
        setSelectedValue(value.keyName);
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

  const onClearValue = () => {
    setSelectedValue('');
    onChange && onChange({ keyName: '', languageKey: '' });
  };

  return (
    <Select
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'select' }}
      size={size}
      value={selectedValue}
      MenuProps={{
        disablePortal: disablePortal // If you use ClickAwayListener and don't have this option(true), It will run event of onClickAway
      }}
      sx={{
        ...sx,
        '& .MuiSelect-iconOutlined': { display: useClear && selectedValue ? 'none' : '' },
        '&.Mui-focused .MuiIconButton-root': { color: 'primary.main' }
      }}
      renderValue={(value) => {
        return value ? (
          <SpanLang keyLang={options.find((v) => v.keyName == value)?.languageKey || ''} textOnly />
        ) : (
          <Typography color={'secondary'}>{t(placeholder)}</Typography>
        );
      }} // render langkey on view
      endAdornment={
        useClear && selectedValue ? (
          <IconButton size="small" sx={{ visibility: selectedValue ? 'visible' : 'hidden' }} onClick={onClearValue}>
            <Clear sx={{ fontSize: 18 }} />
          </IconButton>
        ) : (
          false
        )
      }
      onChange={(e: SelectChangeEvent<string>) => {
        const selected = e.target.value;
        handleValueChange(selected);
      }}
    >
      {options.map((_option: OptionValue, _index: number) => {
        return (
          <MenuItem key={_index} value={_option.keyName}>
            <SpanLang keyLang={_option.languageKey} textOnly />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectBox;
