import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

//material
import { Box, Button, ClickAwayListener, Divider, Grow, Menu, Paper, Popper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CloseOutlined } from '@mui/icons-material';
import { ControlOutlined } from '@ant-design/icons';

//third-party
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

//project
import { ColumnSetting } from '@base/types/setting';
import useDevice from '@base/hooks/useDevice';
import IconButton from '@base/components/@extended/IconButton';

//local
import Column from './Column';

//portal for dragging
let portal = document.createElement('div');
document.body.appendChild(portal);

export interface ColumnsSettingProps {
  columns: ColumnSetting[];
  onChange: (v: ColumnSetting[]) => void;
}

const MAX_COLUMN_SETTING: number = 10;

const ColumnsSetting = (props: ColumnsSettingProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const { columns, onChange } = props;
  const [items, setListItems] = useState<ColumnSetting[]>([]);
  const [showedItemCount, setShowedItemCount] = useState(0);
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const onChangeColumnSetting = (event: any, _ele: ColumnSetting) => {
    if (showedItemCount <= MAX_COLUMN_SETTING - 1) {
      setListItems([
        ...items.map((_item) => {
          const newVal = { ..._item };
          if (newVal.keyName == _ele.keyName) {
            newVal.defaultViewInList = !_ele.defaultViewInList;
          }
          return newVal;
        })
      ]);
    } else {
      if (_ele.defaultViewInList) {
        setListItems([
          ...items.map((_item) => {
            const newVal = { ..._item };
            if (newVal.keyName == _ele.keyName) {
              newVal.defaultViewInList = !_ele.defaultViewInList;
            }
            return newVal;
          })
        ]);
      }
    }
  };
  useEffect(() => {
    if (columns) {
      setListItems(columns);
    }
  }, [columns]);

  useEffect(() => {
    if (items) {
      setShowedItemCount(0);
      items.map((item: any) => {
        if (item.defaultViewInList) setShowedItemCount((showedItemCount) => showedItemCount + 1);
      });
    }
  }, [items]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: ColumnSetting[] = [...items];
    const movedItem = listCopy.find((item) => item.keyName == result.draggableId);
    const listRemoved = listCopy.filter((item) => item.keyName != result.draggableId);
    if (movedItem) listRemoved.splice(result.destination.index, 0, movedItem);
    setListItems(listRemoved);
  };

  //create portal draggable item
  function renderDraggableItem(provided: DraggableProvided, snapshot: DraggableStateSnapshot, item: any) {
    let child = (
      <Box key={item.keyName} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
        <Column
          isDisabled={item?.isDisabled || false}
          col={item}
          id={item.keyName}
          onChangeColumnSetting={(event, _ele) => onChangeColumnSetting(event, _ele)}
        />
      </Box>
    );

    if (snapshot.isDragging) {
      return ReactDOM.createPortal(child, portal);
    }
    return child;
  }

  return (
    <>
      <IconButton
        sx={{
          ml: 0.5,
          height: 32
          // color: theme.palette.secondary.dark
        }}
        size="small"
        color="secondary"
        variant="outlined"
        ref={anchorRef}
        onClick={onToggle}
      >
        <ControlOutlined style={{ fontSize: '1.2rem' }} />
      </IconButton>
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [isMobile ? -4 : 0, 4]
                }
              }
            ]
          }}
          sx={{ zIndex: 1310 }}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
                  <>
                    <Stack direction="row" sx={{ p: 1, pt: 1.5 }} alignItems="center" justifyContent="space-between">
                      <Stack spacing={1} direction="row">
                        <Typography>{t('ncrm_common_list_column_settings')}</Typography>
                      </Stack>
                      <Stack spacing={1} direction="row" alignItems="center">
                        <Typography variant="caption">
                          {`${showedItemCount} ${t(`ncrm_common_of`)} ${MAX_COLUMN_SETTING}`} {t('ncrm_common_list_column_settings_selected')}
                        </Typography>
                        <Divider orientation="vertical" sx={{ height: 24 }} />
                        <IconButton size="small" color="secondary" onClick={onToggle} sx={{ ml: '0 !important' }}>
                          <CloseOutlined fontSize="small" color="error" />
                        </IconButton>
                      </Stack>
                    </Stack>
                    {/* <Divider /> */}
                    <Box
                      sx={{
                        maxHeight: `calc(100vh - 320px)`
                      }}
                      className="scroll-box"
                    >
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="column_settings">
                          {(provided) => (
                            <Box className="divTableBody" {...provided.droppableProps} ref={provided.innerRef}>
                              {items.map((_ele, _index) => (
                                <Draggable key={_ele.keyName} draggableId={_ele.keyName.toString()} index={_index}>
                                  {(provided, snapshot) => <>{renderDraggableItem(provided, snapshot, _ele)}</>}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Box>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Box>

                    <Divider />
                    <Stack spacing={1} direction="row" sx={{ p: 1 }} justifyContent="flex-end" alignItems="center">
                      <Button size="small" color="secondary" variant="outlined" onClick={(e: any) => handleClose(e)}>
                        {t('ncrm_common_btn_cancel')}
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={(e: any) => {
                          onChange(items);
                          handleClose(e);
                        }}
                      >
                        {t('ncrm_common_btn_save')}
                      </Button>
                    </Stack>
                  </>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
    </>
  );
};

export default ColumnsSetting;
