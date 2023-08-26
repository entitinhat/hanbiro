import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Tabs,
  Tab,
  Grid,
} from '@mui/material';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import {
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_CONTACT,
  CUSTOMER_CATEGORY_ENUM,
} from '@customer/config/constants';

interface ConvertTypeProps {
  onChange?: (value: any) => void;
}

const ConvertType = (props: ConvertTypeProps) => {
    const { onChange } = props;
    const { t } = useTranslation();    
    const [activeTab, setActiveTab] = useState<number>(0);
    const [ customerCategory, setCustomerCategory ] = useState<string>(CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]);
    const [ customerState, setCustomerState ] = useState<any>('createNew');
    const [ customer, setCustomer ] = useState<any>();

    //tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
      setCustomer(null)
    };

    const TABS: any[] = [
      {
        label: 'ncrm_sales_lead_qualify_convert_to_account',
        value: CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]
      },
      {
        label: 'ncrm_sales_lead_qualify_convert_to_contact',
        value: CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]
      }
    ];

    useEffect(() => {
      if(customerCategory && customerState != 'createNew'){
        onChange && onChange({ customerCategory: customerCategory, customer: customer })
      } else {
        onChange && onChange({ customerCategory: customerCategory, customter: null })
      }
    },[customerCategory, customer, customerState])

    return (
        <Box sx={{ p: 0, minWidth: 640 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="activity componay individual tabs">
                {TABS.map((_tab: any, index: number) => (
                <Tab key={_tab.value} label={t(_tab.label)} id={`activity-sms-tab-${index}`} aria-controls={`activity-sms-tabpanel-${index}`} 
                onClick={() => setCustomerCategory(_tab.value)}
                />
                ))}
            </Tabs>
          </Box>
          <FormControl sx={{ mr: 'auto', pt: 2, width: '100%' }}>
            <RadioGroup
              value={customerState}
              onChange={(e: any, v: any) => {
                setCustomerState(v);
              }}
            >
              <FormControlLabel control={<Radio />} value={'createNew'} label={<SpanLang keyLang='ncrm_sales_lead_qualify_create_new' />} />
              <Grid container sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <Grid item xs={3}>
                      <FormControlLabel control={<Radio />} value={'chooseExisting'} label={<SpanLang keyLang='ncrm_sales_lead_qualify_chooose_exist' />} />
                  </Grid>
                  <Grid item xs={9}>
                    {customerState == 'chooseExisting' && 
                    <CustomerAutoComplete 
                    value={customer} 
                    onChange={(value: any) => setCustomer(value)} 
                    single={true} 
                    category={customerCategory == CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT] ? CUSTOMER_CATEGORY_ACCOUNT : CUSTOMER_CATEGORY_CONTACT }
                    /> }
                  </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>
    );
}

export default ConvertType