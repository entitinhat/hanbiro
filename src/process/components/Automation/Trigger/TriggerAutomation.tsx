import _ from 'lodash';
import { useCallback } from 'react';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { MODULE, PROCESS_STATUS_PROPERTIES_VIEW, TRIGGER_TYPE } from '@process/config/constants';
import useTrigger from '@process/hooks/useTrigger';
import { useTranslation } from 'react-i18next';

interface TriggerAutomationProps {
  value: OptionValue;
  onChange?: (option: OptionValue) => void;
  componentProps?: {
    [x: string]: any;
  };
}

function TriggerAutomation(props: TriggerAutomationProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { value: triggerValue, onChange, componentProps } = props;
  const [defined, options = []] = useTrigger(triggerValue?.keyName);
  const mode = componentProps?.mode ?? 'edit';

  console.log('triggerValue', mode, triggerValue);

  const onChangeTrigger = useCallback((val: OptionValue) => {
    onChange && onChange(val);
  }, []);

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Grid item xs={12} sm={12}>
        <Stack spacing={0.5}>
          {/* <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Trigger Name'} />
          </InputLabel> */}
          {mode == 'edit' ? (
            <SelectBox options={options} value={triggerValue} onChange={(newVal) => onChangeTrigger(newVal)} />
          ) : (
            <Typography>{triggerValue.languageKey}</Typography>
          )}
        </Stack>
      </Grid>
      {defined?.trigger && (
        <Grid item xs={12} sm={12}>
          <Stack spacing={1} sx={{ my: 1, p: 2, borderRadius: 1, bgcolor: theme.palette.secondary.lighter }}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_automation_rule_trigger_type'} />
              </InputLabel>
              <Typography>{TRIGGER_TYPE[defined.trigger]}</Typography>
            </Stack>
            {(defined.trigger == 'TRIGGER_TYPE_RECORD_CREATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_UPDATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_CREATED_UPDATED' ||
              defined.trigger == 'TRIGGER_TYPE_RECORD_DELETED') && (
              <Stack spacing={1}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_automation_rule_record'} />
                </InputLabel>
                <Divider />
                <Stack>
                  <Typography>{t('ncrm_process_automation_rule_module')}</Typography>
                  <Typography>{MODULE[defined.module]}</Typography>
                </Stack>
              </Stack>
            )}

            {defined?.trigger === 'TRIGGER_TYPE_FIELD_UPDATED' && (
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_automation_rule_field'} />
                </InputLabel>
                <Divider />
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <Typography>{t('ncrm_process_automation_rule_module')}</Typography>
                    <Typography>{MODULE[defined.module]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{t('ncrm_process_automation_rule_field')}</Typography>
                    <Typography>{defined.field}</Typography>
                  </Grid>
                </Grid>
              </Stack>
            )}
            {defined?.trigger === 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED' && (
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Process'} />
                </InputLabel>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>{t('ncrm_process_automation_rule_type')}</Typography>
                    <Typography>{defined.ptype}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{t('ncrm_process_automation_rule_module')}</Typography>
                    <Typography>{MODULE[defined.module]}</Typography>
                  </Grid>
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
                </Grid>
              </Stack>
            )}
          </Stack>
        </Grid>
      )}
    </Stack>
  );
}

export default TriggerAutomation;
