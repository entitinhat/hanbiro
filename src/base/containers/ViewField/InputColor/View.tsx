import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Chip, TextField, useTheme } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;

  const theme = useTheme();

  return <Chip sx={{ minWidth: '50px', bgcolor: value ?? '', border: `1px solid ${theme.palette.grey[300]}` }} size="small" />;
};

export default View;
