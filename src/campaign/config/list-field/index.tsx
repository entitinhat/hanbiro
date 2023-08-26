//third-party
import _ from 'lodash';

//menu
import * as keyNames from '@campaign/config/keyNames';
import * as components from '@campaign/config/write-field/components';

//project
import * as baseComponents from '@base/config/write-field/components';

// material-ui
import { TextField } from '@mui/material';
import { LabelValue } from '@base/types/app';

export const groupByCategoryOptions: { [key: string]: any } = {
  all: [
    { label: 'All Campaigns', value: 'allCampaign' },
    { label: 'My Campaigns', value: 'myCampaign' },
    { label: 'My Group Campaigns', value: 'myGroupCampaign' },
    { label: 'My Group Campaigns - Type 1', value: 'myGroupCampaign1' },
    { label: 'My Group Campaigns - Type 2', value: 'myGroupCampaign2' },
    { label: 'Deleted Campaigns', value: 'deletedCampaign' },
    { label: 'Deleted Campaigns - Type 1', value: 'deletedCampaign1' },
    { label: 'Deleted Campaigns - Type 2', value: 'deletedCampaign2' }
  ],
  email: [
    { label: 'All Email Campaigns', value: 'allCampaign' },
    { label: 'My Email Campaigns', value: 'myCampaign' },
    { label: 'My Group Email Campaigns', value: 'myGroupCampaign' },
    { label: 'Deleted Email Campaigns', value: 'deletedCampaign' }
  ],
  sms: [
    { label: 'All SMS Campaigns', value: 'allCampaign' },
    { label: 'My SMS Campaigns', value: 'myCampaign' },
    { label: 'My Group SMS Campaigns', value: 'myGroupCampaign' },
    { label: 'Deleted SMS Campaigns', value: 'deletedCampaign' }
  ],
  general: []
};

export const dateByOptions = [
  { label: 'Created On', value: keyNames.KEY_CAMPAIGN_CREATED_AT },
  { label: 'Updated On', value: keyNames.KEY_CAMPAIGN_UPDATED_AT }
];

export const filterByCategoryOptions: { [key: string]: any } = {
  email: [],
  sms: [
    // {
    //   label: 'ncrm_customer_filter_customertype',
    //   value: keyNames.KEY_CAMPAIGN_CONTACT_TYPE,
    //   component: baseComponents.DataSourceSelect,
    //   componentProps: {
    //     single: false,
    //     sourceKey: 'contact_type',
    //     sourceType: 'field',
    //     keyOptionValue: 'keyName',
    //     keyOptionLabel: 'languageKey'
    //   },
    //   getValue: (value: any[]) => {
    //     //return value.length > 0 ? value?.map((v: any) => CUSTOMER_CONTACT_TYPE_ENUM[v?.keyName]) : [];
    //     return value?.length > 0 ? value?.map((v: any) => v?.keyName).join(',') : '';
    //   },
    //   setValue: (value: string) => {
    //     return value?.split(',') || [];
    //   }
    //   // setValue: (value: any) => {
    //   //   const keyValues: string[] = [];
    //   //   if (value && value.length > 0) {
    //   //     Object.keys(CUSTOMER_CONTACT_TYPE_ENUM).map((_key: string) => {
    //   //       if (value.includes(CUSTOMER_CONTACT_TYPE_ENUM[_key])) {
    //   //         keyValues.push(_key);
    //   //       }
    //   //     });
    //   //   }
    //   //   return keyValues;
    //   // }
    // },
    // {
    //   label: 'ncrm_customer_filter_relatedaccount',
    //   value: 'accounts',
    //   component: components.CustomerAutoComplete,
    //   componentProps: {
    //     //single: true,
    //     type: 'account'
    //   },
    //   getValue: (value: any) => {
    //     return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    //   },
    //   setValue: (value: string) => {
    //     return value ? value.split(',') : [];
    //   }
    // },
    // {
    //   label: 'ncrm_customer_filter_mobile',
    //   value: 'mobile',
    //   component: TextField,
    //   componentProps: {
    //     fullWidth: true,
    //     autoComplete: 'off',
    //     type: 'number'
    //   }
    // }
  ],
  general: [
    // {
    //   label: 'ncrm_customer_filter_customertype',
    //   value: keyNames.KEY_CAMPAIGN_TYPE,
    //   component: baseComponents.DataSourceSelect,
    //   componentProps: {
    //     single: true,
    //     sourceKey: 'customer_category',
    //     sourceType: 'field',
    //     keyOptionValue: 'keyName',
    //     keyOptionLabel: 'languageKey'
    //   },
    //   getValue: (value: any) => {
    //     return value?.keyName || '';
    //   }
    //   // setValue: (value: string) => {
    //   //   return value;
    //   // }
    // },
    // {
    //   label: 'ncrm_customer_filter_assignedrep',
    //   value: keyNames.KEY_CAMPAIGN_ASSIGN_TO,
    //   component: components.UserAutoComplete,
    //   getValue: (value: any) => {
    //     return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    //   },
    //   setValue: (value: string) => {
    //     return value ? value.split(',') : [];
    //   }
    // },
    // {
    //   label: 'ncrm_customer_filter_relatedproduct',
    //   value: keyNames.KEY_CAMPAIGN_RELATED_PRODUCT,
    //   component: components.ProductAutoComplete,
    //   componentProps: {
    //     showAllOption: false,
    //     hiddenAdd: true
    //   },
    //   getValue: (value: any) => {
    //     return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : ''; //TODO
    //   }
    //   // setValue: (value: string) => {
    //   //   return value;
    //   // },
    // },
    {
      label: 'Owner',
      value: keyNames.KEY_CAMPAIGN_ONWER,
      component: components.UserAutoComplete,
      componentProps: {
        single: true
      },
      getValue: (value: any) => {
        return value?.id || '';
      },
      setValue: (value: string) => {
        return value;
      }
    }
    // {
    //   label: 'ncrm_customer_filter_telephone',
    //   value: 'phone',
    //   component: TextField,
    //   componentProps: {
    //     fullWidth: true,
    //     autoComplete: 'off',
    //     type: 'number'
    //   }
    // },
  ]
};

export const searchOptions = [
  {
    label: 'Name',
    value: keyNames.KEY_CAMPAIGN_NAME
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_CAMPAIGN_NAME,
    label: 'Campaign Name'
  },
  {
    value: keyNames.KEY_CAMPAIGN_STAGE,
    label: 'Stage'
  },
  {
    value: keyNames.KEY_CAMPAIGN_CREATED_AT,
    label: 'Created At'
  },
  {
    value: keyNames.KEY_CAMPAIGN_UPDATED_AT,
    label: 'Updated At'
  }
];
