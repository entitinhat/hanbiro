import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
//import { isEqual } from 'lodash';
import NumberField from '@base/components/@hanbiro/NumberField';
import { SizeProps } from '@base/types/extended';

interface DateRangePickerProps {
  size?: SizeProps;
  type: 'number' | 'money';
  customLabelStart?: string;
  customLabelEnd?: string;
  prefix?: string;
  thousandSeparator?: string | boolean;
  value: any;
  onChange: (val: any) => void;
}

const NumberRangeField = (props: DateRangePickerProps) => {
  const { size = 'md', type = 'number', prefix, thousandSeparator, customLabelStart, customLabelEnd, value, onChange, ...others } = props;
  //state
  const [curValue, setCurValue] = useState<any>({ from: 0, to: 0 });

  //init cur value
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(curValue)) {
        setCurValue(value);
      }
    } else {
      setCurValue({ from: 0, to: 0 });
    }
  }, [value]);

  //value change
  const handleValueChange = (keyName: string, keyValue: string) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  //console.log('time crrValue', crrValue);
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} lg={size === 'xs' ? 12 : 5.5}>
        <Stack direction={'row'} spacing={2} alignItems="center">
          <InputLabel sx={{ minWidth: '35px' }}>{customLabelStart ? customLabelStart : 'From'}</InputLabel>
          {type === 'number' && (
            <TextField
              fullWidth
              type="number"
              InputProps={{
                endAdornment: prefix
              }}
              value={curValue.from}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('from', e.target.value)}
            />
          )}
          {type === 'money' && (
            <NumberField
              {...others}
              prefix={prefix}
              thousandSeparator={thousandSeparator}
              value={curValue.from}
              onChange={(val: string | number) => handleValueChange('from', val.toString())}
            />
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} lg={size === 'xs' ? 12 : 1}>
        <Typography variant="h6" textAlign="center">
          ~
        </Typography>
      </Grid>
      <Grid item xs={12} lg={size === 'xs' ? 12 : 5.5}>
        <Stack direction={'row'} spacing={2} alignItems="center">
          <InputLabel sx={{ minWidth: '35px' }}>{customLabelEnd ? customLabelEnd : 'To'}</InputLabel>
          {type === 'number' && (
            <TextField
              fullWidth
              type="number"
              InputProps={{
                endAdornment: prefix
              }}
              value={curValue.to}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('to', e.target.value)}
            />
          )}
          {type === 'money' && (
            <NumberField
              {...others}
              prefix={prefix}
              thousandSeparator={thousandSeparator}
              value={curValue.to}
              onChange={(val: string | number) => handleValueChange('to', val.toString())}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NumberRangeField;
