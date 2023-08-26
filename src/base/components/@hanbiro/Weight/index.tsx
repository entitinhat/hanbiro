import React, { useEffect, useState } from 'react';

import { Grid, MenuItem, Select, SelectChangeEvent, TextField, useTheme } from '@mui/material';
import { LabelValue } from '@base/types/app';
import { WEIGHT_UNIT_OPTIONS } from '@base/config/constant';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';

interface WeightProps {
  value?: any;
  onChange?: (val?: any) => void;
}

const Weight = (props: WeightProps) => {
  const { value, onChange } = props;

  const theme = useTheme();

  const [number, setNumber] = useState<number>(0);
  const [option, setOption] = useState<string>('');

  // GET setting
  const params = {
    menu: 'product',
    key: 'item_measurement'
  };
  const { data: dimensionConfig } = useMenuSetting(params);

  useEffect(() => {
    if (value && value?.val) {
      setNumber(value.val as number);
    }
    if (value && value?.unit) {
      const idx = WEIGHT_UNIT_OPTIONS.findIndex((el: LabelValue) => el.value === value?.unit);
      if (idx > -1) {
        setOption(WEIGHT_UNIT_OPTIONS?.[idx]?.value as string);
      }
    } else {
      if (dimensionConfig) {
        const valueConfig = JSON.parse(dimensionConfig?.value);
        setOption(
          (WEIGHT_UNIT_OPTIONS?.find((v: LabelValue) => v.value === valueConfig.weight)?.value as string) ??
            (WEIGHT_UNIT_OPTIONS[0]?.value as string)
        );
      }
    }
  }, [value, dimensionConfig]);

  const handleNumberChange = (val: string) => {
    setNumber(parseInt(val));
    onChange && onChange({ val: parseInt(val), unit: option });
  };

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    onChange && onChange({ val: number, unit: event.target.value });
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
          {WEIGHT_UNIT_OPTIONS?.map((_option: LabelValue) => {
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

export default Weight;
