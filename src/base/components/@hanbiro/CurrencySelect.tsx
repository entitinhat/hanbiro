import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector, usedCurrenciesSelector } from '@base/store/selectors/app';
import { Currency } from '@base/types/common';

interface CurrencySelectProps {
  value: string | Currency;
  onChange?: (params: Currency) => void;
  disabled?: boolean;
}

const CurrencySelect = (props: CurrencySelectProps) => {
  const { value, onChange, disabled = false } = props;

  const [selected, setSelected] = useState<string>('');

  const currencies: Currency[] = useRecoilValue(usedCurrenciesSelector);
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);

  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        if (value != selected) {
          setSelected(value);
        }
      } else {
        if (value?.code != selected) {
          setSelected(value?.code || '');
        }
      }
    } else {
      setSelected(defaultCurrency?.code || '');
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    const newValue = currencies?.find((v: Currency) => v.code == event.target.value);
    console.log('...CURRENCY.ONCHANGE...', newValue);
    onChange && onChange(newValue as Currency);
  };

  return (
    <Select fullWidth value={selected} disabled={disabled} onChange={handleChange}>
      {currencies?.map((item: Currency, index: number) => (
        <MenuItem key={index} value={item?.code}>
          {`${item?.code} (${item?.currencySymbol})`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelect;
