import { Box, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';

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
      View Top
    </Stack>
  );
}

export default ViewTop;
