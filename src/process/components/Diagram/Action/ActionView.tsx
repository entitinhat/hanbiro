import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import View from '@base/containers/ViewField/Text/View';
import { parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { Grid, InputLabel, Stack, useTheme } from '@mui/material';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import { Action } from '@process/types/process';
import SwitchView from '@base/containers/ViewField/Switch/View';
import { useTranslation } from 'react-i18next';

interface ActionViewProps {
  value: Action;
}

function ActionView({ value }: ActionViewProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const stepSetting = useRecoilValue(stepSettingAtom);

  console.log("Action View", stepSetting, value)

  return (
    <>
      {stepSetting && value && (
        <Grid container spacing={0}>
          {stepSetting.method && (
            <Grid item xs={12} sm={6}>
              <View value={value.method} />
            </Grid>
          )}
          {stepSetting.template && (
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_action_template'} />
                </InputLabel>
                <View value={value.template?.name as string} />
              </Stack>
            </Grid>
          )}
          {stepSetting.email && (
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_action_send_by_email'} />
                </InputLabel>
                <SwitchView value={value.sendEmail} />
              </Stack>
            </Grid>
          )}
          {stepSetting.due && (
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <InputLabel sx={{ display: 'flex' }}>
                  <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_action_duration'} />
                </InputLabel>
                <View
                  value={parseDurationValueToString({
                    duration: value.duration?.time,
                    durationUnit: value.duration?.unit
                  })}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

export default ActionView;
