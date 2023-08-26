import { Box, Chip, IconButton, Card, Typography, Menu, Button, Tooltip } from '@mui/material';
import NoSsr from '@mui/base/NoSsr';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import type { MouseEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Item {
  id: number;
  primary: string;
}

const reorderItem = (list: Item[], startIndex: number, endIndex: number): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DraggableList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [state, setState] = useState<Item[]>([]);
  const [deleteItem, setDeleteItem] = useState<Item>();
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }
    const items: Item[] = reorderItem(state, result.source.index, result.destination.index);
    setState(items);
  };
  const handleNoPropagation = (event: MouseEvent) => {
    event.persist();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  const handleClickNoPropagation = (event: MouseEvent<HTMLElement>, item: Item) => {
    handleNoPropagation(event);
    setDeleteItem(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnFocus = (event: MouseEvent) => {
    handleNoPropagation(event);
    console.log('focus Iconbutton');
  };
  const handleDelete = (event: MouseEvent<HTMLElement>) => {
    handleNoPropagation(event);
    const items = state;
    if (!deleteItem) {
      throw new Error('No delete Item set');
    }
    console.log('deleting Item: ' + deleteItem.id);
    const deleteItemindex = items.indexOf(deleteItem);
    items.splice(deleteItemindex, 1);
    setState(items);
    handleClose();
  };
  const addNewItem = () => {
    const newItem: Item = {
      id: new Date().getTime(),
      primary: (Math.random() + 1).toString(36).substring(2)
    };
    const items = state;
    items.push(newItem);
    setState([...items]);
  };
  return (
    <NoSsr>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided): JSX.Element => (
            <Box
              sx={{
                p: 4,
                backgroundColor: '#EFEFEF',
                maxWidth: '800px',
                margin: 'auto'
              }}
            >
              <Card sx={{ borderRadius: 4 }}>
                <Menu
                  anchorEl={anchorEl}
                  id="delete-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    sx: {
                      '& .MuiList-root': {
                        padding: 0
                      }
                    }
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                  }}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                >
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Menu>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {state.length > 0 &&
                    state.map((item: Item, index: number) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided, snapshot): JSX.Element => (
                          <Box ref={provided.innerRef} {...provided.draggableProps}>
                            <Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#fff',
                                  boxShadow: snapshot.isDragging
                                    ? '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)'
                                    : ''
                                }}
                              >
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Tooltip title="Click to Edit. Drag To Move.">
                                    <IconButton
                                      sx={{
                                        m: 2,
                                        mt: 1,
                                        display: 'flex',
                                        width: '48px',
                                        height: '48px'
                                      }}
                                      {...provided.dragHandleProps}
                                      onClick={(event) => handleClickNoPropagation(event, item)}
                                      onMouseDown={handleNoPropagation}
                                      onFocus={() => handleOnFocus}
                                      aria-controls={open ? 'delete-menu' : undefined}
                                      aria-haspopup="true"
                                      aria-expanded={open ? 'true' : undefined}
                                    >
                                      <DragIndicatorIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                                <Box
                                  display="flex"
                                  sx={{
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    flexBasis: '100%',
                                    my: 1
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      my: 1,
                                      alignItems: 'center'
                                    }}
                                  >
                                    <Chip
                                      icon={<AddIcon />}
                                      clickable
                                      label="link aliquid"
                                      sx={{ mr: 1 }}
                                      onClick={() => alert('Tu annuum elegit')}
                                    />
                                    <Chip
                                      clickable
                                      label={'index: ' + index}
                                      sx={{ mr: 1 }}
                                      onClick={() => alert('Tu annuum elegit :potato:')}
                                    />
                                    <Chip
                                      clickable
                                      label={'Item.id: ' + item.id}
                                      sx={{ mr: 1 }}
                                      onClick={() => alert('Tu annuum elegit :potato:')}
                                    />
                                  </Box>
                                  <Box sx={{ display: 'flex', mt: 1 }}>
                                    <Typography variant="body2">{item.primary}</Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
                <Box sx={{ px: 4, mt: 3, mb: 4, ml: 5.5 }}>
                  <Button size="small" onClick={addNewItem}>
                    Adde punctum
                  </Button>
                </Box>
              </Card>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </NoSsr>
  );
};
export default DraggableList;
