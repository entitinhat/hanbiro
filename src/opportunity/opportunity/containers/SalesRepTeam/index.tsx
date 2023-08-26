import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { SALES_REP_TYPE_USER, SALES_REP_TYPE_TEAM } from '@opportunity/config/constants';
import * as keyNames from '@opportunity/config/keyNames';
import SalesTeamAutoComplete from '@settings/preferences/components/SalesTeamAutoComplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { useEffect, useState } from 'react';

interface SalesRepProp {
  single?: boolean;
  value?: any; //{type, value: single or multiple}
  onChange?: (val: any) => void;
}

const SalesRepTeam = (props: SalesRepProp) => {
  const { single = false, value, onChange } = props;
  const [salesValue, setSalesValue] = useState<any>({ [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]: SALES_REP_TYPE_USER, value: [] });

  //init
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(salesValue)) {
        setSalesValue(value);
      }
    } else {
      setSalesValue({ [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]: SALES_REP_TYPE_USER, value: [] });
    }
  }, [value]);

  //value change
  const handleValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...salesValue };
    newValue[keyName] = keyValue;
    if (keyName === keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE) {
      newValue.value = []; //reset value
    }
    setSalesValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  return (
    <Stack spacing={1}>
      <RadioGroup
        value={salesValue?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]}
        onChange={(e: any, v: any) => {
          handleValueChange(keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE, v);
        }}
      >
        <Stack direction={'row'} alignItems="center">
          <FormControlLabel control={<Radio />} value={SALES_REP_TYPE_USER} label={'Sales Person'} />
          <FormControlLabel control={<Radio />} value={SALES_REP_TYPE_TEAM} label={'Sales Team'} />
        </Stack>
      </RadioGroup>
      {salesValue[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_USER && (
        <UserAutoComplete
          single={single}
          showAvatar={true}
          value={salesValue.value}
          onChange={(users) => handleValueChange('value', users)}
        />
      )}
      {salesValue[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_TEAM && (
        <SalesTeamAutoComplete
          //single={single}
          value={salesValue.value}
          onChange={(teams) => handleValueChange('value', teams)}
        />
      )}
    </Stack>
  );
};

export default SalesRepTeam;
