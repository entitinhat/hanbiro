import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { STATUS_BASIC_DATA } from '@process/config/constants';
import statusAtom, { selectedStatusAtom, showStatusMultipleAtom } from '@process/store/atoms/status';
import stepTypeAtom from '@process/store/atoms/step';
import { MethodType, MultipleType } from '@process/types/diagram';

interface StatusListProps {
  children: React.ReactNode;
  isCta?: boolean;
  actionMethod?: MethodType;
  mode?: 'view' | 'edit';
  useNextStep?: boolean;
}

function StatusList(props: StatusListProps) {
  const { children, mode = 'edit', useNextStep = true, isCta = false, actionMethod = 'ACTION_METHOD_MANUAL' } = props;
  const theme = useTheme();
  const setStatusesValue = useSetRecoilState(statusAtom);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusAtom);
  const [showMultiple, setShowMultiple] = useRecoilState(showStatusMultipleAtom);
  const stepType = useRecoilValue(stepTypeAtom);

  const handleAdd = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        if (!_.isEmpty(selectedStatus)) return;

        const id = uuidv4();
        const statuses = snapshot.getLoadable(statusAtom).getValue();

        set(statusAtom, [
          ...statuses,
          STATUS_BASIC_DATA({
            id: id,
            button: '',
            name: '',
            event: stepType.value == 'TYPE_WAIT' ? 'EVENT_TRIGGER' : undefined,
            newFlag: true,
            resetFlag: true
          })
        ]);
        setSelectedStatus(id);
      },
    [selectedStatus]
  );

  const onChangeMultiple = useCallback((multiple: MultipleType) => {
    setStatusesValue((old) => {
      return old.map((v) => {
        if (v.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
          return { ...v, ...{ multiple: multiple } };
        } else {
          return v;
        }
      });
    });
    setShowMultiple(false);
  }, []);

  useEffect(() => {
    setShowMultiple(false);
  }, []);

  return (
    <Stack spacing={1} sx={{ mb: 1 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              {isCta && stepType.value == 'TYPE_SITE' && (
                <TableCell align="center" component="th" sx={{ minWidth: '130px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={'ncrm_process_action_page_form_name '} />
                </TableCell>
              )}
              {actionMethod != 'ACTION_METHOD_AUTO' && stepType.value != 'TYPE_WAIT' && (
                <TableCell align="center" component="th" sx={{ minWidth: '130px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={isCta ? 'ncrm_process_action_cta_name' : 'ncrm_process_action_btn'} />
                </TableCell>
              )}
              {actionMethod != 'ACTION_METHOD_AUTO' && stepType.value !== 'TYPE_WAIT' && !isCta && (
                <TableCell align="center" component="th" sx={{ minWidth: '110px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={'ncrm_process_action_view'} />
                </TableCell>
              )}
              {actionMethod != 'ACTION_METHOD_AUTO' && (
                <TableCell align="center" component="th" sx={{ minWidth: '110px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={'ncrm_process_action_event'} />
                </TableCell>
              )}
              <TableCell align="center" component="th" sx={{ minWidth: '130px', textTransform: 'capitalize' }}>
                <SpanLang keyLang={'ncrm_process_action_status'} />
              </TableCell>
              <TableCell align="center" component="th" sx={{ minWidth: '110px', textTransform: 'capitalize' }}>
                <SpanLang keyLang={'ncrm_process_action_direction'} />
              </TableCell>
              {useNextStep && (
                <TableCell align="center" component="th" sx={{ minWidth: '110px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={'ncrm_process_action_next_step'} />
                </TableCell>
              )}
              <TableCell align="center" component="th" sx={{ minWidth: '110px', textTransform: 'capitalize' }}>
                <SpanLang keyLang={'ncrm_process_action_property'} />
              </TableCell>
              {stepType.value !== 'TYPE_SIMPLE_ACTION' && stepType.value !== 'TYPE_WAIT' && !isCta && (
                <TableCell align="center" component="th" sx={{ minWidth: '130px', textTransform: 'capitalize' }}>
                  <SpanLang keyLang={'ncrm_process_action_sequence'} />
                </TableCell>
              )}
              {mode == 'edit' && <TableCell align="center" component="th"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {!isCta &&
        mode == 'edit' &&
        (stepType.value == 'TYPE_ACTION' || stepType.value == 'TYPE_SIMPLE_ACTION' || stepType.value == 'TYPE_WAIT') && (
          <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
            <Button
              variant="text"
              size="small"
              color="primary"
              startIcon={<Add />}
              onClick={handleAdd}
              sx={{ '&:hover': { bgcolor: 'transparent' } }}
            >
              <SpanLang keyLang="ncrm_common_add_new_line" textOnly />
            </Button>
          </Box>
        )}
      <Dialog open={showMultiple}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: 200, borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Grid item>
            <DialogTitle>Choose Split</DialogTitle>
          </Grid>
        </Grid>
        <List sx={{ p: 2 }}>
          <ListItem button onClick={() => onChangeMultiple('MULTIPLE_CHOICE')} sx={{ px: 1, py: 0.5, '&:hover': { borderRadius: 1.5 } }}>
            <ListItemText primary={'Choice(Or)'} />
          </ListItem>
          <ListItem button onClick={() => onChangeMultiple('MULTIPLE_PARALLEL')} sx={{ px: 1, py: 0.5, '&:hover': { borderRadius: 1.5 } }}>
            <ListItemText primary={'Parallel(And)'} />
          </ListItem>
        </List>
      </Dialog>
    </Stack>
  );
}

export default StatusList;
