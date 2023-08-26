import React from 'react';

import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import AddressInput from '@base/components/@hanbiro/AddressInput';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const onBillAddressChange = (newValue: any) => {
    onChange && onChange({ ...value, billAddress: newValue });
  };

  const onShippingAddressChange = (newValue: any) => {
    onChange && onChange({ ...value, shipAddress: newValue });
  };

  return (
    <Stack>
      <Typography color="secondary">Billing Address</Typography>
      <AddressInput value={value?.billAddress ? value?.billAddress : null} onChange={onBillAddressChange} isMultiple={false} />
      <Typography color="secondary">Shipping Address</Typography>
      <AddressInput value={value?.shipAddress ? value?.shipAddress : null} onChange={onShippingAddressChange} isMultiple={false} />
    </Stack>
  );
};

export default Edit;
