import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { parseStrTimeToDate } from './TimeRangePicker/utils';
import { isEqual } from 'lodash';
import dayjs from 'dayjs';

interface MuiTimePickerProps {
  value: string; //format 'hh:mm'
  label?:string;
  onChange: (time: string) => void;
  size?: 'small' | 'medium';
}

const MuiTimePicker = (props: MuiTimePickerProps) => {
  const { value, onChange, size = 'medium', label } = props;
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
      if (value !== '') {
        const inputValue = parseStrTimeToDate(value);
        if (!isEqual(inputValue, crrValue)) {
          setCrrValue(inputValue);
        }
      } else {
        initValue();
      }
    } else {
      initValue();
    }
  }, [value]);

  //value change
  const handleChangeTime = (_value: Date | null) => {
    if (_value) {
      setCrrValue(_value);
      //callback
      const newTimeData = `${_value.getHours()}:${_value.getMinutes()}`;
      onChange && onChange(newTimeData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={crrValue || null}  //format: Date | null
        onChange={(date: Date | null) => handleChangeTime(date)}
        renderInput={(params: any) => <TextField size={size} {...params} />}
      />
    </LocalizationProvider>
  );
};

export default MuiTimePicker;
