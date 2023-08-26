import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const { value } = props;
  const { t } = useTranslation()
  return (
    <Box>
      <Typography>{t(value)}</Typography>
    </Box>
  );
};

export default View;
