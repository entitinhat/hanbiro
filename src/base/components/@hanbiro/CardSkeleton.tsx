import { Stack, Skeleton } from '@mui/material';

interface CardSkeletonProps {}
const CardSkeleton = (props: CardSkeletonProps) => {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton />
        <Skeleton sx={{ height: 64 }} animation="wave" variant="rectangular" />
        <Skeleton />
        <Skeleton />
      </Stack>
    </>
  );
};

export default CardSkeleton;
