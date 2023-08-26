
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box } from '@mui/material';

import SequenceTaskContainer from '../../SequenceTaskForm';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value, componentProps } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <SequenceTaskContainer mode={'view'} value={value} />
    </Box>
  );
};

export default View;
