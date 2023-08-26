import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Country } from '@base/types/setting';
import { useRecoilValue } from 'recoil';
import { availableCountrySelector } from '@base/store/selectors/app';
import { useTranslation } from 'react-i18next';

interface CountrySelectProps {
  value: Country | string;
  onChange?: (params?: Country) => void;
}

const CountrySelect = (props: CountrySelectProps) => {
  const { value, onChange } = props;
  const [selected, setSelected] = useState<string>('');
  const { t } = useTranslation();

  const availableCountries: Country[] = useRecoilValue(availableCountrySelector);

  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        if (value != selected) {
          setSelected(value);
        }
      } else {
        if (value.isoCode2 != selected) {
          setSelected(value.isoCode2);
        }
      }
    } else {
      setSelected('');
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    const newValue = availableCountries?.find((v: Country) => v.isoCode2 == event.target.value);
    onChange && onChange(newValue);
  };

  return (
    <Select fullWidth displayEmpty value={selected || ''} onChange={handleChange}>
      <MenuItem value="" disabled>
        <em>{t('ncrm_common_select_placeholder')}</em>
      </MenuItem>
      {availableCountries?.map((country: Country, index: number) => (
        <MenuItem key={index} value={country?.isoCode2}>
          {country?.country}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CountrySelect;
