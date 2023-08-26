import { generateUUID } from '@base/utils/helpers';
import React, { useState, useEffect } from 'react';
import { TicketClassification } from '@settings/preferences/types/desk/common';
import { useTicketClassificationsSetting } from '@settings/preferences/hooks/desk/useTicketClassification';

import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Switch,
  Typography,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useTicketClassificationMutation from '@settings/preferences/hooks/desk/useTicketClassificationMutation';
import Section from '@settings/preferences/components/Section';
import { DeleteOutlineTwoTone, SaveOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { ASC } from '@base/config/constant';
import { debounce } from 'lodash';
interface TicketClassificationProps { }
interface TagProps {
  label: string;
  onClick?: any;
  type?: string; //delete or add, default: delete
  editTag?: () => void;
}
interface TagEditProps {
  idTag: string;
  index: number;
  label: string;
}
const TicketClassification: React.FC<TicketClassificationProps> = (props: TicketClassificationProps) => {
  const [items, setItems] = useState<TicketClassification[]>([]);
  const { data, isLoading, refetch } = useTicketClassificationsSetting(false, '', {
    sort: { field: 'createdAt', orderBy: ASC }
  });
  const { mUpdate, mAdd, mDelete } = useTicketClassificationMutation();
  const theme = useTheme();
  const { t } = useTranslation();

  const [addTag, setAddTag] = useState<string>('');
  const [editTag, setEditTag] = useState<TagEditProps>({ idTag: '', index: -1, label: '' });
  const [contentTag, setContentTag] = useState<string>('');
  const [contentName, setContentName] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);

  const onChangeValues = (nVal: string, rIdx: number) => {
    const aVals = nVal.split(',');
    const editItem = items[rIdx];
    let nItem = {
      ...editItem,
      values: aVals
    };
    if (editItem.id && editItem.id != '') {
      mUpdate.mutate({ classification: nItem });
    } else if (editItem.id == '' && editItem.name != '') {
      nItem.id = generateUUID();
      mAdd.mutate(
        { classification: nItem },
        {
          onSuccess: () => {
            refetch();
          }
        }
      );
    }
    updateItemsLC(nItem, rIdx);
  };

  const updateItemsLC = (nItem: TicketClassification, rIdx: number) => {
    const nItems = items.map((item, idx) => {
      if (idx == rIdx) {
        return nItem;
      }
      return item;
    });
    setItems(nItems);
  };

  const onChangeName = (nName: string, nValue: any[], nActive: boolean, rIdx: number) => {
    const editItem = items[rIdx];
    if (editItem.id !== '') {
      // do update
      const nItem = {
        ...editItem,
        name: nName,
        values: nValue,
        active: nActive
      };
      updateItemsLC(nItem, rIdx);
      // console.log('nItem: ', nItem)
      mUpdate.mutate(
        { classification: nItem },
        {
          onSuccess: () => {
            refetch();
          }
        }
      );
    } else {
      // do create
      const nItem = {
        ...editItem,
        id: generateUUID(),
        name: nName,
        values: nValue,
        active: nActive
      };
      mAdd.mutate(
        { classification: nItem },
        {
          onSuccess: () => {
            refetch();
          }
        }
      );
      updateItemsLC(nItem, rIdx);
    }
    setAddTag('');
    setContentName('');
    setContentTag('');
  };
  const onDelete = (id: string) => {
    mDelete.mutate(
      { ids: [id] },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );
  };
  const onAddRow = () => {
    const nItems = [...items, { id: '', name: '', values: [], active: false }];
    if (data?.results) {
      if (nItems.length === data?.results.length + 1) {
        setItems(nItems);
      }
    }
  };
  const onClossAddRow = () => {
    const nItems = items.slice(0, -1);
    setItems(nItems);
    setAddTag('');
    setContentName('');
    setContentTag('');
  };
  useEffect(() => {
    if (!isLoading && data?.results) {
      setItems(data.results);
    }
  }, [data]);
  const onSave = (param: any[]) => {
    mUpdate.mutate(
      { classification: param },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );
  }
  const debouncedOnSave = debounce((newItems) => {
    onSave(newItems);
  }, 800);
  const border = '1px solid ' + theme.palette.divider;
  function Tag(props: TagProps) {
    const { label, onClick, type, editTag } = props;
    return (
      <div
        style={{
          display: label ? 'flex' : 'none',
          alignItems: 'center',
          height: 28,
          margin: 2,
          backgroundColor: '#fafafa',
          border: `${type === 'add' ? '2px dotted #e8e8e8' : '1px solid #e8e8e8'}`,
          borderRadius: '2px',
          boxSizing: 'content-box',
          padding: `${type === 'add' ? '0 10px 0 4px' : '0 10px 2px 10px'}`,
          outline: 0,
          overflow: 'hidden'
        }}
      >
        {/* {type === 'add' && <AddIcon sx={{ color: 'black', fontSize: '15px' }} onClick={onClick} />} */}
        <span style={{ color: 'black' }} onClick={editTag}>
          {label}
        </span>
        {(!type || type === 'delete') && (
          <CloseIcon
            sx={{ color: 'black', fontSize: '15px', cursor: 'pointer', marginLeft: 1, '&:hover': { color: '#ff4d4f' } }}
            onClick={onClick}
          />
        )}
      </div>
    );
  }
  const buttonStyles = {
    border: `2px dotted ${theme.palette.divider}`,
    padding: 0,
    color: '#000',
    backgroundColor: 'none',
    '&:hover': {
      border: `2px dotted ${theme.palette.divider}`,
      color: '#000'
    },
    '&:focus': {
      border: `2px dotted ${theme.palette.divider}`,
      color: '#000'
    }
  };

  const addButton = (item: string) => (
    <Button variant="outlined" sx={buttonStyles} onClick={() => setAddTag(item)}>
      {`+ ${t('ncrm_generalsetting_preferences_tooltip_title_add')}`}
    </Button>
  );

  const cancelButton = (
    <Button variant="outlined" sx={buttonStyles} onClick={() => setAddTag('')}>
      {'Cancel'}
    </Button>
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && contentTag !== '') {
      setContentTag((prevContent) => prevContent + ',');
      event.preventDefault();
    }
  };
  // console.log('data.result: ', data?.results)
  return (
    <Section
      header={t('ncrm_generalsetting_preferences_desk_ticket_classification')}
    //subTitle={t('ncrm_generalsetting_preferences_desk_ticket_classification_sub_title') as string}
    >
      <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '12px' }}>
        <Table>
          <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell sx={{ width: '40%' }}>{t('ncrm_generalsetting_preferences_desk_classification')}</TableCell>
              <TableCell sx={{ width: '40%' }}>{t('ncrm_generalsetting_preferences_desk_values')}</TableCell>
              <TableCell sx={{ width: '20%' }}>{t('ncrm_generalsetting_active')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {items.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{
                  ':hover': {
                    svg: {
                      visibility: 'visible'
                    }
                  }
                }}
              >
                <TableCell sx={{ padding: 5 }}>
                  <>
                    {!(idx > 1) && <Typography>{item.name}</Typography>}
                    {idx > 1 && (
                      <TextField
                        value={item.name ? item.name : contentName}
                        placeholder={t('ncrm_generalsetting_preferences_desk_classification_placeholder') as string}
                        onChange={(event: any) => {
                          if (item.name) {
                            const newItems = [...items];
                            newItems[idx] = {
                              ...newItems[idx],
                              name: event.target.value
                            };
                            const param = {
                              id: item.id,
                              name: newItems[idx].name
                            };
                            setItems(newItems);
                            debouncedOnSave(param)
                          } else {
                            setContentName(event.target.value);
                          }
                        }}
                      />
                    )}
                  </>
                </TableCell>
                <TableCell sx={{ pading: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      ':hover': {
                        svg: {
                          visibility: 'visible'
                        }
                      }
                    }}
                  >
                    {item.name !== '' && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                          ':hover': {
                            svg: {
                              visibility: 'visible'
                            }
                          }
                        }}
                      >
                        {item.values?.map((value, idxVal) => (
                          <Tag
                            key={value}
                            label={value}
                            onClick={() => {
                              if (item.values.length !== 1) {
                                item.values.splice(idxVal, 1);
                              } else {
                                item.values = [''];
                              }
                              onChangeName(item.name, item.values, item.active, idx);
                            }}
                            editTag={() => {
                              setEditTag({ idTag: item.id, index: idxVal, label: value });
                            }}
                          />
                        ))}{' '}
                        {addTag === '' ? addButton(item.id) : addTag === item.id ? cancelButton : addButton(item.id)}
                        {addTag === item.id && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TextField
                              sx={{ marginTop: 1 }}
                              fullWidth
                              placeholder={t('ncrm_generalsetting_preferences_desk_values_placeholder') as string}
                              onChange={(event) => setContentTag(event.target.value)}
                              value={contentTag}
                              onKeyDown={handleKeyDown}
                            />
                            <IconButton
                              sx={{ marginLeft: 1 }}
                              size="small"
                              color="primary"
                              onClick={() => {
                                if (contentTag.indexOf(',') === -1) {
                                  item.values.push(contentTag);
                                } else {
                                  item.values = item.values.concat(contentTag.split(','));
                                }
                                onChangeName(item.name, item.values, item.active, idx);
                              }}
                            >
                              <SaveOutlined fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                        {editTag.idTag === item.id && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TextField
                              sx={{ marginTop: 1 }}
                              fullWidth
                              placeholder={t('ncrm_generalsetting_preferences_desk_values_placeholder') as string}
                              onChange={(e) => {
                                setEditTag((prevTag) => {
                                  return {
                                    ...prevTag,
                                    label: e.target.value
                                  };
                                });
                              }}
                              value={editTag.label}
                            // onKeyDown={handleKeyDown}
                            />
                            <IconButton
                              sx={{ marginLeft: 1 }}
                              size="small"
                              color="primary"
                              onClick={() => {
                                const newValues = [...item.values];
                                newValues[editTag.index] = editTag.label;
                                onChangeName(item.name, newValues, item.active, idx);
                                setEditTag({ idTag: '', index: -1, label: '' });
                              }}
                            >
                              <SaveOutlined fontSize="small" />
                            </IconButton>
                            <IconButton
                              edge="end"
                              size="medium"
                              color="error"
                              sx={{ marginLeft: 'auto' }}
                              onClick={() => {
                                setEditTag({ idTag: '', index: -1, label: '' });
                              }}
                            >
                              <DeleteOutlineTwoTone
                                fontSize="small"
                                color="error"
                                sx={{
                                  my: 'auto',
                                  visibility: !item.id ? '' : 'hidden'
                                }}
                              />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    )}
                    {item.name === '' && (
                      <TextField
                        fullWidth
                        value={contentTag}
                        placeholder={t('ncrm_generalsetting_preferences_desk_values_placeholder') as string}
                        onChange={(event: any) => {
                          setContentTag(event.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                      />
                    )}
                  </Box>
                </TableCell>

                <TableCell sx={{ pading: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Switch
                      size="small"
                      checked={item.id ? item.active : checked}
                      onChange={(event) => {
                        // item.active = checked;
                        if (item.id !== '') {
                          item.active = !item.active;
                          const nItem = {
                            id: item.id,
                            active: item.active
                          };
                          mUpdate.mutate(
                            { classification: nItem },
                            {
                              onSuccess: () => {
                                refetch();
                              }
                            }
                          );
                        } else {
                          setChecked(event.target.checked);
                          item.active = checked;
                          // setChecked(false);
                        }
                      }}
                    />
                    <IconButton
                      sx={{ marginLeft: 'auto', display: !item.id && contentName !== '' ? '' : 'none' }}
                      size="small"
                      color="primary"
                      onClick={() => {
                        // console.log('contentTag:', contentTag.includes(',') ? contentTag.split(',') : [contentTag])
                        onChangeName(contentName, contentTag.includes(',') ? contentTag.split(',') : [contentTag], checked, idx);
                      }}
                    >
                      <SaveOutlined
                        fontSize="small"
                        color="primary"
                        sx={{
                          my: 'auto',
                          visibility: !item.id ? '' : 'hidden'
                        }}
                      />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="medium"
                      color="error"
                      sx={{ marginLeft: 'auto', display: item.name === 'Language' || item.name === 'Region' ? 'none' : '' }}
                      onClick={() => {
                        if (item.id === '') {
                          onClossAddRow();
                        } else {
                          onDelete(item.id);
                        }
                      }}
                    >
                      <DeleteOutlineTwoTone
                        fontSize="small"
                        color="error"
                        sx={{
                          my: 'auto',
                          visibility: !item.id ? '' : 'hidden'
                        }}
                      />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          padding: '15px 20px',
          borderBottomRightRadius: '4px',
          borderBottomLeftRadius: '4px',
          borderTop: border,
          backgroundColor: `${theme.palette.background.paper}`
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            onAddRow();
          }}
        >
          <AddIcon />
          {t('ncrm_common_btn_add_another_line')}
        </Button>
      </Box>
    </Section>
  );
};

export default TicketClassification;
