import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, Select, SelectChangeEvent, SxProps } from '@mui/material';
import Flag from 'react-world-flags';
import { LANGUAGES } from '@base/config/constant';
import { LanguageValue } from '@base/types/app';
import _ from 'lodash';

interface LangSelectProps {
  sx?: SxProps;
  value?: string | LanguageValue;
  onChange?: (nVal?: LanguageValue) => void;
  disabledValues?: string[];
}

const LangSelect = (props: LangSelectProps) => {
  const { value, onChange, sx, disabledValues } = props;

  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        if (value !== selectedOption) {
          setSelectedOption(value);
        }
      } else {
        if (value?.value !== selectedOption) {
          setSelectedOption(value?.value as string);
        }
      }
    } else {
      setSelectedOption('');
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    const newOption = LANGUAGES.find((_ele: LanguageValue) => _ele.value === selectedId);
    onChange && onChange(newOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      fullWidth
      sx={{ minWidth: 150, '& > div': { display: 'flex', alignItems: 'center', '& > div': { my: 0 } }, ...sx }}
    >
      {LANGUAGES?.map((lang: LanguageValue, index: number) => {
        return (
          <MenuItem key={index} value={lang?.value} disabled={(disabledValues?.indexOf(lang?.value) as number) >= 0 ? true : false}>
            <Flag code={lang.icon} height={14} width={16} />
            <ListItemText primary={lang?.label} sx={{ pl: 1 }} />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default LangSelect;
