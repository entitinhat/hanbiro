import { useIsFetching, useIsMutating } from '@tanstack/react-query';

// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material';
import LoadingCircular from '../@hanbiro/LoadingCircular';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// ==============================|| Loader ||============================== //

export interface LoaderProps extends LinearProgressProps {}

const Loader = (props: LoaderProps) => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  // const display = isFetching || isMutating ? 'inherit' : 'none';
  // const display = isMutating ? 'inherit' : 'none';
  return <LoadingCircular loading={isMutating | isFetching ? true : false} />
   // return (
  //   <LoaderWrapper sx={{ display: display }}>
  //     <LinearProgress color="primary" />
  //   </LoaderWrapper>
  // );
};

export default Loader;
