import React, { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { addItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import { STATUS_BASIC_DATA } from '@process/config/constants';
import { useDefinedFields } from '@process/hooks/useProcess';
import statusAtom from '@process/store/atoms/status';
import { CriteriaCondition, CriteriaOption } from '@process/types/diagram';
import { DefinedField, StatusForm } from '@process/types/process';

import CriteriaRuleWrite from './CriteriaRuleWrite';

export const defaultCriteria: CriteriaCondition = {
  aSide: {
    module: 'MODULE_NONE',
    field: '',
    type: 'FIELD_TYPE_TEXT'
  },
  operator: 'CRITERIA_OPERATOR_NONE',
  vType: 'VALUE_TYPE_NONE',
  value: ''
};

const initCriteria: CriteriaOption = {
  blocks: [
    {
      conditions: [defaultCriteria],
      pattern: []
    }
  ],
  pattern: []
};

interface CriteriaWriteProps {
  value?: StatusForm[];
}

function CriteriaWrite(props: CriteriaWriteProps) {
  const { value } = props;
  console.log('criteria value', value);
  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);
  console.log('statusesValue', statusesValue);
  const statusCount = statusesValue.length;

  // get critiera fields
  const { data: definedFields } = useDefinedFields();

  const moduleFields = useMemo(() => {
    let items: { [index: string]: DefinedField[] } = {};
    if (definedFields) {
      for (const item of definedFields.results) {
        if (!items[item.module]) {
          items[item.module] = [];
        }
        items[item.module].push(item);
      }
    }
    return items;
  }, [definedFields]);

  const addCriteria = useCallback(() => {
    const targetValue: StatusForm = {
      ...STATUS_BASIC_DATA({
        id: uuidv4(),
        direction: 'DIRECTION_FORWARD_OUTGOING_RIGHT'
      }),
      criteria: initCriteria
    };
    const targetIndex = statusCount - 1;
    console.log(targetIndex);
    setStatusesValue((old) => {
      return addItemAtIndex(old, targetIndex, targetValue);
    });
  }, [statusCount]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(statusesValue)) {
        setStatusesValue(value);
      }
    } else {
      setStatusesValue([
        {
          ...STATUS_BASIC_DATA({
            id: uuidv4(),
            direction: 'DIRECTION_FORWARD_OUTGOING_RIGHT'
          }),
          criteria: initCriteria
        },
        STATUS_BASIC_DATA({
          id: uuidv4(),
          direction: 'DIRECTION_FORWARD_OUTGOING_BOTTOM'
        })
      ]);
    }
  }, [value]);

  console.log('criteria -- value', statusesValue);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography>Set Criteria</Typography>
          <IconButton size="small" color="primary" onClick={addCriteria}>
            <Add sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Grid>
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
              <CriteriaRuleWrite id={status.id} name={status.button} option={status.criteria!!} moduleFields={moduleFields} />
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
}

export default CriteriaWrite;
