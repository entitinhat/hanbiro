import _ from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Grid, useTheme } from '@mui/material';
import StatusList from '@process/components/Diagram/Status/StatusList';
import { initStatusForm } from '@process/components/Diagram/Status/StatusWrite';
import statusAtom from '@process/store/atoms/status';
import { StatusForm } from '@process/types/process';
import { checkParallel } from '@process/utils/helper';

import ActionItemWrite from './ActionItemWrite';

interface ActionWriteProps {
  value?: StatusForm[];
}

function ActionWrite(props: ActionWriteProps) {
  const { value } = props;
  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(statusesValue)) {
        setStatusesValue(value);
      }
    } else {
      setStatusesValue(initStatusForm().slice(0, 2));
    }
  }, [value]);

  let parallelIndex = 0;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StatusList mode={'edit'} useNextStep={false}>
          {statusesValue.map((status) => {
            if (checkParallel(status)) {
              parallelIndex++;
            }
            return <ActionItemWrite key={status.id} status={status} parallelIndex={parallelIndex} />;
          })}
        </StatusList>
      </Grid>
    </Grid>
  );
}

export default ActionWrite;
