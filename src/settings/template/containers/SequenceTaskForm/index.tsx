import _ from 'lodash';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { sequenceAtom } from '@activity/store/atoms/task';

import NoData from '@base/components/@hanbiro/NoData';
import { Add } from '@mui/icons-material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Theme, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SequenceItem from './Item';
import { TaskSequence } from '@settings/template/types/template';
import { getDateTime } from '@base/utils/helpers/dateUtils';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

const reorderItem = (list: TaskSequence[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (theme: Theme, isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  background: isDragging ? theme.palette.grey[700] : theme.palette.grey[0],
  // ...(isDragging && { border: '1px solid', borderColor: '#f0f0f0' }),
  ...draggableStyle,
  top:'auto!important',
  left:'auto!important',

});

interface SequenceTaskContainerProps {
  sourceId?: string;
  mode?: 'write' | 'view';
  className?: string;
  value?: TaskSequence[];
  onChange?: (val: TaskSequence[]) => void;
}

const SequenceTaskContainer = (props: SequenceTaskContainerProps) => {
  const theme = useTheme();
  const { sourceId, mode = 'write', className, value, onChange } = props;
  const [sequence, setSequence] = useState<any[]>([]);
  const defaultItem = {
    title: '',
    duration: {
      time: 1,
      unit: 'UNIT_DAY'
    },
    details: ''
  };
  // https://react.vlpt.us/basic/16-useEffect.html
  useEffect(() => {
    if (value) {
      if (_.isArray(value) && JSON.stringify(value) !== JSON.stringify(sequence)) {
        setSequence(value);
      }
    } else {
      setSequence([]);
    }
  }, [value]);

  //end dragging
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = [...sequence];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setSequence(newItems);
    //callback
    onChange && onChange(newItems);
  };

  //new row
  const handleAddRow = () => {
    const newItems = [...sequence];
    newItems.push(defaultItem);
    setSequence(newItems);
    //callback
    onChange && onChange(newItems);
  };

  //remove row
  const handleRemoveRow = (index: number) => {
    const newItems = [...sequence];
    newItems.splice(index, 1);
    setSequence(newItems);
    //callback
    onChange && onChange(newItems);
  };

  //item value change
  const handleValueChange = (index: number, keyName: any, keyValue: any) => {
    const newItems = [...sequence];
    if (keyName === 'done') {
      const newDate = new Date().toISOString();
      newItems[index]['doneTime'] = newDate;
    }
    newItems[index][keyName] = keyValue;
    setSequence(newItems);
    //callback
    onChange && onChange(newItems);
  };

  const draggableItem = (sequence: TaskSequence[]) => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
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
                        <Tooltip title="Click to Edit. Drag To Move.">
                          <IconButton
                            sx={{
                              display: 'flex'
                            }}
                            {...provided.dragHandleProps}
                          >
                            <DragIndicatorIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <SequenceItem
                        sourceId={sourceId}
                        item={item}
                        handleRemoveRow={handleRemoveRow}
                        handleValueChange={handleValueChange}
                        mode={mode}
                        seq={index}
                      />
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
        {sequence.map((item, index) => (
          <TableRow key={item.id}>
            <SequenceItem
              handleRemoveRow={handleRemoveRow}
              handleValueChange={handleValueChange}
              sourceId={sourceId}
              item={item}
              mode={mode}
              seq={index}
            />
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Stack spacing={2}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table sx={{ overflowX: 'auto', width: '100%' }} size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              {mode == 'write' && <TableCell align="center" component="th" sx={{ width: '50px' }}></TableCell>}
              <TableCell align="center" component="th" sx={{ width: '10%' }}>
                Sequence
              </TableCell>
              <TableCell align="center" component="th">
                Title
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%' }}>
                Duration
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '50px' }}>
                Inscription
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '50px' }}>
                Action
              </TableCell>
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
      {mode == 'write' && (
        <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
          <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAddRow}>
            Add a line
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default SequenceTaskContainer;
