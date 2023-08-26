import _ from 'lodash';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import Duration from '@base/components/@hanbiro/Duration';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LookUp from '@base/containers/LookUp';
import { useMenuTemplates } from '@base/services/settingService';
import { TemplateGroup, TemplateGroupNum } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { Grid, InputLabel, Stack, useTheme } from '@mui/material';
import Method from '@process/components/Method/MethodWrite';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import { Action } from '@process/types/process';
import { useTranslation } from 'react-i18next';
interface ActionWriteProps {
  value: Action;
  onChange: (val: Action) => void;
}

function ActionWrite(props: ActionWriteProps) {
  const theme = useTheme();
  const { value, onChange } = props;
  const stepSetting = useRecoilValue(stepSettingAtom);
  const { t } = useTranslation()

  const onTemplateChange = useCallback(
    (val: any) => {
      onChange && onChange({ ...value, template: { id: val.id, name: val.name } });
    },
    [value]
  );

  const onMethodChange = useCallback(
    (val: string) => {
      onChange && onChange({ ...value, method: val });
    },
    [value]
  );

  const onSendEmailChange = useCallback(
    (v: boolean) => {
      onChange && onChange({ ...value, sendEmail: v });
    },
    [value]
  );

  const onDurationChange = useCallback(
    (val: DurationValue) => {
      onChange && onChange({ ...value, duration: { time: val.duration, unit: val.durationUnit } });
    },
    [value]
  );

  return (
    <Grid container spacing={0}>
      {stepSetting.method && (
        <Grid item xs={12} sm={12}>
          <Method value={value.method} onChange={onMethodChange} />
        </Grid>
      )}
      {stepSetting.email && (
        <Grid item xs={12} sm={6}>
          <MuiCheckbox label={t('ncrm_process_action_send_by_email') as string} value={value.sendEmail} onChange={(v: boolean) => onSendEmailChange(v)} />
        </Grid>
      )}
      {stepSetting.template && (
        <Grid item xs={12} sm={6}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Template'} />
            </InputLabel>
            <LookUp
              fetchList={useMenuTemplates}
              fieldValue={'id'}
              fieldLabel={'name'}
              extraParams={{ templateGroup: TemplateGroupNum[TemplateGroup.EMAIL] }}
              onChange={onTemplateChange}
              value={value.template}
              isMultiple={false}
              isSearch={false}
            />
          </Stack>
        </Grid>
      )}
      {stepSetting.due && (
        <Grid item xs={12} sm={6}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_action_duration'} />
            </InputLabel>
            <Duration value={{ duration: value.duration.time, durationUnit: value.duration.unit }} onChange={onDurationChange} />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default ActionWrite;
