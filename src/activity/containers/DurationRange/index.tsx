import Icon from '@base/assets/icons/svg-icons';
import { DurationOptions, parseDurationValueToSecond, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { Box, TextField } from '@mui/material';
import { useCallback } from 'react';
import AutoCompleteCustom from '@base/components/@hanbiro/Autocomplete/';

interface DurationRangeCustomProps {
  options?: LabelValue[];
  value: { [index: string]: DurationValue };
  onChange: (params: any) => void;
}

const DurationRangeCustom = (props: DurationRangeCustomProps) => {
  const { value, onChange, options } = props;
  const termsOptions = options ?? DurationOptions;

  const onHandleChangeInput = useCallback(
    (from: string, duration: number) => {
      const newValue = {
        durationUnit: value?.[from]?.durationUnit ?? 'UNIT_DAY',
        duration: parseDurationValueToSecond({
          duration: duration,
          durationUnit: value?.[from]?.durationUnit ?? 'UNIT_DAY'
        })
      };
      onChange && onChange({ ...value, ...{ [from]: newValue } });
    },
    [value]
  );

  const onHandleChangeSelect = useCallback(
    (from: string, unit: LabelValue) => {
      if (unit.value == value?.[from]?.durationUnit) {
        return;
      }
      const duration = +parseDurationValueToString(value?.[from], false);
      const newValue = {
        durationUnit: unit.value,
        duration: parseDurationValueToSecond({
          duration: duration * 1,
          durationUnit: unit.value as string
        })
      };
      onChange && onChange({ ...value, ...{ [from]: newValue } });
    },
    [value]
  );

  const fromDuration = +parseDurationValueToString(value?.['from'], false);
  const fromDurationUnit = termsOptions.find((_item) => _item.value === value?.['from']?.durationUnit);
  const toDuration = +parseDurationValueToString(value?.['to'], false);
  const toDurationUnit = termsOptions.find((_item) => _item.value === value?.['to']?.durationUnit);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          value={fromDuration}
          onChange={(val: any) => onHandleChangeInput('from', val.target.value)}
          sx={{ width: 100 }}
          type="number"
        />
        <AutoCompleteCustom
          value={fromDurationUnit}
          onChange={(val: LabelValue) => onHandleChangeSelect('from', val)}
          sx={{ width: 100 }}
          iconIndicator={Icon('down')}
          options={termsOptions}
          disabled={true}
        />
      </Box>
      ~
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          value={toDuration}
          onChange={(val: any) => onHandleChangeInput('to', val.target.value)}
          sx={{ width: 100 }}
          type="number"
        />
        <AutoCompleteCustom
          value={toDurationUnit}
          onChange={(val: LabelValue) => onHandleChangeSelect('to', val)}
          sx={{ width: 100 }}
          iconIndicator={Icon('down')}
          options={termsOptions}
          disabled={true}
        />
      </Box>
    </Box>
  );
};

export default DurationRangeCustom;
