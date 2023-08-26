import _ from 'lodash';
import { useEffect } from 'react';
import { DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { sequenceAtom } from '@activity/store/atoms/task';
import { TaskSequence } from '@activity/types/task';
import NoData from '@base/components/@hanbiro/NoData';
import { Add } from '@mui/icons-material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Button, Checkbox, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Theme, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import SequenceItem from './Item';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';

const reorderItem = (list: TaskSequence[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (theme: Theme, isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  background: isDragging ? theme.palette.grey[700] : theme.palette.grey[0],
  // ...(isDragging && { border: '1px solid', borderColor: '#f0f0f0' }),
  ...draggableStyle
});

interface SequenceContainerProps {
  sourceId?: string;
  mode?: 'write' | 'view';
  className?: string;
  value?: TaskSequence[];
  onChange?: (val: TaskSequence[]) => void;
  allChecked?: boolean;
}

const SequenceContainer = (props: SequenceContainerProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { sourceId, mode = 'write', className, value, onChange, allChecked = false } = props;
  const resetSequence = useResetRecoilState(sequenceAtom);
  const [sequence, setSequence] = useRecoilState(sequenceAtom);

  // https://react.vlpt.us/basic/16-useEffect.html
  useEffect(() => {
    if (value) {
      if (_.isArray(value) && JSON.stringify(value) !== JSON.stringify(sequence)) {
        setSequence(value);
      }
    }
  }, [value]);

  useEffect(() => {
    // console.log('show component');
    return () => {
      // console.log('disapear component');
      resetSequence();
    };
  }, []);

  const handleAdd = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const items = snapshot.getLoadable(sequenceAtom).contents as TaskSequence[];
        // if there is newFlag: true in items, It can't add new one.
        if (mode == 'view' && items.findIndex((v) => v.newFlag) != -1) return;
        let newItem: TaskSequence = {
          id: uuidv4(),
          title: '',
          description: '',
          instruction: '',
          duration: {
            time: 1,
            unit: 'UNIT_DAY'
          },
          workers: [],
          done: allChecked
        };

        if (mode == 'view') {
          newItem.newFlag = true;
        }

        const newItems = [...items, newItem];
        set(sequenceAtom, newItems);
        onChange && onChange(newItems);
      },
    []
  );

  const handleEnd = useRecoilCallback(
    ({ set }) =>
      (result: any) => {
        if (!result.destination) {
          return;
        }
        const items = reorderItem(sequence, result.source.index, result.destination.index);
        set(sequenceAtom, items);
        onChange && onChange(items);
      },
    [sequence]
  );
  const handleValueChange = (keyName: string, seq: number, value: any) => {
    let newSequences = [...sequence];
    newSequences[seq] = {
      ...newSequences[seq],
      [keyName]: value
    };
    setSequence(newSequences);
    onChange && onChange(newSequences);
  };
  const draggableItem = (sequence: TaskSequence[]) => {
    return (
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {sequence.map((item, index) => (
                <Draggable key={item.id} draggableId={'q-' + item.id} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(theme, snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <TableCell align="center" sx={{ padding: '4px !important' }}>
                        <Stack direction="row" alignItems="center">
                          <Typography color="secondary">#{index + 1}</Typography>
                          <Checkbox
                            size="small"
                            checked={(item?.done || allChecked) ?? false}
                            disabled={allChecked}
                            onChange={(e) => handleValueChange('done', index, e.target.checked)}
                          />
                        </Stack>

                        {/* <Tooltip title="Click to Edit. Drag To Move.">
                          <IconButton
                            sx={{
                              display: 'flex'
                            }}
                            {...provided.dragHandleProps}
                          >
                            <DragIndicatorIcon />
                          </IconButton>
                        </Tooltip> */}
                      </TableCell>
                      <SequenceItem allChecked={allChecked} sourceId={sourceId} item={item} onChange={onChange} mode={mode} seq={index} />
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const unDraggableItem = (sequence: TaskSequence[]) => {
    return (
      <TableBody>
        {sequence?.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell align="center" sx={{ padding: '4px !important' }}>
              <Stack direction="row" alignItems="center">
                <Typography color="secondary">#{index + 1}</Typography>
                <Checkbox
                  size="small"
                  checked={(item?.done || allChecked) ?? false}
                  disabled={allChecked}
                  onChange={(e) => handleValueChange('done', index, e.target.checked)}
                />
              </Stack>
            </TableCell>
            <SequenceItem sourceId={sourceId} item={item} onChange={onChange} mode={mode} seq={index} />
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Stack spacing={2}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '40px' }}></TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%' }}>
                {t('ncrm_activity_title')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%' }}>
                {t('ncrm_activity_duration')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '200px' }}>
                {t('ncrm_activity_worker')}
              </TableCell>
              <TableCell align="center" component="th">
                {t('ncrm_activity_comment')}
              </TableCell>
              {/* <TableCell align="center" component="th" sx={{ width: '40px' }}>
                {t('ncrm_activity_action')}
              </TableCell> */}
            </TableRow>
          </TableHead>
          {sequence.length > 0 ? (
            <>{mode == 'write' ? draggableItem(sequence) : unDraggableItem(sequence)}</>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <NoData />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
        {mode == 'write' && (
          <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            <SpanLang sx={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_common_add_new_line" />
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default SequenceContainer;
