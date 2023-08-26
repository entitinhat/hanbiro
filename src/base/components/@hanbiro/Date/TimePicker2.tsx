import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { parseStrTimeToDate } from './TimeRangePicker/utils';
import { isEqual } from 'lodash';
import dayjs from 'dayjs';

interface MuiTimePickerProps {
  value: Date | null; //format 'hh:mm'
  label?: string;
  onChange: (time: Date) => void;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

const MuiTimePicker = (props: MuiTimePickerProps) => {
  const { value, onChange, size = 'medium', label, fullWidth = true } = props;
  //state
  const [crrValue, setCrrValue] = useState<Date | null>(null);

  //init
  useEffect(() => {
    function initValue() {
      if (crrValue === null) {
        setCrrValue(parseStrTimeToDate('00:00'));
      }
    }
    if (value) {
      if (!isEqual(value, crrValue)) {
        setCrrValue(value);
      }
    } else {
      initValue();
    }
  }, [value]);

  //value change
  const handleChangeTime = (_value: Date | null) => {
    if (_value) {
      setCrrValue(_value);
      const newDate = new Date(_value);
      //callback
      // const newTimeData = `${newDate.getHours()}:${newDate.getMinutes()}`;
      onChange && onChange(newDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={crrValue || null} //format: Date | null
        onChange={(date: Date | null) => handleChangeTime(date)}
        renderInput={(params: any) => <TextField fullWidth size={size} {...params} />}
      />
    </LocalizationProvider>
  );
};

export default MuiTimePicker;
