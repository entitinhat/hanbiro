import Duration from '@base/components/@hanbiro/Duration';
import {
  Box,
  Select,
  InputAdornment,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  MenuItem,
  IconButton
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Section from '@settings/preferences/components/Section';
import useRepondByPriorityMutation from '@settings/preferences/hooks/desk/useRepondByPriorityMutation';
import { useRespondByPrioritySetting } from '@settings/preferences/hooks/desk/useRespondByPrioritySetting';
import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { RespondPriorityItem } from '@settings/preferences/types/desk/common';
import PriorityView from '@base/containers/ViewField/Priority/View';
import { Selection } from '@settings/general/types/interface';
import { PRIORITY_LANGS } from '@settings/preferences/config/constants';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import _ from 'lodash';

interface FirstRespondPriorityProps {}
const FirstRespondPriority: React.FC<FirstRespondPriorityProps> = (props: FirstRespondPriorityProps) => {
  const [items, setItems] = useState<RespondPriorityItem[]>([]);
  const [unit, setUnit] = React.useState('days');
  const { data, isLoading } = useRespondByPrioritySetting();
  const { mUpdate } = useRepondByPriorityMutation();
  const theme = useTheme();
  const { t } = useTranslation();

  const onSave = (newItems: RespondPriorityItem[]) => {
    const nSetting = {
      menu: 'desk',
      key: 'respond_priority',
      value: JSON.stringify(newItems)
    };
    mUpdate.mutate({ menuSetting: nSetting });
  };

  const onReset = (rIdx: number) => {
    const nItems = items.map((item, idx) => {
      if (rIdx == idx) {
        const nItem: RespondPriorityItem = {
          priority: item.priority,
          standardSla: {
            duration: 0,
            durationUnit: ''
          },
          premiumSla: {
            duration: 0,
            durationUnit: ''
          }
        };
        return nItem;
      }
      return item;
    });
    onSave(nItems);
    setItems([...nItems]);
  };

  const onRowChange = (nRow: RespondPriorityItem) => {
    const nItems = items.map((item) => {
      if (item.priority == nRow.priority) {
        return nRow;
      }
      return item;
    });
    setItems(nItems);
    onSave(nItems);
  };
  const debouncedOnSave = useRef(
    _.debounce((newItems) => {
      onSave(newItems);
    }, 800)
  ).current;

  const handleDurationChange = (event: any, index: number, slaType: number) => {
    const { value } = event.target;
    if (!Number(value) && Number(value) !== 0) {
      return;
    }
    const newItems = [...items];
    //slaType: 0 standard, 1 premium
    if (slaType === 0) {
      newItems[index].standardSla.duration = value;
    } else {
      newItems[index].premiumSla.duration = value;
    }
    setItems(newItems);
    debouncedOnSave(newItems);
  };

  useEffect(() => {
    if (!isLoading && data?.value) {
      try {
        const slas: RespondPriorityItem[] = JSON.parse(data.value);
        setItems(slas);
      } catch (err: any) {}
    }
  }, [data]);
  const getChipColor = (priority: string) => {
    const languageKey = PRIORITY_LANGS[priority];
    const value: Selection = {
      keyName: priority,
      languageKey: languageKey
    };
    return <PriorityView value={value} />;
  };

  return (
    <Section header={t('ncrm_generalsetting_preference_desk_time_to_1st_response_by_priority')}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '12px' }}>
        <Table>
          <TableHead sx={{ borderTop: 0, borderBottom: `0.3px solid ${theme.palette.divider}`, borderRadius: '10px' }}>
            <TableRow>
              <TableCell sx={{ width: '34%' }}>{t('ncrm_generalsetting_preferences_desk_priority')}</TableCell>
              <TableCell sx={{ width: '33%' }}>{t('ncrm_preferences_desk_standard_sla')}</TableCell>
              <TableCell sx={{ width: '33%' }}>{t('ncrm_preferences_desk_premium_sla')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ padding: 1 }}>{getChipColor(item.priority)}</TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <TextField
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingRight: 0
                      },
                      ml: 1,
                      input: { padding: 1 },
                      width: 450
                    }}
                    size="medium"
                    value={item.standardSla.duration}
                    onChange={(event) => {
                      handleDurationChange(event, idx, 0);
                    }}
                    placeholder="Type text"
                    inputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            padding: '17px 10px',
                            backgroundColor: (theme) => theme.palette.divider,
                            borderTopRightRadius: (theme) => theme.shape.borderRadius + 'px',
                            borderBottomRightRadius: (theme) => theme.shape.borderRadius + 'px',
                            marginLeft: 'auto',
                            marginRight: 0, // remove right space
                            border: 0,
                            '&:focus': {
                              border: 0,
                              boxShadow: 'none'
                            }
                          }}
                          position="end"
                        >
                          <Select
                            sx={{
                              boxShadow: 'none',
                              '.MuiOutlinedInput-notchedOutline': { border: 0 },
                              border: 0,
                              '&.Mui-focused': {
                                // outline: 'none',
                                boxShadow: 'none !important',
                                border: 'unset !important',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 }
                              },
                              '& fieldset': {
                                border: '0 !important',
                                boxShadow: 'unset !important',
                                '&.Mui-focused': {
                                  border: '0 !important',
                                  boxShadow: 'unset !important'
                                }
                              }
                            }}
                            size="small"
                            value={unit}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(event: SelectChangeEvent) => {
                              setUnit(event.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={'mins'}>mins</MenuItem>
                            <MenuItem value={'hrs'}>hours</MenuItem>
                            <MenuItem value={'days'}>days</MenuItem>
                            <MenuItem value={'months'}>months</MenuItem>
                            <MenuItem value={'years'}>years</MenuItem>
                          </Select>
                        </InputAdornment>
                      )
                    }}
                  />
                </TableCell>
                <TableCell sx={{ padding: 1 }}>
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
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          paddingRight: 0
                        },
                        ml: 1,
                        input: { padding: 1 },
                        width: 450
                      }}
                      size="medium"
                      value={item.premiumSla.duration}
                      onChange={(event) => {
                        handleDurationChange(event, idx, 1);
                      }}
                      placeholder="Type text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            sx={{
                              padding: '17px 10px',
                              backgroundColor: (theme) => theme.palette.divider,
                              borderTopRightRadius: (theme) => theme.shape.borderRadius + 'px',
                              borderBottomRightRadius: (theme) => theme.shape.borderRadius + 'px',
                              marginLeft: 'auto',
                              marginRight: 0 // remove right space
                            }}
                            position="end"
                          >
                            <Select
                              sx={{
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                border: 0,
                                '&.Mui-focused': {
                                  // outline: 'none',
                                  boxShadow: 'none !important',
                                  border: 'unset !important',
                                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                },
                                '& fieldset': {
                                  border: '0 !important',
                                  boxShadow: 'unset !important',
                                  '&.Mui-focused': {
                                    border: '0 !important',
                                    boxShadow: 'unset !important'
                                  }
                                }
                              }}
                              size="small"
                              value={unit}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              onChange={(event: SelectChangeEvent) => {
                                setUnit(event.target.value);
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={'mins'}>mins</MenuItem>
                              <MenuItem value={'hrs'}>hours</MenuItem>
                              <MenuItem value={'days'}>days</MenuItem>
                              <MenuItem value={'months'}>months</MenuItem>
                              <MenuItem value={'years'}>years</MenuItem>
                            </Select>
                          </InputAdornment>
                        )
                      }}
                    />
                    <IconButton
                      edge="end"
                      size="medium"
                      color="error"
                      sx={{ marginLeft: 'auto' }}
                      onClick={() => {
                        onReset(idx);
                      }}
                    >
                      <DeleteOutlineTwoTone
                        fontSize="small"
                        color="error"
                        sx={{
                          my: 'auto',
                          visibility: 'hidden'
                        }}
                      />
                    </IconButton>
                  </Box>
                </TableCell>
                {/* <TableCell sx={{ borderRight: '1px solid ' + theme.palette.divider, padding: 1 }}>
                  <Duration
                    value={item.standardSla}
                    onChange={(newVal) => {
                      const nRow: RespondPriorityItem = {
                        ...item,
                        standardSla: newVal
                      };
                      onRowChange(nRow);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ padding: 1 }}>
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
                    <Duration
                      value={item.premiumSla}
                      onChange={(newVal) => {
                        const nRow: RespondPriorityItem = {
                          ...item,
                          premiumSla: newVal
                        };
                        onRowChange(nRow);
                      }}
                    />
                    <CloseIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '18px',
                        my: 'auto',
                        ml: 2,
                        visibility: 'hidden',
                        strokeWidth: '2.5px'
                      }}
                      color="error"
                      onClick={() => {
                        onReset(idx);
                      }}
                    />
                  </Box>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default FirstRespondPriority;
