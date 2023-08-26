import _ from 'lodash';
import { Control, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, Stack, useTheme } from '@mui/material';
import SiteButtons from '@process/components/Diagram/Site/SiteButtons';
import { STATUS_BASIC_DATA } from '@process/config/constants';
import { KEY_NAME_STEP_ACTION } from '@process/config/keyNames';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import stepTypeAtom from '@process/store/atoms/step';
import { statusWithFilter } from '@process/store/selectors';
import { StatusForm } from '@process/types/process';
import { checkParallel } from '@process/utils/helper';

import ItemWrite from './StatusItemWrite';
import StatusList from './StatusList';

export const sample = `
    Hello, $$Customer$$
    Thank you for using our service.
    plz click following button.

    <a name="Product" href="@@CTA.PAGE=122344444@@">Go to Product</a>
    <a name="Customer" href="@@CTA.PAGE=999999999@@">Go to Customer</a>
`;

export const initStatusForm = (): StatusForm[] => [
  STATUS_BASIC_DATA({
    id: uuidv4(),
    button: '-',
    name: '-',
    view: 'VIEW_DISABLE',
    event: 'EVENT_DISABLE',
    property: 'PROPERTY_TODO',
    direction: 'DIRECTION_FORWARD_INCOMING_LEFT',
    sequence: ['0'],
    definedId: uuidv4()
  }),
  STATUS_BASIC_DATA({
    id: uuidv4(),
    button: '-',
    name: 'Doing',
    view: 'VIEW_DISABLE',
    event: 'EVENT_DISABLE',
    property: 'PROPERTY_TODO_DOING',
    direction: 'DIRECTION_STAYING',
    sequence: ['1'],
    definedId: uuidv4()
  }),
  STATUS_BASIC_DATA({
    id: uuidv4(),
    button: 'Done',
    name: 'Done',
    view: 'VIEW_SINGLE',
    event: 'EVENT_CLICK',
    property: 'PROPERTY_TODO_CLOSE',
    direction: 'DIRECTION_FORWARD_OUTGOING_RIGHT',
    sequence: ['2'],
    definedId: uuidv4()
  })
];

interface StatusWriteProps {
  process: string;
  control: Control;
}

function StatusWrite(props: StatusWriteProps) {
  const theme = useTheme();
  const { process: processId, control } = props;
  const stepType = useRecoilValue(stepTypeAtom);
  const stepSetting = useRecoilValue(stepSettingAtom);
  const normalStatuses = useRecoilValue(statusWithFilter('normal'));
  const ctaStatuses = useRecoilValue(statusWithFilter('cta'));

  const selectedAction = useWatch({
    control,
    name: KEY_NAME_STEP_ACTION
  });

  let normalParallelIndex = 0;
  let ctaParallelIndex = 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ p: '0px !important' }}>
        <StatusList isCta={false} actionMethod={selectedAction?.method}>
          {normalStatuses?.map((status) => {
            if (checkParallel(status)) {
              normalParallelIndex++;
            }
            return (
              <ItemWrite
                key={status.id}
                processId={processId}
                status={status}
                parallelIndex={normalParallelIndex}
                isView={false}
                isCta={false}
                actionMethod={selectedAction?.method}
              />
            );
          })}
        </StatusList>
      </Grid>

      {(stepSetting.cta || stepType.value == 'TYPE_SITE') && (
        <>
          <Grid item xs={12} sx={{ p: '0px !important' }}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ display: 'flex' }}>
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'CTA'} />
              </InputLabel>
              <StatusList isCta={true}>
                {ctaStatuses.map((status) => {
                  if (checkParallel(status)) {
                    ctaParallelIndex++;
                  }
                  return (
                    <ItemWrite
                      key={status.id}
                      processId={processId}
                      status={status}
                      parallelIndex={ctaParallelIndex}
                      isView={false}
                      isCta={true}
                    />
                  );
                })}
              </StatusList>
            </Stack>
          </Grid>
          {stepType.value == 'TYPE_SITE' && <SiteButtons mode={'write'} />}
        </>
      )}
    </Grid>
  );
}

export default StatusWrite;
