import { ReminderState, timeOptions, typeOptions } from '@base/components/@hanbiro/Reminder';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: ReminderState;
}

const View = (props: ViewProps) => {
  const { value } = props;
  const { t } = useTranslation();

  return (
    <>
      {value?.use ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: '5px' }}>{typeOptions.find((opt) => opt.value == value.notify)?.label}</Box>
          <Box>{timeOptions.find((opt) => opt.value == value.end)?.label}</Box>
        </Box>
      ) : (
        <label>{t('ncrm_common_not_use')}</label>
      )}
    </>
  );
};

export default View;
