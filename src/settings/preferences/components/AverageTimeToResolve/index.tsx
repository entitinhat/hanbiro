import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { parseDurationValueToSecond, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DURATION_OPTIONS } from '@settings/preferences/config/constants';
import { useCallback, useMemo } from 'react';
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

interface AverageTimeToResolveProps {
  value: DurationValue;
  options?: LabelValue[];
  onChange: (value: DurationValue) => void;
}

const AverageTimeToResolve = (props: AverageTimeToResolveProps) => {
  const { value = { duration: 1, durationUnit: 'UNIT_DAY' }, onChange, options } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const termsOptions = options ?? (DURATION_OPTIONS as LabelValue[]);

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
      <Grid item xs={5}>
        <TextField
          // id="duration-number"
          type={'number'}
          value={duration}
          onChange={(e: any) => handleChangeInput(e.target.value.trim())}
          sx={{ '& .MuiInputBase-root': { minHeight: '45px' } }}
        />
      </Grid>
      <Grid item xs={7}>
        <Select
          fullWidth
          displayEmpty
          inputProps={{ 'aria-label': 'data source select' }}
          value={durationUnit.value.toString()}
          onChange={handleChangeSelect}
          MenuProps={MenuProps}
          sx={{ minHeight: '45px' }}
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

export default AverageTimeToResolve;
