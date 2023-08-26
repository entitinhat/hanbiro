import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';

interface ViewProps extends CommonViewProps {
  value?: any | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return value?.name ? (
    <Stack>
      <Typography>{value?.name}</Typography>
    </Stack>
  ) : (
    ''
  );
};

export default View;
