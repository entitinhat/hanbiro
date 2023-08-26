//third-party
import _ from 'lodash';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import * as components from '@marketing-list/config/write-field/components';
//import { CUSTOMER_CONTACT_TYPE_ENUM } from '@marketing-list/config/constants';
import { MARKETING_STATUS_OPTIONS, MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';

//project
import * as baseComponents from '@base/config/write-field/components';
import * as baseKeyNames from '@base/config/keyNames';

// material-ui
import { LabelValue } from '@base/types/app';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import Switch from '@base/components/@hanbiro/Switch';

export const groupByCategoryOptions: { [key: string]: any } = {
  marketing_list: [
    { label: 'ncrm_customer_filter_all', value: 'allMarketings' },
    { label: 'My Marketing List', value: 'myMarketingList' },
    { label: 'My Group Marketing List 1', value: 'myGroupMarketingList_1' },
    { label: 'My Group Marketing List 2', value: 'myGroupMarketingList_2' },
    { label: 'Marketing List per Type 1', value: 'marketingListperType_1' },
    { label: 'Marketing List per Type 2', value: 'marketingListperType_2' },
    { label: 'Marketing List per Owner 1', value: 'marketingListperOwner_1' },
    { label: 'Marketing List per Owner 2', value: 'marketingListperOwner_2' },
    { label: 'Deleted Marketing List', value: 'deletedMarketingList' }
  ]
};

export const dateByOptions = [
  { label: 'ncrm_customer_created_at', value: keyNames.KEY_NAME_CUSTOMER_CREATED_AT },
  { label: 'ncrm_customer_updated_at', value: keyNames.KEY_NAME_CUSTOMER_UPDATED_AT }
  // { label: 'Conversion Date', value: 'conversionDate' },
];

export const filterByCategoryOptions: { [key: string]: any } = {
  marketing_list: [
    {
      label: 'Marketing Type',
      value: keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
      component: SelectBox,
      componentProps: {
        options: MARKETING_TYPE_OPTIONS
      },
      getValue: (value: any) => {
        return value.keyName;
      },
      setValue: (value: any) => {
        return MARKETING_TYPE_OPTIONS?.find((v: any) => v.keyName === value);
      }
    },
    {
      label: 'Owner',
      value: keyNames.KEY_NAME_CUSTOMER_OWNER,
      component: components.UserAutoComplete,
      componentProps: {},
      getValue: (value: any) => {
        return value.map((v: any) => v.id);
      },
      setValue: (value: any) => {
        return value;
      }
    },
    {
      label: 'Active',
      value: keyNames.KEY_NAME_CUSTOMER_ACTIVE,
      component: Switch,
      componentProps: {},
      getValue: (value: any) => {
        return value;
      },
      setValue: (value: any) => {
        return value || false;
      },
      parseExtra: (value: any) => {
        return value ? 'Active' : 'InActive';
      }
    }
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
    value: keyNames.KEY_NAME_CUSTOMER_TYPE,
    label: 'Customer Type'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    label: 'Created At'
  },
  {
    value: keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    label: 'Updated At'
  }
];

export const defaultColumnOrder: { [key: string]: string[] } = {
  allMarketings: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  myMarketingList: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  myGroupMarketingList_1: [
    keyNames.KEY_NAME_CUSTOMER_OWNER,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  myGroupMarketingList_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  marketingListperType_1: [
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  marketingListperType_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  marketingListperOwner_1: [
    keyNames.KEY_NAME_CUSTOMER_OWNER,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  marketingListperOwner_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE
  ],
  deletedMarketingList: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_NAME,
    keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    baseKeyNames.KEY_NAME_DELETED_BY,
    baseKeyNames.KEY_NAME_DELETED_AT
  ]
};
