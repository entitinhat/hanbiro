import _ from 'lodash';
import { FormControlLabel, Switch as MuiSwitch, SxProps } from '@mui/material';
import SpanLang from './SpanLang';

interface MuiCheckboxProps {
  label?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom' | undefined;
  value?: boolean;
  onChange?: (val: boolean) => void;
  disabled?: boolean;
  sx?: SxProps;
}

const Switch = ({ label, labelPlacement, value = false, onChange, disabled = false, sx }: MuiCheckboxProps) => {
  console.log('...Switch...', value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ ml: 0, ...sx }}
      control={<MuiSwitch checked={value} onChange={handleChange} size="small" />}
      label={<SpanLang keyLang={label ?? ''} textOnly />}
      labelPlacement={labelPlacement}
      disabled={disabled}
    />
  );
};

export default Switch;
