import * as keyNames from '@blocklist/config/keyNames';

const allColumns: any = {
  [keyNames.KEY_NAME_CUSTOMER_CAMPAIGN]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    languageKey: 'customer_block_field_basic_campaign_name',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
    title: 'customer_block_field_basic_campaign_name'
  },
  [keyNames.KEY_NAME_CUSTOMER_CREATED_AT]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    languageKey: 'customer_block_field_basic_createdat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    title: 'customer_block_field_basic_createdat'
  },
  [keyNames.KEY_NAME_CUSTOMER_CUSTOMER]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    languageKey: 'customer_block_field_basic_customer',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
    title: 'customer_block_field_basic_customer'
  },
  [keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    languageKey: 'customer_block_field_basic_email_block',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
    title: 'customer_block_field_basic_email_block'
  },
  [keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    languageKey: 'customer_block_field_basic_email_bounced',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
    title: 'customer_block_field_basic_email_bounced'
  },
  [keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK,
    languageKey: 'customer_block_field_basic_sms_block',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK,
    title: 'customer_block_field_basic_sms_block'
  }
};

const allBlocksColumns: string[] = [
  keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
  keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
  keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
  keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
  keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
  keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
];
const myBlockListColumns: string[] = [
  keyNames.KEY_NAME_CUSTOMER_CAMPAIGN,
  keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
  keyNames.KEY_NAME_CUSTOMER_CUSTOMER,
  keyNames.KEY_NAME_CUSTOMER_EMAIL_BLOCK,
  keyNames.KEY_NAME_CUSTOMER_EMAIL_BOUNCED,
  keyNames.KEY_NAME_CUSTOMER_MOBILE_SMS_BLOCK
];
const myGroupBlockListColumns: string[] = [];
const blockListperCampaignColumns: string[] = [];
const blockListperCustomerColumns: string[] = [];

const defaultColumns: string[] = [];

function getItemColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'All_Blocks':
      columns = allBlocksColumns.map((v: string) => allColumns[v]);
      break;
    case 'My_Block_List':
      columns = myBlockListColumns.map((v: string) => allColumns[v]);
      break;
    case 'My_Group_Block_List':
      columns = myGroupBlockListColumns.map((v: string) => allColumns[v]);
      break;
    case 'Block_List_Per_Campaign':
      columns = blockListperCampaignColumns.map((v: string) => allColumns[v]);
      break;
    case 'Block_List_Per_Customer':
      columns = blockListperCustomerColumns.map((v: string) => allColumns[v]);
      break;
    default:
      columns = defaultColumns.map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const allBlocks = getItemColumns('All_Blocks');
export const myBlockList = getItemColumns('My_Block_List');
export const myGroupBlockList = getItemColumns('My_Group_Block_List');
export const blockListperCampaign = getItemColumns('Block_List_Per_Campaign');
export const blockListperCustomer = getItemColumns('Block_List_Per_Customer');
