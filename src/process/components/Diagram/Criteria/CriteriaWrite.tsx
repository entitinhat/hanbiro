import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { LabelValue } from '@base/types/app';
import { Grid } from '@mui/material';
import statusAtom from '@process/store/atoms/status';

import { CRITERIA_TYPES } from '.';
import CriteriaRule from './CriteriaRule';
import CriteriaStatusWrite from './CriteriaStatusWrite';
import CriteriaStatusView from './CriteriaStatusView';

interface CriteriaWriteProps {
  mode: 'view' | 'edit';
  componentProps?: any;
}

function CriteriaWrite({ mode, componentProps }: CriteriaWriteProps) {
  if (componentProps?.mode) {
    mode = componentProps.mode;
  }
  const statusesValue = useRecoilValue(statusAtom);
  const statusCount = statusesValue.length;
  const [criteriaType, setCriteriaType] = useState<LabelValue>(CRITERIA_TYPES[0]);

  return (
    <Grid container spacing={2}>
      {statusesValue?.map((status, index) => {
        if (statusCount == index + 1) return;
        return (
          <React.Fragment key={status.id}>
            <Grid item xs={4}>
              <div className="diagram-item diagram-criteria with-boolean-direction">
                <div className="criteria-shape"></div>
                <div className="diagram-item-name">{status.button}</div>
                <div className="direction-true"></div>
                <div className="direction-false"></div>
              </div>
            </Grid>
            <Grid item xs={8}>
              <CriteriaRule id={status.id} name={status.button} option={status.criteria!!} mode={mode} />
            </Grid>
          </React.Fragment>
        );
      })}
      {statusesValue && criteriaType.value === 'boolean' && (
        <>{mode == 'edit' ? <CriteriaStatusWrite /> : <CriteriaStatusView value={statusesValue} />}</>
      )}
    </Grid>
  );
}

export default CriteriaWrite;
