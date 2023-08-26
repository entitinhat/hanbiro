import { StatusFields } from '@activity/config/constants';
import { LabelValue } from '@base/types/app';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ViewProps {
  value: string;
  onChange: (val: string) => void;
}

function StatusEdit(props: ViewProps) {
  const { value, onChange } = props;
  const { t } = useTranslation();
  const statuses = StatusFields({
    todo: 'ncrm_activity_todo',
    doing: 'ncrm_activity_doing',
    hold: 'ncrm_activity_on_hold',
    done: 'ncrm_activity_done',
    cancel: 'ncrm_activity_cancel'
  });
  return (
    <Select
      displayEmpty
      fullWidth
      inputProps={{}}
      value={value}
      onChange={(event: SelectChangeEvent) => {
        onChange && onChange(event.target.value);
      }}
    >
      {statuses.map((_option: any) => {
        return (
          <MenuItem
            key={_option.value}
            value={_option.value}
            //style={{ fontWeight: theme.typography.fontWeightRegular }}
          >
            {t(_option.label)}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default StatusEdit;
