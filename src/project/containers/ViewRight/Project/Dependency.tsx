import IconButton from '@base/components/@extended/IconButton';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { Add } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

interface DependencyProps {}

function Dependency({}: DependencyProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Dependency
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Predecessor</Typography>
            <IconButton size="small" color="primary">
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={1} sx={{ p: 1 }}>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
              {/* <Tooltip title="This task cannot be finished before the preceding task is finished.">
                <Chip size="small" color="secondary" variant="combined" label="FF" />
              </Tooltip> */}
              <Typography>Task 1</Typography>
              <FormIcon color="info" icon="connect_ff" iconType="main" />
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
              {/* <Tooltip title="This task cannot be started before the preceding task is finished.">
                <Chip size="small" color="info" variant="combined" label="FS" />
              </Tooltip> */}
              <Typography>Task 2</Typography>
              <FormIcon color="info" icon="connect_fs" iconType="main" />
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Successor</Typography>
            <IconButton size="small" color="primary">
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={1} sx={{ p: 1 }}>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
              {/* <Tooltip title="This task cannot be started before the preceding task is started.">
                <Chip size="small" color="warning" variant="combined" label="SS" />
              </Tooltip> */}
              <Typography>Task 3</Typography>
              <FormIcon color="info" icon="connect_ss" iconType="main" />
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
              {/* <Tooltip title="This task cannot be finished before the preceding task is started.">
                <Chip size="small" color="error" variant="combined" label="SF" />
              </Tooltip> */}
              <Typography>Task 4</Typography>
              <FormIcon color="info" icon="connect_sf" iconType="main" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Dependency;
