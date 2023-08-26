import { LocalizationProvider } from '@mui/x-date-pickers';
import { Grid, SxProps, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useEffect, useState } from 'react';
import { parseStrTimeToDate } from './TimeRangePicker/utils';
import { isEqual } from 'lodash';
import { DesktopDatePicker } from '@mui/lab';
import { convertDateFormat } from '@base/utils/helpers/dateUtils';
import MuiTimePicker2 from './TimePicker2';
import DateTimePicker from './DateTimePicker';
import DatePicker from './DatePicker';
interface DateTimePickerProps {
  value: string; //format 'hh:mm'
  onChange: (time: Date) => void;
  sx?: SxProps;
}

const DateTimePicker2 = (props: DateTimePickerProps) => {
  const { onChange, value, sx } = props;
  const [dateTime, setDateTime] = useState<null | Date>(() => {
    if (value) {
      const newDate = new Date(value);
      return newDate;
    }
    return new Date();
  });
  const handleChangeTime = (value: Date) => {
    setDateTime(value);
    onChange(value);
  };
  return (
    <Grid sx={{ ...sx }}  container justifyContent="space-between" flexWrap="nowrap">
      <Grid item xs={6} marginRight={1}>
        <DatePicker
          value={dateTime}
          onChange={(date: any) => {
            if (date) {
              const newDate = new Date(date);
              handleChangeTime(newDate);
              console.log('date timepicker:', date);
            }
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <MuiTimePicker2
          value={dateTime}
          fullWidth={true}
          onChange={(time: any) => {
            if (time) {
              const newTime = new Date(time);
              handleChangeTime(newTime);
              console.log('date timepicker time:', newTime);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DateTimePicker2;
