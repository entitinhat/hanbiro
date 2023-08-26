import { Divider, Stack, Typography } from '@mui/material';

interface WorkTimeProps {}

function WorkTime({}: WorkTimeProps) {
  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography>SGPark (Manager)</Typography>
          <Typography color="textSecondary">PE-Backend</Typography>
        </Stack>
        <Typography>1m 1w 1d 1h</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography>Thien (Staff)</Typography>
          <Typography color="textSecondary">PE-Frontend</Typography>
        </Stack>
        <Typography>1m 1w 1d 1h</Typography>
      </Stack>
    </Stack>
  );
}

export default WorkTime;
