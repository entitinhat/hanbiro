import { Box, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import Estimate from './Estimate';
import Progress from './Progress';
import Stage from './Stage';

interface ViewTopProps {}

function ViewTop({}: ViewTopProps) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction={matchDownMD ? 'column' : 'row'}
      spacing={1}
      alignItems="center"
      sx={{ width: '100%', minHeight: 145, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}
    >
      <Box sx={{ width: matchDownMD ? '100%' : '50%' }}>
        <Stage />
      </Box>
      <Stack direction="row" alignItems="center" sx={{ width: matchDownMD ? '100%' : '50%' }}>
        {!matchDownMD && <Divider orientation="vertical" flexItem />}
        <Progress />
        <Divider orientation="vertical" flexItem />
        <Estimate />
      </Stack>
    </Stack>
  );
}

export default ViewTop;
