import React, { useCallback, useMemo } from 'react';
import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { DurationOptions, parseDurationValueToString, parseDurationValueToSecond } from '@base/utils/helpers/dateUtils';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Select, SelectChangeEvent, Grid, TextField, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 250
    }
  }
};

interface DurationProps {
  size?: 'small' | 'medium' | undefined;
  options?: LabelValue[];
  value: DurationValue;
  onChange: (params: DurationValue) => void;
}

const DurationSelect = (props: DurationProps) => {
  const { value = { duration: 1, durationUnit: 'UNIT_DAY' }, onChange, options, size = 'medium' } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const termsOptions = options ?? DurationOptions;

  const durationUnit = useMemo(() => {
    return termsOptions.find((duration) => duration.value == value.durationUnit)!!;
  }, [value.durationUnit]);

  const duration = useMemo(() => parseDurationValueToString(value, false), [value]);

  const handleChangeInput = useCallback(
    (duration: number) => {
      const newUnit = value.durationUnit;
      const newValue = {
        durationUnit: newUnit,
        duration: parseDurationValueToSecond({
          duration: duration,
          durationUnit: newUnit
        })
      };
      onChange && onChange(newValue);
    },
    [value, onChange]
  );

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const newDurationValue = event.target.value as string;
    let newValue = {
      durationUnit: newDurationValue,
      duration: parseDurationValueToSecond({
        duration: Number(duration),
        durationUnit: newDurationValue
      })
    };
    onChange && onChange(newValue);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        {' '}
        <TextField
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              paddingRight: 0
            }
          }}
          size="medium"
          id="duration-number"
          type={'number'}
          value={duration}
          onChange={(e: any) => handleChangeInput(e.target.value.trim())}
          placeholder="Type text"
          InputProps={{
            endAdornment: (
              <InputAdornment
                sx={{
                  padding: '20px 0',
                  backgroundColor: (theme) => theme.palette.divider,
                  borderTopRightRadius: (theme) => theme.shape.borderRadius + 'px',
                  borderBottomRightRadius: (theme) => theme.shape.borderRadius + 'px',
                  marginLeft: 'auto',
                  marginRight: 0, // remove right space
                  border: 0,
                  '&:focus': {
                    border: 0,
                    boxShadow: 'none'
                  }
                }}
                position="end"
              >
                <Select
                  sx={{
                    color: (theme) => theme.palette.secondary.main,
                    boxShadow: 'none',
                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                    border: 0,
                    '&.Mui-focused': {
                      // outline: 'none',
                      boxShadow: 'none !important',
                      border: 'unset !important',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 }
                    },
                    '& fieldset': {
                      border: '0 !important',
                      boxShadow: 'unset !important',
                      '&.Mui-focused': {
                        border: '0 !important',
                        boxShadow: 'unset !important'
                      }
                    }
                  }}
                  size="small"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={durationUnit.value.toString()}
                  onChange={handleChangeSelect}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  {termsOptions.map((_option: any) => {
                    return (
                      <MenuItem key={_option.value} value={_option.value} style={{ fontWeight: theme.typography.fontWeightRegular }}>
                        {t(_option.label)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DurationSelect;
