import IconButton from '@base/components/@extended/IconButton';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Add, CheckCircleOutlineRounded, CheckCircleRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';

interface TimeEntryProps {}

function TimeEntry({}: TimeEntryProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Time entries
        </Typography>
        <IconButton size="small" color="primary">
          <Add />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
          <Table size="small">
            <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}></TableCell>
                <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}>
                  Date
                </TableCell>
                <TableCell component="th" sx={{ p: 0.5 }}>
                  Description
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}>
                  Duration
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <HanAvatar size="xs" name="DH Kim" />
                </TableCell>
                <TableCell align="center">2022.12.10</TableCell>
                <TableCell>Make Sub tasks module for dev task view</TableCell>
                <TableCell align="center">01:15</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <CheckCircleRounded sx={{fontSize: 20}} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <HanAvatar size="xs" name="DH Kim" />
                </TableCell>
                <TableCell align="center">2022.12.10</TableCell>
                <TableCell>Make Planning/QA</TableCell>
                <TableCell align="center">01:15</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="secondary">
                    <CheckCircleOutlineRounded sx={{fontSize: 20}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-around">
          <Stack spacing={1} textAlign="center">
            <Typography color="text.secondary">Total</Typography>
            <Typography variant="h5">2W 26D 14H 45M</Typography>
          </Stack>
          <Stack spacing={1} textAlign="center">
            <Typography color="text.secondary">Done</Typography>
            <Typography variant="h5">2W 5D 21H</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TimeEntry;
