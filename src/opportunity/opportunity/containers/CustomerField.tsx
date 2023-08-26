import { Suspense, useEffect, useState } from 'react';

//third-party
import { Grid, InputLabel, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';

//project base
import SpanLang from '@base/components/@hanbiro/SpanLang';

//customer menu
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { Customer } from '@customer/types/interface';
import * as keyNames from '@customer/config/keyNames';
import * as accountConfig from '@customer/config/write-field/account';
import * as contactConfig from '@customer/config/write-field/contact';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';

//menu
import { OPPORTUNITY_TYPE_NEW_CUSTOMER } from '@opportunity/config/constants';

interface CustomerField {
  opportunityType: string;
  category: string;
  value?: Customer;
  onChange?: (newVal: Customer) => void;
}

const ACCOUNT_FIELDS = [
  { keyName: keyNames.KEY_NAME_CUSTOMER_CODE, languageKey: 'Account ID' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_NAME, languageKey: 'Account Name', isRequired: true },
  { keyName: keyNames.KEY_NAME_CUSTOMER_TYPE, languageKey: 'Customer Type' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_INDUSTRIES, languageKey: 'Industry' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_WEBSITES, languageKey: 'Website' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, languageKey: 'Email' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_PHONES, languageKey: 'Phone' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES, languageKey: 'Billing Address' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES, languageKey: 'Shipping Address' }
];
const CONTACT_FIELDS = [
  { keyName: keyNames.KEY_NAME_CUSTOMER_CODE, languageKey: 'Contact ID' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_NAME, languageKey: 'Contact Name', isRequired: true },
  { keyName: keyNames.KEY_NAME_CUSTOMER_TYPE, languageKey: 'Customer Type' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE, languageKey: 'Contact Type' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_ACCOUNT, languageKey: 'Related Account', isEmployee: true },
  { keyName: keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE, languageKey: 'Employee Role', isEmployee: true },
  { keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, languageKey: 'Email' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_MOBILE, languageKey: 'Mobile' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_PHONES, languageKey: 'Phone' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES, languageKey: 'Billing Address' },
  { keyName: keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES, languageKey: 'Shipping Address' }
];

const CustomerField = (props: any) => {
  const { opportunityType, category = CUSTOMER_CATEGORY_ACCOUNT, value, onChange } = props;
  const [custValue, setCustValue] = useState<any>(null);
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  //init value
  useEffect(() => {
    if (!_.isEqual(value, custValue)) {
      setCustValue(value);
    }
  });

  //value change
  const handleValueChange = (keyName: string, newVal: any) => {
    const newCustValue = { ...custValue };
    newCustValue[keyName] = newVal;
    setCustValue(newCustValue);
    //callback
    onChange && onChange(newCustValue);
  };

  //write fields
  const renderFields = () => {
    let customerFields = category === CUSTOMER_CATEGORY_ACCOUNT ? ACCOUNT_FIELDS : CONTACT_FIELDS;
    if (
      category === CUSTOMER_CATEGORY_CONTACT &&
      custValue?.[keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]?.keyName !== 'CONTACT_TYPE_EMPLOYEE'
    ) {
      //remove employee fields
      customerFields = customerFields.filter((_ele: any) => !_ele?.isEmployee);
    }
    const customerConfig = category === CUSTOMER_CATEGORY_ACCOUNT ? accountConfig : contactConfig;

    return (
      <>
        {customerFields.map((_item: any, index: number) => {
          const field = (customerConfig as any).default[_item.keyName];
          //console.log('field', field);
          const Component = field.component;
          const fieldValue = custValue?.[_item.keyName] || '';
          return (
            <Grid
              key={index}
              item
              xs={12}
              lg={matchesMd ? 12 : 6}
              display={_item.keyName === keyNames.KEY_NAME_CUSTOMER_CODE ? 'none' : ''}
              sx={index % 2 === 0 ? { pl: 1, mb: 1.25 } : { pr: 1, mb: 1.25 }}
            >
              <Stack spacing={0.5}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={_item.languageKey} />
                  </InputLabel>
                  {_item?.isRequired && <Typography color="error">*</Typography>}
                </Stack>
              </Stack>
              <Suspense fallback={<></>}>
                <Component
                  {...field.componentProps}
                  value={fieldValue}
                  onChange={(newVal: any) => handleValueChange(_item.keyName, newVal?.target ? newVal.target.value : newVal)}
                />
              </Suspense>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <Grid container>
      {opportunityType === OPPORTUNITY_TYPE_NEW_CUSTOMER ? (
        renderFields()
      ) : (
        <Grid item xs={12} lg={12}>
          <CustomerAutoComplete single={true} category={category} value={value} onChange={onChange} />
        </Grid>
      )}
    </Grid>
  );
};

export default CustomerField;
