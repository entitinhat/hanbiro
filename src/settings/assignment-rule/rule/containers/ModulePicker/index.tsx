import { useOrg } from '@base/hooks/iam/useOrg';
import { ProductType } from '@base/types/iam';
import { MenuItem, Select, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AssignmentTypeOptions } from '../../config/constants';

interface ModulePickerProps {
  value: string;
  onChange: (value: string) => void;
}
const ModulePicker = (props: ModulePickerProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const { productType } = useOrg();

  const theme = useTheme();
  const handleChange = (val: string) => {
    onChange && onChange(val);
  };
  return (
    <Select
      disabled={productType === ProductType.DESK}
      sx={{
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: theme.palette.text.primary
        },
        '& .Mui-disabled': {
          backgroundColor: theme.palette.secondary.lighter
        }
      }}
      displayEmpty
      value={productType === ProductType.DESK ? 'AR_MODULE_DESK' : value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {AssignmentTypeOptions.map((_option: any) => {
        return (
          <MenuItem
            key={_option.value}
            value={_option.value}
          >
            {t(_option.label)}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default ModulePicker;
