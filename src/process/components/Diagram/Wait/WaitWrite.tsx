import dayjs from 'dayjs';
import _ from 'lodash';
import React, { Suspense, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DateTimePicker from '@base/components/@hanbiro/Date/DateTimePicker';
import Duration from '@base/components/@hanbiro/Duration';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { WHEN_OPTIONS } from '@base/config/constant';
import { DurationValue, OptionValue } from '@base/types/common';
import { parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import TriggerWrite from '@process/components/Diagram/Trigger/TriggerWrite';
import { Wait } from '@process/types/process';

import { TYPE_OPTIONS } from '.';

interface WaitWriteProps {
  mode: 'view' | 'edit';
  value: Wait;
  onChange: (val: Wait) => void;
  componentProps?: any;
}

function WaitWrite({ value, onChange, mode, componentProps }: WaitWriteProps) {
  const theme = useTheme();
  const { t } = useTranslation()
  console.log('wait value', value, componentProps);
  if (componentProps?.mode) {
    mode = componentProps.mode;
  }

  const onTypeChange = useCallback(
    (val: OptionValue) => {
      let newVal = _.cloneDeep(value);
      if (val.keyName == 'WAIT_UNTIL_TRIGGER') {
        if (!newVal.trigger) {
          newVal.trigger = '';
        }
      } else if (val.keyName == 'WAIT_UNTIL_DATE_TIME') {
        if (!newVal.datetime) {
          newVal.datetime = new Date().toISOString();
        }
      } else if (val.keyName == 'WAIT_UNTIL_AND_JOIN') {
      } else if (val.keyName == 'WAIT_BY_DURATION') {
        if (!newVal.duration) {
          newVal.duration = {
            time: 1,
            unit: 'TERM_DAY'
          };
        }
      } else if (val.keyName == 'WAIT_SCHEDULE_ATTRIBUTE') {
        if (!newVal.schedule) {
          newVal.schedule = {
            when: 'WHEN_AFTER',
            duration: { time: 1, unit: 'TERM_HOUR' },
            attr: ''
          };
        }
      }
      onChange && onChange({ ...newVal, type: val.keyName });
    },
    [value]
  );

  const onTriggerChange = useCallback(
    (val: string) => {
      onChange && onChange({ ...value, trigger: val });
    },
    [value]
  );

  const onChangeDate = useCallback(
    (val: Date | null) => {
      if (!val) return;
      onChange && onChange({ ...value, datetime: dayjs(val).toISOString() });
    },
    [value]
  );

  const onDuration = useCallback(
    (val: DurationValue) => {
      onChange && onChange({ ...value, duration: { time: val.duration, unit: val.durationUnit } });
    },
    [value]
  );

  const onScheduleDuration = useCallback(
    (val: DurationValue) => {
      onChange &&
        onChange({
          ...value,
          schedule: {
            ...value.schedule,
            duration: { time: val.duration, unit: val.durationUnit }
          }
        });
    },
    [value]
  );

  const onScheduleWhen = useCallback(
    (val: OptionValue) => {
      onChange &&
        onChange({
          ...value,
          schedule: {
            ...value.schedule,
            when: val.keyName
          }
        });
    },
    [value]
  );

  const onScheduleAttribute = useCallback(
    (val: OptionValue) => {
      onChange &&
        onChange({
          ...value,
          schedule: {
            ...value.schedule,
            attr: val.keyName
          }
        });
    },
    [value]
  );

  const typeValue = useMemo(() => {
    return TYPE_OPTIONS.find((opt) => opt.keyName == (value.type as string)) ?? { keyName: '', languageKey: '' };
  }, [value.type]);

  const whenValue = useMemo(() => {
    return WHEN_OPTIONS.find((opt) => opt.keyName == value.schedule?.when) ?? { keyName: '', languageKey: '' };
  }, [value.schedule?.when]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_wait_type'} />
          </InputLabel>
          {mode == 'edit' ? (
            <SelectBox options={TYPE_OPTIONS} value={typeValue} onChange={onTypeChange} />
          ) : (
            <Typography>{t(TYPE_OPTIONS.find(item => item.keyName == value.type)?.languageKey || '')}</Typography>
          )}
        </Stack>
      </Grid>

      {value?.type == 'WAIT_UNTIL_TRIGGER' && (
        <Suspense fallback={<></>}>
          <TriggerWrite mode={mode} onChange={onTriggerChange} value={value?.trigger} />
        </Suspense>
      )}

      {value?.type == 'WAIT_UNTIL_DATE_TIME' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_step_wait_date_time'} />
            </InputLabel>

            {mode == 'edit' ? (
              <DateTimePicker
                value={value.datetime ? dayjs(value.datetime).toDate() : null}
                onChange={(val) => onChangeDate(val)}
                inputFormat={'YYYY/MM/DD HH:mm'}
              />
            ) : (
              <Typography>{value.datetime ? dayjs(value.datetime).format('YYYY/MM/DD HH:mm') : ''}</Typography>
            )}
          </Stack>
        </Grid>
      )}
      {value?.type == 'WAIT_BY_DURATION' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_action_duration'} />
            </InputLabel>
            <Stack spacing={1} direction="row" alignItems="baseline">
              <Typography>Wait</Typography>
              {mode == 'edit' ? (
                <Duration
                  value={{
                    duration: value.duration?.time,
                    durationUnit: value.duration?.unit
                  }}
                  onChange={onDuration}
                />
              ) : (
                <Typography>
                  {parseDurationValueToString({
                    duration: value.duration?.time,
                    durationUnit: value.duration?.unit
                  })}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Grid>
      )}
      {value?.type == 'WAIT_SCHEDULE_ATTRIBUTE' && (
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <InputLabel sx={{ display: 'flex' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Schedule'} />
            </InputLabel>
            <Stack spacing={1} direction="row" alignItems="baseline">
              <Typography>Wait Until</Typography>
              {mode == 'edit' ? (
                <>
                  <Duration
                    value={{
                      duration: value.schedule?.duration?.time,
                      durationUnit: value.schedule?.duration?.unit
                    }}
                    onChange={onScheduleDuration}
                  />
                  <SelectBox options={WHEN_OPTIONS} value={whenValue} onChange={(val) => onScheduleWhen(val)} />
                  <SelectBox
                    options={[]}
                    value={{ keyName: value.schedule?.attr, languageKey: 'Select Attribute' }}
                    onChange={(val) => onScheduleAttribute(val)}
                  />
                </>
              ) : (
                <>
                  <Typography>
                    {parseDurationValueToString({
                      duration: value.schedule?.duration?.time,
                      durationUnit: value.schedule?.duration?.unit
                    })}
                  </Typography>
                  <Typography>{value.schedule?.when}</Typography>
                  <Typography>{value.schedule?.attr}</Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default WaitWrite;
