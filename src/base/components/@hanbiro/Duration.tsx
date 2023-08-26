import React, { useCallback, useMemo } from 'react';
import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { DurationOptions, parseDurationValueToString, parseDurationValueToSecond } from '@base/utils/helpers/dateUtils';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Select, SelectChangeEvent, Grid, TextField } from '@mui/material';
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

const Duration = (props: DurationProps) => {
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
    <Grid container alignItems="center" spacing={0.5}>
      <Grid item xs={5} lg={5}>
        <TextField
          size={size}
          id="duration-number"
          type={'number'}
          value={duration}
          onChange={(e: any) => handleChangeInput(e.target.value.trim())}
        />
      </Grid>
      <Grid item xs={7} lg={7}>
        <Select
          size={size}
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'data source select' }}
          value={durationUnit.value.toString()}
          onChange={handleChangeSelect}
          MenuProps={MenuProps}
          // endAdornment={
          //   <IconButton sx={{ visibility: durationUnit ? "visible" : "hidden", mr: 2 }} onClick={handleClear}>
          //     <Clear color="error" fontSize="small" />
          //   </IconButton>
          // }
        >
          {termsOptions.map((_option: any) => {
            return (
              <MenuItem key={_option.value} value={_option.value} style={{ fontWeight: theme.typography.fontWeightRegular }}>
                {t(_option.label)}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Duration;
