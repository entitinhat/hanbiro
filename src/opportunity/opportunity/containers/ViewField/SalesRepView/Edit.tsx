import React, { useEffect, useState } from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import * as keyNames from '@opportunity/config/keyNames';
import { SALES_REP_TYPE_TEAM, SALES_REP_TYPE_USER } from '@opportunity/config/constants';
import SalesTeamAutoComplete from '@settings/preferences/components/SalesTeamAutoComplete';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any, field: string) => {
    onChange && onChange({ ...value, [field]: newValue });
  };

  const handleOnSalesRepsChange = (newValue: any, type: 'user' | 'team') => {
    onChange &&
      onChange({
        ...value,
        [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]: {
          ...value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP],
          [type]: newValue
        }
      });
  };

  return (
    <>
      <RadioGroup
        value={value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]}
        onChange={(e: any, v: any) => {
          handleOnChange(v, keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE);
        }}
      >
        <Stack direction={'row'} alignItems="center">
          <FormControlLabel control={<Radio />} value={SALES_REP_TYPE_USER} label={'Sales Person'} />
          <FormControlLabel control={<Radio />} value={SALES_REP_TYPE_TEAM} label={'Sales Team'} />
        </Stack>
      </RadioGroup>
      {value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_USER && (
        <Box sx={{ width: '100%' }}>
          <UserAutoComplete
            value={value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.user}
            onChange={(nVal: any) => handleOnSalesRepsChange(nVal, 'user')}
            {...componentProps}
          />
        </Box>
      )}
      {value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_TEAM && (
        <Box sx={{ width: '100%' }}>
          <SalesTeamAutoComplete
            value={value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.team}
            onChange={(nVal: any) => handleOnSalesRepsChange(nVal, 'team')}
            {...componentProps}
          />
        </Box>
      )}
    </>
  );
};

export default Edit;
