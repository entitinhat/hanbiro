import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return <Box sx={{ width: '100%' }}>{value?.name ? <Typography>{value?.name}</Typography> : ''}</Box>;
};

export default View;
