import { Box, Fade, CircularProgress } from '@mui/material';

const LoadingCircular = ({ loading = false }: { loading: boolean }) => {
  return (
    <Box sx={{ position: 'absolute', zIndex: 10, top: '50%', left: '50%' }}>
      {/* <Fade
        in={loading}
        style={{
          transitionDelay: loading ? '800ms' : '0ms',
        }}
        unmountOnExit
      > */}
      {loading && <CircularProgress />}
      {/* </Fade> */}
    </Box>
  );
};

export default LoadingCircular;
