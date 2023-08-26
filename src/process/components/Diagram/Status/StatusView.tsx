import _ from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, Stack, useTheme } from '@mui/material';
import SiteButtons from '@process/components/Diagram/Site/SiteButtons';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import { selectedStatusAtom } from '@process/store/atoms/status';
import stepTypeAtom from '@process/store/atoms/step';
import { statusWithFilter } from '@process/store/selectors';

import ItemView from './StatusItemView';
import ItemWrite from './StatusItemWrite';
import StatusList from './StatusList';

interface StatusViewProps {
  metadata: any;
  componentProps: any;
}

function StatusView({ metadata, componentProps }: StatusViewProps) {
  const { mode } = componentProps;
  console.log('mode', mode);
  const theme = useTheme();
  // console.log('status view');
  const { processId, stepId, method } = metadata;
  const selectedStatus = useRecoilValue(selectedStatusAtom);
  const stepSetting = useRecoilValue(stepSettingAtom);
  const stepType = useRecoilValue(stepTypeAtom);
  const normalStatuses = useRecoilValue(statusWithFilter('normal'));
  const ctaStatuses = useRecoilValue(statusWithFilter('cta'));

  let normalParallelIndex = 0;
  let ctaParallelIndex = 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StatusList isCta={false} mode={mode} actionMethod={method}>
          {normalStatuses?.map((status) => {
            const isEdit = status.id == selectedStatus ? true : false;
            if (status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && status.multiple == 'MULTIPLE_PARALLEL') {
              normalParallelIndex++;
            }
            return (
              <React.Fragment key={status.id}>
                {isEdit ? (
                  <ItemWrite
                    processId={processId}
                    stepId={stepId}
                    status={status}
                    parallelIndex={normalParallelIndex}
                    isView={true}
                    isCta={false}
                    // actionMethod={method}
                  />
                ) : (
                  <ItemView
                    processId={processId}
                    stepId={stepId}
                    status={status}
                    parallelIndex={normalParallelIndex}
                    isCta={false}
                    actionMethod={method}
                    mode={mode}
                  />
                )}
              </React.Fragment>
            );
          })}
        </StatusList>
      </Grid>
      {(stepSetting.cta || stepType.value == 'TYPE_SITE') && (
        <>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'CTA'} />
              </InputLabel>
              <StatusList isCta={true}>
                {ctaStatuses?.map((status) => {
                  const isEdit = status.id == selectedStatus ? true : false;
                  if (status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && status.multiple == 'MULTIPLE_PARALLEL') {
                    ctaParallelIndex++;
                  }
                  return (
                    <React.Fragment key={status.id}>
                      {isEdit ? (
                        <ItemWrite
                          processId={processId}
                          stepId={stepId}
                          status={status}
                          parallelIndex={ctaParallelIndex}
                          isView={true}
                          isCta={true}
                        />
                      ) : (
                        <ItemView
                          processId={processId}
                          stepId={stepId}
                          status={status}
                          parallelIndex={ctaParallelIndex}
                          isCta={true}
                          mode={mode}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </StatusList>
            </Stack>
          </Grid>
          {stepType.value == 'TYPE_SITE' && <SiteButtons mode={'view'} />}
        </>
      )}
    </Grid>
  );
}

export default StatusView;
