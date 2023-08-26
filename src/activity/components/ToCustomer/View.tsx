import { UserOrCustomer } from '@activity/types/activity';
import { Stack, Chip, Typography, Box } from '@mui/material';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';

interface ViewProps {
  value: UserOrCustomer[];
  mode?: 'phone' | 'email';
}

function FromUserView(props: any) {
  const { value, componentProps } = props;
  const { t } = useTranslation();
  const mode: keyof UserOrCustomer = componentProps?.mode;
  return (
    <Stack direction={'column'} spacing={0.5}>
      {value?.length > 0 &&
        isArray(value) &&
        value.map((item: UserOrCustomer) => (
          <Box key={item.id}>
            <Typography color="primary">{item.name}</Typography>
            {mode && <Typography color="inherit">{`<${item[mode] ?? t('ncrm_common_none')}>`}</Typography>}
          </Box>
        ))}
    </Stack>
  );
}

export default FromUserView;
