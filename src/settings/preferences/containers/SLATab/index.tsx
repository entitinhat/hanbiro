import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import FirstRespondPriority from './FirstRespondPriority';
import SLA from './SLA';
import TimeResolveSLA from './TimeResolveSLA';

const SLATab = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const width = matches ? '50%' : '100%';

  return (
    <>
      <Box sx={{ p: 2, height: 'calc(100vh-156px)' }} className="scroll-box">
        <Grid container sx={{ mx: '-5px', display: 'flex', flexWrap: 'wrap' }}>
          <Grid item xs={6} sx={{ px: 1, flex: '0 0 ' + width, maxWidth: width }}>
            <SLA />
          </Grid>

          <Grid item xs={6} sx={{ px: 1, flex: '0 0 100%', maxWidth: '100%' }}>
            <TimeResolveSLA />
          </Grid>

          <Grid xs={12} sx={{ px: 1, flex: '0 0 ' + width, maxWidth: width }}>
            <FirstRespondPriority />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SLATab;
