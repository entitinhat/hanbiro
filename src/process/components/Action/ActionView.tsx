import _ from 'lodash';

import { Grid } from '@mui/material';
import StatusItemView from '@process/components/Diagram/Status/StatusItemView';
import StatusList from '@process/components/Diagram/Status/StatusList';
import { StatusForm } from '@process/types/process';
import { checkParallel } from '@process/utils/helper';

interface ActionViewProps {
  value: StatusForm[];
}

function ActionView(props: ActionViewProps) {
  const { value: statusesValue } = props;

  let parallelIndex = 0;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StatusList mode={'view'} useNextStep={false}>
          {statusesValue.map((status) => {
            if (checkParallel(status)) {
              parallelIndex++;
            }
            return <StatusItemView key={status.id} status={status} parallelIndex={parallelIndex} />;
          })}
        </StatusList>
      </Grid>
    </Grid>
  );
}

export default ActionView;
