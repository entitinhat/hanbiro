import NoData from '@base/components/@hanbiro/NoData';
import { DeleteOutline, DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { MergeField, OrderItem } from '@settings/general/types/mergefield';
const rowSx = {
  borderBottom: 'none',
  '&:hover': {
    '& .item-option': {
      visibility: 'visible'
    }
  }
};

interface MergeFieldTableProps {
  data: MergeField[];
  onDeleteMergeField: (id: string) => void;
  onCloseAddField: (val: boolean) => void;
  onDragRow: (nItems: OrderItem[]) => void;
}

const MergeFieldTable: React.FC<MergeFieldTableProps> = (props: MergeFieldTableProps) => {
  const { data, onDeleteMergeField, onCloseAddField, onDragRow } = props;
  // console.log('dataClone: ', data)
  const theme = useTheme();
  const { t } = useTranslation();

  const handleDelete = (id: string) => {
    onDeleteMergeField(id);
    onCloseAddField(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return null;
    }
    // console.log('result: ', result)
    const listCopy: any[] = [...data];
    const movedItem = listCopy.find((item) => item.id == result.draggableId);
    const listRemoved = listCopy.filter((item) => item.id != result.draggableId);
    if (movedItem) listRemoved.splice(result.destination.index, 0, movedItem);
    if (onDragRow) {
      let listChange: OrderItem[] = [];
      listRemoved.forEach((ele: any, index: number) => {
        listChange.push({
          id: ele.id,
          order: index
        });
      });
      onDragRow(listChange);
    }
    // onDragRow(resultObj);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TableRow>
            <TableCell sx={{ width: '5%', padding: '12px', textAlign: 'left' }}>{t('')}</TableCell>
            <TableCell sx={{ width: '20%', padding: '12px', textAlign: 'left' }}>{t('ncrm_generalsetting_placeholder')}</TableCell>
            <TableCell sx={{ width: '20%', padding: '12px', textAlign: 'left' }}>{t('ncrm_generalsetting_replacement')}</TableCell>
            <TableCell sx={{ width: '20%', padding: '12px', textAlign: 'left' }}>{t('ncrm_generalsetting_type')}</TableCell>
            {/* <TableCell sx={{ width: '10%', padding: '12px', textAlign: 'center', borderRight: 0 }}>
              {t('ncrm_generalsetting_delete')}
            </TableCell> */}
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {data?.length > 0 ? (
                  data?.map((item: any, index: number) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <TableRow ref={provided.innerRef} {...provided.draggableProps} key={item.id} sx={rowSx}>
                          <TableCell
                            sx={{
                              width: '5%',
                              padding: '12px',
                              borderRight: '1px solid ' + theme.palette.divider,
                              textAlign: 'left',
                              verticalAlign: 'middle',
                              fontWeight: 400
                              // cursor: 'move'
                            }}
                          >
                            <Tooltip title={t('Drag')} placement="left" disableInteractive>
                              <IconButton {...provided.dragHandleProps}>
                                <DragIndicatorIcon sx={{ cursor: 'move' }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: '20%',
                              padding: '12px',
                              borderRight: '1px solid ' + theme.palette.divider,
                              textAlign: 'left',
                              verticalAlign: 'middle',
                              fontWeight: 400
                            }}
                          >
                            {`${item.fieldTag}`}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: '20%',
                              padding: '12px',
                              borderRight: '1px solid ' + theme.palette.divider,
                              textAlign: 'left',
                              verticalAlign: 'middle',
                              fontWeight: 400
                            }}
                          >
                            {item.replace}
                          </TableCell>
                          <TableCell colSpan={2}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                              {item.fixed ? t('ncrm_setting_template_sample') : t('ncrm_generalsetting_preferences_desk_custom')}
                              <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                                <Tooltip title={t('ncrm_generalsetting_tooltip_title_remove')} placement="left" disableInteractive>
                                  <IconButton
                                    //TODO: check type === default => display: 'none'
                                    sx={{ display: item.fixed ? 'none' : '' }}
                                    onClick={() => {
                                      handleDelete(item.id);
                                    }}
                                  >
                                    <DeleteOutlineOutlined
                                      sx={{ cursor: 'pointer', visibility: 'hidden' }}
                                      className="item-option"
                                      fontSize="small"
                                      color="error"
                                    />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="table-body">
                      <NoData label={t('ncrm_common_no_data') as string} />
                    </TableCell>
                  </TableRow>
                )}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  );
};

export default MergeFieldTable;
{
  /* <TableRow key={item.id} sx={rowSx}>
                <TableCell
                  sx={{
                    width: '20%',
                    padding: '12px',
                    borderRight: '1px solid ' + theme.palette.divider,
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    fontWeight: 400
                  }}
                >
                  {`$$${item.fieldTag}$$`}
                </TableCell>
                <TableCell
                  sx={{
                    width: '20%',
                    padding: '12px',
                    borderRight: '1px solid ' + theme.palette.divider,
                    textAlign: 'left',
                    verticalAlign: 'middle',
                    fontWeight: 400
                  }}
                >
                  {item.replace}

                </TableCell>
                <TableCell colSpan={2} >
                  
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title={t('ncrm_generalsetting_tooltip_title_remove')} placement="left" disableInteractive>
                        <IconButton
                          //TODO: check type === default => display: 'none' 
                          // sx={{ display: 'none' }}
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          <DeleteOutlineOutlined
                            sx={{ cursor: 'pointer', visibility: 'hidden' }}
                            className="item-option"
                            fontSize="small"
                            color="error"
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                </TableCell>
              </TableRow> */
}
