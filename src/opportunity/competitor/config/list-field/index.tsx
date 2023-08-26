//menu
import * as keyNames from '@competitor/config/keyNames';
import * as components from '@competitor/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';

//project base
import { LabelValue } from '@base/types/app';

export const COMPETIOR_GROUP_BY_ALL = 'all';
export const COMPETIOR_GROUP_BY_PRODUCT = 'competitorByProduct';
export const COMPETIOR_GROUP_BY_DELETED = 'deletedCompetitor';

//group by columns which displaying
export const FIELDS_GROUP_BY: any = {
  [COMPETIOR_GROUP_BY_ALL]: [],
  [COMPETIOR_GROUP_BY_PRODUCT]: [],
  [COMPETIOR_GROUP_BY_DELETED]: []
};

//custom hidden fields for group by
export const HIDDEN_FIELDS_GROUP_BY: { [key: string]: any } = {};

//cannot change in column settings
export const BASE_FIELDS = [keyNames.KEY_NAME_COMPETITOR_NAME, keyNames.KEY_NAME_COMPETITOR_CODE];

//disabled sortBy columns
export const DISABLED_SORT_FIELDS = [
  keyNames.KEY_NAME_COMPETITOR_WEAKNESS,
  keyNames.KEY_NAME_COMPETITOR_STRENGTH,
  keyNames.KEY_NAME_COMPETITOR_PRODUCT
];

export const groupByOptions: LabelValue[] = [
  { label: 'All', value: COMPETIOR_GROUP_BY_ALL },
  { label: 'Competitors per Product', value: COMPETIOR_GROUP_BY_PRODUCT },
  { label: 'Deleted Competitors', value: COMPETIOR_GROUP_BY_DELETED }
];

export const dateByOptions: LabelValue[] = [
  // { label: 'Order Date', value: keyNames.KEY_NAME_COMPETITOR_ORDER_DATE },
  // { label: 'Expected Shipment Date', value: keyNames.KEY_NAME_COMPETITOR_EXPECTED_SHIPMENT_DATE },
  // { label: 'Shipped Date', value: keyNames.KEY_NAME_COMPETITOR_SHIPPED_DATE },
  { label: 'Created Date', value: keyNames.KEY_NAME_COMPETITOR_CREATED_AT },
  { label: 'Updated Date', value: keyNames.KEY_NAME_COMPETITOR_UPDATED_AT }
];

export const filterByOptions = [
  {
    label: 'Product',
    value: keyNames.KEY_NAME_COMPETITOR_PRODUCT,
    component: components.ProductAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Opportunity',
    value: keyNames.KEY_NAME_COMPETITOR_OPPORTUNITY,
    component: baseComponents.SelectBox, //TODO
    componentProps: {
      options: []
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Owner',
    value: keyNames.KEY_NAME_COMPETITOR_CREATED_BY,
    component: components.UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const searchFields: LabelValue[] = [
  {
    value: 'name',
    label: 'Name'
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_NAME_COMPETITOR_NAME,
    label: 'Competitor Name'
  },
  {
    value: keyNames.KEY_NAME_COMPETITOR_CREATED_AT,
    label: 'Created At'
  },
  {
    value: keyNames.KEY_NAME_COMPETITOR_UPDATED_AT,
    label: 'Updated At'
  }
];
