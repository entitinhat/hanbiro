import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { dateRangeIncludeCustomOptions } from '@base/config/options';
import { EDateRangeType } from '@base/types/app';
import Dropdown, { DropdownProps as BaseDropdownProps, LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import { keys } from 'lodash';
import { Theme } from '@mui/material/styles';
import DateRangePicker, { RangeDate } from '@base/components/@hanbiro/Date/DateRangePicker';
import { dateRangeDate } from '@base/utils/helpers/dateUtils';

interface DropdownProps extends Partial<BaseDropdownProps> {}

export interface DateRangeProps {
  key?: string;
  defaultRangeTypeKey?: EDateRangeType;
  disableCustomize?: boolean;
  onChange?: (s: string, e: string) => void;
  dropdownProps?: DropdownProps;
}

const periodOptions = keys(dateRangeIncludeCustomOptions).map((k) => {
  return {
    label: dateRangeIncludeCustomOptions[k],
    value: k
  };
});

const dropdownSx = {
  m: 0,
  '& .MuiButton-root': {
    justifyContent: 'space-between',
    px: '10px'
  },
  border: (theme: Theme) => `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '4px'
};

const DateRange = (props: DateRangeProps) => {
  const { dropdownProps, defaultRangeTypeKey = EDateRangeType.DATE_RANGE_THIS_MONTH, onChange, disableCustomize = false } = props;

  const defaultSelectedValue = periodOptions.find((v: any) => v.value === defaultRangeTypeKey);

  const [selected, setSelected] = useState<LabelValueIcon>(defaultSelectedValue ?? { label: '', value: '' });
  const [range, setRange] = useState<RangeDate>({} as RangeDate);

  useEffect(() => {
    if (!!selected?.value && selected?.value !== EDateRangeType.DATE_RANGE_CUSTOM) {
      const rangeDate = dateRangeDate(selected.value as EDateRangeType);
      setRange(rangeDate);
    }
  }, [selected]);

  const handleOnDropdownChange = (v: LabelValueIcon) => {
    setSelected(v);
  };

  useEffect(() => {
    if(!!range?.startDate && !!range?.endDate){
      const { startDate, endDate } = range;
      onChange && onChange(startDate?.toISOString() ?? '', endDate?.toISOString() ?? '');
    }
  }, [range]);

  return !disableCustomize ? (
    <Stack direction="row" alignItems="center" spacing={2}>
      <DateRangePicker
        startDate={range.startDate}
        endDate={range.endDate}
        dateFormat="YYYY/MM/DD"
        rangeSplitter="~"
        onChange={(startDate, endDate) => setRange({ startDate, endDate })}
        disabled={selected?.value !== EDateRangeType.DATE_RANGE_CUSTOM}
      />
      <Dropdown
        title={selected.label}
        items={
          disableCustomize
            ? periodOptions.filter((v) => {
                return v.value !== EDateRangeType.DATE_RANGE_CUSTOM;
              })
            : periodOptions
        }
        disabledValues={[selected.value]}
        popperProps={{ disablePortal: false }}
        onChange={handleOnDropdownChange}
        sx={dropdownSx}
        {...dropdownProps}
      />
    </Stack>
  ) : (
    <Dropdown
      title={selected.label}
      items={
        disableCustomize
          ? periodOptions.filter((v) => {
              return v.value !== EDateRangeType.DATE_RANGE_CUSTOM;
            })
          : periodOptions
      }
      disabledValues={[selected.value]}
      popperProps={{ disablePortal: false }}
      onChange={handleOnDropdownChange}
      sx={dropdownSx}
      {...dropdownProps}
    />
  );
};

export default DateRange;
