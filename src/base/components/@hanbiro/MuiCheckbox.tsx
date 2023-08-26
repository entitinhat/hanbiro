import { FormControlLabel, Checkbox, SxProps } from '@mui/material';
import SpanLang from './SpanLang';

interface MuiCheckboxProps {
  label?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom' | undefined;
  value: boolean;
  onChange?: (val: boolean) => void;
  disabled?: boolean;
  sx?: SxProps;
}

const MuiCheckbox = ({ label, labelPlacement, value, onChange, disabled = false, sx }: MuiCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ ml: 0, ...sx }}
      control={<Checkbox checked={value} onChange={handleChange} />}
      label={<SpanLang keyLang={label ?? ''} textOnly />}
      labelPlacement={labelPlacement}
      disabled={disabled}
    />
  );
};

export default MuiCheckbox;
