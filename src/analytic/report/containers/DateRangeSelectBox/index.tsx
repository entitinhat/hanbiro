import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionValue } from '@base/types/common';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { keys } from 'lodash';
import { dateRangeOptions } from '@base/config/options';

interface DateRangeSelectBoxProps {
  value: string;
  onChange?: (val: string) => void;
}

const DateRangeSelectBox = (props: DateRangeSelectBoxProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(value ?? '');
  const options: any[] = keys(dateRangeOptions).map((k) => {
    return {
      languageKey: dateRangeOptions[k],
      keyName: k
    };
  });

  useEffect(() => {
    if (value) {
      if (value !== selectedValue) {
        setSelectedValue(value);
      }
    }
  }, [value]);

  // value change
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    // callback
    const foundItem: any = (options.find((v) => v.keyName == newValue) as OptionValue).keyName;
    onChange && onChange(foundItem);
  };

  return (
    <Select
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'select' }}
      value={selectedValue}
      onChange={(e: SelectChangeEvent) => {
        const selected = e.target.value as string;
        handleValueChange(selected);
      }}
    >
      {options.map((_option: OptionValue) => {
        return (
          <MenuItem key={_option.keyName} value={_option.keyName}>
            {t(_option.languageKey)}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DateRangeSelectBox;
