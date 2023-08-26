import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { Label } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import {
  CUST_TYPES,
  OPPORTUNITY_TYPE_EXISTING_CUSTOMER,
  OPPORTUNITY_TYPE_NEW_CUSTOMER,
  OPPORTUNITY_TYPE_WIN_CUSTOMER,
  OPP_TYPES
} from '@opportunity/config/constants';
import { useEffect, useState } from 'react';

interface TypeProps {
  value?: any;
  onChange: (newVal: any) => void;
}

const OpportunityType = (props: TypeProps) => {
  const { value, onChange } = props;
  const defaultValue = {
    type: OPPORTUNITY_TYPE_NEW_CUSTOMER,
    customerType: CUSTOMER_CATEGORY_ACCOUNT
  };
  const [curValue, setCurValue] = useState<any>(defaultValue);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(curValue)) {
        setCurValue(value);
      }
    } else {
      setCurValue(defaultValue);
    }
  }, [value]);

  const handleValueChange = (keyName: string, newType: string) => {
    const newValue = { ...curValue };
    newValue[keyName] = newType;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  return (
    <Box>
      <MuiRadioGroup
        options={OPP_TYPES}
        value={OPP_TYPES.find((_ele: any) => _ele.value === curValue.type)}
        onChange={(selected: any) => handleValueChange('type', selected.value)}
      />
      {curValue.type === OPPORTUNITY_TYPE_NEW_CUSTOMER && (
        <MuiRadioGroup
          options={CUST_TYPES}
          value={CUST_TYPES.find((_ele: any) => _ele.value === curValue.customerType)}
          onChange={(selected: any) => handleValueChange('customerType', selected.value)}
        />
      )}
    </Box>
  );
};

export default OpportunityType;
