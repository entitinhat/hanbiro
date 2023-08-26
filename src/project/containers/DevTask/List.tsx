import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import {
    AvatarGroup, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, useTheme
} from '@mui/material';
import { Task } from '@project/types/task';

interface DevTaskListProps {
  data: Task[];
}

function DevTaskList(props: DevTaskListProps) {
  const theme = useTheme();
  const { data: items } = props;

  return (
    <Stack spacing={1.5}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '35%', p: 0.5 }}>
                Task Name
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}>
                Page Type
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}>
                Dev Type
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}>
                Assigned Rep
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}>
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => {
              return (
                <TableRow key={v.id}>
                  <TableCell>
                    <Typography color="primary">{v.name}</Typography>
                  </TableCell>
                  <TableCell align="center">{v.pageType?.name}</TableCell>
                  <TableCell align="center">{v.devType?.name}</TableCell>
                  <TableCell>
                    <AvatarGroup max={3}>
                      {v.assignTo?.map((_v) => {
                        return <HanAvatar key={_v.id} size="xs" name={_v.name} />;
                      })}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>{convertDateTimeServerToClient({ date: v.createdAt?.toString(), isTime: true, humanize: false })}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default DevTaskList;
