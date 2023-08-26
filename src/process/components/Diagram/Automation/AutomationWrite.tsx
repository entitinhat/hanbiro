import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Duration from '@base/components/@hanbiro/Duration';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { OptionValue } from '@base/types/common';
import { parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { Add } from '@mui/icons-material';
import { Box, Button, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { nextStepAtom } from '@process/store/atoms/diagram';
import statusAtom from '@process/store/atoms/status';
import { Automation } from '@process/types/process';

interface AutomationWriteProps {
  mode: 'edit' | 'view';
  value: Automation;
  onChange: (val: Automation) => void;
}

function AutomationWrite({ value, onChange, mode }: AutomationWriteProps) {
  // console.log('automation', value);
  const theme = useTheme();
  const statusesValue = useRecoilValue(statusAtom);
  const nextSteps = useRecoilValue(nextStepAtom);

  const sleepingStatuses = useMemo(() => {
    let options: OptionValue[] = [];
    statusesValue.forEach((status) => {
      if (
        status.direction.keyName == 'DIRECTION_STAYING'
        //  ||
        // status.direction.keyName == 'DIRECTION_FORWARD_INCOMING_LEFT'
      ) {
        options.push({
          keyName: status.id,
          languageKey: status.name
        });
      }
    });
    return options;
  }, [statusesValue]);

  const [sleepingStatus, setSleepingStatus] = useState(sleepingStatuses[0]);

  useEffect(() => {
    setSleepingStatus(sleepingStatuses[0]);
  }, [sleepingStatuses]);

  const onSleeping = useCallback(() => {
    onChange({ ...value, useSleeping: !value.useSleeping });
  }, [value]);

  const onDuration = useCallback(
    (val: any) => {
      onChange({ ...value, sleeping: { ...value.sleeping, duration: val } });
    },
    [value]
  );

  // const onTerm = useCallback(
  //   (val: OptionValue) => {
  //     onChange({ ...value, sleeping: { ...value.sleeping, term: val.keyName } });
  //   },
  //   [value],
  // );

  const onStatus = useCallback((val: OptionValue) => {
    setSleepingStatus(val);
  }, []);

  const onNotification = useCallback(
    (index: number) => {
      let execute = _.cloneDeep(value.sleeping.executes[index]);
      execute.useNotify = !execute.useNotify;

      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), execute, ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );
  const onNotificationSelect = useCallback(
    (index: number, val: OptionValue) => {
      let execute = _.cloneDeep(value.sleeping.executes[index]);
      execute.notify = { id: val.keyName, name: val.languageKey };

      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), execute, ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );

  const onStep = useCallback(
    (index: number) => {
      let execute = _.cloneDeep(value.sleeping.executes[index]);
      execute.useChangeStep = !execute.useChangeStep;

      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), execute, ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );

  const onStepSelect = useCallback(
    (index: number, val: OptionValue) => {
      let execute = _.cloneDeep(value.sleeping.executes[index]);
      execute.changeStep = { id: val.keyName, name: val.languageKey };

      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), execute, ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );

  const onMywork = useCallback(
    (index: number) => {
      let execute = _.cloneDeep(value.sleeping.executes[index]);
      execute.useMywork = !execute.useMywork;

      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), execute, ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );

  const onExecuteAdd = useCallback(() => {
    if (!value.sleeping.executes) {
      value.sleeping.executes = [];
    }
    const targetIndex = value.sleeping.executes.findIndex((execute) => execute.status.id === sleepingStatus.keyName);
    if (targetIndex != -1) return;

    onChange({
      ...value,
      sleeping: {
        ...value.sleeping,
        executes: [
          ...value.sleeping.executes,
          {
            status: { id: sleepingStatus.keyName, name: sleepingStatus.languageKey },
            useNotify: false,
            notify: { id: '', name: 'Select' },
            useChangeStep: false,
            changeStep: { id: '', name: 'Select' },
            useMywork: false
          }
        ]
      }
    });
  }, [value, sleepingStatus]);

  const onExecuteDelete = useCallback(
    (index: number) => {
      onChange({
        ...value,
        sleeping: {
          ...value.sleeping,
          executes: [...value.sleeping.executes.slice(0, index), ...value.sleeping.executes.slice(index + 1)]
        }
      });
    },
    [value]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Automation'} />
          </InputLabel>
          <MuiCheckbox value={value.useSleeping} onChange={onSleeping} label={'Sleeping'} disabled={mode == 'view'} />
          {value.useSleeping && (
            <Box sx={{ ml: 3 }}>
              <Stack spacing={1} direction="row" alignItems="baseline">
                <Typography>If this Step is sleeping for</Typography>
                {mode == 'edit' ? (
                  <Duration
                    value={{
                      duration: value.sleeping?.duration?.time,
                      durationUnit: value.sleeping?.duration?.unit
                    }}
                    onChange={onDuration}
                  />
                ) : (
                  <Typography>
                    {parseDurationValueToString({
                      duration: value.sleeping?.duration?.time,
                      durationUnit: value.sleeping?.duration?.unit
                    })}
                  </Typography>
                )}
              </Stack>
              <MainCard
                title="Status"
                divider={false}
                content={false}
                secondary={
                  mode == 'edit' && (
                    <Stack direction="row" alignItems="center">
                      <SelectBox value={sleepingStatuses[0]} onChange={(val: OptionValue) => onStatus(val)} options={sleepingStatuses} />
                      <Button size="small" variant="outlined" startIcon={<Add />} onClick={onExecuteAdd}>
                        Add
                      </Button>
                    </Stack>
                  )
                }
              >
                {value.sleeping?.executes?.map((execute, index) => {
                  return (
                    <Box>
                      <Stack spacing={3} direction="row" alignItems="center">
                        <Typography>Execute Action: {execute.status.name}</Typography>
                        {mode == 'edit' && (
                          <Button size="small" startIcon={<Add />} onClick={() => onExecuteDelete(index)}>
                            Delete
                          </Button>
                        )}
                      </Stack>
                      <Stack spacing={3} direction="row" alignItems="center">
                        <MuiCheckbox
                          value={execute.useNotify}
                          label={'Notification'}
                          onChange={() => onNotification(index)}
                          disabled={mode == 'view'}
                        />
                        {mode == 'edit' ? (
                          <SelectBox
                            value={{ keyName: execute.notify.id, languageKey: execute.notify.name }}
                            onChange={(val: OptionValue) => onNotificationSelect(index, val)}
                            options={[
                              { keyName: '1', languageKey: 'Notification 1' },
                              { keyName: '2', languageKey: 'Notification 2' }
                            ]}
                          />
                        ) : (
                          <Typography>{execute.notify.name}</Typography>
                        )}
                      </Stack>
                      <Stack spacing={3} direction="row" alignItems="center">
                        <MuiCheckbox
                          label={'Change Step'}
                          onChange={() => onStep(index)}
                          value={execute.useChangeStep}
                          disabled={mode == 'view'}
                        />
                        {mode == 'edit' ? (
                          <SelectBox
                            value={{
                              keyName: execute.changeStep.id,
                              languageKey: execute.changeStep.name
                            }}
                            onChange={(val: OptionValue) => onStepSelect(index, val)}
                            options={nextSteps}
                          />
                        ) : (
                          <Typography>{execute.changeStep.name}</Typography>
                        )}
                      </Stack>
                      <Box>
                        <MuiCheckbox
                          label={'My work listing for assigned user/group'}
                          value={execute.useMywork}
                          onChange={() => onMywork(index)}
                          disabled={mode == 'view'}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </MainCard>
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AutomationWrite;
