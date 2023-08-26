import _ from 'lodash';
import React from 'react';

import { Grid } from '@mui/material';
import { StatusForm } from '@process/types/process';

import CriteriaRule from './CriteriaRule';

interface CriteriaViewProps {
  status: StatusForm;
}

function CriteriaView(props: CriteriaViewProps) {
  const { status } = props;

  return (
    <>
      <Grid item xs={4.2}>
        <div className="diagram-item diagram-criteria with-boolean-direction">
          <div className="criteria-shape"></div>
          <div className="diagram-item-name">{status.button}</div>
          <div className="direction-true"></div>
          <div className="direction-false"></div>
        </div>
      </Grid>
      <Grid item xs={7.8}>
        <CriteriaRule id={status.id} name={status.button} option={status.criteria!!} />
      </Grid>
    </>
  );
}

export default React.memo(CriteriaView);
