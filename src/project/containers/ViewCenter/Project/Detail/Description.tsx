import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

interface DescriptionProps {}

function Description({}: DescriptionProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Description
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ width: '100%', m: 0, p: 1 }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Description;
