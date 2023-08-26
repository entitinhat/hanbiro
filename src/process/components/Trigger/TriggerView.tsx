import _ from 'lodash';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { TriggerForm } from '@process/types/process';

interface TriggerViewProps {
  value: TriggerForm;
}

function TriggerView(props: TriggerViewProps) {
  const { value: triggerForm } = props;
  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Type'} />
          </InputLabel>
          <Typography>{triggerForm.trigger?.languageKey}</Typography>
        </Stack>
      </Grid>
      {(triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_CREATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_UPDATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_CREATED_UPDATED' ||
        triggerForm.trigger.keyName == 'TRIGGER_TYPE_RECORD_DELETED') && (
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Record'} />
            </InputLabel>
            <Divider />
            <Stack>
              <Typography>Module</Typography>
              <Typography>{triggerForm.module?.languageKey}</Typography>
            </Stack>
          </Stack>
        </Grid>
      )}
      {triggerForm.trigger.keyName == 'TRIGGER_TYPE_FIELD_UPDATED' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Field'} />
            </InputLabel>
            <Divider />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>Module</Typography>
                <Typography>{triggerForm.module?.languageKey}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Field</Typography>
                <Typography>{triggerForm.field?.languageKey}</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      )}
      {triggerForm.trigger.keyName == 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Process'} />
            </InputLabel>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Type</Typography>
                <Typography>{triggerForm.ptype?.languageKey}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Module</Typography>
                <Typography>{triggerForm.module?.languageKey}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Process Name</Typography>
                <Typography>{triggerForm.process?.languageKey}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Step Name</Typography>
                <Typography>{triggerForm.step?.languageKey}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Step Property</Typography>
                <Typography>{triggerForm.property?.languageKey}</Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default TriggerView;
