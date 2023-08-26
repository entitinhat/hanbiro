import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { SxProps, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { convertDateFormat } from '@base/utils/helpers/dateUtils';
//import dayjs from 'dayjs';

interface DatePickerProps {
  inputFormat?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  minDate?: any; // set minDate for schedule can not select day in past
  fullWidth?: boolean;
  inputSx?: SxProps;
}

const DatePicker = (props: DatePickerProps) => {
  const { inputFormat = 'MM/DD/YYYY', value, onChange, disabled, size = 'medium', minDate, fullWidth = true, inputSx } = props;

  // date format from setting
  const dateFormat = window?.dateFormat?.dateFormat || inputFormat;
  console.log('dateFormat', dateFormat, value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        //label="Date Desktop"
        inputFormat={convertDateFormat(dateFormat)}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField size={size} fullWidth={fullWidth} sx={{ ...inputSx }} {...params} />}
        disabled={disabled}
        minDate={minDate}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
