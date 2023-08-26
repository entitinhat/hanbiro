import { Customer } from '@customer/types/interface';
import { Box } from '@mui/material';
import DetailModal from './DetailModal';

interface CustomerViewNameProps {
  value: Customer;
}

function CustomerViewName(props: CustomerViewNameProps) {
  const { value } = props;

  return (
    <>
      <Box p={1}>
        <DetailModal value={value} name={value?.name} />
      </Box>
    </>
  );
}

export default CustomerViewName;
