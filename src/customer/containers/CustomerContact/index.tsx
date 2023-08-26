import { Customer } from '@customer/types/interface';
import { CustomerCategory, CustomerType } from '@customer/types/type';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomerAutoComplete from '../CustomerAutoComplete';
export interface ValueProps {
  contact: any;
  customer: Customer | null;
}

interface CustomerContactProps {
  hideCustomerLabel?: boolean;
  value?: ValueProps;
  onChange?: (val: ValueProps) => void;
  category?: string;
}

const CustomerContact: React.FC<CustomerContactProps> = (props) => {
  const { hideCustomerLabel = false, value, onChange, category } = props;
  //state
  const [curCustomer, setCurCustomer] = useState<Customer | null>(null);
  const [curContact, setCurConctact] = useState<any>(null);

  //initial value
  useEffect(() => {
    if (value) {
      if (value?.customer) {
        if (value.customer?.id !== curCustomer?.id) {
          setCurCustomer(value.customer);
        }
      }
      if (value?.contact) {
        if (value.contact?.id !== curContact?.id) {
          setCurConctact(value.contact);
        }
      }
    } else {
      setCurCustomer(null);
      setCurConctact(null);
    }
  }, [value]);

  //value change
  const handleCustomerChange = (newCustomer: Customer | null) => {
    setCurCustomer(newCustomer);
    setCurConctact(null);
    //callback
    onChange && onChange({ customer: newCustomer, contact: null });
  };

  //value change
  const handleContactChange = (newContact: any | null) => {
    setCurConctact(newContact);
    //callback
    onChange && onChange({ customer: curCustomer, contact: newContact });
  };

  return (
    <Box position="relative">
      <Box sx={{ marginBottom: 2 }}>
        {!hideCustomerLabel && <Typography sx={{ marginBottom: 1 }}>Customer</Typography>}
        <CustomerAutoComplete
          single={true}
          type={CustomerType.TYPE_CUSTOMER}
          showAvatar={true}
          value={curCustomer}
          onChange={(val) => {
            !Array.isArray(val) && handleCustomerChange(val);
          }}
        />
      </Box>
      {category !== 'all' && curCustomer?.category === CustomerCategory.account && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography sx={{ marginBottom: 1 }}>Contact</Typography>
          <CustomerAutoComplete
            category="contact"
            single={true}
            accountId={curCustomer?.id}
            showAvatar={true}
            value={curContact}
            onChange={handleContactChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomerContact;
