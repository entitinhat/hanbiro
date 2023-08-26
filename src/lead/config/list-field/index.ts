import { FilterByOption } from '@base/types/common';
import { LabelValue } from '@base/types/app';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { Product } from '@product/product/types/product';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';

import LeadSettingSelect from '@lead/containers/SettingSelect';

export const groupByOptions = [
  { label: 'ncrm_sales_lead_groupby_all', value: 'all' },
  { label: 'ncrm_sales_lead_groupby_myleads', value: 'myLead' },
  { label: 'ncrm_sales_lead_groupby_mygrouplead', value: 'myGroupLead1' },
  { label: 'ncrm_sales_lead_groupby_mygrouplead', value: 'myGroupLead2' },
  { label: 'ncrm_sales_lead_groupby_disqualified', value: 'allDisqualified' },
  { label: 'ncrm_sales_lead_groupby_undisqualified', value: 'allUndisqualified' },
  { label: 'ncrm_sales_lead_groupby_deleted', value: 'allDeleted1' },
  { label: 'ncrm_sales_lead_groupby_deleted', value: 'allDeleted2' }
];

export const dateByOptions = [
  { label: 'sales_lead_field_more_createdat', value: 'createdAt' },
  { label: 'sales_lead_field_more_updatedat', value: 'updatedAt' }
];

export const filterByOptions: FilterByOption[] = [
  {
    label: 'sales_lead_field_basic_collectionmethod',
    value: 'collectionMethod',
    component: LeadSettingSelect,
    componentProps: {
      // placeholder: 'Type or click to select a process',
      // single: true,
      settingKey: WRITE_TYPE_COLLECTION
    },
    getValue: (componentValue: any) => {
      return componentValue.id;
    },
    setValue: (value: any) => {
      return value && value?.id ? value : null;
    }
  },
  {
    label: 'product_item_field_basic_prod',
    value: 'products',
    component: ProductAutoComplete,
    getValue: (componentValue: Product[]) => {
      return componentValue?.map((v: Product) => v?.id).join(',');
    },
    setValue: (value: string) => {
      // return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
      return value ? value.split(',')?.map((vId: string) => vId) : [];
    }
  },
  {
    label: 'ncrm_common_filter_assigned_rep',
    value: 'assignTo',
    component: UserAutoComplete,
    componentProps: {
      showAvatar: true,
      placeholder: 'Type or click to select a sales rep'
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_common_filter_owner',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true, placeholder: 'Type or click to select an owner' },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  }
];

export const searchFields: LabelValue[] = [
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'contactName',
    label: 'Name',
  },
  {
    value: 'companyName',
    label: 'Company Name',
  }
];

export const sortsBy = [
  { label: 'sales_lead_field_basic_title', value: 'title' },
  { label: 'sales_lead_field_basic_contactname', value: 'contactName' },
  { label: 'sales_lead_field_basic_source', value: 'source' },
  { label: 'sales_lead_field_basic_products', value: 'products' },
  { label: 'sales_lead_field_basic_collectionmethod', value: 'collectionMethod' },
  { label: 'sales_lead_field_basic_assignto', value: 'assignTo' },
  { label: 'sales_lead_field_more_createdby', value: 'createdBy' },
  { label: 'sales_lead_field_more_createdat', value: 'createdAt' },
  { label: 'sales_lead_field_more_updatedat', value: 'updatedAt' },
  { label: 'sales_lead_field_more_updatedby', value: 'updatedBy' }
];
