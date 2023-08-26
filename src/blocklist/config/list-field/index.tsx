//third-party
import _ from 'lodash';

//menu
import * as keyNames from '@blocklist/config/keyNames';
//import { CUSTOMER_CONTACT_TYPE_ENUM } from '@blocklist/config/constants';

//project
import * as baseComponents from '@base/config/write-field/components';
import * as baseKeyNames from '@base/config/keyNames';

// material-ui
import { TextField } from '@mui/material';
import { LabelValue } from '@base/types/app';

export const groupByCategoryOptions: { [key: string]: any } = {
  block_list: [
    { label: 'ncrm_customer_filter_all', value: 'allBlocks' },
    { label: 'My Block List', value: 'myBlockList' },
    { label: 'My Group Block List 1', value: 'myGroupBlockList_1' },
    { label: 'My Group Block List 2', value: 'myGroupBlockList_2' },
    { label: 'Block List per Campaign 1', value: 'blockListperCampaign_1' },
    { label: 'Block List per Campaign 2', value: 'blockListperCampaign_2' },
    { label: 'Block List per Customer 1', value: 'blockListperCustomer_1' },
    { label: 'Block List per Customer 2', value: 'blockListperCustomer_2' }
  ]
};

export const dateByOptions = [{ label: 'ncrm_customer_created_at', value: keyNames.KEY_NAME_CUSTOMER_CREATED_AT }];

export const filterByCategoryOptions: { [key: string]: any } = {
  block_list: [
    {
      label: 'Customer',
      value: keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
      componentProps: {
        //single: true,
        type: 'account'
      },
      getValue: (value: any) => {
        // return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        // return value ? value.split(',') : [];
      }
    },
    {
      label: 'Campaign Owner',
      value: keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
      getValue: (value: any) => {
        // return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
      },
      setValue: (value: string) => {
        // return value ? value.split(',') : [];
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
    value: keyNames.KEY_NAME_CUSTOMER_CODE,
    label: 'Customer Code'
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

export const categoryEnum: { [key: string]: string } = {
  all: 'CATEGORY_ALL',
  account: 'CATEGORY_ACCOUNT',
  contact: 'CATEGORY_CONTACT',
  employee: 'CATEGORY_EMPLOYEE',
  none: 'CATEGORY_NONE'
};

export const defaultColumnOrder: { [key: string]: string[] } = {
  myBlockList: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  myGroupBlockList_1: [
    keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  myGroupBlockList_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  blockListperCampaign_1: [
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  blockListperCampaign_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  blockListperCustomer_1: [
    keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ],
  blockListperCustomer_2: [
    keyNames.KEY_NAME_CUSTOMER_SELECT,
    keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
  ]
};
