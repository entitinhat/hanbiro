import _ from 'lodash';
import { useEffect } from 'react';
import { DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { checklistAtom } from '@activity/store/atoms/task';
import { TaskChecklist } from '@activity/types/task';
import NoData from '@base/components/@hanbiro/NoData';
import { Add } from '@mui/icons-material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Button, Checkbox, IconButton, Stack, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import ChecklistItem from './Item';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';

const reorderItem = (list: TaskChecklist[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  background: isDragging ? '#f0f0f0' : '#ffffff',
  // ...(isDragging && { border: '1px solid', borderColor: '#f0f0f0' }),
  ...draggableStyle
});

interface ChecklistContainerProps {
  sourceId?: string;
  mode?: 'write' | 'view';
  className?: string;
  value?: TaskChecklist[];
  allChecked?: boolean;
  onChange?: (val: TaskChecklist[]) => void;
}

const ChecklistContainer = (props: ChecklistContainerProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { sourceId, mode = 'write', className, value, onChange, allChecked = false } = props;
  const resetChecklist = useResetRecoilState(checklistAtom);
  const [checklist, setChecklist] = useRecoilState(checklistAtom);

  // https://react.vlpt.us/basic/16-useEffect.html
  useEffect(() => {
    if (value) {
      if (_.isArray(value) && JSON.stringify(value) !== JSON.stringify(checklist)) {
        setChecklist(value);
      }
    }
  }, [value]);

  useEffect(() => {
    return () => {
      resetChecklist();
    };
  }, []);

  const handleAdd = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
        // if there is newFlag: true in items, It can't add new one.
        if (mode == 'view' && items.findIndex((v) => v.newFlag) != -1) return;
        let newItem: TaskChecklist = {
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
        set(checklistAtom, newItems);
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
        const items = reorderItem(checklist, result.source.index, result.destination.index);
        set(checklistAtom, items);
        onChange && onChange(items);
      },
    [checklist]
  );

  const handleValueChange = (keyName: string, seq: number, value: any) => {
    let newChecklists = [...checklist];
    newChecklists[seq] = {
      ...newChecklists[seq],
      [keyName]: value
    };
    setChecklist(newChecklists);
    onChange && onChange(newChecklists);
  };
  return (
    <Stack spacing={2}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '40px' }}></TableCell>
              {/* <TableCell align="center" component="th" sx={{ width: '100px' }}>
                Seq
              </TableCell> */}
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
              {mode == 'write' && (
                <TableCell align="center" component="th" sx={{ width: '40px' }}>
                  {t('ncrm_activity_action')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {checklist.length > 0 ? (
            <DragDropContext onDragEnd={handleEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                    {checklist.map((item, index) => (
                      <Draggable key={index} draggableId={'q-' + item.id} index={index}>
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <TableCell align="center" sx={{ padding: '4px !important' }}>
                              <Stack direction="row" alignItems="center">
                                {mode == 'write' && (
                                  <Tooltip title="Click to Edit. Drag To Move.">
                                    <IconButton
                                      size="small"
                                      sx={{
                                        display: 'flex'
                                      }}
                                      {...provided.dragHandleProps}
                                    >
                                      <DragIndicatorIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}

                                <Checkbox
                                  size="small"
                                  checked={(item?.done || allChecked) ?? false}
                                  disabled={allChecked}
                                  onChange={(e) => handleValueChange('done', index, e.target.checked)}
                                />
                              </Stack>
                            </TableCell>

                            <ChecklistItem allChecked={allChecked} sourceId={sourceId} item={item} onChange={onChange} mode={mode} />
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
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

export default ChecklistContainer;
