//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//project
import { User } from '@base/types/user';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

//local
import { CAMPAIGN_MAIL_SCHEDULE, CAMPAIGN_MAIL_SEND_NONE, CAMPAIGN_MAIL_SEND_NOW } from '@campaign/config/constants';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  const title = value.type === CAMPAIGN_MAIL_SEND_NONE ? 'None' : CAMPAIGN_MAIL_SEND_NOW ? 'Send now' : 'Schedule';
  return (
    <Box>
      {value ? (
        <>
          <Typography>{`${title} (Interval: ${value.interval || 0})`}</Typography>
        </>
      ) : (
        <em>(none)</em>
      )}
    </Box>
  );
};

export default View;
