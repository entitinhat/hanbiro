import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Typography } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;

  return (
    <Box>
      <Typography>{value?.name || '(none)'}</Typography>
    </Box>
  );
};

export default View;
