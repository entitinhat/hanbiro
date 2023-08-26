import React, { useCallback, useMemo, useState } from 'react';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { Add, ModeEdit } from '@mui/icons-material';
import { Button, Grid, InputLabel, List, ListItemButton, ListItemText, Stack, Typography, useTheme } from '@mui/material';
import { useGetDefinedItems } from '@process/hooks/useDefinedItem';
import { GET_DEFINED_ITEMS } from '@process/services/custom';
import { BusinessStatus } from '@process/types/process';
import { getStepStatuses } from '@process/utils/helper';

import InstantWrite, { InstantValue, InstantsValue } from '../Instant';
import CriteriaView from './CriteriaView';
import { useTranslation } from 'react-i18next';

export interface CriteriaValue {
  criteria: OptionValue;
  instants: InstantsValue;
}

export interface openInstantState {
  id: string;
  mode: 'w' | 'v';
  open: boolean;
  action?: InstantValue;
}

interface CriteriaAutomationProps {
  triggerModule: string;
  value: CriteriaValue;
  onChange?: (option: CriteriaValue) => void;
  componentProps?: {
    [x: string]: any;
  };
}

function CriteriaAutomation(props: CriteriaAutomationProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { value, triggerModule, onChange, componentProps } = props;
  const mode = componentProps?.mode ?? 'edit';
  const [criteriaValue, setCriteriaValue] = useState(value)

  console.log('criteira Value', criteriaValue);
  console.log('onChnage', onChange)
  const [openInstant, setOpenInstant] = useState<openInstantState>({
    id: '',
    mode: 'w',
    open: false
  });

  const { results: definedTriggers } = useGetDefinedItems(GET_DEFINED_ITEMS, 'criteria', { type: 'TYPE_CRITERIA' });

  const criteriaOptions = useMemo(() => {
    let options: OptionValue[] = [];
    if (definedTriggers && definedTriggers.results) {
      options = definedTriggers.results.map((v) => {
        return {
          keyName: v.id,
          languageKey: v.name,
          extra: v.statuses
        };
      });
    }
    return options;
  }, [definedTriggers]);

  const onChangeCriteria = useCallback(
    (option: OptionValue) => {
      onChange && onChange({ ...criteriaValue, instants: {}, criteria: option });
      setOpenInstant({ id: '', mode: 'w', open: false });
    },
    [criteriaValue]
  );

  const statusesValue = useMemo(() => {
    if (criteriaOptions) {
      const find = criteriaOptions.find((criteria) => criteria.keyName == criteriaValue?.criteria?.keyName);
      if (find) {
        return getStepStatuses('TYPE_CRITERIA', find.extra as BusinessStatus[]);
      }
    }
    return [];
  }, [criteriaOptions, criteriaValue?.criteria?.keyName]);

  const onChangeInstant = useCallback(
    (v: openInstantState, instants?: InstantsValue) => {
      console.log('instant', instants);
      instants && setCriteriaValue({ ...criteriaValue, instants: instants })
      instants && onChange && onChange({ ...criteriaValue, instants: instants });
      setOpenInstant(v);
    },
    [criteriaValue]
  );

  const onInstantEditOpen = useCallback((id: string, action: InstantValue) => {
    setOpenInstant({ id: id, action: action, mode: 'v', open: true });
  }, []);

  const onInstantOpen = useCallback((id: string) => {
    setOpenInstant({ id: id, mode: 'w', open: true });
  }, []);

  const statusCount = statusesValue.length;

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Grid item xs={12} sm={12}>
        <Stack spacing={0.5}>
          {/* <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Criteria Name'} />
          </InputLabel> */}
          {mode == 'edit' ? (
            <SelectBox options={criteriaOptions} value={criteriaValue.criteria} onChange={(newVal) => onChangeCriteria(newVal)} />
          ) : (
            <Typography>{criteriaValue.criteria.languageKey}</Typography>
          )}
        </Stack>
      </Grid>
      {statusCount > 0 && (
        <>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'options_items__process_status_view'} />
              </InputLabel>
              <Grid container spacing={0}>
                {statusesValue.map((status, index) => {
                  if (statusCount == index + 1) return;
                  return (
                    <React.Fragment key={status.id}>
                      <CriteriaView status={status} />
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'options_items__process_status_build'} />
              </InputLabel>
              <Grid container spacing={0}>
                <Grid item xs={openInstant ? 4.2 : 12}>
                  {statusesValue.map((status, index) => {
                    if (statusCount == index + 1) return;
                    const instants = criteriaValue.instants[status.id];
                    return (
                      <div key={status.id} className="diagram-item diagram-criteria with-boolean-direction">
                        <div className="criteria-shape"></div>
                        <div className="diagram-item-name">{status.button}</div>
                        <div className="direction-true">
                          {!openInstant.open && (
                            <Stack spacing={1} className="immediate-action" sx={{ boxShadow: theme.customShadows.z1 }}>
                              <div className="action-header">{t('ncrm_process_automation_instant_actions')}</div>
                              <List disablePadding>
                                {instants?.map((action) => {
                                  return (
                                    <ListItemButton
                                      disableGutters
                                      sx={{ py: 0.5, px: 1 }}
                                      key={action.id}
                                      onClick={() => onInstantEditOpen(status.id, action)}
                                    >
                                      <ModeEdit sx={{ mr: 1, width: '16px' }} />
                                      <ListItemText primary={action.name} />
                                    </ListItemButton>
                                  );
                                })}
                              </List>
                              <Button
                                size="small"
                                sx={{ '&:hover': { bgcolor: 'transparent' } }}
                                startIcon={<Add />}
                                onClick={() => onInstantOpen(status.id)}
                              >
                                {t('ncrm_process_automation_add_action')}
                              </Button>
                            </Stack>
                          )}
                        </div>
                        <div className="direction-false"></div>
                      </div>
                    );
                  })}
                </Grid>
                {openInstant.open && (
                  <Grid item xs={7.8}>
                    <InstantWrite
                      instants={criteriaValue.instants}
                      openInstant={openInstant}
                      triggerModule={triggerModule}
                      onChangeInstant={onChangeInstant}
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
          </Grid>
        </>
      )}
    </Stack>
  );
}

export default CriteriaAutomation;
