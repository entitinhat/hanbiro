import Icon from '@base/assets/icons/svg-icons';
import { LabelValue } from '@base/types/app';
import { IdName } from '@base/types/common';

export const LEAD_COLLECTION_METHOD_MANUAL_TASK = 'LEAD_COLLECTION_METHOD_MANUAL_TASK';
export const LEAD_COLLECTION_METHOD_CUSTOMER_IN_CRM = 'LEAD_COLLECTION_METHOD_CUSTOMER_IN_CRM';
export const LEAD_COLLECTION_METHOD_LEAD_CAPTURE = 'LEAD_COLLECTION_METHOD_LEAD_CAPTURE';
export const LEAD_COLLECTION_METHOD_OTHER = 'LEAD_COLLECTION_METHOD_OTHER';

export const LEAD_TYPE_QUALIFIED = 'TYPE_QUALIFIED'
export const LEAD_TYPE_UNQUALIFIED = 'TYPE_UNQUALIFIED'
export const LEAD_TYPE_DISQUALIFIED = 'TYPE_DISQUALIFIED'

export const LEAD_CONTACT_METHOD_OPTIONS: IdName[] = [
  {
    id: 'STATUS_ALLOW',
    name: 'ncrm_sales_lead_contact_method_options_allow'
  },
  {
    id: 'STATUS_DENY',
    name: 'ncrm_sales_lead_contact_method_options_deny'
  }
];

export const LEAD_PAIN_POINT = [
  {
    label: 'Reduce Cost',
    value: 'reduce_cost',
    active: true
  },
  {
    label: 'Save Time',
    value: 'save_time',
    active: false
  },
  {
    label: 'Reduce Cost',
    value: 'reduce_cost',
    active: true
  }
];

export const LEAD_ADD_OPTIONS: Record<string, any> = {
  lead: {
    name: 'ncrm_common_menu_lead',
    icon: Icon('lead')
  }
  // opportunity: {
  //   name: 'ncrm_common_menu_opportunity',
  //   icon: Icon('opportunity')
  // }
};

export const RecordedBy: LabelValue[] = [
  {
    label: 'Assigned Rep',
    value: 'rep'
  },
  {
    label: 'Owner',
    value: 'owner'
  },
  {
    label: 'Specific User',
    value: 'user'
  },
  {
    label: 'Auto',
    value: 'auto'
  }
];

export const RecordedType: LabelValue[] = [
  {
    label: 'Created',
    value: 'created'
  },
  {
    label: 'Updated',
    value: 'updated'
  },
  {
    label: 'Used',
    value: 'used'
  },
  {
    label: 'Deleted',
    value: 'deleted'
  }
];

export const TYPE_LEAD = 'TYPE_LEAD';
export const TYPE_QUALIFIED = 'TYPE_QUALIFIED';
export const TYPE_UNQUALIFIED = 'TYPE_UNQUALIFIED';

export const LEAD_TYPE_OPTIONS : LabelValue[] = [
  {
    label: 'Lead',
    value: TYPE_LEAD
  },
  {
    label: 'Qualified',
    value: TYPE_QUALIFIED
  },
  {
    label: 'Unqualified',
    value: TYPE_UNQUALIFIED
  }
];
