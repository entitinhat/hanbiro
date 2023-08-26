import IconButton from '@base/components/@extended/IconButton';
import { Add, SourceOutlined } from '@mui/icons-material';
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

interface ResultProps {}

function Result({}: ResultProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Results
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
                <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}>
                  Category
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}>
                  Type
                </TableCell>
                <TableCell component="th" sx={{ width: '25%', p: 0.5 }}>
                  Name
                </TableCell>
                <TableCell align="center" component="th" sx={{ p: 0.5 }}>
                  Description
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}>
                  Schema
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Database</TableCell>
                <TableCell align="center">MongoDB</TableCell>
                <TableCell>DB Name - Table Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <SourceOutlined sx={{ fontSize: 18 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default Result;
