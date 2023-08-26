import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box } from '@mui/material';
import OnetimeTable from "@settings/template/quote/containers/OnetimeTable";

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <OnetimeTable mode={'v'} value={value} />
    </Box>
  );
};

export default View;
