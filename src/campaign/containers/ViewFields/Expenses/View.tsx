//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, InputLabel, Stack, Typography } from '@mui/material';

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
      {value && value.length > 0 ? (
        <>
          {value.map((_item: any, index: number) => (
            <Stack key={index} direction="row" spacing={1}>
              <InputLabel>{_item.name}:</InputLabel>
              <Typography>{`${_item.amount.currency} ${_item.amount.amount}`}</Typography>
            </Stack>
          ))}
        </>
      ) : (
        <em>(none)</em>
      )}
    </Box>
  );
};

export default View;
