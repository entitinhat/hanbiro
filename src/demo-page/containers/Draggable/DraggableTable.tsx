import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTheme } from '@mui/material/styles';
import DraggableTableItem from './DraggableTableItem';
import { Done, Sort } from '@mui/icons-material';
import DropDown from '@base/components/@hanbiro/Dropdown';

export interface checkList {
  id: number;
  title: string;
  duration?: string;
  worker?: string;
  comment?: string;
}

const reorderItem = (list: checkList[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  background: isDragging ? '#f0f0f0' : 'white',
  // ...(isDragging && { border: '1px solid', borderColor: '#f0f0f0' }),
  ...draggableStyle
});

const DraggableTable = () => {
  const theme = useTheme();
  const [questions, setQuestions] = useState<checkList[]>([
    { id: 1, title: 'question1' },
    { id: 2, title: 'question2' },
    { id: 3, title: 'question3' },
    { id: 4, title: 'question4' },
    { id: 5, title: 'question5' }
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    let movedItems = reorderItem(questions, result.source.index, result.destination.index);
    setQuestions(movedItems);
  };

  const items = [
    {
      label: 'Status',
      value: 'status',
      icon: <Done fontSize="small" />
    },
    {
      label: 'Customer',
      value: 'customer'
    }
  ];

  return (
    <Stack spacing={2}>
      <DropDown title={'초급 과정'} items={items} icon={<Sort />} />
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '50px' }}></TableCell>
              <TableCell align="center" component="th" sx={{ width: '100px' }}>
                SEQ
              </TableCell>
              <TableCell align="center" component="th">
                Title
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%' }}>
                Duration
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '30%' }}>
                Worker
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '50px' }}>
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((item, index) => (
                    <Draggable key={item.id} draggableId={'q-' + item.id} index={index}>
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <TableCell align="center" sx={{ padding: '5px !important' }}>
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
                          <DraggableTableItem item={item} />
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default DraggableTable;
