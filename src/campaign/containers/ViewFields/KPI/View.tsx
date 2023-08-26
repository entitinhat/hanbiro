//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//project
import { User } from '@base/types/user';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

//local

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
          <Typography>Click through rate: {value.clickThroughRate}</Typography>
          <Typography>Total page view: {value.totalPageView}</Typography>
        </>
      ) : (
        <em>(none)</em>
      )}
    </Box>
  );
};

export default View;
