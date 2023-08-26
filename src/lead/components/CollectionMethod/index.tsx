import { Typography, Stack } from '@mui/material';

import MainCard from '@base/components/App/MainCard';

interface CollectionMethodProps {
  data: any;
}
const CollectionMethod = (props: CollectionMethodProps) => {
  const { data } = props;
  return (
    <MainCard content={false} border={false} sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="body1" color="textSecondary" >
          {data?.parent?.name} 
        </Typography>
        <Typography variant="body1">
          {data?.name ?? '(none)'}
        </Typography>
      </Stack>
    </MainCard>
  );
};
export default CollectionMethod;
