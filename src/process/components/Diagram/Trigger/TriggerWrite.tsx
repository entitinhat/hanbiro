import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { Box, Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { PROCESS_STATUS_PROPERTIES_VIEW, TRIGGER_TYPE } from '@process/config/constants';
import useTrigger from '@process/hooks/useTrigger';

interface TriggerWriteProps {
  mode: 'view' | 'edit';
  value: string;
  onChange?: (val: string) => void;
}

function TriggerWrite(props: TriggerWriteProps) {
  const { t } = useTranslation()
  const theme = useTheme();
  const { value, onChange, mode } = props;
  const [defined, options] = useTrigger(value, 'wait');

  const onChangeTrigger = useCallback((val: OptionValue) => {
    onChange && onChange(val.keyName);
  }, []);

  const triggerValue = useMemo(() => {
    return options.find((opt) => opt.keyName == value) ?? { keyName: '', languageKey: '' };
  }, [value, options]);

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_trigger_name'} />
          </InputLabel>
          {mode == 'edit' ? (
            <SelectBox options={options} value={triggerValue} onChange={(newVal) => onChangeTrigger(newVal)} />
          ) : (
            <Typography>{triggerValue.languageKey}</Typography>
          )}
        </Stack>
      </Grid>
      {defined?.trigger && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_trigger_type'} />
                </InputLabel>
                <Typography>{TRIGGER_TYPE[defined.trigger]}</Typography>
              </Stack>
            </Grid>
            {(defined.trigger == 'TRIGGER_TYPE_RECORD_CREATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_UPDATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_CREATED_UPDATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_DELETED') && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel sx={{ display: 'flex' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_record'} />
                  </InputLabel>
                  <Divider />
                  <Stack>
                    <Typography>{t('ncrm_process_step_module')}</Typography>
                    <Typography>{defined.module}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            )}

            {defined?.trigger === 'TRIGGER_TYPE_FIELD_UPDATED' && (
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel sx={{ display: 'flex' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_field'} />
                  </InputLabel>
                  <Divider />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography>{t('ncrm_process_step_module')}</Typography>
                      <Typography>{defined.module}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{t('ncrm_process_step_field')}</Typography>
                      <Typography>{defined.field}</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            )}
            {defined?.trigger === 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED' && (
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel sx={{ display: 'flex' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_process'} />
                  </InputLabel>
                  <Box>
                    <Grid item xs={6}>
                      <Typography>{t('ncrm_process_step_field_type')}</Typography>
                      <Typography>{defined.ptype}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{t('ncrm_process_step_module')}</Typography>
                      <Typography>{defined.module}</Typography>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid item xs={4}>
                      <Typography>{t('ncrm_process_automation_process_name')}</Typography>
                      <Typography>{defined.process.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>{t('ncrm_process_automation_step_name')}</Typography>
                      <Typography>{defined.step.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>{t('ncrm_process_automation_step_property')}</Typography>
                      <Typography>{PROCESS_STATUS_PROPERTIES_VIEW[defined.property]}</Typography>
                    </Grid>
                  </Box>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default TriggerWrite;
