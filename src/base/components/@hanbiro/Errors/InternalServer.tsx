import { Link } from 'react-router-dom';

import error500 from '@base/assets/images/maintenance/Error500.png';
import config from '@base/config/config';
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface internalServerProps {
  errorUuid: string | undefined;
  error: Error;
  resetErrorBoundary: () => void;
}

function InternalServer(props: internalServerProps) {
  const { error, errorUuid, resetErrorBoundary } = props;
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Box sx={{ width: { xs: 350, sm: 396 } }}>
            <img src={error500} alt="mantis" style={{ height: '100%', width: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <Typography align="center" variant={matchDownSM ? 'h2' : 'h1'}>
              Internal Server Error
            </Typography>
            <Typography color="textSecondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
              Failed to process data.
            </Typography>
            <Typography color="textSecondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
              If the error persists, contact customer service.
            </Typography>
            <Stack spacing={2} sx={{ mt: 4 }} direction="row" justifyContent="center" alignItems="center">
              <Button size="small" component={Link} to={config.defaultPath} variant="contained" sx={{ textTransform: 'none' }}>
                Call: 1544-4755
              </Button>
              <Button size="small" color="success" variant="contained" sx={{ textTransform: 'none' }} onClick={resetErrorBoundary}>
                Try again
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default InternalServer;
