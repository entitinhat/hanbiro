//third-party
import _ from 'lodash';

//project
import * as baseComponents from '@base/config/write-field/components';

//third-party
import { TextField } from '@mui/material';
import { LabelValue } from '@base/types/app';
//import { t } from 'i18next';

//menu
import * as keyNames from '@customer/config/keyNames';
import * as components from '@customer/config/write-field/components';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '../constants';

export const CUSTOMER_GROUP_BY_ALL = 'all';
export const CUSTOMER_GROUP_BY_MY = 'myCustomer';
export const CUSTOMER_GROUP_BY_MY_GROUP = 'myGroupCustomer';
export const CUSTOMER_GROUP_BY_UNASSIGN = 'unassignedCustomer';
export const CUSTOMER_GROUP_BY_ALL_EMPLOYEE = 'allEmployee';
export const CUSTOMER_GROUP_BY_DUPLICATED = 'duplicatedCustomer';
export const CUSTOMER_GROUP_BY_DELETED = 'deletedCustomer';

//custom fields for group by
export const FIELDS_GROUP_BY: { [key: string]: any } = {
  [CUSTOMER_CATEGORY_ALL]: {
    [CUSTOMER_GROUP_BY_ALL]: [],
    [CUSTOMER_GROUP_BY_MY]: [],
    [CUSTOMER_GROUP_BY_MY_GROUP]: [],
    [CUSTOMER_GROUP_BY_UNASSIGN]: [],
    [CUSTOMER_GROUP_BY_DUPLICATED]: [],
    [CUSTOMER_GROUP_BY_DELETED]: [
      keyNames.KEY_NAME_CUSTOMER_NAME,
      keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
      keyNames.KEY_NAME_CUSTOMER_DELETED_AT
    ]
  },
  [CUSTOMER_CATEGORY_ACCOUNT]: {
    [CUSTOMER_GROUP_BY_ALL]: [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT],
    [CUSTOMER_GROUP_BY_MY]: [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT],
    [CUSTOMER_GROUP_BY_MY_GROUP]: [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT],
    [CUSTOMER_GROUP_BY_UNASSIGN]: [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT],
    [CUSTOMER_GROUP_BY_DUPLICATED]: [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT],
    [CUSTOMER_GROUP_BY_DELETED]: [
      keyNames.KEY_NAME_CUSTOMER_NAME,
      keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
      keyNames.KEY_NAME_CUSTOMER_DELETED_AT
    ]
  },
  [CUSTOMER_CATEGORY_CONTACT]: {
    [CUSTOMER_GROUP_BY_ALL]: [],
    [CUSTOMER_GROUP_BY_MY]: [],
    [CUSTOMER_GROUP_BY_MY_GROUP]: [keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO],
    [CUSTOMER_GROUP_BY_UNASSIGN]: [],
    [CUSTOMER_GROUP_BY_ALL_EMPLOYEE]: [
      keyNames.KEY_NAME_CUSTOMER_ACCOUNT,
      keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE,
      keyNames.KEY_NAME_CUSTOMER_DEPARTMENT,
      keyNames.KEY_NAME_CUSTOMER_JOB
    ],
    [CUSTOMER_GROUP_BY_DUPLICATED]: [],
    [CUSTOMER_GROUP_BY_DELETED]: [
      keyNames.KEY_NAME_CUSTOMER_NAME,
      keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
      keyNames.KEY_NAME_CUSTOMER_DELETED_AT
    ]
  }
};

//custom hidden fields for group by
export const HIDDEN_FIELDS_GROUP_BY: { [key: string]: any } = {
  [CUSTOMER_CATEGORY_ALL]: {},
  [CUSTOMER_CATEGORY_ACCOUNT]: {},
  [CUSTOMER_CATEGORY_CONTACT]: {
    [CUSTOMER_GROUP_BY_ALL_EMPLOYEE]: [
      keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE,
      keyNames.KEY_NAME_CUSTOMER_TYPE,
      keyNames.KEY_NAME_CUSTOMER_RATING,
      keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO
    ]
  }
};

//cannot change in column settings
export const BASE_FIELDS = [keyNames.KEY_NAME_CUSTOMER_NAME];

//disabled sortBy columns
export const DISABLED_SORT_FIELDS = [
  keyNames.KEY_NAME_CUSTOMER_PHOTO,
  keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
  keyNames.KEY_NAME_CUSTOMER_PHONES,
  keyNames.KEY_NAME_CUSTOMER_MOBILE,
  keyNames.KEY_NAME_CUSTOMER_EMAIL,
  keyNames.KEY_NAME_CUSTOMER_WEBSITES,
  keyNames.KEY_NAME_CUSTOMER_FAX,
  keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
  keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
  keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES
];

export const groupByCategoryOptions: { [key: string]: any } = {
  all: [
    { label: 'ncrm_customer_filter_allcustomers', value: CUSTOMER_GROUP_BY_ALL },
    { label: 'ncrm_customer_filter_mycustomers', value: CUSTOMER_GROUP_BY_MY },
    { label: 'ncrm_customer_filter_mygroupcustomers', value: CUSTOMER_GROUP_BY_MY_GROUP },
    { label: 'ncrm_customer_filter_unassignedcustomers', value: CUSTOMER_GROUP_BY_UNASSIGN },
    { label: 'Duplicated Customers', value: CUSTOMER_GROUP_BY_DUPLICATED },
    { label: 'ncrm_customer_filter_deletedcustomers', value: CUSTOMER_GROUP_BY_DELETED }
    // { label: 'ncrm_customer_filter_allaccounts', value: 'allAccount' },
    // { label: 'ncrm_customer_filter_allcontacts', value: 'allContact' },
    // { label: 'ncrm_customer_filter_myaccounts', value: 'myAccount' },
    // { label: 'ncrm_customer_filter_mygroupaccounts', value: 'myGroupAccount' },
    // { label: 'ncrm_customer_filter_mycontacts', value: 'myContact' },
    // { label: 'ncrm_customer_filter_mygroupcontacts', value: 'myGroupContact' }
  ],
  account: [
    { label: 'All Accounts', value: CUSTOMER_GROUP_BY_ALL },
    { label: 'My Accounts', value: CUSTOMER_GROUP_BY_MY },
    { label: 'My Group Accounts', value: CUSTOMER_GROUP_BY_MY_GROUP },
    { label: 'Unassigned Accounts', value: CUSTOMER_GROUP_BY_UNASSIGN },
    { label: 'Duplicated Accounts', value: CUSTOMER_GROUP_BY_DUPLICATED },
    { label: 'Deleted Accounts', value: CUSTOMER_GROUP_BY_DELETED }
  ],
  contact: [
    { label: 'ncrm_customer_filter_allcontacts', value: CUSTOMER_GROUP_BY_ALL },
    { label: 'ncrm_customer_filter_mycontacts', value: CUSTOMER_GROUP_BY_MY },
    { label: 'ncrm_customer_filter_mygroupcontacts', value: CUSTOMER_GROUP_BY_MY_GROUP },
    { label: 'ncrm_customer_filter_unassignedcontacts', value: CUSTOMER_GROUP_BY_UNASSIGN },
    { label: 'All Employees', value: CUSTOMER_GROUP_BY_ALL_EMPLOYEE },
    { label: 'Duplicated Contacts', value: CUSTOMER_GROUP_BY_DUPLICATED },
    { label: 'ncrm_customer_filter_deletedcontacts', value: CUSTOMER_GROUP_BY_DELETED }
  ],
  general: [
    // { label: 'ncrm_customer_filter_allcustomers', value: CUSTOMER_GROUP_BY_ALL },
    // { label: 'ncrm_customer_filter_mycustomers', value: CUSTOMERY_GROUP_BY_MY },
    // { label: 'ncrm_customer_filter_mygroupcustomers', value: CUSTOMERY_GROUP_BY_MY_GROUP },
    // { label: 'ncrm_customer_filter_unassignedcustomers', value: CUSTOMERY_GROUP_BY_UNASSIGN },
    // { label: 'Duplicated Customers', value: CUSTOMER_GROUP_BY_DUPLICATED },
    // { label: 'ncrm_customer_filter_deletedcustomers', value: CUSTOMER_GROUP_BY_DELETED }
    //{ label: 'Overdue Customers', value: 'typeCustomerOverdue' },
    //{ label: 'Closed Lost Customers', value: 'typeCustomerTerminated' },
    //{ label: 'Expired Customers', value: 'typeCustomerExpired' },
    // { label: 'ncrm_customer_filter_allcustomers', value: 'typeCustomer' },
    // { label: 'ncrm_customer_filter_allvendors', value: 'typeVendor' },
    // { label: 'ncrm_customer_filter_preferredvendors', value: 'preferredVendor' },
    // { label: 'ncrm_customer_filter_allsalesagents', value: 'typeSalesAgent' },
    // { label: 'ncrm_customer_filter_allpartners', value: 'typePartner' }
  ]
};

export const dateByOptions = [
  { label: 'ncrm_customer_created_at', value: keyNames.KEY_NAME_CUSTOMER_CREATED_AT },
  { label: 'ncrm_customer_updated_at', value: keyNames.KEY_NAME_CUSTOMER_UPDATED_AT }
];

export const filterByCategoryOptions: { [key: string]: any } = {
  all: [
    {
      label: 'Mobile',
      value: keyNames.KEY_NAME_CUSTOMER_MOBILE,
      component: TextField,
      componentProps: {
        fullWidth: true,
        autoComplete: 'off',
        type: 'number'
      }
    }
  ],
  account: [
    {
      label: 'Parent Account',
      value: keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT,
      component: components.CustomerAutoComplete,
      componentProps: {
        //single: true,
        category: 'account'
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value ? value.split(',') : [];
      }
    }
  ],
  contact: [
    {
      label: 'Contact Type',
      value: keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE,
      component: baseComponents.DataSourceSelect,
      componentProps: {
        single: false,
        sourceKey: 'contact_type',
        sourceType: 'field',
        keyOptionValue: 'keyName',
        keyOptionLabel: 'languageKey'
      },
      getValue: (value: any[]) => {
        //return value.length > 0 ? value?.map((v: any) => CUSTOMER_CONTACT_TYPE_ENUM[v?.keyName]) : [];
        return value?.length > 0 ? value?.map((v: any) => v?.keyName).join(',') : '';
      },
      setValue: (value: string) => {
        return value?.split(',') || [];
      }
      // setValue: (value: any) => {
      //   const keyValues: string[] = [];
      //   if (value && value.length > 0) {
      //     Object.keys(CUSTOMER_CONTACT_TYPE_ENUM).map((_key: string) => {
      //       if (value.includes(CUSTOMER_CONTACT_TYPE_ENUM[_key])) {
      //         keyValues.push(_key);
      //       }
      //     });
      //   }
      //   return keyValues;
      // }
    },
    {
      label: 'ncrm_customer_filter_relatedaccount',
      value: keyNames.KEY_NAME_CUSTOMER_ACCOUNT,
      component: components.CustomerAutoComplete,
      componentProps: {
        //single: true,
        category: 'account'
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value ? value.split(',') : [];
      }
    },
    {
      label: 'Mobile',
      value: keyNames.KEY_NAME_CUSTOMER_MOBILE,
      component: TextField,
      componentProps: {
        fullWidth: true,
        autoComplete: 'off',
        type: 'number'
      }
    }
  ],
  general: [
    {
      label: 'ncrm_customer_filter_customertype',
      value: keyNames.KEY_NAME_CUSTOMER_TYPE,
      component: baseComponents.DataSourceSelect,
      componentProps: {
        single: false,
        sourceKey: 'customer_category',
        sourceType: 'field',
        keyOptionValue: 'keyName',
        keyOptionLabel: 'languageKey'
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v.keyName).join(',') : '';
      },
      setValue: (value: string) => {
        return value?.split(',') || [];
      }
    },
    {
      label: 'ncrm_customer_filter_industry',
      value: keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
      component: baseComponents.DataSourceSelect,
      componentProps: {
        single: false,
        sourceKey: 'industry',
        sourceType: 'field',
        keyOptionValue: 'keyName',
        keyOptionLabel: 'languageKey'
      },
      getValue: (value: any[]) => {
        return value?.length > 0 ? value?.map((v: any) => v.keyName).join(',') : '';
      },
      setValue: (value: string) => {
        return value?.split(',') || [];
      }
    },
    {
      label: 'ncrm_customer_filter_rating',
      value: 'rating',
      component: baseComponents.DataSourceSelect,
      componentProps: {
        single: false,
        sourceKey: 'customer_rating',
        sourceType: 'field',
        keyOptionValue: 'keyName',
        keyOptionLabel: 'languageKey'
      },
      getValue: (value: any[]) => {
        return value?.length > 0 ? value?.map((v: any) => v.keyName).join(',') : '';
      },
      setValue: (value: string) => {
        return value?.split(',') || [];
      }
    },
    {
      label: 'Billing Country',
      value: keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESS_COUNTRY,
      component: baseComponents.CountrySelect,
      componentProps: {},
      getValue: (value: any) => {
        //console.log('country value', value);
        return value?.isoCode2 || '';
      }
    },
    {
      label: 'Shipping Country',
      value: keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESS_COUNTRY,
      component: baseComponents.CountrySelect,
      componentProps: {},
      getValue: (value: any) => {
        //console.log('country value', value);
        return value?.isoCode2 || '';
      }
      // setValue: (value: string) => {
      //   return value || '';
      // }
    },
    {
      label: 'ncrm_customer_filter_email',
      value: keyNames.KEY_NAME_CUSTOMER_EMAIL,
      component: TextField,
      componentProps: {
        fullWidth: true,
        autoComplete: 'off'
      }
    },
    {
      label: 'ncrm_customer_filter_telephone',
      value: keyNames.KEY_NAME_CUSTOMER_PHONES,
      component: TextField,
      componentProps: {
        fullWidth: true,
        autoComplete: 'off',
        type: 'number'
      }
    },
    {
      label: 'ncrm_customer_filter_relatedproduct',
      value: keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT,
      component: components.ProductAutoComplete,
      componentProps: {
        showAllOption: false,
        hiddenAdd: true
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value?.split(',') || [];
      }
    },
    // {
    //   label: 'ncrm_customer_filter_salecommission',
    //   value: 'salesCommission',
    //   component: baseComponents.NumberRangeField,
    //   componentProps: {
    //     prefix: '%',
    //     size: 'xs'
    //   },
    //   getValue: (value: any) => {
    //     return value ? `${value.from},${value.to}` : ''; //TODO
    //   },
    //   setValue: (value: string) => {
    //     const arr = value?.split(',') || []; //TODO
    //     return arr.length > 1 ? { from: arr[0], to: arr[1] } : null;
    //   }
    // },
    {
      label: 'SLA',
      value: keyNames.KEY_NAME_CUSTOMER_SLA,
      component: baseComponents.DataSourceSelect,
      componentProps: {
        single: true,
        sourceType: 'setting',
        sourceKey: 'sla',
        sourceMenu: 'desk',
        keyOptionValue: 'sla',
        keyOptionLabel: 'sla'
      },
      getValue: (value: any) => {
        return value?.sla || '';
      }
    },
    {
      label: 'ncrm_customer_filter_assignedrep',
      value: keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
      component: components.UserAutoComplete,
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value ? value.split(',') : [];
      }
    },
    {
      label: 'ncrm_customer_filter_owner',
      value: keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
      component: components.UserAutoComplete,
      componentProps: {
        single: false,
        showAvatar: true
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value ? value.split(',') : [];
      }
    },
    {
      label: 'Updated By',
      value: keyNames.KEY_NAME_CUSTOMER_UPDATED_BY,
      component: components.UserAutoComplete,
      componentProps: {
        single: false,
        showAvatar: true
      },
      getValue: (value: any) => {
        return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        return value ? value.split(',') : [];
      }
    }
    // {
    //   label: 'Read',
    //   value: 'isRead',
    //   component: Switch,
    //   componentProps: {},
    //   getValue: (value: any) => {
    //     return value;
    //   },
    //   setValue: (value: any) => {
    //     return value || false;
    //   },
    //   parseExtra: (value: boolean) => {
    //     return value ? t(`isRead`) : t(`unRead`);
    //   }
    // }
  ]
};

export const searchOptions = [
  {
    label: 'Name',
    value: keyNames.KEY_NAME_CUSTOMER_NAME
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_NAME_CUSTOMER_NAME,
    label: 'Customer Name'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_CODE,
    label: 'Customer ID'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_TYPE,
    label: 'Customer Type'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_RATING,
    label: 'Rating'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    label: 'Created At'
  }
  // {
  //   value: keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
  //   label: 'Updated At'
  // }
];

export const categoryEnum: { [key: string]: string } = {
  all: 'CATEGORY_ALL',
  account: 'CATEGORY_ACCOUNT',
  contact: 'CATEGORY_CONTACT',
  employee: 'CATEGORY_EMPLOYEE',
  none: 'CATEGORY_NONE'
};
