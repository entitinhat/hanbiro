import React, { useEffect, useState } from 'react';

//project
import IconButton from '@base/components/@extended/IconButton';
import AddressItem from '@base/components/@hanbiro/AddressInput/Item';

//material
import { Grid, InputLabel, Stack, Tooltip } from '@mui/material';
import { FileCopyOutlined } from '@mui/icons-material';


interface ShipBillAddressProps {
  value: any;
  onChange: (val: any) => void;
}

const ShipBillAddress = (props: ShipBillAddressProps) => {
  const { value, onChange } = props;

  //state
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [billingAddress, setBillingAddress] = useState<any>(null);

  //init value
  useEffect(() => {
    if (value) {
      if (value?.shipping) {
        setShippingAddress(value.shipping);
      }
      if (value?.billing) {
        setBillingAddress(value.billing);
      }
    } else {
      setShippingAddress(null);
      setBillingAddress(null);
    }
  }, [value]);

  //value change
  const handleAddressChange = (type: string, newValue: any) => {
    if (type === 'shipping') {
      setShippingAddress(newValue);
      //callback
      onChange && onChange({ shipping: newValue, billing: billingAddress });
    }
    if (type === 'billing') {
      setBillingAddress(newValue);
      //callback
      onChange && onChange({ shipping: shippingAddress, billing: newValue });
    }
  }

  //copy
  const handleAddressCopy = (e: any) => {
    setShippingAddress(billingAddress);
    //callback
    onChange && onChange({ shipping: billingAddress, billing: billingAddress });
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} lg={6} alignItems="center" sx={{ px: 0.5 }}>
        <Stack sx={{ mb: 1 }}>
          <InputLabel>Billing Address</InputLabel>
        </Stack>
        <AddressItem
          key={'billing'}
          value={billingAddress}
          onChange={(newValue: any) => handleAddressChange('billing', newValue)}
        />
      </Grid>
      <Grid item xs={12} lg={6} alignItems="center" sx={{ px: 0.5 }}>
        <Stack direction={"row"} spacing={0.5} alignItems="center">
          <InputLabel>Shipping Address</InputLabel>
          <Tooltip title="Copy Billing Address">
            <IconButton shape='rounded' color="warning" size="small" onClick={handleAddressCopy}>
              <FileCopyOutlined fontSize='small' />
            </IconButton>
          </Tooltip>
        </Stack>
        <AddressItem
          key={'shipping'}
          value={shippingAddress}
          onChange={(newValue: any) => handleAddressChange('shipping', newValue)}
        />
      </Grid>
    </Grid>
  );
}

export default ShipBillAddress;
