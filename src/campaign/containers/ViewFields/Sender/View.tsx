//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//project
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

//local
import { CAMPAIGN_SENDER_SINGLE } from '@campaign/config/constants';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box>
      {value ? (
        <>
          <Typography>{`${value.type === CAMPAIGN_SENDER_SINGLE ? 'Single address' : 'Owner'} (${
            value.emails.length > 0 ? value.emails[0].name : ''
          } <${value.emails.length > 0 ? value.emails[0].email : ''}>)`}</Typography>
        </>
      ) : (
        <em>(none)</em>
      )}
    </Box>
  );
};

export default View;
