import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DateTimePickerProps {
  inputFormat?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const { inputFormat = 'MM/DD/YYYY HH:mm', value, onChange, disabled, size = 'medium' } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        //label="Date Desktop"
        inputFormat={inputFormat}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField size={size} fullWidth={true} {...params} />}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
