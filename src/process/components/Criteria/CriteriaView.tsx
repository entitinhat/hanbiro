import _ from 'lodash';
import React, { useState } from 'react';

import { LabelValue } from '@base/types/app';
import { Grid } from '@mui/material';
import { StatusForm } from '@process/types/process';

import CriteriaRuleView from '../Automation/Criteria/CriteriaRule';
import { CRITERIA_TYPES } from '../Diagram/Criteria';
import CriteriaStatusView from '../Diagram/Criteria/CriteriaStatusView';

interface CriteriaViewProps {
  value: StatusForm[];
}

function CriteriaView(props: CriteriaViewProps) {
  const { value: statusesValue } = props;

  const statusCount = statusesValue.length;
  const [criteriaType, setCriteriaType] = useState<LabelValue>(CRITERIA_TYPES[0]);

  return (
    <Grid container spacing={1}>
      {statusesValue.map((status, index) => {
        if (statusCount == index + 1) return;
        return (
          <React.Fragment key={status.id}>
            <Grid item xs={4.2}>
              <div className="diagram-item diagram-criteria with-boolean-direction">
                <div className="criteria-shape"></div>
                <div className="diagram-item-name">{status.button}</div>
                <div className="direction-true"></div>
                <div className="direction-false"></div>
              </div>
            </Grid>
            <Grid item xs={7.8}>
              <CriteriaRuleView id={status.id} name={status.button} option={status.criteria!!} />
            </Grid>
          </React.Fragment>
        );
      })}
      {statusesValue.length > 0 && criteriaType.value === 'boolean' && <CriteriaStatusView value={statusesValue} />}
    </Grid>
  );
}

export default CriteriaView;
