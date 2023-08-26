import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
interface ViewProps extends CommonViewProps {
  value?: number | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value || 0} />
    </Box>
  );
};

export default View;
