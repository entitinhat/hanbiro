import { StatusFields } from '@activity/config/constants';
import { LabelValue } from '@base/types/app';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ViewProps {
  value: string;
}

function StatusView(props: ViewProps) {
  const { value } = props;
  const { t } = useTranslation();
  const statuses = StatusFields({
    todo: 'ncrm_activity_todo',
    doing: 'ncrm_activity_doing',
    hold: 'ncrm_activity_on_hold',
    done: 'ncrm_activity_done',
    cancel: 'ncrm_activity_cancel'
  });
  return <Typography>{t(statuses.find((status: LabelValue) => value === status.value)?.label ?? 'ncrm_common_none')}</Typography>;
}

export default StatusView;
