import LinearWithLabel from '@base/components/@extended/Progress/LinearWithLabel';
import { Box, Divider, LinearProgress, Stack, Typography, useTheme } from '@mui/material';

interface ProgressProps {}

function Progress({}: ProgressProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Progress Rate
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <Stack spacing={0.5}>
          <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 24, lineHeight: 24 }}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="subtitle2">100h</Typography>
              <Typography variant="caption" color="secondary">
                Estimated
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="caption" color="secondary">
                Overtime
              </Typography>
              <Typography variant="subtitle2">7h</Typography>
            </Stack>
          </Stack>
          <LinearWithLabel value={50} color="secondary" />
          <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 24, lineHeight: 24 }}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="subtitle2">61h</Typography>
              <Typography variant="caption" color="secondary">
                Done
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="subtitle2">46h</Typography>
              <Typography variant="caption" color="secondary">
                Todo
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="subtitle2">1h</Typography>
              <Typography variant="caption" color="secondary">
                Buffer
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0} alignItems="center">
            <LinearProgress
              variant="determinate"
              color="primary"
              value={100}
              sx={{
                width: '25%',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '& .MuiLinearProgress-bar': { borderRadius: 0 }
              }}
            />
            <LinearProgress
              variant="determinate"
              color="success"
              value={100}
              sx={{
                width: '50%',
                borderRadius: 0,
                '& .MuiLinearProgress-bar': { borderRadius: 0 }
              }}
            />
            <LinearProgress
              variant="determinate"
              color="secondary"
              value={100}
              sx={{
                width: '25%',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,

                '& .MuiLinearProgress-bar': { borderRadius: 0 }
              }}
            />
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Stack spacing={0.5}>
            <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Estimated</Typography>
              <Typography variant="body1" color="primary" sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                100h
              </Typography>
            </Stack>
            <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body1" color="secondary">
                Done
              </Typography>
              <Typography variant="body1" sx={{ color: 'warning.main' }}>
                25%
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={0.5}>
            <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Done, Todo</Typography>
              <Typography variant="body1" color="primary" sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                107h
              </Typography>
            </Stack>
            <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body1" color="secondary">
                Done and Todo vs Estimated
              </Typography>
              <Typography variant="body1" sx={{ color: 'warning.main' }}>
                57%
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Progress;
