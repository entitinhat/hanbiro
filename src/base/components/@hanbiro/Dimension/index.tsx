import React, { useEffect, useState } from 'react';

import { Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, useTheme } from '@mui/material';
import { LabelValue } from '@base/types/app';
import { DIMENSION_UNIT_OPTIONS } from '@base/config/constant';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';

interface DimensionProps {
  value?: any; // { unit: string, val: { x: number, y: number, z: number } }
  onChange?: (val?: any) => void;
}

const Dimension = (props: DimensionProps) => {
  const { value, onChange } = props;

  const theme = useTheme();

  const [val, setVal] = useState<any>();
  const [option, setOption] = useState<string>('');

  // GET setting
  const params = {
    menu: 'product',
    key: 'item_measurement'
  };
  const { data: config } = useMenuSetting(params);

  useEffect(() => {
    if (value && value?.val) {
      setVal(value.val);
    }
    if (value && value?.unit) {
      const idx = DIMENSION_UNIT_OPTIONS.findIndex((el: LabelValue) => el.value === value?.unit);
      if (idx > -1) {
        setOption(DIMENSION_UNIT_OPTIONS?.[idx]?.value as string);
      }
    } else {
      if (config) {
        const valueConfig = JSON.parse(config?.value);
        setOption(
          (DIMENSION_UNIT_OPTIONS?.find((v: LabelValue) => v.value === valueConfig.dimension)?.value as string) ??
            (DIMENSION_UNIT_OPTIONS[0]?.value as string)
        );
      }
    }
    console.log('...DIMENSION...', value, config);
  }, [value, config]);

  const handleNumberChange = (key: string, v: string) => {
    const newVal = { ...val, [key]: parseInt(v) };
    setVal(newVal);
    onChange && onChange({ val: newVal, unit: option });
  };

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    onChange && onChange({ val, unit: event.target.value });
  };

  return (
    <Grid container alignItems="center" spacing={0.5}>
      <Grid item xs={8} lg={8}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TextField
                fullWidth
                placeholder="X"
                type={'number'}
                autoFocus
                value={val?.x || ''}
                onChange={(e: any) => handleNumberChange('x', e.target.value.trim())}
                inputProps={{
                  min: 0
                }}
              />
              <Typography>x</Typography>
              <TextField
                fullWidth
                placeholder="Y"
                type={'number'}
                value={val?.y || ''}
                onChange={(e: any) => handleNumberChange('y', e.target.value.trim())}
                inputProps={{
                  min: 0
                }}
              />
              <Typography>x</Typography>
              <TextField
                fullWidth
                placeholder="Z"
                type={'number'}
                value={val?.z || ''}
                onChange={(e: any) => handleNumberChange('z', e.target.value.trim())}
                inputProps={{
                  min: 0
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} lg={4}>
        <Select fullWidth displayEmpty inputProps={{ 'aria-label': '' }} value={option} onChange={handleOptionChange}>
          {DIMENSION_UNIT_OPTIONS?.map((_option: LabelValue) => {
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

export default Dimension;
