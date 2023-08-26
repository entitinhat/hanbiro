import React, { useEffect, useState } from 'react';

import { Grid, MenuItem, Select, SelectChangeEvent, TextField, useTheme } from '@mui/material';
import { LabelValue } from '@base/types/app';
import { WARRANTY_PERIOD_OPTIONS } from '@base/config/constant';

interface WarrantyPeriodProps {
  value?: any;
  onChange?: (val?: any) => void;
}

const WarrantyPeriod = (props: WarrantyPeriodProps) => {
  const { value, onChange } = props;

  const theme = useTheme();

  const [number, setNumber] = useState<number>(0);
  const [option, setOption] = useState<string>('');

  useEffect(() => {
    if (value && value?.period) {
      setNumber(value.period as number);
    }
    if (value && value?.unit) {
      const idx = WARRANTY_PERIOD_OPTIONS.findIndex((el: LabelValue) => el.value === value?.unit);
      if (idx > -1) {
        setOption(WARRANTY_PERIOD_OPTIONS?.[idx]?.value as string);
      }
    } else {
      setOption(WARRANTY_PERIOD_OPTIONS?.[0]?.value as string);
    }
  }, [value]);

  const handleNumberChange = (val: string) => {
    setNumber(parseInt(val));
    onChange && onChange({ period: parseInt(val), unit: option });
  };

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    onChange && onChange({ period: number, unit: event.target.value });
  };

  return (
    <Grid container alignItems="center" spacing={0.5}>
      <Grid item xs={5} lg={5}>
        <TextField
          id="duration-number"
          type={'number'}
          value={number}
          onChange={(e: any) => handleNumberChange(e.target.value.trim())}
          inputProps={{
            min: 0
          }}
        />
      </Grid>
      <Grid item xs={7} lg={7}>
        <Select fullWidth displayEmpty inputProps={{ 'aria-label': '' }} value={option} onChange={handleOptionChange}>
          {WARRANTY_PERIOD_OPTIONS?.map((_option: LabelValue) => {
            return (
              <MenuItem key={_option.value} value={_option.value} style={{ fontWeight: theme.typography.fontWeightRegular }}>
                {_option.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};

export default WarrantyPeriod;
